"use client"

import React, {ReactNode, Suspense, useState} from "react";
import OpportunityBoxSkeleton from "@/components/OpportunityBoxSkeleton";
import SurveyResponsesTableSkeleton from "@/components/tables/SurveyResponsesTableSkeleton";
import OpportunityAnalysisTableSkeleton from "@/components/tables/OpportunityAnalysisTableSkeleton";
import {MenuSelector} from "@/components/MenuSelector";
import OpportunitiesTableSkeleton from "@/components/tables/OpportunitiesTableSkeleton";

type Props = {
    projectId: number;
    projectBox: ReactNode;
    opportunitiesTable: ReactNode;
    surveyResponsesTable: ReactNode;
    responseAnalysisTable: ReactNode;
}

export default function ProjectContent(props: Props) {
    const [activePage, setActivePage] = useState("Opportunities");

    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-col md:flex-row space-y-5 md:space-y-5 md:space-x-5`}>

                <div className={`flex flex-col space-y-10`}>
                    <Suspense fallback={<OpportunityBoxSkeleton/>}>
                        {props.projectBox}
                    </Suspense>

                    <div className={`flex flex-row md:flex-col md:space-y-2 space-x-2 md:space-x-0`}>
                        <MenuSelector setActivePage={setActivePage} currentActivePage={activePage} name={"Opportunities"}/>
                        <MenuSelector setActivePage={setActivePage} currentActivePage={activePage} name={"Survey responses"}/>
                        <MenuSelector setActivePage={setActivePage} currentActivePage={activePage} name={"Response analysis"}/>
                    </div>
                </div>

                <div>
                    {activePage === "Opportunities" &&
                        <Suspense fallback={<OpportunitiesTableSkeleton/>}>
                            {props.opportunitiesTable}
                        </Suspense>
                    }

                    { activePage === "Survey responses" &&
                        <Suspense fallback={<OpportunityAnalysisTableSkeleton/>}>
                            {props.surveyResponsesTable}
                        </Suspense>
                    }

                    { activePage === "Response analysis" &&
                        <Suspense fallback={<OpportunityAnalysisTableSkeleton/>}>
                            {props.responseAnalysisTable}
                        </Suspense>
                    }

                </div>

            </div>
        </div>
    );

}

