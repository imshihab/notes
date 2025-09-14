import { createBrowserRouter } from "react-router"
import App from "./App"

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "",
                Component: App
            }
        ]
    },
    {
        path: "*", // wildcard
        Component: App
    }
])

export default router
