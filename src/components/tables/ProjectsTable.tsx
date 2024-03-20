"use client"

import React, {useEffect, useState} from "react";
import Table from "@/components/tables/Table";
import {CardTitle} from "@/components/CardTitle";
import ProjectChip from "@/components/chips/ProjectChip";
import TableSkeleton from "@/components/tables/TableSkeleton";

const COLUMNS = [
    {
        name: "Project"
    },
    {
        name: "# opportunities"
    },
    {
        name: "# responses"
    }
]

export default function Projects() {
    const [projects, setProjects] = useState<{
        id: number,
        name: string,
        sdg: number,
        opportunityCount: number,
        responsesCount: number
    }[]>([]);
    const [entities, setEntities] = useState<{id: number, name: string}[]>([]);
    const [selectedEntities, setSelectedEntities] = useState<{ id: number, name: string}[]>([]);
    const [rows, setRows] = useState<React.ReactNode[][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            response => response.json()
        ).then(json => {
            setProjects(json);
            setLoading(false);
        });
    }, []);

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
        setRows(projects.map((project, index) => {
            return [
                <ProjectChip key={index} name={project.name} sdg={project.sdg} id={project.id}/>,

                <div key={index}>{project.opportunityCount}</div>,

                <div key={index}>{project.responsesCount}</div>
            ];
        }));
    }, [projects]);

    useEffect(() => {
        setLoading(true);

        const url = selectedEntities.length === 0 ? `/api/projects` : `/api/projects?entities=${selectedEntities.map(entity => entity.id).join(",")}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            response => response.json()
        ).then(json => {
            setProjects(json);
            setLoading(false);
        });
    }, [selectedEntities]);

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>
            <CardTitle title={`Projects`}/>
            { loading ?
                <TableSkeleton/>:
                <Table columns={COLUMNS} rows={rows} entities={entities} selectedEntities={selectedEntities} setSelectedEntities={setSelectedEntities}/>
            }
        </div>

    );
}

export function ProjectsTableSkeleton() {
    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Projects`}/>
            <TableSkeleton/>

        </div>

    );
}