import { Skeleton } from "../skeleton"
import { HeroSkeleton } from "./restaurant-menu-skeleton"

export function WelcomeSectionSkeleton() {
    return (
        <div className="container flex flex-col items-center px-4">
            {/* Skeleton for the image */}
            <Skeleton className="mt-[73px] w-[300px] h-[200px] bg-gray-200 rounded-lg" />

            {/* Skeleton for the text */}
            <div className="mt-4 space-y-2 max-w-2xl px-4 w-full">
                <Skeleton className="h-4 w-full bg-gray-200 rounded" />
                <Skeleton className="h-4 w-3/4 bg-gray-200 rounded mx-auto" />
            </div>
        </div>
    )
}

export function BranchSelectSkeleton() {
    return (
        <div className="container mt-6 space-y-6">
            <div className="relative h-[400px] md:h-[300px]">
                {/* Skeleton for branch selection */}
                <div className="space-y-3">
                    <Skeleton className="h-6 w-32 bg-gray-200 rounded" />
                    <Skeleton className="w-full h-14 bg-gray-200 rounded-lg" />
                </div>

                {/* Skeleton for the button */}
                <Skeleton className="w-full h-12 bg-gray-200 rounded-lg absolute -bottom-[26px] left-1/2 -translate-x-1/2" />
            </div>
        </div>
    )
}

export default function RestaurantSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 ">
            <HeroSkeleton />
            <WelcomeSectionSkeleton />
            <BranchSelectSkeleton />
        </div>
    )
}
