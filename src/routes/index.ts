import { lazy } from "react"
import { createBrowserRouter } from "react-router"

import Layout from "@/layouts"
import { DashboardRoutes } from "@/routes/dashboard"

const UIComponents = lazy(() => import("@/pages/ui-components"))

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "",
                children: [DashboardRoutes],
            },
            {
                path: "ui-components",
                Component: UIComponents,
            },
        ],
    },
])
