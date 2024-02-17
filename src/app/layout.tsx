import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIESEC | MOI",
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
                    <div className={`flex flex-grow p-5 text-gray-800 justify-center`}>
                      {children}
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
