import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";
import {ReactNode} from "react";
import {isAiesecer} from "@/utils/person-utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact with AIESEC",
  description: "Measurement of Impact",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-gradient-to-bl from-gray-100 to-gray-200`}>
        <div className={`flex flex-col h-full w-full min-h-screen min-w-screen`}>
            <Header/>
            <div className={`flex flex-row flex-grow text-gray-800 md:w-full`}>
                <SideBar isAiesecer={await isAiesecer()}/>
                <div className={`flex flex-row md:flex-grow justify-center md:ml-16 p-5`}>
                    {children}
                </div>
            </div>
            <div className={`flex text-gray-900 text-sm font-light justify-center p-3`}>
                <div>
                    developed by AIESEC International with 💙
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
