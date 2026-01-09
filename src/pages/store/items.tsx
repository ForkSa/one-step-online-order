import { ChevronRight } from "lucide-react"

import { useState } from "react"
import { Link, useParams } from "react-router"

import RestaurantMenuPageSkeleton from "@/components/ui/Feedback/restaurant-menu-skeleton"
import Categories from "@/components/ui/menu/categories"
import ProductCard from "@/components/ui/menu/product-card"
import HeroCard from "@/components/ui/restaurant/hero-card"

import hero from "@/assets/images/burger-imge.webp"
import CartPopup from "@/components/cart/pop-up"
import NotFoundPage from "@/pages/not-found"
import { useProducts } from "@/queries/products"
import { useStore } from "@/queries/store-menu"

export default function StoreItems() {
    const { slug } = useParams()

    const { data, isLoading } = useStore(slug as string)

    const [activeCategory, setActiveCategory] = useState<number>()

    const { data: productsData } = useProducts(slug as string, activeCategory as number)

    const products = productsData?.products ?? []

    if (isLoading) return <RestaurantMenuPageSkeleton />

    if (!data) return <NotFoundPage />

    return (
        <div className="min-h-screen pb-16">
            <div className="relative w-full shrink-0">
                <Link
                    to={`/store/${slug}`}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 rounded-lg py-2.5 px-3 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
                    aria-label="Back to store"
                >
                    <ChevronRight className="size-5 md:size-6 text-gray-700" />
                </Link>

                <div className="w-full overflow-hidden h-[161px] sm:h-64 md:h-96 lg:h-[500px]">
                    <img
                        src={data?.organization?.cover_image ?? hero}
                        alt="Restaurant Hero"
                        className="size-full object-cover"
                    />
                </div>

                <HeroCard
                    title={data?.organization?.name ?? ""}
                    description={data?.organization?.slogan ?? ""}
                    image={data?.organization?.cover_image ?? ""}
                />
            </div>

            <div className="container relative mx-auto px-4">
                <Categories slug={slug as string} onChange={setActiveCategory} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {products?.map((product) => (
                        <Link key={product?.id} to={`/store/${slug}/product/${product?.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    ))}
                </div>
            </div>

            <CartPopup />
        </div>
    )
}
