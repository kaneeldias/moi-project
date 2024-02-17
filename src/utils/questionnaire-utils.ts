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
                    surveyResponses: {
                        select: {
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
    const opportunity = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            opportunities: {
                select: {
                    slots: {
                        select: {
                            surveyResponses: {
                                select: {
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

    const surveyResponses = opportunity?.opportunities.map(opportunity => opportunity.slots).flat().map(slot => slot.surveyResponses).flat();
    return surveyResponses!;
}


