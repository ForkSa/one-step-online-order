import { apiClient } from "@/lib/api-client"

export const getStore = async (slug: string) => {
    const response = await apiClient<ApiResponse<RestaurantMenu>>({
        method: "GET",
        url: `/ordering/${slug}`,
    })
    return response
}
