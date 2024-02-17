"use client"

import {ReactNode, useEffect, useState} from "react";
import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";
import {text} from "node:stream/consumers";
import {nodeToString} from "@/utils/string-utils";

type column = {
    name: string;
}

type Props = {
    columns: column[];
    rows: ReactNode[][];
}

export default function Table(props: Props) {
    const headers = props.columns.map((column) => column.name);
    const rows = props.rows;

    const [search, setSearch] = useState("");
    const [displayedRows, setDisplayedRows] = useState<ReactNode[][]>(rows);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const searchTerm = event.target.value;
        setSearch(event.target.value);

        const newRows: ReactNode[][] = rows.filter((row) => {
            for (let i = 0; i < row.length; i++) {
                const textValue = nodeToString(row[i]!)
                if (textValue.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
        setDisplayedRows(newRows);
    }

    return (
        <div className={`transition-all`}>
            <input name="search" type="text" className="w-48 border-2 border-gray-200 p-2 m-3 text-xs rounded-sm hover:border-blue-200 focus:border-blue-700 transition-all outline-none" placeholder="Search..." value={search} onChange={handleSearch}/>

            { displayedRows.length === 0 &&
                <div className="text-center text-gray-500 p-5 text-xs">
                    No results found
                </div>
            }

            { displayedRows.length > 0 &&
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
                    {displayedRows.map((row, index) => (
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
            }
        </div>
    );
}