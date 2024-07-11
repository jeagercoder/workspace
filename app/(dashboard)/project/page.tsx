'use client'


import { PrimaryButton } from "@/components/buttons"
import { ArchiveBoxArrowIcon, FolderPlusIcon, SearchIcon } from "@/components/icons"
import { ColorInput, CustomInput, PrimaryInput, PrimaryTextArea } from "@/components/inputs"
import { LabelSm } from "@/components/labels"
import Modal from "@/components/modals"
import { useState } from "react"

export default function ProjectPage() {
    const [modalOpen, setModalOpen] = useState(false)

    function handleClose() {
        setModalOpen(!modalOpen)
    }

    return (
        <>
            <Modal modalOpen={modalOpen} handleClose={handleClose}>
                <div className="flex flex-col text-gray-600">
                    <div className="mb-10">
                        <span className="text-md font-sans">Create new project.</span>
                    </div>
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1 w-96">
                            <LabelSm>Name</LabelSm>
                            <PrimaryInput type="text" name="name" />
                        </div>
                        <div className="flex flex-col gap-1 w-96">
                            <LabelSm>Description</LabelSm>
                            <PrimaryTextArea name="description" rows={2} cols={2} />
                        </div>
                        <div className="flex items-center gap-5 w-96">
                            <LabelSm>Background color</LabelSm>
                            <ColorInput name="color" />
                        </div>
                        <div className="flex justify-end gap-1 w-96">
                            <PrimaryButton>Create</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="flex flex-col w-full pt-14">
                <div className="flex bg-white w-full px-5 py-2 justify-between items-center border">
                    <div className="flex">
                        <button onClick={() => setModalOpen(true)}><FolderPlusIcon className="size-8 stroke-1 stroke-gray-700" /></button>
                        <div className="flex items-center border p-1 text-sm border-gray-300 rounded-md ml-5 text-gray-500">
                            <SearchIcon className="size-4 stroke-2 stroke-gray-700" />
                            <CustomInput type="text"
                                name="search"
                                className="p-1 outline-none" />
                        </div>
                    </div>
                    <div className="flex">
                        <button><ArchiveBoxArrowIcon className="size-8 stroke-1 stroke-orange-500"/></button>
                    </div>
                </div>
                <h1>Project page</h1>
            </div>
        </>
    )
}