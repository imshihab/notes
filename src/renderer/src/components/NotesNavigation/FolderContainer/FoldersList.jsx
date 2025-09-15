import React, { memo } from "react"
import FolderItem from "./FolderItem"

const FoldersList = memo(({ folders, setReload }) => {
    return (
        <div
            className="h-[calc(100svh-72px-72px)] overflow-y-auto overflow-x-hidden py-4 flex flex-col gap-1"
            role="tree"
        >
            {folders.map((folder, index) => (
                <FolderItem
                    key={folder.id}
                    folder={folder}
                    setReload={setReload}
                    isFirst={index === 0}
                    isLast={index === folders.length - 1}
                    isSingle={folders.length === 1}
                />
            ))}
        </div>
    )
})

export default FoldersList
