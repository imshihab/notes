import { del, get } from "esmls"
import React from "react"
import { useLocation, useNavigate } from "react-router"

export default function NotesContainer() {
    const location = useLocation()
    const navigate = useNavigate()

    const Items = ["Folder/", "Archives", "Favorites", "Trash", "Locked"]
    const isRoot = Items.some((item) => location.pathname.startsWith(`/${item}`))

    return (
        <div
            className={`w-[296px] ${!isRoot ? "translate-x-[296px]" : "translate-x-[0px]"} h-[calc(100vh-64px)] transform-gpu absolute inset-0 transition-transform duration-150 ease-in-out`}
        >
            <div className="w-full h-[52px] box-border px-3 grid grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center sticky top-0 z-[4]">
                <div className="flex items-center h-[52px] justify-start">
                    <button
                        onClick={() => {
                            del("isActive")
                            navigate("/")
                        }}
                        className="all-unset flex justify-center items-center h-[40px] w-[40px] cursor-pointer rounded hover:bg-black/[0.073] active:bg-black/[0.086] active:translate-y-[1px] transition-[background-color,transform] duration-200 ease-in-out"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="folder__title leading-[52px] truncate overflow-x-hidden whitespace-nowrap h-[52px] px-3 cursor-default font-['Helvetica_Neue',sans-serif] text-base font-semibold">
                    {get("isActive")?.name}
                </div>
            </div>
        </div>
    )
}
