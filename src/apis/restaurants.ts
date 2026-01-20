import { apiClient } from "@/lib/api-client"

export const getRestaurants = async (params?: string) => {
    const response = await apiClient<ApiResponse<PaginatedApiResponse<RestaurantType>>>({
        method: "GET",
        url: `/restaurants${params ? `?${params}` : ""}`,
    })
    return response
}
