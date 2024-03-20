import {NextRequest, NextResponse} from "next/server";
import {waitRandomTime} from "@/utils/test-utils";
import {getAccessibleEntitiesWithNames} from "@/utils/person-utils";

export async function GET(request: NextRequest) {
    await waitRandomTime();
    const entities = await getAccessibleEntitiesWithNames();
    return NextResponse.json(entities);
}