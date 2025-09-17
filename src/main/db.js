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
}
