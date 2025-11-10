import { useAtomValue } from "jotai"

import { cartSummaryAtom } from "@/atoms"

export default function OrderSummary() {
    const summary = useAtomValue(cartSummaryAtom)
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4">
            <h3 className="text-xl font-bold text-gray-900">ملخص الطلب</h3>
            <p className=" font-medium text-sm flex items-center justify-between mt-4">
                عدد المنتجات في السلة <span className=" font-bold text-gray-150">{summary.itemCount}</span>
            </p>
            <p className=" font-medium text-sm flex items-center justify-between mt-2">
                إجمالي السعر بدون الضريبة
                <span className=" font-bold text-gray-150">{summary.subtotal.toFixed(2)} ر.س</span>
            </p>
            <p className=" font-medium text-sm flex items-center justify-between mt-2">
                قيمة الضريبة<span className=" font-bold text-gray-150">{summary.tax.toFixed(2)} ر.س</span>
            </p>
            <p className=" font-medium text-sm flex items-center justify-between mt-4">
                الإجمالي النهائي<span className=" font-bold  text-primary">{summary.total.toFixed(2)} ر.س</span>
            </p>
        </div>
    )
}
