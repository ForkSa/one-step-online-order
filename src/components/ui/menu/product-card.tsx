import { useAtomValue } from "jotai"
import { ChevronRight, PlusIcon } from "lucide-react"

import { cartSummary } from "@/atoms"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const summary = useAtomValue(cartSummary)

    const isInCart = summary?.items?.some((item) => item?.product_id === product?.id)

    const Icon = isInCart ? PlusIcon : ChevronRight

    return (
        <div className="flex p-4">
            <div className="flex-shrink-0">
                <div className="relative">
                    <img
                        src={product?.image ?? ""}
                        alt={product?.name?.ar ?? ""}
                        loading="lazy"
                        className="size-[70px] md:w-24 md:h-24 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
            </div>

            <div className="flex-1 pr-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product?.name?.ar ?? ""}</h3>
                        <p className="text-lg font-bold text-secondary whitespace-nowrap mr-2">
                            {product.price ?? ""} ر.س
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {product?.description?.ar ?? ""}
                    </p>

                    <button
                        className="p-2 rounded-xl border border-primary text-primary transition-all duration-200 flex items-center justify-center hover:bg-primary hover:text-white"
                        aria-label="Add to cart"
                    >
                        <Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
