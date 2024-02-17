import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getAccessToken, isAccessTokenPresent, isLoggedIn, refreshAccessToken} from "@/app/auth/auth-utils";
import {GetTokenResponse} from "@/app/auth/auth-types";
import {getPersonId, isPersonIdPresent} from "@/utils/person-utils";

export async function middleware(request: NextRequest) {
    const lastUrl = request.url;

    if (!isLoggedIn()) {
        const url = new URL(`${process.env.GIS_AUTH_ENDPOINT}/oauth/authorize`);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("client_id", process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!);
        url.searchParams.set("redirect_uri", process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI!);
        const response = NextResponse.redirect(url.toString());

        response.cookies.set("redirect_uri", lastUrl, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        return response;
    }

    const response = NextResponse.next();
    if (!isAccessTokenPresent()) {
        const refreshTokenResponse: GetTokenResponse = await refreshAccessToken();
        response.cookies.set("access_token", refreshTokenResponse.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: refreshTokenResponse.expires_in
        });

        response.cookies.set("refresh_token", refreshTokenResponse.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
    }

    if (!(isPersonIdPresent())) {
        const personId = await getPersonId(getAccessToken());
        response.cookies.set("person_id", personId.toString(), {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - auth (authentication routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|auth|_next/static|_next/image|favicon.ico).*)',
    ],
}