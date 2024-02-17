import {ApolloClient, DocumentNode, InMemoryCache, OperationVariables, TypedDocumentNode} from "@apollo/client";
import {getAccessToken} from "@/app/auth/auth-utils";

export async function runQuery(query: DocumentNode | TypedDocumentNode<any, OperationVariables>, variables?: any) {
    const client = new ApolloClient({
        uri: process.env.GIS_API_ENDPOINT,
        cache: new InMemoryCache(),
        headers: {
            authorization: getAccessToken(),
        },
    });

    const {data, errors} = await client.query({
        query, variables
    });

    if (errors) {
        throw new Error(errors.toString());
    }

    return data;
}

export async function runQueryOnClient(query: DocumentNode | TypedDocumentNode<any, OperationVariables>, variables?: any) {
    const client = new ApolloClient({
        uri: process.env.GIS_API_ENDPOINT,
        cache: new InMemoryCache(),
        headers: {
            authorization: localStorage.getItem("access_token")!,
        },
    });

    const {data, errors} = await client.query({
        query, variables
    });

    if (errors) {
        throw new Error(errors.toString());
    }

    return data;
}


export async function runQueryWithAccessToken(accessToken: string,
                                              query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
                                              variables?: any) {
    const client = new ApolloClient({
        uri: process.env.GIS_API_ENDPOINT,
        cache: new InMemoryCache(),
        headers: {
            authorization: accessToken,
        },
    });

    const {data, errors} = await client.query({
        query, variables
    });

    if (errors) {
        throw new Error(errors.toString());
    }

    return data;
}
