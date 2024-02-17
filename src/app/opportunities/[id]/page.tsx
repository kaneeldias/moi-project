import React, {Suspense} from "react";
import OpportunityBox from "@/components/OpportunityBox";
import OpportunityBoxSkeleton from "@/components/OpportunityBoxSkeleton";
import SurveyResponsesTable from "@/components/tables/SurveyResponsesTable";
import OpportunityAnalysisTable from "@/components/tables/OpportunityAnalysisTable";
import SurveyResponsesTableSkeleton from "@/components/tables/SurveyResponsesTableSkeleton";
import OpportunityAnalysisTableSkeleton from "@/components/tables/OpportunityAnalysisTableSkeleton";

type Props = {
    params: {
        id: string
    }
}

export default async function Opportunity(prop: Props) {
    const opportunityId = parseInt(prop.params.id);

    return (
        <div className={`flex flex-col w-full items-center`}>

            <div className={`flex flex-col space-y-5`}>

                <Suspense fallback={<OpportunityBoxSkeleton/>}>
                    <OpportunityBox opportunityId={opportunityId}/>
                </Suspense>

                <Suspense fallback={<SurveyResponsesTableSkeleton/>}>
                    <SurveyResponsesTable opportunityId={opportunityId}/>
                </Suspense>

                <Suspense fallback={<OpportunityAnalysisTableSkeleton/>}>
                    <OpportunityAnalysisTable opportunityId={opportunityId}/>
                </Suspense>

            </div>
        </div>
    );

}

