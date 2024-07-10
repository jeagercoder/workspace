

export function PrimaryInput({ type, name }: { type: string, name: string }) {
    return (
        <>
            <input type={type}
                name={name}
                className="p-2 outline-none border rounded-md focus-visible:border-blue-500" />
        </>
    )
}

export function PrimaryTextArea(
    { name, rows, cols }: {
        name: string,
        rows: number,
        cols: number
    }) {
    return (
        <>
            <textarea className="p-2 outline-none border rounded-md focus-visible:border-blue-500 resize-none"
                name={name}
                rows={rows}
                cols={cols}
            />
        </>
    )
}

export function ColorInput({ name }: { name: string }) {
    return (
        <>
            <input type="color"
                name={name} />
        </>
    )
}
