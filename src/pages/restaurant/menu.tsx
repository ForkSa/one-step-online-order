import { ChevronRight } from "lucide-react"

import { Link, useParams } from "react-router"

import RestaurantMenuPageSkeleton from "@/components/ui/Feedback/restaurant-menu-skeleton"
import CartModule from "@/components/ui/cart/cart-module"
import CategoriesCarousel from "@/components/ui/menu/categories-carousel"
import ProductCard from "@/components/ui/menu/product-card"
import HeroCard from "@/components/ui/restaurant/hero-card"

import hero from "@/assets/images/burger-imge.webp"
import { useMenu } from "@/hooks/use-menu"
import type { MenuItem } from "@/types/restaurants"

export default function Menu() {
    const { id } = useParams()

    const { hoveredItem, setHoveredItem, rest, loading, handleAddToCart } = useMenu(id || "")

    if (loading) return <RestaurantMenuPageSkeleton />

    return (
        <div className="min-h-screen ">
            <div className="relative w-full shrink-0">
                <Link
                    to={`/restaurant/${id}/`}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 rounded-lg py-2.5 px-3 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </Link>

                <div className="w-full overflow-hidden h-[161px] sm:h-64 md:h-96 lg:h-[500px]">
                    <img src={rest?.image || hero} alt="Restaurant Hero" className="w-full h-full object-cover" />
                </div>

                <HeroCard title={rest?.name || ""} description={rest?.description || ""} image={rest?.image || ""} />
            </div>

            <div className="container relative mx-auto px-4">
                <CategoriesCarousel   />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {rest &&
                        rest?.menu?.map((item: MenuItem) => (
                            <Link
                                key={item.id}
                                to={`/restaurant/${id}/product_details/${item?.id}`}
                                className="group cursor-pointer overflow-hidden border-b border-gray-600 block"
                            >
                                <ProductCard
                                    item={item}
                                    handleAddToCart={handleAddToCart}
                                    setHoveredItem={setHoveredItem}
                                    hoveredItem={hoveredItem}
                                />
                            </Link>
                        ))}
                </div>
                <CartModule />
            </div>
        </div>
    )
}
