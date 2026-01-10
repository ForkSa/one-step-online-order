import { useAtomValue } from "jotai"

import { Suspense, lazy, useState } from "react"
import { Link, useParams } from "react-router"

import { cn } from "@/lib/utils"

import { cartSummary } from "@/atoms"
import { RestaurantCategoriesSkeleton } from "@/components/restaurant/categories"
import RestaurantHero, { RestaurantHeroSkeleton } from "@/components/restaurant/hero"
import RestaurantProductCard, { RestaurantProductCardSkeleton } from "@/components/restaurant/product-card"
import NotFoundPage from "@/pages/not-found"
import { useProducts } from "@/queries/products"
import { useRestaurantMenu } from "@/queries/restaurant-menu"

const RestaurantCategories = lazy(() => import("@/components/restaurant/categories"))
const CartPopup = lazy(() => import("@/components/cart/pop-up"))

export default function RestaurantItems() {
    const { slug } = useParams()
    const summary = useAtomValue(cartSummary)
    const items = summary?.items ?? []

    const { data, isLoading: isRestaurantMenuLoading } = useRestaurantMenu(slug as string)

    const [activeCategory, setActiveCategory] = useState<number>()

    const { data: productsData, isLoading: isProductsLoading } = useProducts(slug as string, activeCategory as number)

    const products = productsData?.products ?? []

    if (!data && !isRestaurantMenuLoading) return <NotFoundPage />

    return (
        <div className={cn("min-h-screen pb-6", items?.length > 0 && "pb-28")}>
            {isRestaurantMenuLoading && <RestaurantHeroSkeleton />}

            {!isRestaurantMenuLoading && data && <RestaurantHero restaurant={data} backTo={`/restaurant/${slug}`} />}

            <div className="container px-4 mt-4">
                <Suspense fallback={<RestaurantCategoriesSkeleton />}>
                    <RestaurantCategories slug={slug as string} onChange={setActiveCategory} />
                </Suspense>

                <div className="flex flex-col mt-3">
                    {(isProductsLoading || isRestaurantMenuLoading) &&
                        Array.from({ length: 3 }).map((_, index) => <RestaurantProductCardSkeleton key={index} />)}

                    {products?.map((product, index) => (
                        <Link key={product?.id} to={`/restaurant/${slug}/product/${product?.id}`}>
                            <RestaurantProductCard
                                product={product}
                                className={cn(products.length > index + 1 && "border-b border-gray-150")}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <Suspense>
                <CartPopup />
            </Suspense>
        </div>
    )
}
