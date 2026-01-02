/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from "lucide-react"

import { type Control, Controller } from "react-hook-form"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import type { Addon, MenuItem } from "@/types/restaurants"

interface AddonControllerProps {
    control: Control<any, any>
    productData: MenuItem | null
}
export default function AddonController({ control, productData }: AddonControllerProps) {
    return (
        <Controller
            name="addons"
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
                        {productData?.addons?.map((addOn: Addon) => {
                            const isSelected = field.value?.includes(addOn.id) || false

                            return (
                                <CarouselItem key={addOn.id} className="pl-2 md:pl-3 basis-auto">
                                    <label
                                        htmlFor={`addon-${addOn.id}`}
                                        className={`
                                        relative block min-w-[204px] md:min-w-[250px]
                                        rounded-2xl p-3 cursor-pointer 
                                        transition-all duration-300 ease-out
                                        ${
                                            isSelected
                                                ? " bg-primary text-white "
                                                : "bg-white border-1 border-gray-200 hover:border-primary/50 hover:shadow-md"
                                        }
                                    `}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`addon-${addOn.id}`}
                                            checked={isSelected}
                                            onChange={(e) => {
                                                const currentValue = field.value || []
                                                if (e.target.checked) {
                                                    field.onChange([...currentValue, addOn.id])
                                                } else {
                                                    field.onChange(currentValue.filter((id: number) => id !== addOn.id))
                                                }
                                            }}
                                            className="sr-only"
                                        />

                                        <div className="flex justify-between gap-5 items-start mb-6">
                                            <h4
                                                className={`
                                                font-bold text-sm
                                                ${isSelected ? "text-white" : "text-gray-900"}
                                            `}
                                            >
                                                {addOn.name}
                                            </h4>

                                            <div
                                                className={`
                                                w-5 h-5 rounded border-1 flex items-center justify-center
                                                transition-all duration-200
                                                ${
                                                    isSelected
                                                        ? "bg-white border-white"
                                                        : "bg-transparent border-gray-300"
                                                }
                                            `}
                                            >
                                                {isSelected && (
                                                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <span
                                                className={`
                                                text-sm font-semibold
                                                ${isSelected ? "text-white/90" : "text-secondary"}
                                            `}
                                            >
                                                {addOn.price} ر.س
                                            </span>
                                        </div>
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
