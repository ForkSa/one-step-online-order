import { apiClient } from "@/lib/api-client"

import type { CartItem } from "@/types/cart"

// Get cart from API
export const getCart = async (): Promise<CartItem[]> => {
    try {
        const response = await apiClient<CartItem[]>({
            url: "/cart",
            method: "GET",
        })
        return response
    } catch (error) {
        console.error("Error fetching cart:", error)
        return []
    }
}

// Add item to cart (API)
export const addItemToCartAPI = async (item: CartItem): Promise<CartItem[]> => {
    try {
        const response = await apiClient<CartItem[]>({
            url: "/cart",
            method: "POST",
            data: item,
        })
        return response
    } catch (error) {
        console.error("Error adding item to cart:", error)
        throw error
    }
}

// Update cart item (API)
export const updateCartItemAPI = async (itemId: string, item: Partial<CartItem>): Promise<CartItem[]> => {
    try {
        const response = await apiClient<CartItem[]>({
            url: `/cart/${itemId}`,
            method: "PATCH",
            data: item,
        })
        return response
    } catch (error) {
        console.error("Error updating cart item:", error)
        throw error
    }
}

// Remove item from cart (API)
export const removeCartItemAPI = async (itemId: string): Promise<CartItem[]> => {
    try {
        const response = await apiClient<CartItem[]>({
            url: `/cart/${itemId}`,
            method: "DELETE",
        })
        return response
    } catch (error) {
        console.error("Error removing cart item:", error)
        throw error
    }
}

// Clear cart (API)
export const clearCartAPI = async (): Promise<void> => {
    try {
        await apiClient({
            url: "/cart",
            method: "DELETE",
        })
    } catch (error) {
        console.error("Error clearing cart:", error)
        throw error
    }
}
