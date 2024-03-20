import {gql} from "@apollo/client";
import {runQuery} from "@/utils/graphql-utils";

export async function getChildLCs(entities: number[]): Promise<number[]> {
    const LCs = [];

    for (const entity of entities) {
        const children = await getLCs(entity);
        LCs.push(...children);
    }

    return LCs;
}


async function getLCs(entity: number): Promise<number[]> {
    const query = gql`
    {
        committee(id: "${entity}") {
            id
            tag
            suboffices {
                id
                tag
                suboffices {
                    id
                    tag
                    suboffices {
                        id
                        tag
                    }
                }
            }
        }
    }
    `

    const queryResponse = await runQuery(query);
    return getSubOffices(queryResponse.committee);
}

function getSubOffices(committee: any): number[] {
    if (committee.tag === "LC") {
        return [parseInt(committee.id)];
    }

    const children = committee.suboffices;
    const LCs = [];
    for(const child of children) {
        const childLCs = getSubOffices(child);
        LCs.push(...childLCs);
    }

    return LCs;
}