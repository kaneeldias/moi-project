import {NextRequest, NextResponse} from "next/server";
import {getProjects} from "@/utils/project-utils";
import {waitRandomTime} from "@/utils/test-utils";
import {getChildLCs} from "@/utils/office-utils";
import {getOpportunities} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest) {
    await waitRandomTime();

    if (!request.nextUrl.searchParams.has('entities')) {
        const projects = await getOpportunities();
        return NextResponse.json(projects);
    }

    const entities = request.nextUrl.searchParams.get('entities')!.split(",").map((entity) => {
        return parseInt(entity);
    });

    const childLCs = await getChildLCs(entities);
    const projects = await getOpportunities(childLCs);
    return NextResponse.json(projects);
}