import React, { memo } from "react"

const NewFolderButton = memo(({ setIsModalOpen }) => {
    return (
        <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center bg-white rounded-2xl border-0 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] box-border text-[rgb(60,64,67)] cursor-pointer fill-[rgb(60,64,67)] gap-3 h-14 min-w-[6.25rem] px-4 py-[1.125rem] place-content-center justify-start transition-shadow duration-[0.08s] linear select-none"
        >
            <svg width="24px" height="24px" viewBox="0 0 24 24">
                <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z" />
            </svg>
            <span>New Folder</span>
        </button>
    )
})

export default NewFolderButton
