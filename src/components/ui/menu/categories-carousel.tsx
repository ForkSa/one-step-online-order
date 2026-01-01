import { useState } from "react"

import { Carousel, CarouselContent, CarouselItem } from "../carousel"

export default function CategoriesCarousel() {
    const [activeCategory, setActiveCategory] = useState<string>("الكل") // Default to "الكل"

    const categories = [
        { id: 1, name: "الكل" },
        { id: 2, name: "طعام" },
        { id: 3, name: "مشروبات" },
        { id: 4, name: "سلطات" },
        { id: 5, name: "فتات" },
    ]

    const handleCategoryClick = (name: string) => {
        setActiveCategory(name)
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
                {categories.map((category) => (
                    <CarouselItem key={category.id} className="basis-auto pl-2 md:pl-4">
                        <button
                            onClick={() => handleCategoryClick(category.name)}
                            className={`rounded-[12px] px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap
                                        ${
                                            activeCategory === category.name
                                                ? "bg-primary text-white"
                                                : "bg-white text-gray-700 border border-gray-200"
                                        }
                                    `}
                        >
                            {category.name}
                        </button>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
