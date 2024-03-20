"use client"

import Link from "next/link";
import React, {useEffect, useState} from "react";
import HostEntityChipSkeleton from "@/components/chips/HostEntityChipSkeleton";

type Props = {
    opportunityId: number;
}

export default function HostEntityChip(props: Props) {
    const [host, setHost] = useState<{
        lc: {
            id: number,
            name: string
        },
        mc: {
            id: number,
            name: string
        }
    }>({
        lc: {
            id: 0,
            name: "Unknown"
        },
        mc: {
            id: 0,
            name: "Unknown"
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/opportunities/${props.opportunityId}/host`).then(
            response => response.json()
        ).then(json => {
            setHost(json);
        }).catch((e) => {
            console.error(e);
            setHost({
                lc: {
                    id: 0,
                    name: "Unknown"
                },
                mc: {
                    id: 0,
                    name: "Unknown"
                }
            });
        }).finally(() => {
            setLoading(false);
        })
    }, [props.opportunityId]);

    return (
        <div>
            {loading ? <HostEntityChipSkeleton/> :
            <div className={`flex flex-row space-x-0 text-xs`}>
                <Link href={`${process.env.EXPA_URL}/committees/${host.lc.id}`} target={"_blank"}>
                    <div
                        className={`flex flex-row space-x-1 items-center bg-blue-200 w-fit rounded-l-full p-1 pl-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}>
                        <div>
                            {host.lc.name}
                        </div>
                    </div>
                </Link>

                <Link href={`${process.env.EXPA_URL}/committees/${host.mc.id}`} target={"_blank"}>
                    <div
                        className={`flex flex-row space-x-1 items-center bg-green-200 w-fit rounded-r-full p-1 pr-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}>
                        <div>
                            {host.mc.name}
                        </div>
                    </div>
                </Link>
            </div>
            }
        </div>
    );
}
