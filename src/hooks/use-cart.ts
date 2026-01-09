import { useMutation } from "@tanstack/react-query"
import { useAtom, useAtomValue } from "jotai"
import { toast } from "sonner"

import { validateCart } from "@/apis/cart"
import { cartSummary, storeInfoAtom } from "@/atoms"

export const useValidateCart = () => {
    const [summary, setSummary] = useAtom(cartSummary)
    const branchInfo = useAtomValue(storeInfoAtom)
    const { slug } = useAtomValue(storeInfoAtom)

    const validateCartMutation = useMutation({
        mutationFn: async ({ product }: { product: ValidateCartItemType }) => {
            if (!slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapValidateCartInputs({
                summaryItems: summary?.items ?? [],
                product,
                branchId: branchInfo?.branch?.id ?? "",
            })

            const response = await validateCart(mappedInputs, slug)

            return response
        },
        onSuccess: (data: ApiResponse<OrderSummaryResponseType>) => {
            setSummary(data?.data?.summary)
            toast.success("تم إضافة المنتج إلى السلة")
        },
        onError: (error: Error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            toast.error("حدث خطأ ما تأكد من المنتج")
        },
    })

    return validateCartMutation
}

export const useUpdateCart = () => {
    const [summary, setSummary] = useAtom(cartSummary)
    const branchInfo = useAtomValue(storeInfoAtom)
    const { slug } = useAtomValue(storeInfoAtom)

    const updateCartMutation = useMutation({
        mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
            if (!slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapUpdateCartInputs({
                summaryItems: summary?.items ?? [],
                itemId,
                quantity,
                branchId: branchInfo?.branch?.id ?? "",
            })

            const response = await validateCart(mappedInputs, slug)

            return response
        },
        onSuccess: (data: ApiResponse<OrderSummaryResponseType>) => {
            setSummary(data?.data?.summary)
            toast.success("تم تحديث السلة")
        },
        onError: (error: Error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            toast.error("حدث خطأ ما تأكد من المنتج")
        },
    })

    return updateCartMutation
}

const mapUpdateCartInputs = ({
    summaryItems,
    itemId,
    quantity,
    branchId,
}: {
    summaryItems: OrderSummaryItemType[]
    itemId: string
    quantity: number
    branchId: string
}) => {
    const items: ValidateCartItemType[] = summaryItems?.map((item) => {
        return {
            product_id: item?.product_id,
            quantity: item?.product_id === Number(itemId) ? quantity : item?.quantity,
            note: item?.notes ?? "",
            ...(item.difference_id !== null && { difference_id: item.difference_id }),
            addons: item.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: addon?.quantity })) ?? [],
        }
    })

    return {
        branch_id: branchId,
        items,
    }
}

const mapValidateCartInputs = ({
    summaryItems,
    product,
    branchId,
}: {
    summaryItems: OrderSummaryItemType[]
    product: ValidateCartItemType
    branchId: string
}) => {
    const dampData = summaryItems

    let items: ValidateCartItemType[] = []

    // if there are items in the cart, update the existing product
    if (dampData?.length > 0) {
        const findItem = dampData?.find((item) => item?.product_id === product?.product_id)

        items = dampData?.map((item) => {
            // If this is the product being added, update it with new data and increase quantity
            if (item?.product_id === product?.product_id) {
                return {
                    product_id: product.product_id,
                    quantity: item.quantity + 1,
                    note: product?.note ?? item?.notes,
                    ...(product?.difference_id !== undefined && { difference_id: product?.difference_id }),
                    addons: product?.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: 1 })) ?? [],
                }
            }
            // Keep other items as they are, but convert to ValidateCartItemType format
            return {
                product_id: item?.product_id,
                quantity: item?.quantity,
                note: item?.notes ?? "",
                ...(item.difference_id !== null && { difference_id: item.difference_id }),
                addons: item.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: addon?.quantity })) ?? [],
            }
        })

        // If product doesn't exist in cart, add it
        if (!findItem) {
            items?.push({
                product_id: product.product_id,
                quantity: 1,
                note: product?.note,
                ...(product?.difference_id !== undefined && { difference_id: product?.difference_id }),
                addons: product?.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: 1 })) ?? [],
            })
        }
    }

    // if there are no items in the cart, add the new product
    if (dampData.length === 0) {
        items = [
            {
                product_id: product?.product_id,
                quantity: 1,
                note: product?.note,
                ...(product?.difference_id && { difference_id: product?.difference_id }),
                addons: product?.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: 1 })),
            },
        ]
    }

    return {
        branch_id: branchId,
        items,
    }
}
