import { useAtomValue } from "jotai"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import { cartSummary } from "@/atoms"
import CartCard from "@/components/cart/card"

interface Props {
    className?: string
}

export default function CartDetails({ className }: Readonly<Props>) {
    const summary = useAtomValue(cartSummary)
    const items = summary?.items ?? []

    const onCancelOrder = () => {
        // eslint-disable-next-line no-console
        console.log("cancel order")
    }

    return (
        <div className={cn("bg-white rounded-2xl", className)}>
            <h1 className="flex items-center p-4 justify-between gap-2 font-semibold text-lg">
                تفاصيل الطلب
                <Button variant="outline" className="border-gray-150 h-11" onClick={onCancelOrder}>
                    إلغاء الطلب
                </Button>
            </h1>

            <div className="flex flex-col mt-2">
                {items.map((item, index) => (
                    <CartCard
                        key={item.product_id}
                        item={item}
                        className={cn(items.length > index + 1 && "border-b border-gray-200")}
                    />
                ))}
            </div>
        </div>
    )
}
