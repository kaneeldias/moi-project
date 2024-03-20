import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    id: number
    name: string;
    sdg: number;
}

export default function ProjectChip(props: Props) {
    return (
        <div className={`w-fit`}>
            <Link href={`/projects/${props.id}`}>
                <div className={`flex flex-row space-x-1 items-center`}>
                    <Image src={`/sdg_logos/${props.sdg}.png`} alt={`${props.name} SDG`} width={20} height={20} className={"rounded-sm"}/>
                    <div>
                        {props.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}
