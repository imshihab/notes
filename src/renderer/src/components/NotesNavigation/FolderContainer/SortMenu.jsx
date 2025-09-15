import React, { memo, useState } from "react"

const SortTypeButton = ({ selected, onClick, icon, children, type }) => {
    const getBorderStyle = () => {
        if (selected) return "rounded-2xl"

        switch (type) {
            case "name":
                return "rounded-t-2xl rounded-b-sm"
            case "date":
                return "rounded-sm"
            case "notes":
                return "rounded-t-sm rounded-b-2xl"
            default:
                return "rounded-sm"
        }
    }

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                selected
                    ? "bg-[#005CAC] text-white cursor-default"
                    : "bg-white text-slate-800 cursor-pointer"
            } ${getBorderStyle()}`}
        >
            {icon}
            {children}
        </button>
    )
}

const SortOrderButton = ({ selected, onClick, children }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center min-h-10  rounded-2xl font-medium transition ${
            selected
                ? "bg-[#005CAC] text-white !rounded-2xl cursor-default"
                : "bg-white text-slate-800 cursor-pointer"
        }`}
    >
        {children}
    </button>
)

const SortMenu = memo(({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
    const sortTypeButtons = [
        {
            type: "name",
            label: "Name",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z" />
                </svg>
            )
        },
        {
            type: "date",
            label: "Date",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
                </svg>
            )
        },
        {
            type: "notes",
            label: "Notes Count",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M200-200v-560 560Zm80-400h400v-80H280v80Zm0 160h190q20-24 43.5-44.5T565-520H280v80Zm0 160h122q2-21 7.5-41t13.5-39H280v80Zm-80 160q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v223q-19-8-39-13.5t-41-7.5v-202H200v560h202q2 21 7.5 41t13.5 39H200Zm520 80q-73 0-127.5-45.5T524-200h62q13 44 49.5 72t84.5 28q58 0 99-41t41-99q0-58-41-99t-99-41q-29 0-54 10.5T622-340h58v60H520v-160h60v57q27-26 63-41.5t77-15.5q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z" />
                </svg>
            )
        }
    ]

    const getSortOrderButtons = () => {
        const options = {
            name: [
                { value: "asc", label: "A to Z" },
                { value: "desc", label: "Z to A" }
            ],
            date: [
                { value: "asc", label: "Oldest" },
                { value: "desc", label: "Newest" }
            ],
            notes: [
                { value: "asc", label: "Smallest" },
                { value: "desc", label: "Largest" }
            ]
        }

        return options[sortBy] || options.name
    }

    return (
        <div className="absolute right-0 top-full mt-1 bg-[#f2faff] rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] py-3 px-4 w-56 z-10 flex flex-col gap-3">
            <div className="text-2xl text-slate-800 font-medium">Sort by</div>

            <div className="flex flex-col gap-0.5">
                {sortTypeButtons.map(({ type, label, icon }) => (
                    <SortTypeButton
                        key={type}
                        type={type}
                        selected={sortBy === type}
                        onClick={() => setSortBy(type)}
                        icon={icon}
                    >
                        {label}
                    </SortTypeButton>
                ))}
            </div>

            <div className="flex gap-1">
                {getSortOrderButtons().map(({ value, label }) => (
                    <SortOrderButton
                        key={value}
                        selected={sortOrder === value}
                        onClick={() => setSortOrder(value)}
                    >
                        {label}
                    </SortOrderButton>
                ))}
            </div>
        </div>
    )
})

SortMenu.displayName = "SortMenu"

export default SortMenu
