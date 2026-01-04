import { lazy } from "react"
import { Navigate, type RouteObject } from "react-router"

import DashboardLayout from "@/layouts/Dashboard"

const Cart = lazy(() => import("@/pages/cart/index.tsx"))
const Restaurant = lazy(() => import("@/pages/restaurant/index.tsx"))
const RestaurantMenu = lazy(() => import("@/pages/restaurant/menu"))
const ProductDetails = lazy(() => import("@/pages/restaurant/product-details"))
//const Home = lazy(() => import("@/pages/index.tsx"))

export const DashboardRoutes: RouteObject = {
    path: "",
    Component: DashboardLayout,
    children: [
        {
            index: true,
            Component: () => <Navigate to="/restaurant/a7k9m2p4q8r1s3" replace />,
        },
        {
            path: "restaurant/:id",
            children: [
                {
                    path: "",
                    Component: Restaurant,
                },
                {
                    path: "menu",
                    Component: RestaurantMenu,
                },
                {
                    path: "product_details/:id",
                    Component: ProductDetails,
                },
            ],
        },
        {
            path: "cart",
            Component: Cart,
        },
    ],
}
