import React from "react";
import ProjectBox from "@/components/ProjectBox";
import ProjectContent from "@/app/projects/[id]/content";
import OpportunitiesTable from "@/components/tables/OpportunitiesTable";
import ProjectSurveyResponsesTable from "@/components/tables/ProjectSurveyResponsesTable";
import ProjectAnalysisTable from "@/components/tables/ProjectAnalysisTable";

type Props = {
    params: {
        id: string
    }
}

export default function Project(prop: Props) {
    const projectId = parseInt(prop.params.id);

    const projectBox = <ProjectBox projectId={projectId}/>
    const opportunitiesTable = <OpportunitiesTable projectId={projectId}/>
    const surveyResponsesTable = <ProjectSurveyResponsesTable projectId={projectId}/>
    const responseAnalysisTable = <ProjectAnalysisTable projectId={projectId}/>

    return (
        <ProjectContent projectId={projectId}
                        projectBox={projectBox}
                        opportunitiesTable={opportunitiesTable}
                        surveyResponsesTable={surveyResponsesTable}
                        responseAnalysisTable={responseAnalysisTable}
        />
    );

}

