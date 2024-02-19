import React from "react";
import Image from "next/image";

export default async function TableSkeleton() {
    return (
        <div className={`relative`}>
            <Image src={"/icons/search.png"} alt={"search"} className={`absolute top-[22px] left-[20px] grayscale opacity-50 transition-all duration-300`} width={16} height={16}/>
            <input type="text"
                   className="w-48 border-2 border-gray-200 p-2 m-3 text-xs rounded-sm hover:border-blue-200 focus:border-blue-700 transition-all outline-none"
            />
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    <TableHeaderSkeleton/>
                </tr>
                </thead>
                <tbody>
                <TableRowSkeleton/>
                <TableRowSkeleton/>
                <TableRowSkeleton/>
                <TableRowSkeleton/>
                <TableRowSkeleton/>
                </tbody>
            </table>

        </div>
    );
}

export function TableHeaderSkeleton() {
    return (
        <>
            <th className="border-b border-blue-gray-100 bg-white p-2 py-4">
                <div>
                    <div className={`h-3 bg-gray-400 rounded-full dark:bg-gray-700 w-20`}></div>
                </div>
            </th>


            <th className="border-b border-blue-gray-100 bg-white p-2 py-4">
                <div>
                    <div className={`h-3 bg-gray-400 rounded-full dark:bg-gray-700 w-20`}></div>
                </div>
            </th>


            <th className="border-b border-blue-gray-100 bg-white p-2 py-4">
                <div>
                    <div className={`h-3 bg-gray-400 rounded-full dark:bg-gray-700 w-40`}></div>
                </div>
            </th>


            <th className="border-b border-blue-gray-100 bg-white p-2 py-4">
                <div>
                    <div className={`h-3 bg-gray-400 rounded-full dark:bg-gray-700 w-350`}></div>
                </div>
            </th>
        </>
    );
}

export function TableRowSkeleton() {
    return (
        <tr>
            <td className="p-2">
                <div>
                    <div className={`h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-20`}></div>
                </div>
            </td>
            <td className="p-2">
                <div className={`h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-20`}></div>
            </td>

            <td className="p-2">
                <div>
                    <div className={`h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48`}></div>
                </div>
            </td>
            <td className="p-2">
                <div>
                    <div className={`h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32`}></div>
                </div>
            </td>
        </tr>
    )
}