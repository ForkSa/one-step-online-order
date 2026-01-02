import { Skeleton } from "@/components/ui/skeleton"

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
    return (
        <div className="relative w-full shrink-0">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                <Skeleton className="w-12 h-12 rounded-lg" />
            </div>

            <Skeleton className="w-full  bg-gray-50 h-[161px] sm:h-64 md:h-96 lg:h-[500px]" />

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 container  ">
                <div className=" bg-white rounded-2xl  p-4 flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Categories Carousel Skeleton
 */
export function CategoriesSkeleton() {
    return (
        <div className="mb-[24px] md:mt-[100px] mt-[72px]">
            <div className="flex gap-x-2 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-11 w-24 rounded-xl flex-shrink-0" />
                ))}
            </div>
        </div>
    )
}

/**
 * Single Menu Item Skeleton
 */
export function MenuItemSkeleton() {
    return (
        <div className="border-b border-gray-300 pb-4">
            <div className="flex p-4 gap-4">
                {/* Image Skeleton */}
                <Skeleton className="size-[70px] md:w-24 md:h-24 rounded-2xl flex-shrink-0" />

                {/* Content Skeleton */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-[70%]" />
                            <Skeleton className="h-4 w-[40%]" />
                        </div>
                        <Skeleton className="w-10 h-10 rounded-xl ml-2 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Menu Items Grid Skeleton
 */
export function MenuItemsGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {Array.from({ length: count }).map((_, i) => (
                <MenuItemSkeleton key={i} />
            ))}
        </div>
    )
}

/**
 * Complete Menu Page Skeleton
 */
export default function RestaurantMenuPageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 ">
            <HeroSkeleton />

            <div className="container mx-auto px-4">
                <CategoriesSkeleton />
                <MenuItemsGridSkeleton count={3} />
            </div>
        </div>
    )
}
