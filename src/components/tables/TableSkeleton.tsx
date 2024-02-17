import React from "react";

export default async function TableSkeleton() {
    return (
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