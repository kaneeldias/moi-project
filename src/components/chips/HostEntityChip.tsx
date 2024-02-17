import Link from "next/link";
import React from "react";
import {waitRandomTime} from "@/utils/test-utils";
import {getHostEntity} from "@/utils/opportunity-utils";

type Props = {
    opportunityId: number;
}

export default async function HostEntityChip(props: Props) {
    await waitRandomTime();

    const host = await getHostEntity(props.opportunityId);

    return (
        <div className={`flex flex-row space-x-2 text-xs`}>
            <Link href={`${process.env.EXPA_URL}/committees/${host.lc.id}`} target={"_blank"}>
                <div className={`flex flex-row space-x-1 items-center bg-blue-200 w-fit rounded-full p-1 px-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}>
                    <div>
                        {host.lc.name}
                    </div>
                </div>
            </Link>

            <Link href={`${process.env.EXPA_URL}/committees/${host.mc.id}`} target={"_blank"}>
                <div className={`flex flex-row space-x-1 items-center bg-green-200 w-fit rounded-full p-1 px-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}>
                    <div>
                        {host.mc.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}
