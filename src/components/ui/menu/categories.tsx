import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import { useCategories } from "@/queries/categories"

type Props = {
    slug: string
    onChange: (category: number) => void
}
export default function Categories({ slug, onChange }: React.PropsWithChildren<Props>) {
    const [activeCategory, setActiveCategory] = useState<number>()

    const { data: categoriesData } = useCategories(slug)

    const categories = categoriesData?.data ?? []

    useEffect(() => {
        if (!categories?.length) return
        setActiveCategory(categories[0]?.id)
        onChange(categories[0]?.id)
    }, [categories])

    const handleCategoryClick = (id: number) => {
        setActiveCategory(id)
        onChange(id)
    }

    return (
        <Carousel
            opts={{
                align: "start",
                dragFree: true,
                containScroll: "trimSnaps",
            }}
            className="mb-[24px] md:mt-[100px] mt-[72px]"
        >
            <CarouselContent className="gap-x-2">
                {categories?.map((category) => (
                    <CarouselItem key={category?.id} className="basis-auto pl-2 md:pl-4">
                        <button
                            onClick={() => handleCategoryClick(category?.id)}
                            className={cn(
                                "rounded-[12px] border border-gray-200 px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap",
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
