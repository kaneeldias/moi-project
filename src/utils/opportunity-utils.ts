import {QuestionType} from "@prisma/client";
import {prisma} from "@/utils/prisma-utils";
import {gql} from "@apollo/client";
import {runQuery} from "@/utils/graphql-utils";
import {Opportunity} from "@/types/project-types";
import {getFullSurveyResponses, getQuestions} from "@/utils/questionnaire-utils";
import {AnalysisRow, QuestionStructure} from "@/types/question-types";
import {verifyCanViewQuestionnaire} from "@/utils/application-utils";

export async function getSurveyResponses(opportunityId: number) {
    const opportunity = await prisma.opportunity.findUnique({
        where: {
            id: opportunityId
        },
        select: {
            slots: {
                select: {
                    id: true
                }
            }
        }
    });
    const slotIds = opportunity?.slots.map(slot => slot.id);

    let slots = await prisma.slot.findMany({
        where: {
            id: {
                in: slotIds
            }
        },
        select: {
            name: true,
            surveyResponses: {
                select: {
                    applicationId: true,
                    updatedAt: true,
                }
            }
        },
    });

    for (const slot of slots) {
        for (const response of slot.surveyResponses) {
            const applicationId = response.applicationId;
            try {
                await verifyCanViewQuestionnaire(applicationId);
            } catch (e) {
                slot.surveyResponses = slot.surveyResponses.filter(r => r.applicationId != applicationId);
            }
        }
        if (slot.surveyResponses.length == 0) {
            slots = slots.filter(s => s.name != slot.name);
        }
    }

    const surveyResponses: {
        applicationId: number,
        slotName: string,
        updatedAt: Date
    }[] = [];
    slots.forEach(slot => {
        slot.surveyResponses.forEach(surveyResponse => {
            surveyResponses.push({
                applicationId: surveyResponse.applicationId,
                slotName: slot.name,
                updatedAt: surveyResponse.updatedAt
            });
        });
    });

    surveyResponses.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return surveyResponses;
}

export async function getAllSurveyResponses() {
    const opportunity = await prisma.opportunity.findMany({
        select: {
            slots: {
                select: {
                    id: true
                }
            }
        }
    });
    const slotIds = opportunity.map(opportunity => opportunity.slots.map(slot => slot.id)).flat();

    let slots = await prisma.slot.findMany({
        where: {
            id: {
                in: slotIds
            }
        },
        select: {
            name: true,
            surveyResponses: {
                select: {
                    applicationId: true,
                    updatedAt: true,
                }
            },
            opportunity: {
                select: {
                    id: true,
                    name: true,
                    project: {
                        select: {
                            sdg: true
                        }
                    }
                }

            }
        }
    });

    for (const slot of slots) {
        for (const response of slot.surveyResponses) {
            const applicationId = response.applicationId;
            try {
                await verifyCanViewQuestionnaire(applicationId);
            } catch (e) {
                slot.surveyResponses = slot.surveyResponses.filter(r => r.applicationId != applicationId);
            }
        }
        if (slot.surveyResponses.length == 0) {
            slots = slots.filter(s => s.name != slot.name);
        }
    }

    const surveyResponses: {
        applicationId: number,
        opportunity?: {
            id: number,
            name: string,
            sdg: number
        },
        slotName: string,
        updatedAt: Date
    }[] = [];
    slots.forEach(slot => {
        slot.surveyResponses.forEach(surveyResponse => {
            surveyResponses.push({
                applicationId: surveyResponse.applicationId,
                opportunity: {
                    id: slot.opportunity.id,
                    name: slot.opportunity.name,
                    sdg: slot.opportunity.project.sdg
                },
                slotName: slot.name,
                updatedAt: surveyResponse.updatedAt
            });
        });
    });

    surveyResponses.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return surveyResponses;
}


