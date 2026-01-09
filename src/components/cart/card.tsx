import { useAtomValue } from "jotai"
import { PencilIcon } from "lucide-react"

import { Link } from "react-router"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import CounterInput from "@/components/ui/counter-input"

import hero from "@/assets/images/burger-imge.webp"
import { storeInfoAtom } from "@/atoms"
import { useUpdateCart } from "@/hooks/use-cart"

type Props = {
    className?: string
    item: OrderSummaryItemType
}

export default function CartCard({ className, item }: Readonly<Props>) {
    const { slug } = useAtomValue(storeInfoAtom)
    const { mutate: updateCart, isPending } = useUpdateCart()

    const handleQuantityChange = (value: number) => {
        updateCart({
            itemId: item?.product_id.toString(),
            quantity: value,
        })
    }

    return (
        <div className={cn("p-4", className)}>
            <div className="flex gap-x-3">
                <img src={hero} alt={""} className="size-18 aspect-square object-cover rounded-2xl shrink-0" />

                <div className="w-full">
                    <div className="flex justify-between gap-x-4">
                        <p className="flex gap-x-2 items-start">
                            <span className="line-clamp-2">{item?.product_name}</span>
                            <span className="size-8 grid place-items-center text-xs bg-gray-200 text-primary rounded-lg shrink-0">
                                x {item?.quantity}
                            </span>
                        </p>

                        <p className="font-medium text-secondary shrink-0 max-w-24">{item?.total?.toFixed(2)} ر.س</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-x-2 mt-3">
                <Button variant="outline" className="text-chart-5 h-11 flex-1" asChild>
                    <Link to={`/store/${slug}/product/${item?.product_id}`}>
                        <PencilIcon className="size-4" />
                        تعديل
                    </Link>
                </Button>

                <CounterInput
                    className="shrink-0"
                    value={item?.quantity}
                    onChange={handleQuantityChange}
                    loading={isPending}
                />
            </div>
        </div>
    )
}
