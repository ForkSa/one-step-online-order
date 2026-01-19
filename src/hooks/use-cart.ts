import { useMutation } from "@tanstack/react-query"
import { useAtom, useAtomValue } from "jotai"
import { toast } from "sonner"

import { useNavigate } from "react-router"

import { validateCart } from "@/apis/cart"
import { cartSummary, storeInfoAtom } from "@/atoms"

export type UpdateCartInputsType = {
    product_id: number
    quantity?: number
    notes?: string
    difference_id?: number | string
    addons?: { addon_id?: number | string; quantity?: number }[]
    index: number
}

export const useUpdateCart = () => {
    const [summary, setSummary] = useAtom(cartSummary)
    const branchInfo = useAtomValue(storeInfoAtom)
    const { slug } = useAtomValue(storeInfoAtom)
    const navigate = useNavigate()

    const updateCartMutation = useMutation({
        mutationFn: async (inputs: UpdateCartInputsType) => {
            if (!slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapUpdateCartInputs({
                summaryItems: summary?.items ?? [],
                branchId: branchInfo?.branch?.id ?? "",
                ...inputs,
            })

            const response = await validateCart(mappedInputs, slug)

            return response
        },
        onSuccess: (data: ApiResponse<OrderSummaryResponseType>) => {
            setSummary(data?.data?.summary)
            navigate("/checkout")
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

export const useAddItemToCart = () => {
    const [summary, setSummary] = useAtom(cartSummary)
    const branchInfo = useAtomValue(storeInfoAtom)
    const { slug } = useAtomValue(storeInfoAtom)

    const addItemToCart = useMutation({
        mutationFn: async ({ product }: { product: ValidateCartItemType }) => {
            if (!slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapAddItemToCart({
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

    return addItemToCart
}

type MapUpdateCartInputs = {
    summaryItems: OrderSummaryItemType[]
    branchId: string
} & UpdateCartInputsType

/**
 * Maps the input data to the format required for the validateCart API.
 *
 * @param {MapUpdateCartInputs} params - The input data.
 * @param {OrderSummaryItemType[]} params.summaryItems - The existing items in the cart.
 * @param {string} params.branchId - The ID of the branch.
 * @param {number} params.product_id - The ID of the product to be updated.
 * @param {number} [params.quantity] - The new quantity of the product.
 * @param {string} [params.notes] - The new notes of the product.
 * @param {number|string} [params.difference_id] - The new difference ID of the product.
 * @param {{ addon_id: number|string; quantity?: number }[]} [params.addons] - The new addons of the product.
 * @param {number} [params.index] - The index of the item to be updated in the summary items.
 * @returns {ValidateCartInputs} The mapped data.
 */
const mapUpdateCartInputs = ({
    summaryItems,
    branchId,
    product_id,
    quantity,
    notes,
    difference_id,
    addons,
    index,
}: MapUpdateCartInputs) => {
    const items: ValidateCartItemType[] = summaryItems?.map((item, itemIndex) => {
        const isMatchingItem = item?.product_id === Number(product_id) && (index === undefined || itemIndex === index)

        return {
            product_id: item?.product_id,
            quantity: isMatchingItem && quantity !== undefined ? quantity : item?.quantity,
            notes: isMatchingItem && notes !== undefined ? notes : item?.notes,
            ...(isMatchingItem && difference_id !== undefined
                ? { difference_id }
                : item.difference_id !== null && { difference_id: item.difference_id }),
            addons:
                isMatchingItem && addons !== undefined
                    ? addons.map((addon) => ({ addon_id: addon.addon_id, quantity: addon?.quantity ?? 1 }))
                    : (item.addons?.map((addon) => ({ addon_id: addon.addon_id, quantity: addon?.quantity ?? 1 })) ??
                      []),
        }
    })

    return {
        branch_id: branchId,
        items,
    }
}

/**
 * Maps the input data to the format required for the validateCart API.
 *
 * @param {Object} params - The input data.
 * @param {OrderSummaryItemType[]} params.summaryItems - The existing items in the cart.
 * @param {ValidateCartItemType} params.product - The product to be added to the cart.
 * @param {string} params.branchId - The ID of the branch.
 * @returns {Object} The mapped data.
 */
const mapAddItemToCart = ({
    summaryItems,
    product,
    branchId,
}: {
    summaryItems: OrderSummaryItemType[]
    product: ValidateCartItemType
    branchId: string
}) => {
    const cartItems = summaryItems ?? []

    const mapItem = (item: ValidateCartItemType | OrderSummaryItemType): ValidateCartItemType => ({
        product_id: item.product_id,
        quantity: item.quantity ?? 1,
        notes: item.notes ?? "",
        ...(item.difference_id != null && { difference_id: item.difference_id }),
        addons:
            item.addons?.map((addon) => ({
                addon_id: addon.addon_id,
                quantity: addon.quantity ?? 1,
            })) ?? [],
    })

    const items: ValidateCartItemType[] = [...cartItems.map(mapItem), mapItem(product)]

    return {
        branch_id: branchId,
        items,
    }
}
