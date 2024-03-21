"use client"

import Link from "next/link";
import {getSurveyResponsesForProject} from "@/utils/opportunity-utils";
import React, {Suspense, useEffect} from "react";
import {formatDateToDateTime} from "@/utils/datetime-utils";
import Table from "@/components/tables/Table";
import {waitRandomTime} from "@/utils/test-utils";
import {CardTitle} from "@/components/CardTitle";
import ApplicationOwnerChipSkeleton from "@/components/chips/ApplicationOwnerChipSkeleton";
import ApplicationOwnerChip from "@/components/chips/ApplicationOwnerChip";
import HostEntityChip from "@/components/chips/HostEntityChip";
import OpportunityChip from "@/components/chips/OpportunityChip";
import HostTableHeader from "@/components/tables/HostTableHeader";
import TableSkeleton from "@/components/tables/TableSkeleton";

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
        name: <HostTableHeader/>
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

export default function ProjectSurveyResponsesTable(props: Props) {
    const [loading, setLoading] = React.useState(true);
    const [surveyResponses, setSurveyResponses] = React.useState<any[]>([]);
    const [entities, setEntities] = React.useState<{id: number, name: string}[]>([]);
    const [rows, setRows] = React.useState<React.ReactNode[][]>([]);
    const [selectedEntities, setSelectedEntities] = React.useState<{ id: number, name: string}[]>([]);

    useEffect(() => {
        fetch(`/api/entities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            response => response.json()
        ).then(json => {
            setEntities(json);
        });
    }, []);

    useEffect(() => {
        setRows(surveyResponses.map((response, index) => {
            return [
                <Link key={index} href={`/questionnaire/${response.applicationId}`}>
                    <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-20`}>
                        {response.applicationId}
                    </div>
                </Link>,

                <ApplicationOwnerChip applicationId={response.applicationId}/>,

                <OpportunityChip key={index} id={response.opportunity.id} name={response.opportunity.name} sdg={response.opportunity.project.sdg}/>,

                <HostEntityChip opportunityId={response.opportunity.id}/>,

                response.slot.name,

                formatDateToDateTime(response.updatedAt)
            ];
        }));
    }, [surveyResponses]);

    useEffect(() => {
        setLoading(true);

        let url = `/api/projects/${props.projectId}/survey-responses`;
        url = selectedEntities.length === 0 ? url : `${url}?entities=${selectedEntities.map(entity => entity.id).join(",")}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            response => response.json()
        ).then(json => {
            setSurveyResponses(json);
        }).finally(() => {
            setLoading(false);
        });

    }, [selectedEntities]);


    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Survey Responses`}/>
            { loading ?
                <TableSkeleton/>:
                <Table columns={COLUMNS} rows={rows} entities={entities} selectedEntities={selectedEntities} setSelectedEntities={setSelectedEntities} />
            }
        </div>

    );
}
