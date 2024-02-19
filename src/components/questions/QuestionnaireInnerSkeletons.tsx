import React from "react";

export default function QuestionnaireInnerSkeleton() {
    return (
        <div className={`flex flex-col space-y-16 mt-8 animate-pulse md:w-[636px]`}>
            <div>
                <div className={"h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full mb-2"}></div>
                <div className={"h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-64 mb-4"}></div>
                <div>
                    <div className={'flex flex-row space-x-5'}>
                        <div className={"h-8 bg-gray-400 rounded-sm dark:bg-gray-700 w-24 mb-4"}></div>
                        <div className={"h-8 bg-gray-400 rounded-sm dark:bg-gray-700 w-24 mb-4"}></div>
                    </div>

                </div>
            </div>

            <div>
                <div className={"h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full mb-2"}></div>
                <div className={"h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-64 mb-4"}></div>
                <div>
                    <div className={'flex flex-row space-x-5'}>
                        <div className={"h-8 bg-gray-400 rounded-sm dark:bg-gray-700 w-24 mb-4"}></div>
                        <div className={"h-8 bg-gray-400 rounded-sm dark:bg-gray-700 w-24 mb-4"}></div>
                    </div>

                </div>
            </div>


            <div>
                <div className={"h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-full mb-2"}></div>
                <div className={"h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-64 mb-4"}></div>
                <div>
                    <div className={'flex flex-row space-x-5'}>
                        <div className={"h-8 bg-gray-400 rounded-sm dark:bg-gray-700 w-24 mb-4"}></div>
                        <div className={"h-8 bg-gray-400 rounded-sm dark:bg-gray-700 w-24 mb-4"}></div>
                    </div>

                </div>
            </div>

            <div className={"h-12 bg-gray-400 rounded-md dark:bg-gray-700 w-32 mb-4"}></div>

        </div>
    );
}