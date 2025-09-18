import React, { useState, memo, useCallback } from "react"
import toast from "../../Helper/toast"
import FolderModal from "./FolderModal"
import FolderButton from "./FolderButton"
import FolderContextMenu from "./FolderContextMenu"
import DeleteFolderModal from "./DeleteFolderModal"

const FolderItem = ({ folder, setReload, isFirst, isLast, isSingle }) => {
    const { name, id, icon, color } = folder
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteInfo, setDeleteInfo] = useState(null)
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 })

    const handleContextMenu = useCallback(
        (event) => {
            if (id === "0000000") {
                document.dispatchEvent(new Event("closeAllContextMenus"))
                return
            }

            event.preventDefault()
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight
            const menuDimensions = { width: 150, height: 100 }

            let x = event.pageX
            let y = event.pageY

            if (x + menuDimensions.width > windowWidth) {
                x = windowWidth - menuDimensions.width
            }
            if (y + menuDimensions.height > windowHeight) {
                y = windowHeight - menuDimensions.height
            }
            if (contextMenu.show && contextMenu.x === x && contextMenu.y === y) return

            document.dispatchEvent(new Event("closeAllContextMenus"))
            setContextMenu({ show: true, x, y })
        },
        [id, contextMenu.show, contextMenu.x, contextMenu.y]
    )

    const handleEdit = useCallback(() => {
        setIsEditOpen(true)
    }, [])

    const handleDelete = useCallback((deleteData) => {
        setDeleteInfo(deleteData)
        setIsDeleteModalOpen(true)
    }, [])

    const closeContextMenu = useCallback(() => {
        setContextMenu({ show: false, x: 0, y: 0 })
    }, [])

    const closeDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(false)
        setDeleteInfo(null)
    }, [])

    return (
        <div role="treeitem" className="overflow-hidden min-h-[64px]">
            <FolderButton
                folder={folder}
                isFirst={isFirst}
                isLast={isLast}
                isSingle={isSingle}
                onContextMenu={handleContextMenu}
            />

            <FolderContextMenu
                isOpen={contextMenu.show}
                position={{ x: contextMenu.x, y: contextMenu.y }}
                onClose={closeContextMenu}
                folder={folder}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FolderModal
                isOpen={isEditOpen}
                onClose={useCallback(() => setIsEditOpen(false), [])}
                onSubmit={useCallback(
                    async ({ name: newName, icon: newIcon, color: newColor }) => {
                        try {
                            if (typeof window.folders.update === "function") {
                                const result = await window.folders.update({
                                    id,
                                    oldName: name,
                                    name: newName,
                                    icon: newIcon,
                                    color: newColor
                                })
                                if (result?.status === "success") {
                                    toast(result.message)
                                    setIsEditOpen(false)
                                    return
                                }
                                if (result?.status === "fail") {
                                    toast(result.message || "Failed to update folder", "error")
                                    return
                                }
                            } else {
                                toast("Folder update not implemented yet.", "error")
                            }
                        } catch (error) {
                            toast(error?.message || "Error updating folder", "error")
                        }
                    },
                    [id, name]
                )}
                initialData={{ name, icon: icon || "default", color: color || "#5E5E5E" }}
                title="Edit Folder"
                submitLabel="Save Changes"
            />

            <DeleteFolderModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                deleteInfo={deleteInfo}
            />
        </div>
    )
}

export default memo(FolderItem)
