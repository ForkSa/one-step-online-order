import { ChevronRight, Plus } from "lucide-react"

import type { MenuItem } from "@/types/restaurants"

interface ProductCardProps {
    item: MenuItem
    handleAddToCart: (e: React.MouseEvent<HTMLButtonElement>, item: MenuItem) => void
    setHoveredItem: (id: number | null) => void
    hoveredItem: number | null
}

export default function ProductCard({ item, handleAddToCart, setHoveredItem, hoveredItem }: ProductCardProps) {
    return (
        <div className="flex p-4">
            <div className="flex-shrink-0">
                <div className="relative">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="size-[70px] md:w-24 md:h-24 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
            </div>

            <div className="flex-1 pr-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item?.name}</h3>
                        <p className="text-lg font-bold text-secondary whitespace-nowrap mr-2">{item.price} ر.س</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>

                    <button
                        onClick={(e) => handleAddToCart(e, item)}
                        onMouseEnter={() => setHoveredItem(item?.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="p-2 rounded-xl border border-primary text-primary transition-all duration-200 flex items-center justify-center hover:bg-primary hover:text-white"
                        aria-label="Add to cart"
                    >
                        {hoveredItem === item?.id ? (
                            <Plus className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
