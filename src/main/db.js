import path from "path"
import fs from "fs"
import { ipcMain, BrowserWindow } from "electron"
export default function DataBase() {
    const DataBasePath = path.join(__dirname, "./../DataBase")

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
        const basePath = path.join(DataBasePath, "/Notes")
        const folderNames = fs.readdirSync(basePath).filter((folder) => {
            const folderPath = path.join(basePath, folder)
            return fs.statSync(folderPath).isDirectory()
        })

        const result = folderNames.map((folder) => {
            const folderPath = path.join(basePath, folder)
            const files = fs.readdirSync(folderPath)
            const stats = fs.statSync(folderPath)

            // Count notes (files starting with note_)
            const noteCount = files.filter((file) => file.startsWith("note_") && file.endsWith(".md")).length

            let icon = null
            let id = null
            let Pinned = false

            files.forEach((file) => {
                if (file.startsWith("icon_")) {
                    icon = file.replace("icon_", "")
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
                date: stats.birthtime.toISOString(), // Creation date
                modifiedDate: stats.mtime.toISOString(), // Last modified date
                noteCount: noteCount // Add note count to folder data
            }

            if (icon !== null) folderData.icon = icon
            if (Pinned) folderData.Pinned = Pinned

            return folderData
        })

        return result
    })
}
