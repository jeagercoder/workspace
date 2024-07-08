'use client'

import { GoogleSignInButton, PrimaryFullButton } from "@/components/buttons";
import { PrimaryInput } from "@/components/inputs";
import { LabelSm } from "@/components/labels";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";



export default function LoginPage() {
    const router = useRouter()

    async function handleLogin(event: React.SyntheticEvent) {
        event.preventDefault()
        const target = event.target as typeof event.target & {email: {value: string}, password: {value: string}}
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: target.email.value,
                password: target.password.value,
                callbackUrl: "/"
            })
            if (!response?.error) {
                const callbackUrl = response?.url ? response.url : "/"
                console.log(callbackUrl)
                router.push(callbackUrl)
            } else {
                alert("Salah bos...")
            }
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white border rounded-md shadow-md py-5 px-10 min-w-96">
                    <div className="flex justify-center text-xl p-3 font-sans">
                        <span>Login</span>
                    </div>
                    <form className="flex flex-col gap-4 w-72" onSubmit={(e) => handleLogin(e)}>
                        <div className="flex flex-col gap-4">
                            <LabelSm>Email</LabelSm>
                            <PrimaryInput type="email" name="email" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <LabelSm>Password</LabelSm>
                            <PrimaryInput type="password" name="password" />
                        </div>
                        <div className="flex flex-col py-3">
                            <PrimaryFullButton>Login</PrimaryFullButton>
                            <div className="flex justify-end">
                                <Link href="/" className="text-sm text-blue-500 py-2 underline">Forgot password</Link>
                            </div>
                        </div>
                        <div className="flex justify-center pb-3">
                            <GoogleSignInButton />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}