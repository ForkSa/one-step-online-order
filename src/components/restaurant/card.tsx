import { useSetAtom } from "jotai"

import { Link } from "react-router"

import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"

import { cartSummary, storeInfoAtom } from "@/atoms"

type Props = {
    className?: string
    restaurant: RestaurantType
}

export default function RestaurantCard({ className, restaurant }: Props) {
    const setStoreInfo = useSetAtom(storeInfoAtom)
    const setCartSummary = useSetAtom(cartSummary)

    const onResetStoreInfo = () => {
        setStoreInfo({
            branch: null,
            slug: undefined,
        })

        setCartSummary({
            items: [],
            itemCount: 0,
            subtotal: 0,
            tax: 0,
            total: 0,
        })
    }

    return (
        <Link
            to={`/restaurant/${restaurant?.slug}`}
            onClick={onResetStoreInfo}
            className={cn("bg-white rounded-xl shadow-lg shadow-black/5 p-4 block", className)}
        >
            <img src={restaurant?.cover_image} className="bg-gray-200 h-16 rounded-xl object-cover w-full" />
            <img
                src={restaurant?.logo}
                className="w-12 aspect-square bg-gray-300 rounded-full mx-auto ring ring-offset-3 ring-white relative z-10 -mt-6"
            />
            <p className="font-semibold mt-4 text-center">{restaurant?.name}</p>
        </Link>
    )
}

export function RestaurantCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-4">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="w-12 aspect-square bg-gray-200 rounded-full mx-auto ring ring-offset-3 ring-white -mt-6" />
            <Skeleton className="h-6 rounded-xl w-1/2 mx-auto mt-4" />
        </div>
    )
}
