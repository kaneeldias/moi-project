import Link from "next/link";
import React from "react";
import {waitRandomTime} from "@/utils/test-utils";
import {getHostEntity} from "@/utils/opportunity-utils";

type Props = {
    opportunityId: number;
}

export default async function HostEntityChip(props: Props) {
    await waitRandomTime();

    let host;
    try {
        host = await getHostEntity(props.opportunityId);
    } catch (e) {
        host = {
            lc: {
                id: 0,
                name: "Unknown"
            },
            mc: {
                id: 0,
                name: "Unknown"
            }
        }
    }

    return (
        <div className={`flex flex-row space-x-0 text-xs`}>
            <Link href={`${process.env.EXPA_URL}/committees/${host.lc.id}`} target={"_blank"}>
                <div className={`flex flex-row space-x-1 items-center bg-blue-200 w-fit rounded-l-full p-1 pl-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}>
                    <div>
                        {host.lc.name}
                    </div>
                </div>
            </Link>

            <Link href={`${process.env.EXPA_URL}/committees/${host.mc.id}`} target={"_blank"}>
                <div className={`flex flex-row space-x-1 items-center bg-green-200 w-fit rounded-r-full p-1 pr-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}>
                    <div>
                        {host.mc.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}
