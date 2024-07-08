import Link from "next/link";




export default function Sidebar() {
    return(
        <>
            <div className="flex flex-col h-full w-72 bg-white border pt-20 px-10">
                <ul>
                    <li><Link href="/project">Project</Link></li>
                </ul>
                <ul>
                    <li><Link href="/">Project</Link></li>
                </ul>
                <ul>
                    <li><Link href="/">Project</Link></li>
                </ul>
            </div>
        </>
    )
}