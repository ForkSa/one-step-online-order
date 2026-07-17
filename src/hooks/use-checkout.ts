import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { toast } from "sonner"

import { useNavigate } from "react-router"

import { buildQrPayload } from "@/lib/entry-context"
import { setSessionId } from "@/lib/ordering-session"

import { checkout } from "@/apis/checkout"
import type { StoreInfo } from "@/atoms"
import { cartSummary, storeInfoAtom } from "@/atoms"
import { payTypes } from "@/components/forms/checkout/schema"



export const useCheckout = () => {
    const [summary, setSummary] = useAtom(cartSummary)
    const [storeInfo, setStoreInfo] = useAtom(storeInfoAtom)
    const navigate = useNavigate()

    const checkoutMutation = useMutation({
        mutationFn: async (inputs: CheckoutPageInputs) => {
            if (!storeInfo?.slug) {
                throw new Error("Store slug is required")
            }

            if (!summary) {
                throw new Error("Summary is required")
            }

            const mappedInputs = mapCheckoutInputs(inputs, summary, storeInfo)

            const response = await checkout(mappedInputs, storeInfo.slug, storeInfo.session_id || "")
            return response
        },
        onSuccess: (data: ApiResponse<CheckoutResponse>) => {
            toast.success("تم إنشاء الطلب")

            if (data?.data?.order?.session_id) {
                setSessionId(data.data.order.session_id)
                setStoreInfo((prev) => ({ ...prev, session_id: data.data.order.session_id }))
            }

            navigate("/success")

            setSummary({
                items: [],
                itemCount: 0,
                subtotal: 0,
                tax: 0,
                total: 0,
            })
        },
        onError: (error: Error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            toast.error("حدث خطأ ما تأكد من الطلب")
        },
    })

    return checkoutMutation
}

export const mapCheckoutInputs = (
    inputs: CheckoutPageInputs,
    summary: OrderSummaryType,
    storeInfo: StoreInfo
): CheckoutInputs => {
    const items =
        summary?.items?.map((item) => ({
            product_id: item?.product_id,
            quantity: item?.quantity ?? 1,
            notes: item?.notes ?? "",
            ...(item?.difference_id !== null && { difference_id: item?.difference_id }),
            addons: item.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: addon.quantity })) ?? [],
        })) ?? []

    const total = summary?.total ?? 0

    const base: CheckoutInputs = {
        ...buildQrPayload(storeInfo),
        payment_method: Number(inputs.payType),
        paid_with_cash: inputs?.payType === payTypes.CASH || inputs?.payType === payTypes.WALLET ? total : 0,
        paid_with_visa: inputs?.payType === payTypes.CARD || inputs?.payType === payTypes.WALLET ? total : 0,
        order_note: "",
        items,
    }

    if (storeInfo.source === "branch" || storeInfo.branch_qr) {
        const orderType = inputs.orderType ?? storeInfo.order_type ?? "dine-in"

        return {
            ...base,
            order_type: orderType,
            ...(orderType === "dine-in" && inputs.tableNumber ? { table_number: inputs.tableNumber } : {}),
        }
    }

    return base
}
