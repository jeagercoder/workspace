
import { getServerSession } from "next-auth/next"

import Navbar from "@/components/navbar/navbar";

import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation'



export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(AuthOptions)
    if (!session) {
        redirect("/login")
    }
    return (
        <>
          
                <Navbar />
                {children}
         
        </>
    );
}
