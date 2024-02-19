import React from "react";

export default async function HostTableHeader() {
    return (
        <div className={`flex flex-row space-x-0 text-xs items-center`}>
            <div className={`text-sm mr-2`}>Host</div>

            <div className={`flex flex-row space-x-1 items-center bg-blue-200 w-fit rounded-l-full p-1 pl-2 bg-opacity-50 transition-all duration-300`}>
                <div>
                    LC
                </div>
            </div>

            <div className={`flex flex-row space-x-1 items-center bg-green-200 w-fit rounded-r-full p-1 pr-2 bg-opacity-50 transition-all duration-300`}>
                <div>
                    MC
                </div>
            </div>
        </div>
    );
}
