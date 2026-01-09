import { ChevronRight } from "lucide-react"

import { Link, useParams } from "react-router-dom"

import { RestaurantProductDetailsFormSkeleton } from "@/components/ui/Feedback/restaurant-productDetails-skeleton"

import RestaurantProductDetailsForm from "@/components/forms/product-details"
import { useProductById } from "@/queries/products"

export default function StoreProduct() {
    const { id } = useParams()
    const { slug } = useParams()

    const { data, isLoading } = useProductById(slug as string, Number(id))

    if (isLoading) return <RestaurantProductDetailsFormSkeleton />

    if (!data) {
        return (
            <div className=" flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">المنتج غير موجود</p>
                    <Link
                        to={`/store/${slug}/items`}
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
        <div className="min-h-screen pb-16">
            <div className="relative w-full shrink-0">
                <Link
                    to={`/store/${slug}/items`}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 rounded-lg py-2.5 px-3 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </Link>

                <div className="w-full overflow-hidden h-[289px] sm:h-64 md:h-96 lg:h-[500px]">
                    <img src={data?.image ?? ""} alt={data?.name?.ar ?? ""} className="w-full h-full object-cover" />
                </div>
            </div>

            <RestaurantProductDetailsForm product={data} slug={slug} />
        </div>
    )
}
