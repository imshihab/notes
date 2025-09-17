import React, { useState, memo } from "react"
import toast from "../../Helper/toast"
import FolderModal from "./FolderModal"

const NewFolderButton = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCreateFolder = async ({ name, icon, color }) => {
        const result = await window.folders.create({ name, icon, color })

        if (result.status === "success") {
            toast(result.message)
            setIsModalOpen(false)
        }

        if (result.status === "fail") {
            toast(result.message, "error")
        }
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center bg-white rounded-2xl border-0 shadow-md text-[rgb(60,64,67)] gap-3 h-14 min-w-[6.25rem] px-4 py-[1.125rem] cursor-pointer"
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z" />
                </svg>
                <span>New Folder</span>
            </button>

            <FolderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateFolder}
                title="Create New Folder"
                submitLabel="Create Folder"
            />
        </>
    )
})

export default NewFolderButton
