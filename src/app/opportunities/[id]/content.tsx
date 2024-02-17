"use client"

import React, {ReactNode, Suspense, useState} from "react";
import OpportunityBoxSkeleton from "@/components/OpportunityBoxSkeleton";
import SurveyResponsesTableSkeleton from "@/components/tables/SurveyResponsesTableSkeleton";
import OpportunityAnalysisTableSkeleton from "@/components/tables/OpportunityAnalysisTableSkeleton";
import {MenuSelector} from "@/components/MenuSelector";

type Props = {
    opportunityId: number;
    opportunityBox: ReactNode;
    accessToken: string;
    opportunityAnalysisTable: ReactNode;
    surveyResponsesTable: ReactNode;
}

export default function OpportunityContent(props: Props) {
    const [activePage, setActivePage] = useState("Survey analysis");

    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-row space-y-5 md:space-y-5 md:space-x-5`}>

                <div className={`flex flex-col space-y-10`}>
                    <Suspense fallback={<OpportunityBoxSkeleton/>}>
                        {props.opportunityBox}
                    </Suspense>

                    <div className={`flex flex-col space-y-2`}>
                        <MenuSelector setActivePage={setActivePage} currentActivePage={activePage} name={"Survey analysis"}/>
                        <MenuSelector setActivePage={setActivePage} currentActivePage={activePage} name={"Survey responses"}/>
                    </div>
                </div>

                <div>
                    {activePage === "Survey responses" &&
                        <Suspense fallback={<SurveyResponsesTableSkeleton/>}>
                            {props.surveyResponsesTable}
                        </Suspense>
                    }

                    { activePage === "Survey analysis" &&
                        <Suspense fallback={<OpportunityAnalysisTableSkeleton/>}>
                            {props.opportunityAnalysisTable}
                        </Suspense>
                    }
                </div>

            </div>
        </div>
    );

}

