import React from "react";
import {CardTitle} from "@/components/CardTitle";
import TableSkeleton from "@/components/tables/TableSkeleton";

export default async function OpportunitiesTableSkeleton() {
    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Opportunities`}/>
            <TableSkeleton/>

        </div>

    );
}
