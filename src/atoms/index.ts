import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import type { Cart, CartItem, CartSummary } from "@/types/cart"

// Cart atom with localStorage persistence
export const cartAtom = atomWithStorage<Cart>("cart", {
    items: [],
    restaurantId: undefined,
})

// Derived atoms for cart operations
export const cartItemsAtom = atom(
    (get) => get(cartAtom).items,
    (get, set, newItems: CartItem[]) => {
        const currentCart = get(cartAtom)
        set(cartAtom, {
            ...currentCart,
            items: newItems,
        })
    }
)

// Helper function to check if two cart items are identical
const areItemsIdentical = (item1: CartItem, item2: CartItem): boolean => {
    // Check productId
    if (item1.productId !== item2.productId) return false

    // Check restaurantId
    if (item1.restaurantId !== item2.restaurantId) return false

    // Check variation
    const variation1Id = item1.variation?.id
    const variation2Id = item2.variation?.id
    if (variation1Id !== variation2Id) return false

    // Check addons - compare sorted addon IDs
    const addons1Ids =
        item1.addons
            ?.map((a) => a.id)
            .sort()
            .join(",") || ""
    const addons2Ids =
        item2.addons
            ?.map((a) => a.id)
            .sort()
            .join(",") || ""
    if (addons1Ids !== addons2Ids) return false

    // Check note - treat empty string and undefined as the same (no note)
    const note1 = item1.note?.trim() || ""
    const note2 = item2.note?.trim() || ""
    if (note1 !== note2) return false

    // Items are identical
    return true
}

// Add item to cart - checks for duplicates and increments quantity if found
// Also ensures all items are from the same restaurant
export const addToCartAtom = atom(null, (get, set, item: CartItem) => {
    const cart = get(cartAtom)
    const newRestaurantId = item.restaurantId

    // Validate that item has a restaurantId
    if (!newRestaurantId) {
        // Cannot add item to cart without restaurantId
        return
    }

    // Check if cart has items from a different restaurant
    // Only clear if cart has items AND has a restaurantId AND it's different
    const hasDifferentRestaurant =
        cart.items.length > 0 &&
        cart.restaurantId !== undefined &&
        cart.restaurantId !== null &&
        String(cart.restaurantId) !== String(newRestaurantId)

    // If adding item from different restaurant, clear cart first
    if (hasDifferentRestaurant) {
        // Clear cart and start fresh with new restaurant
        const uniqueId =
            item.id ||
            `${item.productId}-${item.variation?.id || "default"}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

        const newItem: CartItem = {
            ...item,
            id: uniqueId,
            quantity: item.quantity || 1,
            restaurantId: newRestaurantId,
        }

        set(cartAtom, {
            items: [newItem],
            restaurantId: newRestaurantId,
        })
        return
    }

    // Same restaurant - proceed with normal add logic
    // Find if an identical item already exists
    const existingItemIndex = cart.items.findIndex((existingItem) => areItemsIdentical(existingItem, item))

    if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        const updatedItems = cart.items.map((existingItem, index) => {
            if (index === existingItemIndex) {
                return {
                    ...existingItem,
                    quantity: existingItem.quantity + (item.quantity || 1),
                }
            }
            return existingItem
        })

        set(cartAtom, {
            ...cart,
            items: updatedItems,
            restaurantId: newRestaurantId || cart.restaurantId,
        })
    } else {
        // Item doesn't exist, add as new item
        // Generate unique ID if not provided
        let uniqueId = item.id
        const existingIds = new Set(cart.items.map((i) => i.id))
        if (!uniqueId || existingIds.has(uniqueId)) {
            // Generate unique ID with timestamp
            uniqueId = `${item.productId}-${item.variation?.id || "default"}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }

        const newItem: CartItem = {
            ...item,
            id: uniqueId,
            quantity: item.quantity || 1,
        }

        set(cartAtom, {
            ...cart,
            items: [...cart.items, newItem],
            restaurantId: newRestaurantId || cart.restaurantId,
        })
    }
})

// Remove item from cart
export const removeFromCartAtom = atom(null, (get, set, itemId: string) => {
    const cart = get(cartAtom)
    const updatedItems = cart.items.filter((item) => item.id !== itemId)

    // If cart is empty after removal, clear restaurantId
    const updatedCart: Cart = {
        items: updatedItems,
        restaurantId: updatedItems.length === 0 ? undefined : cart.restaurantId,
    }

    set(cartAtom, updatedCart)
})

// Update item quantity
export const updateQuantityAtom = atom(null, (get, set, { itemId, quantity }: { itemId: string; quantity: number }) => {
    const cart = get(cartAtom)
    if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedItems = cart.items.filter((item) => item.id !== itemId)
        set(cartAtom, {
            items: updatedItems,
            restaurantId: updatedItems.length === 0 ? undefined : cart.restaurantId,
        })
    } else {
        const updatedItems = cart.items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        set(cartAtom, {
            ...cart,
            items: updatedItems,
        })
    }
})

// Increment item quantity
export const incrementQuantityAtom = atom(null, (get, set, itemId: string) => {
    const cart = get(cartAtom)
    const updatedItems = cart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    )
    set(cartAtom, {
        ...cart,
        items: updatedItems,
    })
})

// Decrement item quantity
export const decrementQuantityAtom = atom(null, (get, set, itemId: string) => {
    const cart = get(cartAtom)
    const updatedItems = cart.items
        .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
        .filter((item) => item.quantity > 0) // Remove items with quantity 0

    set(cartAtom, {
        items: updatedItems,
        restaurantId: updatedItems.length === 0 ? undefined : cart.restaurantId,
    })
})

export const clearCartAtom = atom(null, (_get, set) => {
    set(cartAtom, {
        items: [],
        restaurantId: undefined,
    })
})

export const cartSummaryAtom = atom((get): CartSummary => {
    const cart = get(cartAtom)
    const items = cart.items

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const subtotal = items.reduce((sum, item) => {
        const itemPrice = item.price + (item.variation?.price || 0)
        const addonsPrice = item.addons?.reduce((addonSum, addon) => addonSum + addon.price, 0) || 0
        return sum + (itemPrice + addonsPrice) * item.quantity
    }, 0)

    const taxRate = 0.15
    const tax = subtotal * taxRate
    const total = subtotal + tax

    return {
        itemCount,
        subtotal,
        tax,
        total,
    }
})

export const getItemTotalPrice = (item: CartItem): number => {
    const itemPrice = item.price + (item.variation?.price || 0)
    const addonsPrice = item.addons?.reduce((addonSum, addon) => addonSum + addon.price, 0) || 0
    return (itemPrice + addonsPrice) * item.quantity
}
