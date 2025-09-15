import React from "react"
import { useLocation } from "react-router"
import toast from "../../Helper/toast"

export default function FolderContainer() {
    const location = useLocation()
    const isRoot = location.pathname === "/"

    return (
        <div
            className={`w-[296px] h-[calc(100svh-72px)] transform-gpu absolute inset-0 transition-transform duration-150 ease-in-out ${isRoot ? "translate-x-[0px]" : "translate-x-[-296px]"}`}
        >
            Home
        </div>
    )
}
