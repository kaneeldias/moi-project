"use client"

import {ReactNode} from "react";

type column = {
    name: string;
}

type Props = {
    columns: column[];
    rows: ReactNode[][];
}

export default async function Table(props: Props) {
    const headers = props.columns.map((column) => column.name);
    const rows = props.rows;

    return (
        <div>
            <input type="text" className="w-full p-2 border-b border-blue-gray-100 bg-white rounded-md" placeholder="Search..."/>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {headers.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-white p-2 py-4 text-sm">
                            <div
                            >
                                {head}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className={`text-sm hover:bg-gray-100 transition-all rounded-md m-5`}>
                            {row.map((cell, index) => (
                                <td key={index} className="p-2 text-xs">
                                    <div>
                                        {cell}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
