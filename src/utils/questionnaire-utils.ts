import {verifyCanViewQuestionnaire} from "@/utils/application-utils";
import {QuestionStructure, SurveyResponse} from "@/types/question-types";
import {prisma} from "@/utils/prisma-utils";
import {promises as fs} from "fs";
import {QuestionType} from "@prisma/client";

export async function getSurveyResponse(applicationId: number): Promise<SurveyResponse> {
    await verifyCanViewQuestionnaire(applicationId);

    const surveyResponse = await prisma.surveyResponse.findUnique({
        where: {
            applicationId: applicationId
        },
        include: {
            answers: true
        }
    });

    return surveyResponse!;
}

export async function getQuestions(project: string):  Promise<QuestionStructure[]> {
    project = project.replace(/\s+/g, '-').toLowerCase();
    const questions = await fs.readFile(`./src/data/questions/${project}.json`, 'utf-8');
    return await JSON.parse(questions);
}

export async function getFullSurveyResponses(opportunityId: number): Promise<{
    initialCount: number;
    finalCount: number;
    answers: {
        questionId: number;
        type: QuestionType;
        answer: number;
    }[]
}[]> {
    const opportunity = await prisma.opportunity.findUnique({
        where: {
            id: opportunityId
        },
        select: {
            slots: {
                select: {
                    id: true,
                    surveyResponses: {
                        select: {
                            applicationId: true,
                            initialCount: true,
                            finalCount: true,
                            answers: {
                                select: {
                                    questionId: true,
                                    type: true,
                                    answer: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!opportunity) return [];
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

    const surveyResponses = opportunity?.slots.map(slot => slot.surveyResponses).flat();
    return surveyResponses!;
}

export async function getFullSurveyResponsesForProject(projectId: number): Promise<{
    initialCount: number;
    finalCount: number;
    answers: {
        questionId: number;
        type: QuestionType;
        answer: number;
    }[]
}[]> {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            opportunities: {
                select: {
                    id: true,
                    slots: {
                        select: {
                            id: true,
                            surveyResponses: {
                                select: {
                                    applicationId: true,
                                    initialCount: true,
                                    finalCount: true,
                                    answers: {
                                        select: {
                                            questionId: true,
                                            type: true,
                                            answer: true
                                        }
                                    }
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

    const surveyResponses = project?.opportunities.map(opportunity => opportunity.slots).flat().map(slot => slot.surveyResponses).flat();
    return surveyResponses!;
}


