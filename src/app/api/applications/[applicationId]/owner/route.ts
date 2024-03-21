import {NextRequest, NextResponse} from "next/server";
import {waitRandomTime} from "@/utils/test-utils";
import {getApplicationOwner} from "@/utils/application-utils";

export async function GET(request: NextRequest, { params }: {params: {applicationId: string}}) {
    await waitRandomTime();

    const applicationId = parseInt(params.applicationId);
    const owner = await getApplicationOwner(applicationId);

    return NextResponse.json(owner);
}