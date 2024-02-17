import React from "react";
import OpportunityContent from "@/app/opportunities/[id]/content";
import OpportunityBox from "@/components/OpportunityBox";
import OpportunityAnalysisTable from "@/components/tables/OpportunityAnalysisTable";
import SurveyResponsesTable from "@/components/tables/SurveyResponsesTable";
import SlotBox from "@/components/SlotBox";
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

