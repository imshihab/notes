import React, { useState } from "react"
import { createPortal } from "react-dom"
import CustomScrollbar from "../CustomScrollbar"
import { iconOptions } from "./IconColor"

const IconPicker = ({ selectedIcon, setSelectedIcon, selectedColor }) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const filteredIcons = iconOptions.filter(({ id }) =>
        id.toLowerCase().includes(query.toLowerCase())
    )

    const SelectedIcon = (
        iconOptions.find((i) => i.id === selectedIcon) ||
        iconOptions.find((i) => i.id === "default")
    )?.icon

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8E8E8] cursor-pointer"
            >
                {SelectedIcon ? <SelectedIcon size={24} color={selectedColor} /> : null}
            </button>

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

                            <CustomScrollbar className="grid grid-cols-6 gap-3 max-h-[300px] overflow-y-auto p-3 rounded-2xl bg-white">
                                {filteredIcons.map(({ id, icon: Icon }) => (
                                    <button
                                        key={id}
                                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition cursor-pointer ${
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

export default IconPicker
