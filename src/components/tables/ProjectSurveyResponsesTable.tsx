import Link from "next/link";
import {getSurveyResponses, getSurveyResponsesForProject} from "@/utils/opportunity-utils";
import React, {Suspense} from "react";
import {formatDateToDateTime} from "@/utils/datetime-utils";
import Table from "@/components/tables/Table";
import {waitRandomTime} from "@/utils/test-utils";
import {CardTitle} from "@/components/CardTitle";
import ApplicationOwnerChipSkeleton from "@/components/chips/ApplicationOwnerChipSkeleton";
import ApplicationOwnerChip from "@/components/chips/ApplicationOwnerChip";
import HostEntityChip from "@/components/chips/HostEntityChip";
import OpportunityChip from "@/components/chips/OpportunityChip";

const COLUMNS = [
    {
        name: "ID"
    },
    {
        name: "Submitted by"
    },
    {
        name: "Opportunity"
    },
    {
        name: "Host"
    },
    {
        name: "Slot"
    },
    {
        name: "Last updated"
    }
]

type Props = {
    projectId: number;
}

export default async function ProjectSurveyResponsesTable(props: Props) {
    await waitRandomTime();

    const surveyResponses = await getSurveyResponsesForProject(props.projectId);
    const rows = surveyResponses.map((response) => {
        return [
            <Link href={`/questionnaire/${response.applicationId}`}>
                <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-14`}>
                    {response.applicationId}
                </div>
            </Link>,

            <Suspense fallback={<ApplicationOwnerChipSkeleton/>}>
                <ApplicationOwnerChip applicationId={response.applicationId}/>
            </Suspense>,

            <OpportunityChip id={response.opportunity.id} name={response.opportunity.name} sdg={response.opportunity.project.sdg}/>,

            <Suspense fallback={<ApplicationOwnerChipSkeleton/>}>
                <HostEntityChip opportunityId={response.opportunity.id}/>
            </Suspense>,

            response.slot.name,

            formatDateToDateTime(response.updatedAt)
        ];
    });

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Survey Responses`}/>
            <Table columns={COLUMNS} rows={rows}/>

        </div>

    );
}