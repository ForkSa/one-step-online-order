import { lazy } from "react"
import { createBrowserRouter } from "react-router"

import Layout from "@/layouts"
import SuccessPage from "@/pages/success"

const NotFound = lazy(() => import("@/pages/not-found"))

const Checkout = lazy(() => import("@/pages/checkout"))
const Store = lazy(() => import("@/pages/store"))
const StoreItems = lazy(() => import("@/pages/store/items"))
const StoreProduct = lazy(() => import("@/pages/store/product"))

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "store/:slug",
                children: [
                    {
                        path: "",
                        Component: Store,
                    },
                    {
                        path: "items",
                        Component: StoreItems,
                    },
                    {
                        path: "product/:id",
                        Component: StoreProduct,
                    },
                ],
            },
            {
                path: "checkout",
                Component: Checkout,
            },
            {
                path: "success",
                Component: SuccessPage,
            },
            {
                path: "*",
                Component: NotFound,
            },
        ],
    },
])
