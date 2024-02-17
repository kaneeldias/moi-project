import React, {Suspense} from "react";
import ProjectsTable from "@/components/tables/ProjectsTable";
import {CardTitle} from "@/components/CardTitle";
import TableSkeleton from "@/components/tables/TableSkeleton";

export default async function Opportunities() {
    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-col space-y-5`}>

                <Suspense fallback={<ProjectsTableSkeleton/>}>
                    <ProjectsTable/>
                </Suspense>

            </div>
        </div>
    );
}

function ProjectsTableSkeleton() {
    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Projects`}/>
            <TableSkeleton/>

        </div>

    );
}


