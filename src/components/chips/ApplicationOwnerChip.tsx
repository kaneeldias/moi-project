import {getApplicationOwner} from "@/utils/application-utils";
import Link from "next/link";
import React from "react";
import {Avatar, Chip, Typography} from "@material-tailwind/react";
import Image from "next/image";
import {waitRandomTime} from "@/utils/test-utils";

type Props = {
    applicationId: number;
}

export default async function ApplicationOwnerChip(props: Props) {
    const owner = await getApplicationOwner(props.applicationId);

    await waitRandomTime();

    return (
        <div>
            <Link href={`${process.env.EXPA_URL}/people/${owner.id}`} target={"_blank"}>
                <div className={`flex flex-row space-x-1 items-center`}>
                    <Image src={owner.photo} alt={`${owner.name}'s photo`} width={20} height={20} className={"rounded-full"}/>
                    <div>
                        {owner.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}
