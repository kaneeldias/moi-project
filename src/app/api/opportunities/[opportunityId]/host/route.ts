import {NextRequest, NextResponse} from "next/server";
import {getProjects} from "@/utils/project-utils";
import {waitRandomTime} from "@/utils/test-utils";
import {getChildLCs} from "@/utils/office-utils";
import {getHostEntity} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest, { params }: {params: {opportunityId: string}}) {
    await waitRandomTime();

    const opportunityId = parseInt(params.opportunityId);
    const host = await getHostEntity(opportunityId);

    return NextResponse.json(host);
}