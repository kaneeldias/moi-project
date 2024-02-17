import TableSkeleton from "@/components/tables/TableSkeleton";
import React from "react";
import {CardTitle} from "@/components/CardTitle";

export default async function OpportunityAnalysisTableSkeleton() {
    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Responses Analysis`} color={`green`}/>
            <TableSkeleton/>
        </div>

    );
}
