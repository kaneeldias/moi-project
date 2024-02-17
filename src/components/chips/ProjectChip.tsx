import React from "react";
import Image from "next/image";

type Props = {
    name: string;
    sdg: number;
}

export default async function ProjectChip(props: Props) {
    return (
        <div className={`w-fit`}>
            <div className={`flex flex-row space-x-1 items-center`}>
                <Image src={`/sdg_logos/${props.sdg}.png`} alt={`${props.name} SDG`} width={20} height={20} className={"rounded-sm"}/>
                <div>
                    {props.name}
                </div>
            </div>
        </div>
    );
}
