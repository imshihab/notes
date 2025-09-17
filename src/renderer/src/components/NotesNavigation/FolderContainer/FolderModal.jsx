import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import toast from "../../Helper/toast"
import IconPicker from "./IconPicker"
import ColorPicker from "./ColorPicker"

function isValidFolderName(name) {
    const regex = /^(?!\s)(?!.*\s$)(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$)[^\\/:*?"<>|]{1,255}$/i
    return regex.test(name)
}

const FolderModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title = "Create New Folder",
    submitLabel = "Create Folder"
}) => {
    const [folderName, setFolderName] = useState((initialData && initialData.name) || "")
    const [selectedIcon, setSelectedIcon] = useState((initialData && initialData.icon) || "default")
    const [selectedColor, setSelectedColor] = useState(
        (initialData && initialData.color) || "#5E5E5E"
    )
    const maxChars = 32
    const inputRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            setFolderName((initialData && initialData.name) || "")
            setSelectedIcon((initialData && initialData.icon) || "default")
            setSelectedColor((initialData && initialData.color) || "#5E5E5E")
            inputRef.current?.focus()
        }
    }, [isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidFolderName(folderName)) {
            toast("Invalid folder name!", "error")
            return
        }
        onSubmit({ name: folderName, icon: selectedIcon, color: selectedColor })
        onClose()
    }

    if (!isOpen) return null

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
                    {title}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
                    <div className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white">
                        <IconPicker
                            selectedIcon={selectedIcon}
                            setSelectedIcon={setSelectedIcon}
                            selectedColor={selectedColor}
                        />
                        <span className="text-xs text-gray-400">Choose Icon</span>
                    </div>

                    <div className="relative bg-white rounded-[10rem] overflow-hidden">
                        <input
                            type="text"
                            className="w-full px-4 pr-9 h-[56px] border-0 text-base outline-none"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value.slice(0, maxChars))}
                            placeholder="Enter folder name"
                            required
                            ref={inputRef}
                        />
                        <div className="absolute right-4 top-[28px] -translate-y-1/2 text-xs text-gray-400">
                            {folderName.length}/{maxChars}
                        </div>
                    </div>

                    <ColorPicker
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-[24px] hover:bg-gray-100 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-2 rounded-[24px] font-medium ${
                                folderName
                                    ? "text-white bg-[#0b57d0] cursor-pointer"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!folderName}
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}

export default FolderModal
