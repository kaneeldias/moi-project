import Link from "next/link";
import React from "react";
import Image from "next/image";
import {getProjectLogo} from "@/utils/img-utils";

type Props = {
    id: number
    name: string;
    sdg: number;
}

export default function OpportunityChip(props: Props) {
    const projectLogo = getProjectLogo(props.name, props.sdg);

    return (
        <div className={`w-fit`}>
            <Link href={`/opportunities/${props.id}`}>
                <div className={`flex flex-row space-x-1 items-center`}>
                    <Image src={projectLogo} alt={`${props.name} SDG`} width={20} height={20} className={"rounded-sm"}/>
                    <div>
                        {props.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}
