import {verifyCanViewQuestionnaire} from "@/utils/application-utils";
import {QuestionStructure, SurveyResponse} from "@/types/question-types";
import {prisma} from "@/utils/prisma-utils";
import {QuestionType} from "@prisma/client";
import globalClassRoom from "@/data/questions/global-classroom.json";
import raiseYourVoice from "@/data/questions/raise-your-voice.json";
import skillUp from "@/data/questions/skill-up.json";
import onTheMap from "@/data/questions/on-the-map.json";
import equify from "@/data/questions/equify.json";
import greenLeaders from "@/data/questions/green-leaders.json";

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
    switch (project) {
        case "Global Classroom":
            return globalClassRoom
        case "Raise Your Voice":
            return raiseYourVoice;
        case "Skill Up!":
            return skillUp;
        case "On the Map":
            return onTheMap;
        case "Equify":
            return equify;
        case "Green Leaders":
            return greenLeaders;
        default:
            throw new Error("Project not found: " + project);
    }
}

export async function getFullSurveyResponses(opportunityId: number, slots?: number[]): Promise<{
    initialCount: number;
    finalCount: number;
    answers: {
        questionId: number;
        type: QuestionType;
        answer: number;
    }[]
}[]> {
    const opportunity = !slots ?
        await prisma.opportunity.findUnique({
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
        }):
        await prisma.opportunity.findUnique({
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
                    },
                    where: {
                        id: {
                            in: slots
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

export async function getFullSurveyResponsesForProject(projectId: number, entities?: number[]): Promise<{
    initialCount: number;
    finalCount: number;
    answers: {
        questionId: number;
        type: QuestionType;
        answer: number;
    }[]
}[]> {
    const project = entities ?
        await prisma.project.findUnique({
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
                    },
                    where: {
                        officeId: {
                            in: entities
                        }
                    }
                }
            }
        }):
        await prisma.project.findUnique({
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
                    },
                    where: {
                        officeId: {
                            in: entities
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


