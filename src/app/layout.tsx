import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact with AIESEC",
  description: "Measurement of Impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className={`flex flex-col h-full w-full min-h-screen min-w-screen bg-gradient-to-bl from-gray-100 to-gray-200`}>
                    <Header/>
                    <div className={`flex flex-row flex-grow text-gray-800 justify-start`}>
                        <SideBar/>
                        <div className={`flex flex-row md:w-full justify-center p-5`}>
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
