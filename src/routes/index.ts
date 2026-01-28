import { lazy } from "react"
import { createBrowserRouter } from "react-router"

import Layout from "@/layouts"
import { clientLoader } from "@/pages/restaurant/loader"
import SuccessPage from "@/pages/success"

const NotFound = lazy(() => import("@/pages/not-found"))

const Checkout = lazy(() => import("@/pages/checkout"))
const RestaurantPage = lazy(() => import("@/pages/restaurant"))
const RestaurantItems = lazy(() => import("@/pages/restaurant/items"))
const RestaurantProduct = lazy(() => import("@/pages/restaurant/product"))
const HomePage = lazy(() => import("@/pages"))

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "",
                Component: HomePage,
            },
            {
                path: "restaurant/:slug",
                children: [
                    {
                        path: "",
                        Component: RestaurantPage,
                        loader: clientLoader,
                    },
                    {
                        path: "items",
                        Component: RestaurantItems,
                    },
                    {
                        path: "product/:id",
                        Component: RestaurantProduct,
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
            {
                path: "not-found",
                Component: NotFound,
            },
        ],
    },
])
