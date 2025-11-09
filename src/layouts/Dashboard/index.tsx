import { Outlet } from "react-router"

export default function DashboardLayout() {
    return (
        <main className="grow">
            <Outlet />
        </main>
    )
}
