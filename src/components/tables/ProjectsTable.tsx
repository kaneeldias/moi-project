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
import {getProjects} from "@/utils/project-utils";
import ProjectChip from "@/components/chips/ProjectChip";
import TableSkeleton from "@/components/tables/TableSkeleton";

const COLUMNS = [
    {
        name: "ID"
    },
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

export default async function Projects() {
    await waitRandomTime();

    const projects = await getProjects();
    const rows = projects.map((project) => {
        return [
                <Link href={`/projects/${project.id}`}>
                    <div className={`bg-gray-300 rounded-sm p-1 px-2 bg-opacity-50 hover:bg-opacity-100 hover:bg-blue-600 hover:text-white font-bold transition-all text-center w-14`}>
                        {project.id}
                    </div>
                </Link>,

             <ProjectChip name={project.name} sdg={project.sdg}/>,

            <div>{project.opportunityCount}</div>,

            <div>{project.responsesCount}</div>
        ];
    });

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>
            <CardTitle title={`Projects`}/>
            <Table columns={COLUMNS} rows={rows}/>
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