import React, {Suspense} from "react";
import OpportunitiesTable from "@/components/tables/OpportunitiesTable";
import OpportunitiesTableSkeleton from "@/components/tables/OpportunitiesTableSkeleton";

export default async function Opportunities() {
    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-col space-y-5`}>

                <Suspense fallback={<OpportunitiesTableSkeleton/>}>
                    <OpportunitiesTable/>
                </Suspense>

            </div>
        </div>
    );

}

