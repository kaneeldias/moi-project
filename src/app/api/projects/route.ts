import {NextRequest, NextResponse} from "next/server";
import {getProjects} from "@/utils/project-utils";
import {waitRandomTime} from "@/utils/test-utils";
import {getLCs} from "@/utils/office-utils";

export async function GET(request: NextRequest) {
    await waitRandomTime();

    if (!request.nextUrl.searchParams.has('entities')) {
        const projects = await getProjects();
        return NextResponse.json(projects);
    }

    const entities = request.nextUrl.searchParams.get('entities')!.split(",").map((entity) => {
        return parseInt(entity);
    });

    const childLCs = await getChildLCs(entities);
    const projects = await getProjects(childLCs);
    return NextResponse.json(projects);
}

export async function getChildLCs(entities: number[]): Promise<number[]> {
    const LCs = [];

    for (const entity of entities) {
        const children = await getLCs(entity);
        LCs.push(...children);
    }

    return LCs;
}
