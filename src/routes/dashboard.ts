import { lazy } from "react"
import type { RouteObject } from "react-router"

import DashboardLayout from "@/layouts/Dashboard"

const Home = lazy(() => import("@/pages/index.tsx"))

export const DashboardRoutes: RouteObject = {
    path: "",
    Component: DashboardLayout,
    children: [
        {
            path: "",
            index: true,
            Component: Home,
        },
    ],
}
