import { ChevronRight } from "lucide-react"

import { Link } from "react-router"

import { Skeleton } from "@/components/ui/skeleton"

import FakeImage from "@/assets/images/fake-image.webp"

interface Props {
    restaurant: RestaurantMenu
    backTo: string
}

export default function RestaurantHero({ restaurant, backTo }: Props) {
    return (
        <div>
            <div className="relative">
                <Link
                    to={backTo}
                    className="absolute start-4 top-6 z-10 rounded-lg py-2.5 size-9 grid place-items-center bg-white"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="size-6 -mt-1" />
                </Link>

                <img
                    src={restaurant?.organization?.cover_image ?? FakeImage}
                    alt="Restaurant Hero"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                        e.currentTarget.src = FakeImage
                    }}
                />
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-150 items-center flex gap-4 w-[calc(100%-2rem)] mx-auto -mt-13 relative z-10">
                <img
                    src={restaurant?.organization?.logo ?? FakeImage}
                    alt="Restaurant Logo"
                    className="size-18 object-cover border border-gray-150 rounded-full shrink-0"
                    onError={(e) => {
                        e.currentTarget.src = FakeImage
                    }}
                />
                <div>
                    <h3 className="font-semibold">{restaurant?.organization?.name}</h3>
                    <p className="text-gray-700 text-sm font-normal">{restaurant?.organization?.slogan}</p>
                </div>
            </div>
        </div>
    )
}

export function RestaurantHeroSkeleton() {
    return (
        <div className="relative">
            <div className="relative h-40 bg-primary/10">
                <Skeleton className="absolute top-6 start-4 size-9 z-10 rounded-lg" />
            </div>

            <div className="flex items-center gap-4 h-24 w-[calc(100%-2rem)] mx-auto relative -mt-13 z-10 border border-gray-150 rounded-2xl p-4 bg-white">
                <Skeleton className="size-18 rounded-full" />
                <div className="flex flex-col gap-y-2 grow">
                    <Skeleton className="h-8 w-3/4 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                </div>
            </div>
        </div>
    )
}
