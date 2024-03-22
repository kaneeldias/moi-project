import {gql} from "@apollo/client";
import {runQuery} from "@/utils/graphql-utils";
import {prisma} from "@/utils/prisma-utils";
import {AnalysisRow, QuestionStructure} from "@/types/question-types";
import {getFullSurveyResponsesForProject, getQuestions} from "@/utils/questionnaire-utils";
import {QuestionType} from "@prisma/client";
import {verifyCanViewQuestionnaire} from "@/utils/application-utils";

export async function getOpportunityAndProjectFromApplication(applicationId: number): Promise<{
    opportunityId: number,
    name: string
    slotId: number,
    slotName: string
    project: {
        id: number,
        name: string,
        sdg:number
    }
}> {
    const query = gql`
        {
            getApplication(id: "${applicationId}") {
                opportunity {
                    id
                    title
                    project {
                        id
                        title
                        sdg_info {
                            sdg_target {
                                goal_index
                            }   
                        }
                    }
                }
                slot {
                    id
                    title
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    return {
        opportunityId: parseInt(queryResponse.getApplication.opportunity.id),
        name: queryResponse.getApplication.opportunity.title,
        slotId: parseInt(queryResponse.getApplication.slot.id),
        slotName: queryResponse.getApplication.slot.title,
        project: {
            id: parseInt(queryResponse.getApplication.opportunity.project.id),
            name: queryResponse.getApplication.opportunity.project.title,
            sdg: parseInt(queryResponse.getApplication.opportunity.project.sdg_info.sdg_target.goal_index)
        }
    }
}

export async function getProjects(entities?: number[]): Promise<{
    id: number,
    name: string,
    sdg: number,
    opportunityCount: number,
    responsesCount: number
}[]> {
    const projects = !entities ?
        await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                sdg: true,
                opportunities: {
                    select: {
                        id: true,
                        slots: {
                            select: {
                                id: true,
                                surveyResponses: {
                                    select: {
                                        applicationId: true,
                                        updatedAt: true
                                    }
                                }
                            }
                        }
                    },
                }
            }
        })
        :
        await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                sdg: true,
                opportunities: {
                    select: {
                        id: true,
                        slots: {
                            select: {
                                id: true,
                                surveyResponses: {
                                    select: {
                                        applicationId: true,
                                        updatedAt: true
                                    }
                                }
                            }
                        }
                    },
                    where: {
                        officeId: {
                            in: entities
                        }
                    }
                }
            }
        })

    for (const project of projects) {
        for (const opportunity of project.opportunities) {
            for (const slot of opportunity.slots) {
                for (const response of slot.surveyResponses) {
                    const applicationId = response.applicationId;
                    try {
                        await verifyCanViewQuestionnaire(applicationId);
                    } catch (e) {
                        slot.surveyResponses = slot.surveyResponses.filter(r => r.applicationId != applicationId);
                    }
                }
                if (slot.surveyResponses.length == 0) {
                    opportunity.slots = opportunity.slots.filter(s => s.id != slot.id);
                }
            }
            if (opportunity.slots.length == 0) {
                project.opportunities = project.opportunities.filter(o => o.id != opportunity.id);
            }
        }
    }

    projects.sort((a, b) => {
        const aLastUpdated = a.opportunities.reduce((acc, opportunity) => {
            return Math.max(acc, opportunity.slots.reduce((acc, slot) => {
                return Math.max(acc, slot.surveyResponses.reduce((acc, response) => {
                    return Math.max(acc, response.updatedAt.getTime());
                }, 0));
            }, 0));
        }, 0);

        const bLastUpdated = b.opportunities.reduce((acc, opportunity) => {
            return Math.max(acc, opportunity.slots.reduce((acc, slot) => {
                return Math.max(acc, slot.surveyResponses.reduce((acc, response) => {
                    return Math.max(acc, response.updatedAt.getTime());
                }, 0));
            }, 0));
        }, 0);

        return bLastUpdated - aLastUpdated;
    });

    return projects.map(project => {
        return {
            id: project.id,
            name: project.name,
            sdg: project.sdg,
            opportunityCount: project.opportunities.length,
            responsesCount: project.opportunities.reduce((acc, opportunity) => {
                return acc + opportunity.slots.reduce((acc, slot) => {
                    return acc + slot.surveyResponses.length;
                }, 0);
            }, 0)
        }
    });
}

export async function getProject(projectId: number): Promise<{
    id: number,
    name: string,
    sdg: number
}> {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            id: true,
            name: true,
            sdg: true,
        }
    });

    return {
        id: project!.id,
        name: project!.name,
        sdg: project!.sdg,
    }
}

export async function getProjectAnalysis(projectId: number, entities?: number[]): Promise<AnalysisRow[]> {
    const project = await getProject(projectId);
    const opportunityName = project.name;
    const questions: QuestionStructure[] = await getQuestions(opportunityName);

    type AnalysisRecord = {
        sumInitialCount: number,
        sumInitialScore: number,
        sumFinalCount: number,
        sumFinalScore: number
    }

    const analysis: { [id: number] : AnalysisRecord} = {};
    for (const question of questions) {
        analysis[question.id] = {
            sumInitialCount: 0,
            sumInitialScore: 0,
            sumFinalCount: 0,
            sumFinalScore: 0
        };
    }

    const surveyResponses = await getFullSurveyResponsesForProject(projectId, entities);
    for (const response of surveyResponses) {
        for (const answer of response.answers) {
            if (!analysis[answer.questionId]) continue;

            if (answer.type == QuestionType.INITIAL) {
                analysis[answer.questionId].sumInitialCount += response.initialCount;
                analysis[answer.questionId].sumInitialScore += response.initialCount * answer.answer;
            } else if (answer.type == QuestionType.FINAL) {
                analysis[answer.questionId].sumFinalCount += response.finalCount;
                analysis[answer.questionId].sumFinalScore += response.finalCount * answer.answer;
            }
        }
    }

    const analysisRows: AnalysisRow[] = [];
    for (const question of questions) {
        let totalInitialCount = NaN;
        let averageInitialScore = NaN;
        let totalFinalCount = NaN;
        let averageFinalScore = NaN;

        if (question.initial) {
            totalInitialCount = analysis[question.id].sumInitialCount;
            if (totalInitialCount > 0) averageInitialScore = analysis[question.id].sumInitialScore / totalInitialCount;
        }

        if (question.final) {
            totalFinalCount = analysis[question.id].sumFinalCount;
            if (totalFinalCount > 0) averageFinalScore = analysis[question.id].sumFinalScore / totalFinalCount;
        }

        analysisRows.push({
            id: question.id,
            question: question.text,
            totalInitialCount: totalInitialCount,
            averageInitialScore: averageInitialScore,
            totalFinalCount: totalFinalCount,
            averageFinalScore: averageFinalScore,
            change: averageFinalScore - averageInitialScore
        });
    }

    return analysisRows;
}
