import { useMutation } from "@tanstack/react-query"
import { useAtom, useAtomValue } from "jotai"
import { toast } from "sonner"

import { useNavigate } from "react-router"

import { buildQrPayload, mergeEntryIntoStoreInfo } from "@/lib/entry-context"

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
    const [storeInfo, setStoreInfo] = useAtom(storeInfoAtom)
    const { slug } = useAtomValue(storeInfoAtom)
    const navigate = useNavigate()

    const updateCartMutation = useMutation({
        mutationFn: async (inputs: UpdateCartInputsType) => {
            if (!slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapUpdateCartInputs({
                summaryItems: summary?.items ?? [],
                storeInfo,
                ...inputs,
            })

            const response = await validateCart(mappedInputs, slug)

            return response
        },
        onSuccess: (data: ApiResponse<OrderSummaryResponseType>) => {
            setSummary(data?.data?.summary)

            if (data?.data?.entry) {
                setStoreInfo(mergeEntryIntoStoreInfo(storeInfo, data.data.entry))
            }

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
    const [storeInfo, setStoreInfo] = useAtom(storeInfoAtom)
    const { slug } = useAtomValue(storeInfoAtom)

    const addItemToCart = useMutation({
        mutationFn: async ({ product }: { product: ValidateCartItemType }) => {
            if (!slug) {
                throw new Error("Store slug is required")
            }

            const mappedInputs = mapAddItemToCart({
                summaryItems: summary?.items ?? [],
                product,
                storeInfo,
            })

            const response = await validateCart(mappedInputs, slug)

            return response
        },
        onSuccess: (data: ApiResponse<OrderSummaryResponseType>) => {
            setSummary(data?.data?.summary)

            if (data?.data?.entry) {
                setStoreInfo(mergeEntryIntoStoreInfo(storeInfo, data.data.entry))
            }

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
    storeInfo: import("@/atoms").StoreInfo
} & UpdateCartInputsType

const mapUpdateCartInputs = ({
    summaryItems,
    storeInfo,
    product_id,
    quantity,
    notes,
    difference_id,
    addons,
    index,
}: MapUpdateCartInputs): ValidateCartInputs => {
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
        ...buildQrPayload(storeInfo),
        items,
    }
}

const mapAddItemToCart = ({
    summaryItems,
    product,
    storeInfo,
}: {
    summaryItems: OrderSummaryItemType[]
    product: ValidateCartItemType
    storeInfo: import("@/atoms").StoreInfo
}): ValidateCartInputs => {
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
        ...buildQrPayload(storeInfo),
        items,
    }
}
