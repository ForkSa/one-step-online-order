import { useMutation } from "@tanstack/react-query"
import { useAtom, useAtomValue } from "jotai"
import { toast } from "sonner"

import { useNavigate } from "react-router"

import { checkout } from "@/apis/checkout"
import { cartSummary, storeInfoAtom } from "@/atoms"

export const useCheckout = () => {
    const [summary, setSummary] = useAtom(cartSummary)
    const branchInfo = useAtomValue(storeInfoAtom)
    const navigate = useNavigate()

    const checkoutMutation = useMutation({
        mutationFn: async (inputs: CheckoutPageInputs) => {
            if (!branchInfo?.branch?.id) {
                throw new Error("Branch ID is required")
            }

            if (!summary) {
                throw new Error("Summary is required")
            }

            if (!branchInfo?.slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapCheckoutInputs(inputs, summary, branchInfo?.branch?.id)

            const response = await checkout(mappedInputs, branchInfo?.slug ?? "")
            return response
        },
        onSuccess: () => {
            toast.success("تم إنشاء الطلب")

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
    branchId: string
): CheckoutInputs => {
    return {
        order_type: "dine-in",
        table_number: inputs.tableNumber,
        payment_method: Number(inputs?.payType),
        paid_with_cash: summary?.total ?? 0,
        paid_with_visa: 0,
        branch_id: Number(branchId),
        order_note: "",
        items: summary?.items?.map((item) => ({
            product_id: item?.product_id,
            quantity: item?.quantity ?? 1,
            notes: item?.notes ?? "",
            ...(item?.difference_id !== null && { difference_id: item?.difference_id }),
            addons: item.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: addon.quantity })) ?? [],
        })),
    }
}
