import { contextBridge, ipcRenderer } from "electron"
import { electronAPI } from "@electron-toolkit/preload"

const api = {
    closeApp: () => ipcRenderer.send("close-app"),
    minimizeApp: () => ipcRenderer.send("minimize"),
    maximizeApp: () => ipcRenderer.send("maximize"),
    checkWindowState: () => ipcRenderer.send("check-window-state"),
    onWindowMaximized: (callback) => ipcRenderer.on("window-maximized", callback),
    onWindowRestored: (callback) => ipcRenderer.on("window-restored", callback),
    removeWindowMaximizedListener: () => ipcRenderer.removeAllListeners("window-maximized"),
    removeWindowRestoredListener: () => ipcRenderer.removeAllListeners("window-restored")
}

const folders = {
    fetch: () => ipcRenderer.invoke("fetch_folders"),
    onFoldersChanged: (callback) => ipcRenderer.on("folders-changed", callback),
    removeFoldersChangedListener: () => ipcRenderer.removeAllListeners("folders-changed"),
    create: (folderData) => ipcRenderer.invoke("create_folder", folderData)
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI)
        contextBridge.exposeInMainWorld("api", api)
        contextBridge.exposeInMainWorld("folders", folders)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
    window.folders = folders
}
