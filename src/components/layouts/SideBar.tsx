"use client";

import SideBarIcon from "@/components/SideBarIcon";
import Image from "next/image";
import {useState} from "react";

export default function SideBar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`text-white z-100 fixed top-0 left-0 p-5 md:hidden`} onClick={() => setOpen(!open)}>
                <Image src={"/sidebar_icons/more.png"} alt={"Menu"} className={`opacity-50 hover:opacity-100 ${open ? "opacity-100" : ""} animate-slideIn opacity-0`} width={40}
                       height={40}/>
            </div>
            <div className={`flex flex-col space-y-7 md:mt-2 w-screen md:w-fit bg-gray-200 md:bg-transparent fixed left-0 mt-0 h-full p-5 ${open ? "" : "hidden md:flex"} transition-all duration-300`} onClick={() => setOpen(false)}>
                <SideBarIcon photo="/sidebar_icons/sdg_wheel.png" text="Projects"
                             link={`/projects`}/>
                <SideBarIcon photo="/sidebar_icons/gv_logo.png" text="Opportunities"
                             link={`/opportunities`}/>
                <SideBarIcon photo="/sidebar_icons/survey.png" text="Survey responses"
                             link={`/survey-responses`}/>
            </div>
        </>)
    ;
}
