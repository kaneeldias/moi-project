import {NextRequest, NextResponse} from "next/server";
import {getOpportunity, getSurveyResponses} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest, { params }: {params: {opportunityId: string}}) {
    const opportunityId = parseInt(params.opportunityId);
    const responses = await getSurveyResponses(opportunityId);
    return NextResponse.json(responses);
}