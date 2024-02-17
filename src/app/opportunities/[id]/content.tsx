"use client"

import React, {ReactNode, Suspense, useState} from "react";
import OpportunityBoxSkeleton from "@/components/OpportunityBoxSkeleton";
import SurveyResponsesTableSkeleton from "@/components/tables/SurveyResponsesTableSkeleton";
import OpportunityAnalysisTableSkeleton from "@/components/tables/OpportunityAnalysisTableSkeleton";
import SurveyResponsesTable from "@/components/tables/SurveyResponsesTable";
import OpportunityAnalysisTable from "@/components/tables/OpportunityAnalysisTable";

type Props = {
    opportunityId: number;
    opportunityBox: ReactNode;
    accessToken: string;
    opportunityAnalysisTable: ReactNode;
    surveyResponsesTable: ReactNode;
}

export default function OpportunityContent(props: Props) {
    const [activePage, setActivePage] = useState("responses");

    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-row space-y-5 md:space-y-5 md:space-x-5`}>

                <div className={`flex flex-col space-y-10`}>
                    <Suspense fallback={<OpportunityBoxSkeleton/>}>
                        {props.opportunityBox}
                    </Suspense>

                    <div className={`flex flex-col space-y-2`}>
                        <div className={`w-full p-3 font-bold ${activePage == "responses" ? "bg-blue-700 text-white border-blue-500" : "bg-white border-gray-300"} border-2 hover:bg-blue-700 hover:text-white transition-all rounded-md cursor-pointer`} onClick={() => setActivePage("responses")}>Survey responses</div>
                        <div className={`w-full p-3 font-bold ${activePage == "analysis" ? "bg-blue-700 text-white border-blue-500" : "bg-white border-gray-300"} border-2 hover:bg-blue-700 hover:text-white transition-all rounded-md cursor-pointer`} onClick={() => setActivePage("analysis")}>Survey analysis</div>
                    </div>
                </div>

                <div>
                    {activePage === "responses" &&
                        <Suspense fallback={<SurveyResponsesTableSkeleton/>}>
                            {props.surveyResponsesTable}
                        </Suspense>
                    }

                    { activePage === "analysis" &&
                        <Suspense fallback={<OpportunityAnalysisTableSkeleton/>}>
                            {props.opportunityAnalysisTable}
                        </Suspense>
                    }
                </div>

            </div>
        </div>
    );

}

