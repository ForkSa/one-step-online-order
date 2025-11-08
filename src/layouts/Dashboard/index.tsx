import { lazy } from "react"
import { Outlet } from "react-router"

const Header = lazy(() => import("@/components/header"))

export default function DashboardLayout() {
    return (
        <main className="grow">
            <Header />
            <div className="h-10" />
            <Outlet />
        </main>
    )
}
