/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from "lucide-react"

import { type Control, Controller } from "react-hook-form"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import { useRestaurantProductDetails } from "@/hooks/use-restaurant-product-details"
import type { MenuItem } from "@/types/restaurants"

interface DifferentControllerProps {
    control: Control<any, any>
    productData: MenuItem | null
}

export default function DifferentController({ control, productData }: DifferentControllerProps) {
    const { variations } = useRestaurantProductDetails({ productData })

    return (
        <Controller
            name="variation"
            control={control}
            render={({ field }) => (
                <Carousel
                    opts={{
                        align: "start",
                        dragFree: true,
                        containScroll: "trimSnaps",
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-3">
                        {variations?.map((variation) => {
                            const isSelected = field.value === variation.name

                            return (
                                <CarouselItem key={variation.id} className="pl-2 md:pl-3 basis-auto">
                                    <label
                                        htmlFor={`variation-${variation.id}`}
                                        className={`
                                        relative block min-w-[204px] md:min-w-[250px]
                                        rounded-2xl p-[10px] cursor-pointer 
                                        transition-all duration-300 ease-out
                                        ${
                                            isSelected
                                                ? "bg-primary text-white shadow-lg scale-[1.02]"
                                                : "bg-white border-1 border-gray-200 hover:border-primary/50 hover:shadow-md"
                                        }
                                    `}
                                    >
                                        <input
                                            {...field}
                                            type="radio"
                                            id={`variation-${variation.id}`}
                                            value={variation.name}
                                            checked={isSelected}
                                            onChange={() => field.onChange(variation.name)}
                                            className="sr-only"
                                        />

                                        <div className="flex justify-between gap-5 items-start mb-6">
                                            <h4
                                                className={`
                                                font-bold text-sm
                                                ${isSelected ? "text-white" : "text-gray-900"}
                                            `}
                                            >
                                                {variation.name}
                                            </h4>

                                            <div
                                                className={`
                                                w-5 h-5 rounded-full border-1 flex items-center justify-center
                                                transition-all duration-200
                                                ${
                                                    isSelected
                                                        ? "bg-white border-white"
                                                        : "bg-transparent  border-primary"
                                                }
                                            `}
                                            >
                                                {isSelected && (
                                                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                                )}
                                            </div>
                                        </div>

                                        <span
                                            className={`
                                                text-sm font-semibold
                                                ${isSelected ? "text-white/90" : "text-secondary"}
                                            `}
                                        >
                                            {variation.price ? `${variation.price}` : productData?.price}
                                            ر.س
                                        </span>
                                    </label>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
            )}
        />
    )
}
