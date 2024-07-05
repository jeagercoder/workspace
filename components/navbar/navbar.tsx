'use client'

import Image from "next/image";
import { useState } from "react";


import { SquareIcon, BellIcon } from "../icons";


export default function Navbar() {
    const [profileNav, setProfileNav] = useState(false)

    function handleProfile() {
        setProfileNav(!profileNav)
    }
    return (
        <>
            <nav className="fixed w-full flex justify-between items-center bg-white border px-2">
                <ul className="flex items-center">
                    <li className="flex p-2">
                        <SquareIcon className="size-6 stroke-2 stroke-blue-500" />
                    </li>
                </ul>
                <ul className="flex items-center gap-10">
                    <li className="flex-p2">
                        <BellIcon className="size-6 stroke-2 stroke-blue-500" />
                    </li>
                    <li className="flex p-2">
                        <div>
                            <button onClick={handleProfile}>
                                <Image src="/profile.webp" alt="nav-profile" width={35} height={35} className="rounded-full" />
                            </button>
                            {profileNav &&
                                <ul className="absolute flex flex-col bg-white p-2 right-3 border">
                                    <li>Profile</li>
                                    <li>Settings</li>
                                    <li>Logout</li>
                                </ul>}
                        </div>

                    </li>
                </ul>
            </nav>
        </>
    )
}