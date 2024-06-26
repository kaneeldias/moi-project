import React, {Suspense} from "react";
import ProjectsTable, {ProjectsTableSkeleton} from "@/components/tables/ProjectsTable";

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

