

export function PrimaryInput({ type }: { type: string }) {
    return (
        <>
            <input type={type} className="p-2 outline-none border rounded-md focus-visible:border-blue-500" />
        </>
    )
}
