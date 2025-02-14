
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

import Navbar from "@/components/navbar/navbar";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import Sidebar from "@/components/sidebar/sidebar";



export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(AuthOptions)
    if (!session) {
        redirect(`/login`)
    }
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </>
    );
}
