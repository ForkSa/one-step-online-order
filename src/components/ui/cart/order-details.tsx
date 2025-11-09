import { useAtom, useAtomValue } from "jotai"
import { Edit, Minus, Plus, Trash } from "lucide-react"

import {
    cartItemsAtom,
    clearCartAtom,
    decrementQuantityAtom,
    getItemTotalPrice,
    incrementQuantityAtom,
    removeFromCartAtom,
} from "@/atoms"
import type { CartItem } from "@/types/cart"

import { Button } from "../button"

interface OrderDetailsProps {
    onCancelOrder?: () => void
}

export default function OrderDetails({ onCancelOrder }: OrderDetailsProps) {
    const items = useAtomValue(cartItemsAtom)
    const [, clearCart] = useAtom(clearCartAtom)
    const [, incrementQuantity] = useAtom(incrementQuantityAtom)
    const [, decrementQuantity] = useAtom(decrementQuantityAtom)
    const [, removeItem] = useAtom(removeFromCartAtom)

    const handleCancelOrder = () => {
        clearCart()
        onCancelOrder?.()
    }

    const handleIncrement = (itemId: string) => {
        incrementQuantity(itemId)
    }

    const handleDecrement = (itemId: string) => {
        decrementQuantity(itemId)
    }

    const handleRemove = (itemId: string) => {
        removeItem(itemId)
    }

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-8 text-center">
                <p className="text-gray-500 text-lg">السلة فارغة</p>
            </div>
        )
    }
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-900">تفاصيل الطلب</h1>
                        <Button
                            variant="outline"
                            className="py-2 px-4  text-gray-800 border border-gray-border "
                            onClick={handleCancelOrder}
                        >
                            إلغاء الطلب
                        </Button>
                    </div>
                </div>

                <div>
                    {items.map((item: CartItem) => {
                        const itemTotal = getItemTotalPrice(item)
                        const addonsText = item.addons?.map((addon) => addon.name).join("، ") || ""
                        const variationText = item.variation ? ` - ${item.variation.name}` : ""
                        const description = `${item.description}${variationText}${addonsText ? ` - ${addonsText}` : ""}`

                        return (
                            <div key={item.id} className="p-4 border-b border-gray-border overflow-hidden ">
                                <div className="flex gap-4">
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="size-20 rounded-xl object-cover"
                                            onError={(e) => {
                                                // Fallback image if loading fails
                                                e.currentTarget.src = "https://via.placeholder.com/80?text=No+Image"
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2 mb-1">
                                            <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                                            <span className="font-bold text-secondary whitespace-nowrap">
                                                {itemTotal.toFixed(2)} ر.س
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
                                    </div>
                                </div>
                                <div className=" mt-2 flex items-center gap-2 justify-between ">
                                    <Button
                                        variant="outline"
                                        className=" border  !rounded-[12px]  basis-[60%] border-gray-100 hover:bg-white !text-text-warn py-3"
                                        onClick={() => {}}
                                    >
                                        <Edit className=" text-text-warn" /> تعديل
                                    </Button>
                                    <div className="flex shrink-0  basis-[35%]  justify-between items-center gap-2 border border-gray-border rounded-[12px] p-[6px]">
                                        <button
                                            onClick={() => handleIncrement(item.id)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg  bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors"
                                            aria-label="زيادة الكمية"
                                        >
                                            <Plus className="w-4 h-4 text-white " />
                                        </button>
                                        <span className="font-semibold text-gray-900 min-w-[24px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                item.quantity === 1 ? handleRemove(item.id) : handleDecrement(item.id)
                                            }
                                            className="w-7 h-7 flex items-center justify-center rounded-lg border  cursor-pointer hover:bg-red-50 transition-colors"
                                            aria-label="تقليل الكمية"
                                        >
                                            {item.quantity === 1 ? (
                                                <Trash className="w-4 h-4 text-red-600 " />
                                            ) : (
                                                <Minus className="w-4 h-4 text-red-600 " />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
