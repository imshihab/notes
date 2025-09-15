import React, { memo } from "react"
import SortMenu from "./SortMenu"

const SortButton = memo(
    ({ showSortMenu, setShowSortMenu, sortBy, setSortBy, sortOrder, setSortOrder }) => {
        return (
            <div className="relative sort-dropdown">
                <button
                    onClick={() => setShowSortMenu((prev) => !prev)}
                    className={`inline-flex items-center border-0 rounded-tl-[12px] rounded-bl-[12px] rounded-br-[4px] box-border cursor-pointer fill-[rgb(60,64,67)] h-9 min-w-[2.75rem] justify-center select-none px-2 ${
                        showSortMenu ? "bg-[#005cac] text-white rounded-2xl" : "bg-white"
                    }`}
                    aria-label="Sort folders"
                >
                    <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        fill="currentColor"
                    >
                        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
                    </svg>
                </button>

                {showSortMenu && (
                    <SortMenu
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                )}
            </div>
        )
    }
)

SortButton.displayName = "SortButton"

export default SortButton