export async function getSurveyResponsesForProject(projectId: number): Promise<{
    applicationId: number,
    opportunity: {
        id: number,
        name: string,
        project: {
            sdg: number
        }
    }
    slot: {
        name: string
    },
    updatedAt: Date
}[]> {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            sdg: true,
            opportunities: {
                select: {
                    id: true,
                    name: true,
                    slots: {
                        select: {
                            id: true,
                            name: true,
                            surveyResponses: {
                                select: {
                                    applicationId: true,
                                    updatedAt: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!project) return [];
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

    const surveyResponses: {
        applicationId: number,
        opportunity: {
            id: number,
            name: string,
            project: {
                sdg: number
            }
        },
        slot: {
            name: string
        },
        updatedAt: Date
    }[] = [];

    project?.opportunities.forEach(opportunity => {
        opportunity.slots.forEach(slot => {
            slot.surveyResponses.forEach(surveyResponse => {
                surveyResponses.push({
                    applicationId: surveyResponse.applicationId,
                    opportunity: {
                        id: opportunity.id,
                        name: opportunity.name,
                        project: {
                            sdg: project.sdg
                        }
                    },
                    slot: {
                        name: slot.name
                    },
                    updatedAt: surveyResponse.updatedAt
                });
            });
        });
    });

    surveyResponses.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return surveyResponses;
}


export async function getOpportunity(opportunityId: number): Promise<Opportunity> {
    const query = gql`
        {
            opportunity(id: "${opportunityId}") {
                id
                title
                location
                sdg_info {
                    sdg_target {
                        goal_index
                    }
                }
            }
        }
    `

    const queryResponse = await runQuery(query);

    return {
        id: queryResponse.opportunity.id,
        name: queryResponse.opportunity.title,
        location: queryResponse.opportunity.location,
        sdg: queryResponse.opportunity.sdg_info.sdg_target.goal_index
    };
}

export async function getOpportunityAnalysis(opportunityId: number): Promise<AnalysisRow[]> {
    const opportunity = await getOpportunity(opportunityId);
    const opportunityName = opportunity.name;
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

    const surveyResponses = await getFullSurveyResponses(opportunityId);
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

export async function getOpportunities() {
    let opportunities = await prisma.opportunity.findMany({
        select: {
            id: true,
            name: true,
            project: {
                select: {
                    id: true,
                    sdg: true
                }
            },
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
        orderBy: {
            id: "desc"
        }
    });

    for (const opportunity of opportunities) {
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
            opportunities = opportunities.filter(o => o.id != opportunity.id);
        }
    }

    const result: {
        id: number,
        name: string,
        project: {
            id: number,
            sdg: number
        }
        responsesCount: number
    }[] = [];

    opportunities.sort((a, b) => {
        const aLastUpdate = a.slots.reduce((acc, slot) => {
            return Math.max(acc, slot.surveyResponses.reduce((acc, response) => {
                return Math.max(acc, response.updatedAt.getTime());
            }, 0));
        }, 0);

        const bLastUpdate = b.slots.reduce((acc, slot) => {
            return Math.max(acc, slot.surveyResponses.reduce((acc, response) => {
                return Math.max(acc, response.updatedAt.getTime());
            }, 0));
        }, 0);

        return bLastUpdate - aLastUpdate;
    });

    for (const opportunity of opportunities) {
        const responsesCount = opportunity.slots.reduce((acc, slot) => {
            return acc + slot.surveyResponses.length;
        }, 0);

        result.push({
            id: opportunity.id,
            name: opportunity.name,
            project: {
                id: opportunity.project.id,
                sdg: opportunity.project.sdg
            },
            responsesCount: responsesCount
        });
    }

    return result;
}

export async function getOpportunitiesOfProject(projectId: number) {
    let opportunities = await prisma.opportunity.findMany({
        where: {
            projectId: projectId
        },
        select: {
            id: true,
            name: true,
            project: {
                select: {
                    id: true,
                    sdg: true
                }
            },
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
        }
    });

    for (const opportunity of opportunities) {
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
            opportunities = opportunities.filter(o => o.id != opportunity.id);
        }
    }

    const result: {
        id: number,
        name: string,
        project: {
            id: number,
            sdg: number
        }
        responsesCount: number
    }[] = [];

    opportunities.sort((a, b) => {
        const aLastUpdate = a.slots.reduce((acc, slot) => {
            return Math.max(acc, slot.surveyResponses.reduce((acc, response) => {
                return Math.max(acc, response.updatedAt.getTime());
            }, 0));
        }, 0);

        const bLastUpdate = b.slots.reduce((acc, slot) => {
            return Math.max(acc, slot.surveyResponses.reduce((acc, response) => {
                return Math.max(acc, response.updatedAt.getTime());
            }, 0));
        }, 0);

        return bLastUpdate - aLastUpdate;
    });

    for (const opportunity of opportunities) {
        const responsesCount = opportunity.slots.reduce((acc, slot) => {
            return acc + slot.surveyResponses.length;
        }, 0);

        result.push({
            id: opportunity.id,
            name: opportunity.name,
            project: {
                id: opportunity.project.id,
                sdg: opportunity.project.sdg
            },
            responsesCount: responsesCount
        });
    }

    return result;
}


export async function getHostEntity(opportunityId: number) {
    const query = gql`
        {
            opportunity(id: "${opportunityId}") {
                host_lc {
                    id
                    name
                }
                home_mc {
                    id
                    name
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    return {
        lc: {
            id: queryResponse.opportunity.host_lc.id,
            name: queryResponse.opportunity.host_lc.name
        },
        mc: {
            id: queryResponse.opportunity.home_mc.id,
            name: queryResponse.opportunity.home_mc.name
        }
    };
}

export async function getLocation(opportunityId: number) {
    const query = gql`
        {
            opportunity(id: "${opportunityId}") {
                location
            }
        }
    `

    const queryResponse = await runQuery(query);
    return queryResponse.opportunity.location;
}
