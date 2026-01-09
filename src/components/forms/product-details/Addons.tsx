import { cn } from "@/lib/utils"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"

interface Props {
    product: Product | null
    className?: string
    onChange?: (value: number[]) => void
    value?: number[]
}
export default function ProductDetailsAddons({ product, className, onChange, value }: Readonly<Props>) {
    const addons = product?.addons ?? []

    if (addons.length === 0) return null

    const handleChange = (checked: boolean, addonId: number) => {
        if (checked) {
            onChange?.([...(value ?? []), addonId])
        } else {
            onChange?.([...(value?.filter((id: number) => id !== addonId) ?? [])])
        }
    }

    return (
        <div className={cn("mt-6", className)}>
            <h3 className="font-medium">الإضافات</h3>

            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                    containScroll: "trimSnaps",
                }}
                className="w-full"
            >
                <CarouselContent className="mt-3">
                    {addons.map((addOn: Addon) => {
                        return (
                            <CarouselItem key={addOn.id} className="pl-2 md:pl-3 basis-auto">
                                <label
                                    htmlFor={`addon-${addOn.id}`}
                                    className="flex items-center gap-x-4 border border-gray-150 rounded-xl px-3 py-2"
                                >
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-sm font-semibold text-gray-700">{addOn?.name?.ar}</p>
                                        <p className="text-xs font-semibold text-secondary">{addOn?.price} ر.س</p>
                                    </div>
                                    <Checkbox
                                        id={`addon-${addOn.id}`}
                                        className="shrink-0"
                                        checked={value?.includes(addOn?.id)}
                                        onCheckedChange={(checked) => {
                                            handleChange(checked as boolean, addOn?.id)
                                        }}
                                    />
                                </label>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
