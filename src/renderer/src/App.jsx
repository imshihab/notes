import React, { useState, memo } from "react"
import TopBar from "./components/TopBar"
import SideBar from "./components/SideBar"

function App() {
    return (
        <>
            <SideBar />
            <div className="flex flex-col flex-1">
                <TopBar />
            </div>
        </>
    )
}

export default memo(App)
