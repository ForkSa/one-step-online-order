import { apiClient } from "@/lib/api-client"

import type { Restaurant } from "@/types/restaurants"

export const dummyRestaurants = async () => {
    const response = await apiClient<Restaurant[]>({
        method: "GET",
        url: "http://localhost:3001/restaurants",
    })

    return response
}
export const getRestaurant = async (id: string) => {
    const response = await apiClient<Restaurant>({
        method: "GET",
        url: `http://localhost:3001/restaurants/${id}`,
    })
    return response
}
