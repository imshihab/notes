export const sortFolders = (folders, sortBy, sortOrder) => {
    return [...folders].sort((a, b) => {
        // Special ID "0000000" always comes first
        if (a.id === "0000000") return -1
        if (b.id === "0000000") return 1

        // Pinned folders come next
        if (a.Pinned && !b.Pinned) return -1
        if (!a.Pinned && b.Pinned) return 1

        // After handling special cases, apply the selected sort
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        }
        if (sortBy === "date") {
            return sortOrder === "asc"
                ? new Date(a.modifiedDate) - new Date(b.modifiedDate)
                : new Date(b.modifiedDate) - new Date(a.modifiedDate)
        }
        if (sortBy === "notes") {
            return sortOrder === "asc" ? a.noteCount - b.noteCount : b.noteCount - a.noteCount
        }
        return 0
    })
}
