'use client'

import Link from "next/link";
import { ArrowCicleLeft, BellIcon, ChatIcon, FolderIcon, RectangleStackIcon, SettingIcon, UserGroupIcon } from "../icons";
import { useState } from "react";




export default function Sidebar() {
    const [active, setActice] = useState(true)

    function hanldeSidebar() {
        setActice(!active)
    }


    return (
        <>
            <div className={`flex flex-col h-screen min-w-72 bg-white border pt-20 px-5 duration-300 ${!active && '-ml-[17rem]'}`}>
                <div className="flex justify-end -mr-8 z-10">
                    <button onClick={() => hanldeSidebar()}><ArrowCicleLeft className="size-6 stroke-2 stroke-blue-500 rounded-full" /></button>
                </div>
                <ul className="flex flex-col py-2">
                    <li className="flex items-center">
                        <Link href="/project" className="flex items-center text-sm py-1 h-full w-full text-gray-500 rounded-md px-2 hover:text-gray-700 hover:bg-gray-100">
                            <FolderIcon className="size-4 mr-3" />
                            Project
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link href="/project" className="flex items-center text-sm py-1 h-full w-full text-gray-500 rounded-md px-2 hover:text-gray-700 hover:bg-gray-100">
                            <RectangleStackIcon className="size-4 mr-3" />
                            My task
                        </Link>
                    </li>
                </ul>

                <ul className="flex flex-col py-2">
                    <li className="flex items-center">
                        <Link href="/project" className="flex items-center text-sm py-1 h-full w-full text-gray-500 rounded-md px-2 hover:text-gray-700 hover:bg-gray-100">
                            <ChatIcon className="size-4 mr-3" />
                            Message
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link href="/project" className="flex items-center text-sm py-1 h-full w-full text-gray-500 rounded-md px-2 hover:text-gray-700 hover:bg-gray-100">
                            <BellIcon className="size-4 mr-3" />
                            Notification
                        </Link>
                    </li>
                </ul>

                <ul className="flex flex-col py-2">
                    <li className="flex items-center">
                        <Link href="/project" className="flex items-center text-sm py-1 h-full w-full text-gray-500 rounded-md px-2 hover:text-gray-700 hover:bg-gray-100">
                            <UserGroupIcon className="size-4 mr-3" />
                            Member
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link href="/project" className="flex items-center text-sm py-1 h-full w-full text-gray-500 rounded-md px-2 hover:text-gray-700 hover:bg-gray-100">
                            <SettingIcon className="size-4 mr-3" />
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}