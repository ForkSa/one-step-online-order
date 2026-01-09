import { cn } from "@/lib/utils"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Props {
    product: Product | null
    className?: string
    onChange?: (value: number) => void
    value?: number
    isError?: boolean
}

export default function ProductDetailsDifferences({
    product,
    className,
    onChange,
    value,
    isError = false,
}: Readonly<Props>) {
    const differences = product?.differences ?? []

    if (differences.length === 0) return null

    return (
        <div className={cn("mt-6", className)}>
            <h3 className="font-medium">الإختلافات</h3>

            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                    containScroll: "trimSnaps",
                }}
                className="w-full"
            >
                <RadioGroup
                    value={String(value)}
                    onValueChange={(value) => {
                        onChange?.(Number(value))
                    }}
                    dir="rtl"
                >
                    <CarouselContent className="mt-3">
                        {differences.map((difference: ProductDifference) => {
                            return (
                                <CarouselItem key={difference.id} className="pl-2 md:pl-3 basis-auto">
                                    <label
                                        htmlFor={`difference-${difference?.id}`}
                                        className={cn(
                                            "flex flex-col gap-2 border border-gray-150 rounded-xl p-3 min-w-[170px] justify-between min-h-[80px]",
                                            isError && "border-destructive"
                                        )}
                                    >
                                        <p
                                            className={cn(
                                                "text-sm font-semibold text-gray-700 flex items-center gap-x-2 justify-between",
                                                isError && "text-destructive border-destructive"
                                            )}
                                        >
                                            {difference?.name?.ar}
                                            <RadioGroupItem
                                                value={String(difference?.id)}
                                                id={`difference-${difference?.id}`}
                                                className={cn("shrink-0 size-4.5", isError && "border-destructive")}
                                            />
                                        </p>
                                        <p className="text-xs font-semibold text-secondary">{difference?.price} ر.س</p>
                                    </label>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </RadioGroup>
            </Carousel>
        </div>
    )
}
