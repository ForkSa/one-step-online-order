import { useAtomValue } from "jotai"
import { ChevronRight } from "lucide-react"

import { Link, useParams } from "react-router-dom"

import { cn } from "@/lib/utils"

import { RestaurantProductDetailsFormSkeleton } from "@/components/ui/Feedback/restaurant-productDetails-skeleton"

import FakeImage from "@/assets/images/fake-image.webp"
import { cartSummary } from "@/atoms"
import ProductDetailsForm from "@/components/forms/product-details"
import NotFoundPage from "@/pages/not-found"
import { useProductById } from "@/queries/products"

export default function RestaurantProduct() {
    const { id } = useParams()
    const { slug } = useParams()
    const summary = useAtomValue(cartSummary)

    const { data, isLoading } = useProductById(slug as string, Number(id))

    if (isLoading) return <RestaurantProductDetailsFormSkeleton />

    if (!data) {
        return <NotFoundPage />
    }

    return (
        <div className={cn("min-h-screen pb-6", summary?.items?.length > 0 && "pb-32")}>
            <div className="relative w-full shrink-0">
                <Link
                    to={`/restaurant/${slug}/items`}
                    className="absolute start-4 top-6 z-10 rounded-lg py-2.5 size-9 grid place-items-center bg-white"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="size-6 -mt-1" />
                </Link>

                <img
                    src={data?.image ?? FakeImage}
                    alt={data?.name?.ar ?? ""}
                    onError={(e) => {
                        e.currentTarget.src = FakeImage
                    }}
                    className="h-[289px] w-full object-cover"
                />
            </div>

            <ProductDetailsForm product={data} slug={slug} />
        </div>
    )
}
