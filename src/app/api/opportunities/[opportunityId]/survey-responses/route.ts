import {NextRequest, NextResponse} from "next/server";
import {waitRandomTime} from "@/utils/test-utils";
import {getSurveyResponses, getSurveyResponsesForProject} from "@/utils/opportunity-utils";
import {getChildLCs} from "@/utils/office-utils";

export async function GET(request: NextRequest, { params }: {params: {opportunityId: string}}) {
    await waitRandomTime();

    const opportunityId = parseInt(params.opportunityId);
    if (!request.nextUrl.searchParams.has('slots')) {
        const projects = await getSurveyResponses(opportunityId);
        return NextResponse.json(projects);
    }

    const slots = request.nextUrl.searchParams.get('slots')!.split(",").map((slot) => {
        return parseInt(slot);
    });

    const projects = await getSurveyResponses(opportunityId, slots);
    return NextResponse.json(projects);
}