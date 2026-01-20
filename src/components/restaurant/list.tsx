import { cn } from "@/lib/utils"

import RestaurantCard, { RestaurantCardSkeleton } from "@/components/restaurant/card"
import { useRestaurants } from "@/queries/restaurants"

type Props = {
    className?: string
}
export default function RestaurantList({ className }: Props) {
    const { data, isFetching } = useRestaurants()

    const restaurants = data?.data

    return (
        <div className={cn("container py-6", className)}>
            <h1 className="text-lg font-semibold"> استمتع بافضل المطاعم لدينا</h1>

            {isFetching && !restaurants?.length && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                    <RestaurantCardSkeleton />
                </div>
            )}

            {restaurants?.length === 0 && !isFetching && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <p className="col-span-2 text-center">لا يوجد مطاعم</p>
                </div>
            )}

            {restaurants?.length && (
                <div className="grid grid-cols-2 gap-6 mt-6">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    )
}
