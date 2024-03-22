import {NextRequest, NextResponse} from "next/server";
import {waitRandomTime} from "@/utils/test-utils";
import {getOpportunityAnalysis} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest, { params }: {params: {opportunityId: string}}) {
    await waitRandomTime();

    const opportunityId = parseInt(params.opportunityId);

    if (!request.nextUrl.searchParams.has('slots')) {
        const projects = await getOpportunityAnalysis(opportunityId);
        return NextResponse.json(projects);
    }

    const slots = request.nextUrl.searchParams.get('slots')!.split(",").map((slot) => {
        return parseInt(slot);
    });

    const projects = await getOpportunityAnalysis(opportunityId, slots);
    return NextResponse.json(projects);
}

