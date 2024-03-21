"use client"

import {getApplicationOwner} from "@/utils/application-utils";
import Link from "next/link";
import React, {useEffect} from "react";
import Image from "next/image";
import {waitRandomTime} from "@/utils/test-utils";
import ApplicationOwnerChipSkeleton from "@/components/chips/ApplicationOwnerChipSkeleton";

type Props = {
    applicationId: number;
}

export default function ApplicationOwnerChip(props: Props) {
    const [loading, setLoading] = React.useState(true);
    const [owner, setOwner] = React.useState<{
        id: number,
        name: string,
        photo: string
    }>({
        id: 0,
        name: "Unknown",
        photo: ""
    });

    useEffect(() => {
        fetch(`/api/applications/${props.applicationId}/owner`).then(
            response => response.json()
        ).then(json => {
            setOwner(json);
        }).catch((e) => {
            console.error(e);
            setOwner({
                id: 0,
                name: "Unknown",
                photo: ""
            });
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <div>
            {loading ?
                <ApplicationOwnerChipSkeleton/> :
                <Link href={`${process.env.EXPA_URL}/people/${owner.id}`} target={"_blank"}>
                    <div className={`flex flex-row space-x-1 items-center`}>
                        <Image src={owner.photo} alt={`${owner.name}'s photo`} width={20} height={20} className={"rounded-full"}/>
                        <div>
                            {owner.name}
                        </div>
                    </div>
                </Link>
            }
        </div>
    );
}
