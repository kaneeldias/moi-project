import Link from "next/link";
import {getLocation, getOpportunities, getSurveyResponses} from "@/utils/opportunity-utils";
import React, {Suspense} from "react";
import Table from "@/components/tables/Table";
import {waitRandomTime} from "@/utils/test-utils";
import {CardTitle} from "@/components/CardTitle";
import LocationText from "@/components/LocationText";
import OpportunityChip from "@/components/chips/OpportunityChip";
import HostEntityChipSkeleton from "@/components/chips/HostEntityChipSkeleton";
import HostEntityChip from "@/components/chips/HostEntityChip";

const COLUMNS = [
    {
        name: "ID"
    },
    {
        name: "Project"
    },
    {
        name: "Host"
    },
    {
        name: "Location"
    },
    {
        name: "# responses"
    }
]

export default async function OpportunitiesTable() {
    await waitRandomTime();

    const opportunities = await getOpportunities();
    const rows = opportunities.map((opportunity) => {
        return [
                <Link href={`/opportunities/${opportunity.id}`}>
                    <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-14`}>
                        {opportunity.id}
                    </div>
                </Link>,

        <OpportunityChip id={opportunity.id} name={opportunity.name} sdg={opportunity.project.sdg}/>,

        <Suspense fallback={<HostEntityChipSkeleton/>}>
                <HostEntityChip opportunityId={opportunity.id}/>
            </Suspense>,

            <Suspense fallback={<div className={`flex h-2.5 flex-row space-x-1 items-center bg-gray-400 rounded-full dark:bg-gray p-1 px-2 w-28`}/>}>
                <LocationText opportunityId={opportunity.id}/>
            </Suspense>,

            <div>{opportunity.responsesCount}</div>
        ];
    });

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Opportunities`}/>
            <Table columns={COLUMNS} rows={rows}/>

        </div>

    );
}
