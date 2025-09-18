import React, { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import toast from "../../Helper/toast"

const FolderContextMenu = ({ isOpen, position, onClose, folder, onEdit, onDelete }) => {
    const { name, id, Pinned } = folder
    const menuRef = useRef(null)
    const [menuDimensions, setMenuDimensions] = useState({ width: 150, height: 100 })

    useEffect(() => {
        if (isOpen && menuRef.current) {
            const { offsetWidth, offsetHeight } = menuRef.current
            setMenuDimensions({ width: offsetWidth, height: offsetHeight })
        }
    }, [isOpen])

    useEffect(() => {
        const handleCloseAll = () => {
            if (isOpen) {
                onClose()
            }
        }
        document.addEventListener("closeAllContextMenus", handleCloseAll)
        return () => {
            document.removeEventListener("closeAllContextMenus", handleCloseAll)
        }
    }, [isOpen, onClose])

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && menuRef.current.contains(e.target)) {
                return
            }
            document.dispatchEvent(new Event("closeAllContextMenus"))
        }

        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const handleTogglePin = async () => {
        const result = await window.folders.toggleFolderPin(name, id)
        if (result.status === "fail") {
            toast(result.message, "error")
        }
        onClose()
    }

    const handleEdit = () => {
        onEdit()
        onClose()
    }

    const handleDelete = async () => {
        onClose()
        try {
            const result = await window.folders.check(name, id)
            if (result.status === "fail") {
                toast(result.message, "error")
                return
            }
            if (result.isEmpty) {
                // If empty, delete immediately
                const del = await window.folders.delete(name, id)
                if (del.status === "success") {
                    toast(del.message)
                } else {
                    toast(del.message, "error")
                }
            } else {
                // Not empty: open confirmation modal
                onDelete({ name, id, noteCount: result.noteCount })
            }
        } catch (error) {
            toast("Error checking folder", "error")
        }
    }

    if (!isOpen) return null

    return createPortal(
        <div
            ref={menuRef}
            className="fixed bg-white flex flex-col rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] min-w-[144px] py-2 z-50"
            style={{ top: position.y, left: position.x }}
        >
            <button
                className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                onClick={handleTogglePin}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                        d={
                            Pinned
                                ? "M8,6.2V4H7V2H17V4H16V12L18,14V16H17.8L14,12.2V4H10V8.2L8,6.2M20,20.7L18.7,22L12.8,16.1V22H11.2V16H6V14L8,12V11.3L2,5.3L3.3,4L20,20.7M8.8,14H10.6L9.7,13.1L8.8,14Z"
                                : "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z"
                        }
                    />
                </svg>
                <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                    {Pinned ? "Unpin Folder" : "Pin Folder"}
                </span>
            </button>
            <button
                className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                onClick={handleEdit}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M21,11.11C20.92,11.11 20.72,11.21 20.62,11.31L19.62,12.31L21.72,14.42L22.72,13.41C22.92,13.21 22.92,12.81 22.72,12.61L21.42,11.31C21.32,11.21 21.22,11.11 21,11.11M19.12,12.91L13,18.92V21H15.12L21.22,14.92L19.12,12.91M21,8V8.11L19,10.11V8H3V18H11V20H3A2,2 0 0,1 1,18V6C1,4.91 1.9,4 3,4H9L11,6H19C20.12,6 21,6.91 21,8Z" />
                </svg>
                <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                    Edit Folder
                </span>
            </button>
            <button
                className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                onClick={handleDelete}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="oklch(0.577 0.245 27.325)"
                >
                    <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                </svg>
                <span className="leading-6 font-normal text-sm tracking-[0.25px] text-red-600">
                    Delete Folder
                </span>
            </button>
        </div>,
        document.body
    )
}

export default FolderContextMenu
