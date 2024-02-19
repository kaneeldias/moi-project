'use client'

import { useEffect } from 'react'
import Heading from "@/components/Heading";
import {usePathname} from "next/navigation";
import {CardTitle} from "@/components/CardTitle";

export default function Error({error, reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={`space-y-10 md:max-w-3xl justify-center`}>
            <div className={`flex flex-col space-y-2`}>
                <Heading>Something went wrong ☹️</Heading>
                <div className={`text-sm text-gray-800 font-light`}>
                  <p>Try refreshing the page, or contact support if the problem persists.</p>
                </div>
            </div>

            <div className={`bg-white text-xs p-5 rounded-md mt-8 text-red-600 space-y-5 shadow-md`}>
                <CardTitle title={"Error"} topOffset={5} color={"red"}/>
                <div>
                    <div className={`font-bold text-sm text-gray-700`}>Error message:</div>
                    <div className={`font-mono overflow-hidden`}>{error.message}</div>
                </div>

                <div>
                    <div className={`font-bold text-sm text-gray-700`}>Page URL:</div>
                    <div className={`font-mono`}>{process.env.NEXT_PUBLIC_BASE_URL}{usePathname()}</div>
                </div>

                <div>
                    <div className={`font-bold text-sm text-gray-700`}>Stacktrace:</div>
                    <div className={`font-mono`}>{error.stack}</div>
                </div>
            </div>
        </div>
    )
}
