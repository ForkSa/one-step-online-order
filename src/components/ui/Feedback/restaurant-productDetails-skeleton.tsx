// components/product-details-skeleton.tsx
import { ChevronRight } from "lucide-react"

import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Image Section Skeleton */}
            <div className="relative w-full shrink-0">
                <Link
                    to="#"
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 rounded-lg py-2.5 px-3 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </Link>

                <div className="w-full overflow-hidden h-[289px] sm:h-64 md:h-96 lg:h-[500px]">
                    <Skeleton className="w-full h-full bg-gray-200 rounded-none" />
                </div>
            </div>

            {/* Product Details Form Skeleton */}
            <div className="mt-6 container">
                {/* Product Info Skeleton */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <Skeleton className="h-7 w-48 bg-gray-200 rounded" />
                        <Skeleton className="h-7 w-20 bg-gray-200 rounded mr-2" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200 rounded" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200 rounded" />
                    </div>
                </div>

                {/* Variations Section Skeleton */}
                <div className="mt-8">
                    <Skeleton className="h-6 w-32 bg-gray-200 rounded mb-4" />
                    <div className="flex gap-3 overflow-hidden">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="min-w-[204px] md:min-w-[250px] rounded-2xl p-4 bg-white border-2 border-gray-200"
                            >
                                <div className="flex justify-between gap-5 items-start mb-6">
                                    <Skeleton className="h-5 w-24 bg-gray-200 rounded" />
                                    <Skeleton className="w-5 h-5 bg-gray-200 rounded-full" />
                                </div>
                                <Skeleton className="h-5 w-16 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Addons Section Skeleton */}
                <div className="mt-8">
                    <Skeleton className="h-6 w-20 bg-gray-200 rounded mb-4" />
                    <div className="flex gap-3 overflow-hidden">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="min-w-[204px] md:min-w-[250px] rounded-2xl p-4 bg-white border-2 border-gray-200"
                            >
                                <div className="flex justify-between gap-5 items-start mb-6">
                                    <Skeleton className="h-5 w-20 bg-gray-200 rounded" />
                                    <Skeleton className="w-5 h-5 bg-gray-200 rounded" />
                                </div>
                                <Skeleton className="h-5 w-12 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Note Button Skeleton */}
                <Skeleton className="mt-4 w-full h-16 bg-gray-200 rounded-xl" />

                {/* Add to Cart Button Skeleton */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                    <Skeleton className="w-full h-12 bg-gray-300 rounded-xl" />
                </div>
            </div>
        </div>
    )
}

// Skeleton for the product details form component
export function RestaurantProductDetailsFormSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative w-full shrink-0">
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                </div>

                <Skeleton className="w-full h-[161px] sm:h-64 md:h-96 lg:h-[500px]" />
            </div>
            <div className=" container mt-[40px]">
                {/* Product Info Skeleton */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <Skeleton className="h-7 w-48 bg-gray-200 rounded-lg" />
                        <Skeleton className="h-7 w-20 bg-gray-200 rounded-lg mr-2" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-200 rounded-lg" />
                    </div>
                </div>

                {/* Variations Section Skeleton */}
                <div className="mt-8">
                    <Skeleton className="h-6 w-32 bg-gray-200 rounded mb-4" />
                    <div className="flex gap-3  pb-2">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex-shrink-0 min-w-[204px] rounded-2xl p-4 bg-white border-2 border-gray-200"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <Skeleton className="h-5 w-24 bg-gray-200 rounded-lg" />
                                    <Skeleton className="w-5 h-5 bg-gray-200 rounded-full" />
                                </div>
                                <Skeleton className="h-5 w-16 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Addons Section Skeleton */}
                <div className="mt-8">
                    <Skeleton className="h-6 w-20 bg-gray-200 rounded-lg mb-4" />
                    <div className="flex gap-3 pb-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="flex-shrink-0 min-w-[204px] rounded-2xl p-4 bg-white border-2 border-gray-200"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <Skeleton className="h-5 w-20 bg-gray-200 rounded-lg" />
                                    <Skeleton className="w-5 h-5 bg-gray-200 rounded-lg" />
                                </div>
                                <Skeleton className="h-5 w-12 bg-gray-200 rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>

                <Skeleton className="mt-4 w-full h-16 bg-gray-200 rounded-lg" />
            </div>
        </div>
    )
}
