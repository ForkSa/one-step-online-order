import { createStore } from "jotai"
import { atomWithStorage } from "jotai/utils"

export type StoreInfo = {
    branch: { id: string; name: string } | null
    slug?: string
}

export const storeInfoAtom = atomWithStorage<StoreInfo>("storeInfo", {
    branch: null,
    slug: undefined,
})

// Shared store instance for use outside React components (e.g., in loaders)
export const jotaiStore = createStore()

// Cart atom with localStorage persistence
export const cartSummary = atomWithStorage<OrderSummaryType>("cartSummary", {
    items: [],
    itemCount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
})
