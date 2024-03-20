import {cookies} from "next/headers";
import {gql} from "@apollo/client";
import {runQuery, runQueryWithAccessToken} from "@/utils/graphql-utils";

export function isPersonIdPresent(): boolean {
    const personId = cookies().get("person_id");
    return !!(personId && personId.value && personId.value !== "" && personId.value !== null);
}

export async function getPersonId(accessToken?: string): Promise<number> {
    const personId = cookies().get("person_id");
    if (personId && personId.value && personId.value !== "" && personId.value !== null) {
        return parseInt(personId.value);
    }

    const query = gql`
        {
            currentPerson {
                id
            }
        }
    `

    let queryResponse;
    if (accessToken) {
        queryResponse = await runQueryWithAccessToken(accessToken!, query);
    } else {
        queryResponse = await runQuery(query);
    }

    return queryResponse.currentPerson.id;
}

export async function isAiEbMember(): Promise<boolean> {
    const query = gql`
        {
            currentPerson {
                is_ai_eb_member
            }
        }
    `

    const queryResponse = await runQuery(query);
    return queryResponse.currentPerson.is_ai_eb_member;
}

export async function forceGetPersonId(accessToken?: string): Promise<number> {
    const query = gql`
        {
            currentPerson {
                id
            }
        }
    `

    let queryResponse;
    if (accessToken) {
        queryResponse = await runQueryWithAccessToken(accessToken!, query);
    } else {
        queryResponse = await runQuery(query);
    }

    return queryResponse.currentPerson.id;
}

export async function isAiesecer(): Promise<boolean> {
    const query = gql`
        {
            person(id: "${await getPersonId()}") {
                is_aiesecer
            }
        }
    `

    try {
        const queryResponse = await runQuery(query);
        return queryResponse.person.is_aiesecer;
    } catch (e) {
        return false;
    }
}

export async function getAccessibleEntities(): Promise<number[]> {
    const officeIds = [];

    const query = gql`
        {
            currentPerson {
                current_offices {
                    id
                    suboffices {
                        id
                        suboffices {
                            id
                            suboffices {
                                id
                            }
                        }
                    }
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    for (const office of queryResponse.currentPerson.current_offices) {
        officeIds.push(parseInt(office.id));
        for (const suboffice of office.suboffices) {
            officeIds.push(parseInt(suboffice.id));
            for (const subsuboffice of suboffice.suboffices) {
                officeIds.push(parseInt(subsuboffice.id));
                for (const subsubsuboffice of subsuboffice.suboffices) {
                    officeIds.push(parseInt(subsubsuboffice.id));
                }
            }
        }
    }

    return [... new Set(officeIds)];
}

export async function getAccessibleEntitiesWithNames(): Promise<{id: number, name: string}[]> {
    const officeIds = [];

    const query = gql`
        {
            currentPerson {
                current_offices {
                    id
                    name
                    suboffices {
                        id
                        name
                        suboffices {
                            id
                            name
                            suboffices {
                                id
                                name
                            }
                        }
                    }
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    for (const office of queryResponse.currentPerson.current_offices) {
        officeIds.push({id: parseInt(office.id), name: office.name});
        for (const suboffice of office.suboffices) {
            officeIds.push({id: parseInt(suboffice.id), name: suboffice.name});
            for (const subsuboffice of suboffice.suboffices) {
                officeIds.push({id: parseInt(subsuboffice.id), name: subsuboffice.name});
                for (const subsubsuboffice of subsuboffice.suboffices) {
                    officeIds.push({id: parseInt(subsubsuboffice.id), name: subsubsuboffice.name});
                }
            }
        }
    }

    return officeIds;
}