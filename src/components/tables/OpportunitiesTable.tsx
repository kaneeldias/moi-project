"use client"

import Link from "next/link";
import React, {Suspense, useEffect, useState} from "react";
import Table from "@/components/tables/Table";
import {CardTitle} from "@/components/CardTitle";
import OpportunityChip from "@/components/chips/OpportunityChip";
import HostEntityChipSkeleton from "@/components/chips/HostEntityChipSkeleton";
import HostTableHeader from "@/components/tables/HostTableHeader";
import TableSkeleton from "@/components/tables/TableSkeleton";
import HostEntityChip from "@/components/chips/HostEntityChip";
import LocationText from "@/components/LocationText";

const COLUMNS = [
    {
        name: "ID"
    },
    {
        name: "Opportunity"
    },
    {
        name: <HostTableHeader/>
    },
    {
        name: "Location"
    },
    {
        name: "# responses"
    }
]

type Props = {
    projectId?: number
}

export default function OpportunitiesTable(props: Props) {
    const [opportunities, setOpportunities] = useState<{
        id: number,
        name: string,
        responsesCount: number,
        project: {
            sdg: number
        }
    }[]>([]);
    const [entities, setEntities] = useState<{id: number, name: string}[]>([]);
    const [selectedEntities, setSelectedEntities] = useState<{ id: number, name: string}[]>([]);
    const [rows, setRows] = useState<React.ReactNode[][]>([]);
    const [loading, setLoading] = useState(true);

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
        setRows(opportunities.map((opportunity, index) => {
            return [
                <Link key={index} href={`/opportunities/${opportunity.id}`}>
                    <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-20`}>
                        {opportunity.id}
                    </div>
                </Link>,

                <OpportunityChip key={index} id={opportunity.id} name={opportunity.name} sdg={opportunity.project.sdg}/>,

                <HostEntityChip key={index} opportunityId={opportunity.id}/>,

                <LocationText key={index} opportunityId={opportunity.id}/>,

                <div key={index}>{opportunity.responsesCount}</div>
            ];
        }));
    }, [opportunities]);

    useEffect(() => {
        setLoading(true);
        let url = props.projectId ? `/api/projects/${props.projectId}/opportunities` : `/api/opportunities`;
        url = selectedEntities.length === 0 ? url : `${url}?entities=${selectedEntities.map(entity => entity.id).join(",")}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            response => response.json()
        ).then(json => {
            setOpportunities(json);
            setLoading(false);
        });
    }, [selectedEntities]);


    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Opportunities`}/>
            { loading ?
                <TableSkeleton/>:
                <Table columns={COLUMNS} rows={rows} entities={entities} selectedEntities={selectedEntities} setSelectedEntities={setSelectedEntities}/>
            }

        </div>

    );
}
