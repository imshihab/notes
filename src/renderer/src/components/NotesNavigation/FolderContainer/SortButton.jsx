import React, { memo } from "react"
import SortMenu from "./SortMenu"
import { get } from "esmls"

const SortButton = memo(
    ({ showSortMenu, setShowSortMenu, sortBy, setSortBy, sortOrder, setSortOrder }) => {
        return (
            <div className="relative sort-dropdown">
                <button
                    onClick={() => setShowSortMenu((prev) => !prev)}
                    className="inline-flex items-center bg-white rounded-tl-[12px] rounded-bl-[12px] rounded-br-[4px] border-0 box-border cursor-pointer fill-[rgb(60,64,67)] h-9 w-[2.25rem] justify-center select-none"
                    aria-label="Sort folders"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
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
