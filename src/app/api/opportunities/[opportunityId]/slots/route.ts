import {NextRequest, NextResponse} from "next/server";
import {waitRandomTime} from "@/utils/test-utils";
import {getSlots} from "@/utils/opportunity-utils";

export async function GET(request: NextRequest, { params }: {params: {opportunityId: string}}) {
    await waitRandomTime();

    const opportunityId = parseInt(params.opportunityId);
    const host = await getSlots(opportunityId);

    return NextResponse.json(host);
}