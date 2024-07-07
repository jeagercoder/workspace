

export function PrimaryInput({ type, name }: { type: string, name: string }) {
    return (
        <>
            <input type={type} name={name} className="p-2 outline-none border rounded-md focus-visible:border-blue-500" />
        </>
    )
}
