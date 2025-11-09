import { ChevronRight } from "lucide-react"

import { Link, useParams } from "react-router-dom"

import { RestaurantProductDetailsFormSkeleton } from "@/components/ui/Feedback/restaurant-productDetails-skeleton"
import CartModule from "@/components/ui/cart/cart-module"

import hero from "@/assets/images/hero-section-product.webp"
import RestaurantProductDetailsForm from "@/components/forms/restautant/restaurantProductDetails/restaurant-product-details"
import { useRestaurant } from "@/hooks/use-restaurants"

export default function ProductDetails() {
    const { id } = useParams()
    const restaurantId = window.location.pathname.split("/")[2]
    const { value: data, loading } = useRestaurant(restaurantId)

    const productData = data?.menu?.find((item) => item.id === Number(id)) || null

    if (loading) return <RestaurantProductDetailsFormSkeleton />

    if (!productData) {
        return (
            <div className=" flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">المنتج غير موجود</p>
                    <Link
                        to={`/restaurant/${restaurantId}/menu`}
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        <ChevronRight className="w-4 h-4" />
                        العودة إلى القائمة
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen  relative">
            <div className="relative w-full shrink-0">
                <Link
                    to={"/cart"}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 rounded-lg py-2.5 px-3 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </Link>

                <div className="w-full overflow-hidden h-[289px] sm:h-64 md:h-96 lg:h-[500px]">
                    <img
                        src={productData.image || hero}
                        alt={productData.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <RestaurantProductDetailsForm productData={productData} />
            <CartModule />
        </div>
    )
}
