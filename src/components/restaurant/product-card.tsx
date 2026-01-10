import { useAtomValue } from "jotai"
import { ChevronLeft, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import FakeImage from "@/assets/images/fake-image.webp"
import { cartSummary } from "@/atoms"

interface Props {
    product: Product
    className?: string
}

export default function RestaurantProductCard({ product, className }: Props) {
    const summary = useAtomValue(cartSummary)

    const isInCart = summary?.items?.some((item) => item?.product_id === product?.id)

    const Icon = isInCart ? PlusIcon : ChevronLeft

    return (
        <div className={cn("flex gap-x-4 items-start py-4", className)}>
            <img
                src={product?.image ?? FakeImage}
                alt={product?.name?.ar ?? ""}
                loading="lazy"
                className="size-18 rounded-2xl object-cover shrink-0"
                onError={(e) => {
                    e.currentTarget.src = FakeImage
                }}
            />

            <div className="grow">
                <h3 className="flex items-start justify-between gap-x-4">
                    <span className="line-clamp-2 font-medium">{product?.name?.ar ?? ""}</span>
                    <span className="font-semibold text-secondary shrink-0">{product.price ?? ""} ر.س</span>
                </h3>

                <p className="mt-2 flex items-start justify-between gap-x-4">
                    <span className="line-clamp-2 text-gray-700 text-xs">{product?.description?.ar ?? ""}</span>
                    <Button variant="outline" className="text-primary border-primary p-0 size-8 rounded-lg">
                        <Icon className="size-7" />
                    </Button>
                </p>
            </div>
        </div>
    )
}

type RestaurantProductCardSkeletonProps = {
    className?: string
}

export function RestaurantProductCardSkeleton({ className }: Readonly<RestaurantProductCardSkeletonProps>) {
    return (
        <div className={cn("flex gap-x-4 items-start py-4", className)}>
            <Skeleton className="size-18 rounded-2xl" />
            <div className="grow">
                <div className="flex items-start justify-between gap-x-4">
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-start justify-between gap-x-4 mt-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 size-8" />
                </div>
            </div>
        </div>
    )
}
