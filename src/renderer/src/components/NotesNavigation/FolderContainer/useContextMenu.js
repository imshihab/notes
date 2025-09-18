import { useState, useEffect } from "react"

export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 })
    const [menuDimensions, setMenuDimensions] = useState({ width: 150, height: 100 })

    const handleContextMenu = (event, menuRef) => {
        event.preventDefault()

        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        let x = event.pageX
        let y = event.pageY

        if (x + menuDimensions.width > windowWidth) {
            x = windowWidth - menuDimensions.width
        }
        if (y + menuDimensions.height > windowHeight) {
            y = windowHeight - menuDimensions.height
        }
        if (contextMenu.show && contextMenu.x === x && contextMenu.y === y) return

        // Dispatch the event to close any other open context menus
        document.dispatchEvent(new Event("closeAllContextMenus"))
        setContextMenu({
            show: true,
            x,
            y
        })
    }

    const closeContextMenu = () => {
        setContextMenu({ show: false, x: 0, y: 0 })
    }

    useEffect(() => {
        if (contextMenu.show && menuRef) {
            const { offsetWidth, offsetHeight } = menuRef.current
            setMenuDimensions({ width: offsetWidth, height: offsetHeight })
        }
    }, [contextMenu.show])

    return {
        contextMenu,
        handleContextMenu,
        closeContextMenu,
        menuDimensions
    }
}
