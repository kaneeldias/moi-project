import {NextRequest, NextResponse} from "next/server";
import {PrismaClient, } from '@prisma/client'
import {QuestionnaireSubmissionRequest} from "@/types/question-types";
import {verifyCanSubmitQuestionnaire} from "@/utils/application-utils";
import {getOpportunityAndProjectFromApplication} from "@/utils/project-utils";
import {prisma} from "@/utils/prisma-utils";
import {waitRandomTime} from "@/utils/test-utils";
import {getOpportunity} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest, { params }: {params: {opportunityId: string}}) {
    const opportunityId = parseInt(params.opportunityId);
    const opportunity = await getOpportunity(opportunityId);
    return NextResponse.json(opportunity);
}