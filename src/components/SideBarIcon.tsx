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
        <Tooltip className={`bg-blue-700 rounded-md text-white font-bold ml-2 hidden md:flex`} content={props.text} placement="right" pl>
            <Link href={props.link}>
                <div className={`flex flex-row md:justify-center md:w-10 md:h-10 items-center space-x-5 md:space-x-0`}>
                    <Image className={`rounded-l-md md:grayscale md:opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer`} src={props.photo}
                       width={40}
                       height={40}
                       priority={true}
                       alt={props.text}
                    />
                    <div className={`text-gray-700 font-bold md:hidden`}>{props.text}</div>
                </div>
            </Link>
        </Tooltip>
    );
}
