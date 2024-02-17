import Heading from "@/components/Heading";
import ProjectBox from "@/components/ProjectBox";
import { gql } from "@apollo/client";
import {runQuery} from "@/utils/graphql-utils";
import {mapProject} from "@/mappers/project-mappers";
import {Project} from "@/types/project-types";
import {getPersonId} from "@/utils/person-utils";

export default async function ProjectSelector() {
    const projects = await getProjects();

    return (
        <div className={`flex flex-col pt-5 w-full space-y-10 max-w-md`}>
            { projects.length > 0 ? <>
                <Heading>Select your project</Heading>
                <div className={`flex flex-col space-y-5 w-full`}>
                    { projects.map((project) => <div key={`${project.id}`}><ProjectBox project={project}/></div> )}
                </div>
            </> :
                <div className={`flex flex-col space-y-2`}>
                    <div className={`text-lg text-white font-bold`}>
                        You have not yet had a Global Volunteer experience with AIESEC ☹️
                    </div>
                    <div className={`text-sm text-white font-light`}>
                        Please come back again after you have started your experience 😊
                    </div>
                </div>
            }
        </div>
    );
}

async function getProjects(): Promise<Project[]> {
    // statuses: ["realized", "finished", "completed"]
    const query = gql`
        {
            personApplications(
                id: "${await getPersonId()}"
                filters: {
                    programmes: [7],
                    for: "people"
                }
                pagination: {
                    per_page: 100,
                    page: 1
                }
            ) {
                data {
                    id
                    opportunity {
                        title
                        location
                        sdg_info {
                            sdg_target {
                                goal_index
                            }
                        }
                    }
                    slot {
                        start_date
                        end_date
                    }
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    const personApplications = queryResponse.personApplications.data;

    const projects: Project[] = [];
    for (const application of personApplications) {
        const project = mapProject(application);
        projects.push(project);
    }

    return projects;
}