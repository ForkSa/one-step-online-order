import { cn } from "@/lib/utils"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

type Props = {
    className?: string
}

export default function Hero({ className }: Props) {
    return (
        <div className={cn("px-4 mt-6", className)}>
            <Carousel
                opts={{
                    align: "center",
                }}
                className="w-full"
            >
                <CarouselContent className="gap-4">
                    <CarouselItem className="w-[calc(100%-2rem)]">
                        <div className="h-44 bg-gray-300 w-full rounded-3xl"></div>
                    </CarouselItem>
                    <CarouselItem className="w-auto">
                        <div className="h-44 bg-gray-300 w-full rounded-3xl"></div>
                    </CarouselItem>
                    <CarouselItem className="w-auto">
                        <div className="h-44 bg-gray-300 w-full rounded-3xl"></div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}
