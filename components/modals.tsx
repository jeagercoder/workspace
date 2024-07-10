
import React from "react"
import { useRef } from "react"

import { XIcon } from "./icons"



export default function Modal(
    { modalOpen, handleClose, children }: {
        modalOpen: boolean,
        handleClose: () => void,
        children: React.ReactNode
    }) {
        const refModal = useRef(null)
        
        function handleClickOutside(event: any) {
            if (refModal.current && !refModal.current.contains(event.target)) {
                handleClose()
            }
        }

        if (!modalOpen) return null
    return (
        <>
            <div className="fixed flex inset-0 justify-center items-center bg-gray-800 bg-opacity-75 z-10" onClick={(event) => handleClickOutside(event)}>
                <div className="flex flex-col bg-white border rounded-md p-5 min-w-60 min-h-60" ref={refModal}>
                    <div className="flex justify-end items-center">
                        <button onClick={handleClose}><XIcon className="size-6 stroke-2" /></button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}