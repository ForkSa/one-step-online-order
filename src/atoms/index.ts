import { atomWithStorage } from "jotai/utils"

export type StoreInfo = {
    branch: { id: string; name: string } | null
    slug?: string
}

export const storeInfoAtom = atomWithStorage<StoreInfo>("storeInfo", {
    branch: null,
    slug: undefined,
})

// Cart atom with localStorage persistence
export const cartSummary = atomWithStorage<OrderSummaryType>("cartSummary", {
    items: [],
    itemCount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
})
