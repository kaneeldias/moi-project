import {NextRequest, NextResponse} from "next/server";
import {QuestionnaireSubmissionRequest} from "@/types/question-types";
import {verifyCanSubmitQuestionnaire} from "@/utils/application-utils";
import {getOpportunityAndProjectFromApplication} from "@/utils/project-utils";
import {prisma} from "@/utils/prisma-utils";
import {waitRandomTime} from "@/utils/test-utils";

export async function POST(request: NextRequest, { params }: {params: {applicationId: string}}) {
    await waitRandomTime();

    const applicationId = parseInt(params.applicationId);
    const requestBody: QuestionnaireSubmissionRequest = await request.json();

    try {
        await verifyCanSubmitQuestionnaire(applicationId);
    } catch (e: any) {
        return NextResponse.json("Not authorized", {status: 401});
    }

    const info = await getOpportunityAndProjectFromApplication(applicationId);

    const surveyResponse = await prisma.surveyResponse.upsert({
        where: {
            applicationId: applicationId
        },
        create: {
            applicationId: applicationId,
            initialCount: requestBody.counts.initial,
            finalCount: requestBody.counts.final,
            answers: {
                create: requestBody.answers
            },
            slot: {
                connectOrCreate: {
                    create: {
                        id: info.slotId,
                        name: info.slotName,
                        opportunity: {
                            connectOrCreate: {
                                create: {
                                    id: info.opportunityId,
                                    name: info.name,
                                    project: {
                                        connectOrCreate: {
                                            create: {
                                                id: info.project.id,
                                                name: info.project.name,
                                                sdg: info.project.sdg,
                                            },
                                            where: {
                                                id: info.project.id
                                            }
                                        }
                                    },
                                },
                                where: {
                                    id: info.opportunityId
                                }
                            }
                        },
                    },
                    where: {
                        id: info.slotId
                    }
                }
            }
        },
        update: {
            initialCount: requestBody.counts.initial,
            finalCount: requestBody.counts.final,
            answers: {
                deleteMany: {},
                create: requestBody.answers
            }
        }
    });

    return NextResponse.json(surveyResponse);
}