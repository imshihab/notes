import path from "path"
import fs from "fs"
import { ipcMain, BrowserWindow } from "electron"
export default function DataBase() {
    const DataBasePath = path.join(__dirname, "./../DataBase")
    const basePath = path.join(DataBasePath, "/Notes")

    const notifyFoldersChanged = () => {
        BrowserWindow.getAllWindows().forEach((window) => {
            window.webContents.send("folders-changed")
        })
    }

    // Watch for changes in the Notes directory
    const notesPath = path.join(DataBasePath, "/Notes")
    fs.watch(notesPath, (eventType, filename) => {
        if (filename) {
            notifyFoldersChanged()
        }
    })

    ipcMain.handle("fetch_folders", () => {
        const folderNames = fs.readdirSync(basePath).filter((folder) => {
            const folderPath = path.join(basePath, folder)
            return fs.statSync(folderPath).isDirectory()
        })

        const result = folderNames.map((folder) => {
            const folderPath = path.join(basePath, folder)
            const files = fs.readdirSync(folderPath)
            const stats = fs.statSync(folderPath)

            // Count notes (files starting with note_)
            const noteCount = files.filter(
                (file) => file.startsWith("note_") && file.endsWith(".md")
            ).length

            let icon = null
            let color = null
            let id = null
            let Pinned = false

            files.forEach((file) => {
                if (file.startsWith("icon_")) {
                    icon = file.replace("icon_", "")
                }
                if (file.startsWith("color_")) {
                    color = "#" + file.replace("color_", "")
                }
                if (file.startsWith("uid_")) {
                    id = file.replace("uid_", "")
                }
                if (file === "Pinned") {
                    Pinned = true
                }
            })

            const folderData = {
                name: folder,
                id,
                date: stats.birthtime.toISOString(),
                modifiedDate: stats.mtime.toISOString(),
                noteCount: noteCount
            }

            if (icon !== null) folderData.icon = icon
            if (color !== null) folderData.color = color
            if (Pinned) folderData.Pinned = Pinned

            return folderData
        })

        return result
    })

    ipcMain.handle("create_folder", async (event, folderData) => {
        const { name, icon, color } = folderData
        const folderPath = path.join(basePath, name)
        const iconPath = path.join(folderPath, "/", "icon_" + icon)
        const colorPath = path.join(folderPath, "/", "color_" + color.slice(1))

        try {
            if (!fs.existsSync(basePath)) {
                fs.mkdirSync(basePath, { recursive: true })
            }

            if (!fs.existsSync(folderPath)) {
                await fs.promises.mkdir(folderPath)

                // Always create a new UID for new folders
                const id = Math.random().toString(36).substring(2, 9)

                fs.mkdirSync(path.join(folderPath, `uid_${id}`))
                fs.mkdirSync(iconPath)
                fs.mkdirSync(colorPath)
                return {
                    message: "Folder created successfully.",
                    status: "success"
                }
            } else {
                return {
                    message: "Folder already exists.",
                    status: "fail"
                }
            }
        } catch (error) {
            return {
                message: error,
                status: "fail"
            }
        }
    })

    ipcMain.handle("toggle_folder_pin", async (event, folderName, uid) => {
        const FolderPath = path.join(basePath, folderName)
        const uidFolderPath = path.join(FolderPath, `uid_${uid}`)
        const pinnedPath = path.join(FolderPath, "Pinned")

        if (!fs.existsSync(uidFolderPath)) {
            return {
                status: "fail",
                message: `${folderName} with id:[${uid}] folder not found`
            }
        }

        try {
            if (!fs.existsSync(pinnedPath)) {
                await fs.promises.mkdir(pinnedPath)
                notifyFoldersChanged()
                return {
                    status: "success",
                    message: "Folder pinned successfully"
                }
            } else {
                await fs.promises.rmdir(pinnedPath, { recursive: true })
                notifyFoldersChanged()
                return {
                    status: "success",
                    message: "Folder unpinned successfully"
                }
            }
        } catch (error) {
            return {
                status: "fail",
                message: `Error pinning folder: ${error.message}`
            }
        }
    })

    ipcMain.handle("update_folder", async (event, payload) => {
        const { id, oldName, name: newName, icon: newIcon, color: newColor } = payload || {}
        try {
            if (!oldName || !id) {
                return { status: "fail", message: "Missing folder identifiers" }
            }

            const oldFolderPath = path.join(basePath, oldName)
            if (!fs.existsSync(oldFolderPath)) {
                return { status: "fail", message: "Folder doesn't exist" }
            }

            // Ensure UID folder exists and matches
            const uidFolderPath = path.join(oldFolderPath, `uid_${id}`)
            if (!fs.existsSync(uidFolderPath)) {
                return { status: "fail", message: "Folder doesn't exist" }
            }

            let targetFolderPath = oldFolderPath

            // Rename folder if name changed
            if (newName && newName !== oldName) {
                const candidate = path.join(basePath, newName)
                if (fs.existsSync(candidate)) {
                    return { status: "fail", message: "A folder with the new name already exists" }
                }
                await fs.promises.rename(oldFolderPath, candidate)
                targetFolderPath = candidate
            }

            // Helper to find a single directory in folder by prefix
            const findDirByPrefix = async (folderPath, prefix) => {
                const entries = await fs.promises.readdir(folderPath)
                const match = entries.find((e) => e.startsWith(prefix))
                return match ? path.join(folderPath, match) : null
            }

            // Rename icon directory if needed
            if (typeof newIcon === "string" && newIcon.length > 0) {
                const currentIconDir = await findDirByPrefix(targetFolderPath, "icon_")
                const desiredIconDir = path.join(targetFolderPath, `icon_${newIcon}`)
                if (currentIconDir && currentIconDir !== desiredIconDir) {
                    await fs.promises.rename(currentIconDir, desiredIconDir)
                } else if (!currentIconDir) {
                    if (!fs.existsSync(desiredIconDir)) {
                        await fs.promises.mkdir(desiredIconDir)
                    }
                }
            }

            // Rename color directory if needed
            if (typeof newColor === "string" && newColor.length > 0) {
                const colorHex = newColor.startsWith("#") ? newColor.slice(1) : newColor
                const currentColorDir = await findDirByPrefix(targetFolderPath, "color_")
                const desiredColorDir = path.join(targetFolderPath, `color_${colorHex}`)
                if (currentColorDir && currentColorDir !== desiredColorDir) {
                    await fs.promises.rename(currentColorDir, desiredColorDir)
                } else if (!currentColorDir) {
                    if (!fs.existsSync(desiredColorDir)) {
                        await fs.promises.mkdir(desiredColorDir)
                    }
                }
            }

            notifyFoldersChanged()
            return { status: "success", message: "Folder updated successfully" }
        } catch (error) {
            return { status: "fail", message: error?.message || String(error) }
        }
    })

    ipcMain.handle("delete_folder", async (event, folderName, uid) => {
        const folderPath = path.join(basePath, folderName)
        const uidFolderPath = path.join(folderPath, `uid_${uid}`)

        try {
            if (!fs.existsSync(folderPath)) {
                return { status: "fail", message: "Folder doesn't exist" }
            }

            if (!fs.existsSync(uidFolderPath)) {
                return { status: "fail", message: "Folder doesn't exist" }
            }

            // Check if folder is empty (only contains system directories)
            const entries = await fs.promises.readdir(folderPath)
            const noteFiles = entries.filter(
                (file) => file.startsWith("note_") && file.endsWith(".md")
            )

            if (noteFiles.length === 0) {
                // Empty folder - delete directly
                await fs.promises.rmdir(folderPath, { recursive: true })
                notifyFoldersChanged()
                return {
                    status: "success",
                    message: "Empty folder deleted successfully",
                    isEmpty: true
                }
            } else {
                // Non-empty folder - delete permanently
                await fs.promises.rmdir(folderPath, { recursive: true })
                notifyFoldersChanged()
                return {
                    status: "success",
                    message: `Folder permanently deleted (${noteFiles.length} notes)`,
                    isEmpty: false,
                    noteCount: noteFiles.length
                }
            }
        } catch (error) {
            return { status: "fail", message: error?.message || String(error) }
        }
    })

    ipcMain.handle("check_folder_empty", async (event, folderName, uid) => {
        const folderPath = path.join(basePath, folderName)
        const uidFolderPath = path.join(folderPath, `uid_${uid}`)
        try {
            if (!fs.existsSync(folderPath) || !fs.existsSync(uidFolderPath)) {
                return { status: "fail", message: "Folder doesn't exist" }
            }
            const entries = await fs.promises.readdir(folderPath)
            const noteFiles = entries.filter(
                (file) => file.startsWith("note_") && file.endsWith(".md")
            )
            return {
                status: "success",
                isEmpty: noteFiles.length === 0,
                noteCount: noteFiles.length
            }
        } catch (error) {
            return { status: "fail", message: error?.message || String(error) }
        }
    })
}
