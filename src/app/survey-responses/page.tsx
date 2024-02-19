import React, {Suspense} from "react";
import SurveyResponsesTable from "@/components/tables/SurveyResponsesTable";
import SurveyResponsesTableSkeleton from "@/components/tables/SurveyResponsesTableSkeleton";

export default async function Opportunities() {
    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-col space-y-5`}>

                <Suspense fallback={<SurveyResponsesTableSkeleton/>}>
                    <SurveyResponsesTable/>
                </Suspense>

            </div>
        </div>
    );
}
