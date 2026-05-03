import { useEffect, useMemo } from "react"
import throttle from "lodash-es/throttle"
import { cn } from "@/lib/utils"

import RestaurantCard, { RestaurantCardSkeleton } from "@/components/restaurant/card"
import { useInfiniteRestaurants } from "@/queries/restaurants"

type Props = {
    className?: string
}
export default function RestaurantList({ className }: Props) {
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteRestaurants()

    const restaurants = useMemo(() => {
        return data?.pages.flatMap((page) => page?.data || []) || []
    }, [data])

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 500
            ) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }
        }, 200)

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <div className={cn("container py-6", className)}>
            <h1 className="text-lg font-semibold"> استمتع بافضل المطاعم لدينا</h1>

            {isFetching && !isFetchingNextPage && !restaurants.length && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                </div>
            )}

            {restaurants.length === 0 && !isFetching && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <p className="col-span-2 text-center">لا يوجد مطاعم</p>
                </div>
            )}

            {restaurants.length > 0 && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            )}

            {isFetchingNextPage && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                </div>
            )}
        </div>
    )
}
