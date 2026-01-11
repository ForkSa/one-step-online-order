import { useAtomValue } from "jotai"

import { cn } from "@/lib/utils"

import { cartSummary } from "@/atoms"

type Props = {
    className?: string
}

export default function OrderSummary({ className }: Props) {
    const summary = useAtomValue(cartSummary)

    const itemCount = summary?.items?.length ?? 0
    const subtotal = summary?.subtotal ?? 0
    const tax = summary?.tax ?? 0
    const total = summary?.total ?? 0

    return (
        <div className={cn("bg-white rounded-2xl p-4", className)}>
            <h3 className="text-lg font-semibold">ملخص الطلب</h3>

            <dl className="mt-4 flex flex-col gap-y-2 text-sm ">
                <div className="flex items-center justify-between">
                    <dt>عدد المنتجات في السلة</dt>
                    <dd className="text-gray-700">{itemCount}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt>إجمالي السعر بدون الضريبة</dt>
                    <dd className="text-gray-700">{subtotal.toFixed(2)} ر.س</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt>قيمة الضريبة</dt>
                    <dd className="text-gray-700">{tax.toFixed(2)} ر.س</dd>
                </div>
                <div className="flex items-center justify-between font-bold">
                    <dt>المجموع الكلي</dt>
                    <dd className="text-primary">{total.toFixed(2)} ر.س</dd>
                </div>
            </dl>
        </div>
    )
}
