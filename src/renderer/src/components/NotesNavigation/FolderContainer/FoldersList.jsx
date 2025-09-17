import React, { memo } from "react"
import FolderItem from "./FolderItem"
import CustomScrollbar from "../CustomScrollbar"

const FoldersList = memo(({ folders, setReload }) => {
    return (
        <CustomScrollbar
            className="h-[calc(100svh-72px-72px)] flex flex-col gap-0.5"
            role="tree"
            parentif={true}
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
        </CustomScrollbar>
    )
})

export default FoldersList
