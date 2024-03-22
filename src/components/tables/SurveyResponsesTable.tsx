"use client";

import Link from "next/link";
import React, {Suspense, useEffect, useState} from "react";
import {formatDateToDateTime} from "@/utils/datetime-utils";
import Table from "@/components/tables/Table";
import {waitRandomTime} from "@/utils/test-utils";
import {CardTitle} from "@/components/CardTitle";
import ApplicationOwnerChipSkeleton from "@/components/chips/ApplicationOwnerChipSkeleton";
import ApplicationOwnerChip from "@/components/chips/ApplicationOwnerChip";
import OpportunityChip from "@/components/chips/OpportunityChip";
import HostEntityChip from "@/components/chips/HostEntityChip";
import HostTableHeader from "@/components/tables/HostTableHeader";
import TableSkeleton from "@/components/tables/TableSkeleton";

type Props = {
    opportunityId?: number;
}

export default function SurveyResponsesTable(props: Props) {
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

    const [surveyResponses, setSurveyResponses] = React.useState<{
        applicationId: number;
        opportunity?: {
            id: number;
            name: string;
            sdg: number;
        }
        slotName: string;
        updatedAt: Date;
    }[]>([]);
    const [entities, setEntities] = useState<{id: number, name: string}[]>([]);
    const [selectedEntities, setSelectedEntities] = useState<{ id: number, name: string}[]>([]);
    const [rows, setRows] = useState<React.ReactNode[][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let url = props.opportunityId ? `/api/opportunities/${props.opportunityId}/survey-responses` : `/api/survey-responses`;
        const filterType = props.opportunityId ? "slots" : "entities";
        url = selectedEntities.length === 0 ? url : `${url}?${filterType}=${selectedEntities.map(entity => entity.id).join(",")}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            response => response.json()
        ).then(json => {
            setSurveyResponses(json);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedEntities]);

    useEffect(() => {
        const url = props.opportunityId ? `/api/opportunities/${props.opportunityId}/slots` : `/api/entities`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            response => response.json()
        ).then(json => {
            setEntities(json);
        });
    }, [selectedEntities]);

    useEffect(() => {
        setRows(surveyResponses.map((response, index) => {
            return [
                <Link key={index} href={`/questionnaire/${response.applicationId}`}>
                    <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-20`}>
                        {response.applicationId}
                    </div>
                </Link>,

                <ApplicationOwnerChip key={index} applicationId={response.applicationId}/>,

                response.slotName,

                formatDateToDateTime(response.updatedAt)
            ];
        }));
    }, [surveyResponses]);


    if (!props.opportunityId) {
        COLUMNS.splice(2, 0, {name: "Opportunity"});
        COLUMNS.splice(3, 0, {name: <HostTableHeader/>});
        
        rows.forEach((row, index) => {
            const surveyResponse = surveyResponses[index];
            if (!surveyResponse) return;
            const opportunity = surveyResponse.opportunity!;
            row.splice(2, 0, <OpportunityChip id={opportunity.id} name={opportunity.name} sdg={opportunity.sdg}/>);
            row.splice(3, 0, <HostEntityChip opportunityId={opportunity.id}/>);
        });
    }

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Survey Responses`}/>
            { loading ?
                <TableSkeleton/> :
                <Table columns={COLUMNS} rows={rows} entities={entities} selectedEntities={selectedEntities} setSelectedEntities={setSelectedEntities}/>
            }
        </div>

    );
}
