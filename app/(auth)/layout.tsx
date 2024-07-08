

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { AuthOptions } from "../api/auth/[...nextauth]/options";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(AuthOptions)
    if (session) {
        redirect('/')
    }
    return (
        <>
            {children}
        </>
    );
}