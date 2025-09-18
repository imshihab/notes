import React, { useState, memo, useCallback } from "react"
import { createPortal } from "react-dom"
import CustomCheckbox from "./CustomCheckbox"
import toast from "../../Helper/toast"

const DeleteFolderModal = memo(({ isOpen, onClose, deleteInfo }) => {
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleDelete = useCallback(async () => {
        try {
            const result = await window.folders.delete(deleteInfo.name, deleteInfo.id)
            if (result.status === "success") {
                toast(result.message)
                onClose()
                setConfirmDelete(false)
            } else {
                toast(result.message, "error")
            }
        } catch (error) {
            toast("Error deleting folder", "error")
        }
    }, [deleteInfo, onClose])

    const handleCheckboxChange = useCallback((checked) => {
        setConfirmDelete(checked)
    }, [])

    if (!isOpen || !deleteInfo) return null

    return createPortal(
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
            onClick={onClose}
        >
            <div
                className="bg-[#f2faff] flex flex-col gap-4 rounded-[24px] p-6 w-[90%] max-w-[400px] shadow-lg animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-[24px] font-[500] text-[#242a31] bg-white px-3 py-2 rounded-xl font-sans">
                    Delete Folder
                </h2>
                <div className="flex flex-col gap-0.5">
                    <div className="bg-white px-4 py-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-sm">
                        <p className="text-gray-700 !mb-2">
                            The folder "<strong className="!font-bold">{deleteInfo.name}</strong>"
                            contains{" "}
                            <strong className="!font-bold">{deleteInfo.noteCount} notes</strong>.
                        </p>
                        <p className="text-gray-700 text-sm">
                            This folder will be <strong>permanently deleted</strong> and cannot be
                            recovered.
                        </p>
                    </div>

                    <CustomCheckbox
                        id="confirm-delete"
                        checked={confirmDelete}
                        onChange={handleCheckboxChange}
                        label="I understand that deleted notes can't be recovered."
                        description="delete-warning"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-[24px] hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={!confirmDelete}
                        className={`px-5 py-2 rounded-[24px] font-medium ${
                            confirmDelete
                                ? "text-white bg-[#dc2626] hover:bg-red-700 cursor-pointer"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Delete Permanently
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
})

export default DeleteFolderModal
