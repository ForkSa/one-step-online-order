import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

import { useCategories } from "@/queries/categories"

type Props = {
    slug: string
    onChange: (category: number) => void
    className?: string
}

export default function RestaurantCategories({ slug, onChange, className }: Readonly<Props>) {
    const [activeCategory, setActiveCategory] = useState<number>()

    const { data: categoriesData, isLoading } = useCategories(slug)

    const categories = categoriesData?.data ?? []

    useEffect(() => {
        if (!categories?.length) return
        setActiveCategory(categories[0]?.id)
        onChange(categories[0]?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

    const handleCategoryClick = (id: number) => {
        setActiveCategory(id)
        onChange(id)
    }

    if (isLoading) return <RestaurantCategoriesSkeleton />

    return (
        <Carousel
            opts={{
                align: "start",
                dragFree: true,
                containScroll: "trimSnaps",
            }}
            className={cn("mt-6", className)}
        >
            <CarouselContent className="gap-x-2">
                {categories?.map((category) => (
                    <CarouselItem key={category?.id} className="basis-auto pl-2 md:pl-4">
                        <button
                            onClick={() => handleCategoryClick(category?.id)}
                            className={cn(
                                "rounded-xl min-w-20 border border-gray-200 px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                                activeCategory === category?.id ? "bg-primary text-white" : "bg-white text-gray-700"
                            )}
                        >
                            {category?.name?.ar}
                        </button>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export function RestaurantCategoriesSkeleton() {
    return (
        <div className="mt-6">
            <div className="flex gap-x-2 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-24 rounded-xl flex-shrink-0" />
                ))}
            </div>
        </div>
    )
}
