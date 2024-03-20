import {NextRequest, NextResponse} from "next/server";
import {waitRandomTime} from "@/utils/test-utils";
import {getChildLCs} from "@/utils/office-utils";
import {getOpportunitiesOfProject} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest, { params }: {params: {projectId: string}}) {
    await waitRandomTime();

    const projectId = parseInt(params.projectId);

    if (!request.nextUrl.searchParams.has('entities')) {
        const projects = await getOpportunitiesOfProject(projectId);
        return NextResponse.json(projects);
    }

    const entities = request.nextUrl.searchParams.get('entities')!.split(",").map((entity) => {
        return parseInt(entity);
    });

    const childLCs = await getChildLCs(entities);
    const projects = await getOpportunitiesOfProject(projectId, childLCs);
    return NextResponse.json(projects);
}

