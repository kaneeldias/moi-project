import {Opportunity} from "@/types/project-types";
import {gql} from "@apollo/client";
import {runQuery} from "@/utils/graphql-utils";

export async function getOpportunityAndProjectFromApplication(applicationId: number): Promise<{
    opportunityId: number,
    name: string
    slotId: number,
    slotName: string
    project: {
        id: number,
        name: string,
        sdg:number
    }
}> {
    const query = gql`
        {
            getApplication(id: "${applicationId}") {
                opportunity {
                    id
                    title
                    project {
                        id
                        title
                        sdg_info {
                            sdg_target {
                                goal_index
                            }   
                        }
                    }
                }
                slot {
                    id
                    title
                }
            }
        }

    `

    const queryResponse = await runQuery(query);
    return {
        opportunityId: parseInt(queryResponse.getApplication.opportunity.id),
        name: queryResponse.getApplication.opportunity.title,
        slotId: parseInt(queryResponse.getApplication.slot.id),
        slotName: queryResponse.getApplication.slot.title,
        project: {
            id: parseInt(queryResponse.getApplication.opportunity.project.id),
            name: queryResponse.getApplication.opportunity.project.title,
            sdg: parseInt(queryResponse.getApplication.opportunity.project.sdg_info.sdg_target.goal_index)
        }
    }
}