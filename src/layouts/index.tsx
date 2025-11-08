import { NuqsAdapter } from "nuqs/adapters/react"

import { Suspense } from "react"
import { Provider as BusProvider } from "react-bus"
import { Outlet } from "react-router"

import GlobalFallback from "@/components/ui/global-fallback"
import { Toaster } from "@/components/ui/sonner"

import { TanstackProvider } from "@/components/global-provider/tanstack-provider"

export default function Layout() {
    return (
        <main>
            <BusProvider>
                <NuqsAdapter>
                    <TanstackProvider>
                        <Suspense fallback={<GlobalFallback />}>
                            <div className="min-h-screen overflow-x-hidden pb-10">{<Outlet />}</div>
                        </Suspense>
                        <Toaster />
                    </TanstackProvider>
                </NuqsAdapter>
            </BusProvider>
            <Toaster />
        </main>
    )
}
