import Link from "next/link";
import {getAllSurveyResponses, getSurveyResponses} from "@/utils/opportunity-utils";
import React, {Suspense} from "react";
import {formatDateToDateTime} from "@/utils/datetime-utils";
import Table from "@/components/tables/Table";
import {waitRandomTime} from "@/utils/test-utils";
import {CardTitle} from "@/components/CardTitle";
import ApplicationOwnerChipSkeleton from "@/components/chips/ApplicationOwnerChipSkeleton";
import ApplicationOwnerChip from "@/components/chips/ApplicationOwnerChip";
import OpportunityChip from "@/components/chips/OpportunityChip";
import HostEntityChip from "@/components/chips/HostEntityChip";
import HostTableHeader from "@/components/tables/HostTableHeader";

type Props = {
    opportunityId?: number;
}

export default async function SurveyResponsesTable(props: Props) {
    await waitRandomTime();

    const COLUMNS: {
        name: string | React.ReactNode;
    }[] = [
        {
            name: "ID"
        },
        {
            name: "Submitted by"
        },
        {
            name: "Slot"
        },
        {
            name: "Last updated"
        }
    ]

    let surveyResponses: {
        applicationId: number;
        opportunity?: {
            id: number;
            name: string;
            sdg: number;
        }
        slotName: string;
        updatedAt: Date;
    }[] = [];
    if (props.opportunityId) {
        surveyResponses = await getSurveyResponses(props.opportunityId);
    } else {
        surveyResponses = await getAllSurveyResponses();
    }
    const rows = surveyResponses.map((response, index) => {
        return [
            <Link key={index} href={`/questionnaire/${response.applicationId}`}>
                <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-14`}>
                    {response.applicationId}
                </div>
            </Link>,

            <Suspense key={index} fallback={<ApplicationOwnerChipSkeleton/>}>
                <ApplicationOwnerChip applicationId={response.applicationId}/>
            </Suspense>,

            response.slotName,

            formatDateToDateTime(response.updatedAt)
        ];
    });

    if (!props.opportunityId) {
        COLUMNS.splice(2, 0, {name: "Opportunity"});
        COLUMNS.splice(3, 0, {name: <HostTableHeader/>});
        
        rows.forEach((row, index) => {
            const opportunity = surveyResponses[index].opportunity!;
            row.splice(2, 0, <OpportunityChip id={opportunity.id} name={opportunity.name} sdg={opportunity.sdg}/>);
            row.splice(3, 0, <HostEntityChip opportunityId={opportunity.id}/>);
        });
    }

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Survey Responses`}/>
            <Table columns={COLUMNS} rows={rows}/>

        </div>

    );
}
