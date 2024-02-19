"use client"

import Image from "next/image";
import {Tooltip} from "@material-tailwind/react";
import Link from "next/link";

type Props = {
    photo: string,
    link: string,
    text: string
}

export default function SideBarIcon(props: Props) {
    return (
        <Tooltip className={`bg-blue-700 rounded-md text-white font-bold ml-2`} content={props.text} placement="right">
            <Link href={props.link}>
                <div className={`flex flex-row justify-center w-10 h-10`}>
                    <Image className={`rounded-l-md grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer`} src={props.photo}
                       width={40}
                       height={40}
                       priority={true}
                       alt={props.text}
                    />
                </div>
            </Link>
        </Tooltip>
    );
}
