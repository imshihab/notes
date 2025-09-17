import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useLocation } from "react-router"
import toast from "../../Helper/toast"
import { sortFolders } from "../../Helper/sort"
import NewFolderButton from "./NewFolderButton"
import FoldersList from "./FoldersList"
import SortButton from "./SortButton" // Assuming you've already moved this to a separate file
import { get, set } from "esmls"

export default function FolderContainer() {
    const location = useLocation()
    const isRoot = location.pathname === "/"
    const [foldersList, setFoldersList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Load saved sort preferences or use defaults
    const savedSort = get("sortData", { default: { sortBy: "name", sortOrder: "asc" } })
    const [sortBy, setSortBy] = useState(savedSort.sortBy)
    const [sortOrder, setSortOrder] = useState(savedSort.sortOrder)
    const [showSortMenu, setShowSortMenu] = useState(false)

    // Save sort preferences when they change
    useEffect(() => {
        set("sortData", { sortBy, sortOrder })
    }, [sortBy, sortOrder])

    // Memoize the sorted folders list
    const sortedFolders = useMemo(() => {
        return sortFolders(foldersList, sortBy, sortOrder)
    }, [foldersList, sortBy, sortOrder])

    // Create wrapped setState functions to handle sort changes
    const handleSortByChange = useCallback((newSortBy) => {
        setSortBy(newSortBy)
    }, [])

    const handleSortOrderChange = useCallback((newSortOrder) => {
        setSortOrder(newSortOrder)
    }, [])

    // Memoize the fetchFolders function
    const fetchFolders = useCallback(async () => {
        try {
            const folders = await window.folders.fetch()
            setFoldersList(folders) // Don't sort here, let useMemo handle it
        } catch (error) {
            toast.error("Failed to fetch folders")
        }
    }, [])

    // Remove the sorting effect since we're using useMemo
    useEffect(() => {
        fetchFolders()
        window.folders.onFoldersChanged(fetchFolders)
        return () => window.folders.removeFoldersChangedListener()
    }, [fetchFolders])

    // Memoize the click outside handler
    const handleClickOutside = useCallback(
        (event) => {
            if (!event.target.closest(".sort-dropdown")) {
                setShowSortMenu(false)
            }
        },
        [setShowSortMenu]
    )

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [handleClickOutside])

    return (
        <div
            className={`w-[296px] h-[calc(100svh-72px)] transform-gpu absolute inset-0 transition-transform duration-150 ease-in-out ${
                isRoot ? "translate-x-[0px]" : "translate-x-[-296px]"
            }`}
        >
            <div className="relative">
                <div className="px-4 py-2 sticky top-0 z-2 h-[72px] flex justify-between items-center">
                    <NewFolderButton />
                    <SortButton
                        showSortMenu={showSortMenu}
                        setShowSortMenu={setShowSortMenu}
                        sortBy={sortBy}
                        setSortBy={handleSortByChange}
                        sortOrder={sortOrder}
                        setSortOrder={handleSortOrderChange}
                    />
                </div>
                <FoldersList folders={sortedFolders} setReload={fetchFolders} />
            </div>
        </div>
    )
}
