import { createStore } from "jotai"
import { atomWithStorage } from "jotai/utils"

export type StoreInfo = {
    branch: { id: string; name: string } | null
    slug?: string
    source?: EntryContextSource
    qr?: string
    branch_qr?: string
    order_type?: string
    available_order_types?: string[] | null
    table?: EntryContextTable
    session_id?: string
    organization?: { name: string; logo: string }
}

export const defaultStoreInfo: StoreInfo = {
    branch: null,
    slug: undefined,
}

export const storeInfoAtom = atomWithStorage<StoreInfo>("storeInfo", defaultStoreInfo)

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
