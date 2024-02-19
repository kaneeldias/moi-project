import React from "react";

export default async function HostEntityChipSkeleton() {
    return (
        <div className={`flex flex-row space-x-0 animate-pulse`}>
            <div>
                <div className={`flex h-5 flex-row space-x-1 items-center bg-gray-400 rounded-l-full dark:bg-gray p-1 px-2 w-28`}>
                </div>
            </div>

            <div>
                <div className={`flex h-5 flex-row space-x-1 items-center bg-gray-400 rounded-r-full dark:bg-gray p-1 px-2 w-16`}>
                </div>
            </div>
        </div>
    );
}
