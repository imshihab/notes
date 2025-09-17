import React, { useState, memo, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import toast from "../../Helper/toast"
import { iconOptions, material3Colors as colorOptions } from "./IconColor"
import CustomScrollbar from "../CustomScrollbar"

function isValidFolderName(name) {
    const regex = /^(?!\s)(?!.*\s$)(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$)[^\\/:*?"<>|]{1,255}$/i
    return regex.test(name)
}
const IconPicker = ({ selectedIcon, setSelectedIcon, selectedColor }) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const filteredIcons = iconOptions.filter(({ id }) =>
        id.toLowerCase().includes(query.toLowerCase())
    )

    const SelectedIcon = iconOptions.find((i) => i.id === selectedIcon)?.icon || Folder

    return (
        <div>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8E8E8] cursor-pointer"
            >
                <SelectedIcon size={24} color={selectedColor} />
            </button>

            {/* Dialog */}
            {open &&
                createPortal(
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className="bg-[#f2faff] p-4 rounded-2xl w-[90%] max-w-[500px] shadow-lg flex flex-col gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-2 px-3 py-2 bg-white rounded-xl">
                                <h3 className="text-lg !font-medium">Pick an Icon</h3>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center rounded-[12px] bg-gray-200 hover:bg-[#f1f3f9] text-gray-600 hover:text-black transition cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20px"
                                        viewBox="0 -960 960 960"
                                        width="20px"
                                        fill="currentColor"
                                    >
                                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="relative flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-5 w-[20px] h-[20px] text-black/60"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search icons..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full h-[48px] pl-[52px] pr-5 bg-white rounded-[24px] text-base placeholder:text-black/60 outline-none border-[1px] border-transparent transition-all duration-200 ease-in-out"
                                />
                            </div>

                            {/* Scrollable Grid */}
                            <CustomScrollbar className="grid grid-cols-6 gap-3 max-h-[300px] overflow-y-auto p-3 rounded-2xl bg-white">
                                {filteredIcons.map(({ id, icon: Icon }) => (
                                    <button
                                        key={id}
                                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition ${
                                            selectedIcon === id
                                                ? "ring-2 ring-blue-500 bg-blue-50"
                                                : "bg-[#E8E8E8]"
                                        }`}
                                        onClick={() => {
                                            setSelectedIcon(id)
                                            setOpen(false)
                                        }}
                                    >
                                        <Icon size={24} color={selectedColor} />
                                    </button>
                                ))}
                            </CustomScrollbar>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    )
}
const ColorPicker = ({ selectedColor, setSelectedColor }) => {
    return (
        <div>
            <div className="flex gap-2 flex-wrap mt-2">
                {colorOptions.map((c) => {
                    const isSelected = selectedColor === c
                    return (
                        <button
                            key={c}
                            type="button"
                            className="w-8 h-8 rounded-full transition"
                            style={{
                                backgroundColor: c,
                                boxShadow: isSelected
                                    ? `inset 0 0 0 2px ${c}, inset 0 0 0 4px white`
                                    : "none"
                            }}
                            onClick={() => setSelectedColor(c)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const Modal = ({ isOpen, onClose, onCreate }) => {
    const [folderName, setFolderName] = useState("")
    const [selectedIcon, setSelectedIcon] = useState("default")
    const [selectedColor, setSelectedColor] = useState("#5E5E5E")
    const maxChars = 32
    const inputRef = useRef(null)

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    const resetState = () => {
        setFolderName("")
        setSelectedIcon("default")
        setSelectedColor("#5E5E5E")
    }
    const handleClose = () => {
        resetState()
        onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidFolderName(folderName)) {
            toast(
                `Invalid folder name. Please avoid special characters like \\ / : * ? " < > | and reserved names (e.g., CON, PRN).`,
                "error"
            )
            return
        }
        onCreate({ name: folderName, icon: selectedIcon, color: selectedColor })
        handleClose()
    }

    if (!isOpen) return null

    return createPortal(
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
            onClick={handleClose}
        >
            <div
                className="bg-[#f2faff] flex flex-col gap-4 rounded-[24px] p-6 w-[90%] max-w-[400px] shadow-lg animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-[24px] font-[500] text-[#242a31] bg-white px-3 py-2 rounded-xl font-sans">
                    Create New Folder
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
                            className="w-full px-4 pr-9 h-[56px] border-0  text-base outline-none transition-all placeholder-[#999]"
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

                    {/* Footer */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="cursor-pointer px-4 py-2 rounded-[24px] hover:text-[#0b57d0] hover:bg-[#0b57d014]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-2 rounded-[24px] font-medium transition-all duration-200 ${
                                folderName
                                    ? "text-white bg-[#0b57d0] hover:bg-[#0946a7] cursor-pointer"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!folderName}
                        >
                            Create Folder
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}

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

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateFolder}
            />
        </>
    )
})

export default NewFolderButton
