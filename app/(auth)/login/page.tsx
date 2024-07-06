import { GoogleSignInButton, PrimaryFullButton } from "@/components/buttons";
import { PrimaryInput } from "@/components/inputs";
import { LabelMd, LabelSm } from "@/components/labels";
import Link from "next/link";



export default function LoginPage() {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white border rounded-md shadow-md py-5 px-10 min-w-96">
                    <div className="flex justify-center text-xl p-3 font-sans">
                        <span>Login</span>
                    </div>
                    <form className="flex flex-col gap-4 w-72">
                        <div className="flex flex-col gap-4">
                            <LabelSm>Email</LabelSm>
                            <PrimaryInput type="email" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <LabelSm>Password</LabelSm>
                            <PrimaryInput type="password" />
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