import React from "react";

export default function ApplicationOwnerChipSkeleton() {
    return (
        <div className={"flex flex-row animate-pulse space-x-1 items-center"}>
            <div className={`h-[20px] w-[20px] bg-gray-400 rounded-full dark:bg-gray-700`}></div>
            <div className={`h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32`}></div>
        </div>
    );
}
