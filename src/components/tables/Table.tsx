"use client"

import React, {ReactNode, useEffect, useState} from "react";
import {nodeToString} from "@/utils/string-utils";
import Image from "next/image";

type column = {
    name: string | ReactNode;
}

type Props = {
    columns: column[];
    rows: ReactNode[][];
    showPagination?: boolean;
    pagination?: {
        page: number,
        perPage: number
    }
}

export default function Table(props: Props) {
    const headers = props.columns.map((column) => column.name);
    const rows = props.rows;
    const showPagination = props.showPagination != null ? props.showPagination : true;

    const [search, setSearch] = useState("");
    const [validRows, setValidRows] = useState<ReactNode[][]>(rows);
    const [displayedRows, setDisplayedRows] = useState<ReactNode[][]>(rows);
    const [searchActive, setSearchActive] = useState(false);
    const [pagination, setPagination] = useState(props.pagination ? props.pagination : {page: 1, perPage: 5});

    useEffect(() => {
        if (!showPagination) {
            setPagination({
                page: 1,
                perPage: 9999999
            });
            return;
        }

        setDisplayedRows(validRows.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage));
    }, [validRows, pagination]);

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
        setValidRows(newRows);
    }

    return (
        <div className={`transition-all overflow-x-scroll md:overflow-x-hidden relative`}>
            <Image src={"/icons/search.png"} alt={"search"} className={`absolute top-[22px] left-[20px] ${!searchActive ? "grayscale opacity-50" : ""} transition-all duration-300`} width={16} height={16}/>
            <input name="search" type="text"
                   className="w-48 border-2 border-gray-200 p-2 pl-8 m-3 text-xs rounded-sm hover:border-blue-200 focus:border-blue-500 transition-all outline-none text-gray-600 focus:text-gray-800"
                   value={search} onChange={handleSearch} onFocus={() => setSearchActive(true)} onBlur={() => setSearchActive(false)}/>

            { validRows.length === 0 &&
                <div className="text-center text-gray-500 p-5 text-xs">
                    No results found
                </div>
            }

            { validRows.length > 0 &&
                <>
                    <table className="w-full min-w-full md:min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {headers.map((head, index) => (
                                <th key={index} className="border-b border-blue-gray-100 bg-white p-2 py-4 text-sm">
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

                    <div className={`flex flex-row w-full text-gray-500 p-2 pt-5 justify-between`}>
                        <div className={`text-xs`}>
                            {validRows.length} results
                        </div>

                        { showPagination && validRows.length > pagination.perPage &&
                            <div className="flex flex-row text-xs items-center space-x-2">

                                <div
                                    className={`${pagination.page > 1 ? "opacity-50 hover:opacity-100 cursor-pointer" : "opacity-0"}  transition-all duration-300`}
                                    onClick={() => pagination.page > 1 && setPagination({
                                        page: pagination.page - 1,
                                        perPage: pagination.perPage
                                    })}>
                                    <Image src={"/icons/next.png"} alt={"Previous"} width={10} height={10}
                                           className={`rotate-180`}/>
                                </div>

                                <div>
                                    page {pagination.page} of {Math.ceil(validRows.length / pagination.perPage)}
                                </div>

                                <div
                                    className={`${(pagination.page < Math.ceil(validRows.length / pagination.perPage)) ? "opacity-50 hover:opacity-100 cursor-pointer" : "opacity-0"}  transition-all duration-300`}
                                    onClick={() => pagination.page < Math.ceil(validRows.length / pagination.perPage) && setPagination({
                                        page: pagination.page + 1,
                                        perPage: pagination.perPage
                                    })}>
                                    <Image src={"/icons/next.png"} alt={"Next"} width={10} height={10}/>
                                </div>

                            </div>
                        }
                    </div>
                </>
            }
        </div>
    );
}