export interface CartItem {
    id: string // Unique cart item ID
    productId: number // Menu item ID
    name: string
    description: string
    price: number // Base price
    quantity: number
    image: string
    variation?: {
        id: number
        name: string
        price: number
    }
    addons?: Array<{
        id: number
        name: string
        price: number
    }>
    note?: string
    restaurantId?: string | number
}

export interface Cart {
    items: CartItem[]
    restaurantId?: string | number
}

export interface CartSummary {
    itemCount: number
    subtotal: number
    tax: number
    total: number
}
