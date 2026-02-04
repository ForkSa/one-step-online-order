import { useAtomValue } from "jotai"
import { PencilIcon } from "lucide-react"

import { useMemo } from "react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import CounterInput from "@/components/ui/counter-input"

import { storeInfoAtom } from "@/atoms"
import { useUpdateCart } from "@/hooks/use-cart"

type Props = {
    className?: string
    item: OrderSummaryItemType
    index: number
}

export default function CartCard({ className, item, index }: Readonly<Props>) {
    const { slug } = useAtomValue(storeInfoAtom)
    const { mutate: updateCart, isPending } = useUpdateCart()

    const handleQuantityChange = (value: number) => {
        updateCart({
            product_id: Number(item?.product_id),
            quantity: value,
            index,
            addons:
                item?.addons?.map((addon) => ({
                    addon_id: addon?.addon_id,
                    quantity: value,
                })) ?? [],
        })
    }

    const onEditCartItem = useMemo(() => {
        return `/restaurant/${slug}/product/${item?.product_id}?isEdit=true&productId=${item?.product_id}&index=${index}`
    }, [slug, item, index])

    return (
        <div className={cn("p-4", className)}>
            <div className="flex gap-x-3">
                <img
                    src={item?.product_image}
                    alt={item?.product_name}
                    className="size-18 aspect-square object-cover rounded-2xl shrink-0"
                />

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

            <div className="flex flex-col gap-y-2 mt-4">
                {item?.difference_name && (
                    <p className="text-sm font-medium text-gray-600">
                        الاختلاف : <span className="text-black">{item?.difference_name}</span>
                    </p>
                )}

                {item?.addons?.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-gray-600">الاضافات :</p>

                        <ul className="grid grid-cols-2 gap-2 text-sm">
                            {item?.addons?.map((addon) => (
                                <li key={addon?.addon_id} className="py-1 rounded-md">
                                    - {addon?.name} x<span className="font-bold">{addon?.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex gap-x-2 mt-3">
                <Button variant="outline" className="text-chart-5 h-11 flex-1" asChild>
                    <Link to={onEditCartItem}>
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
