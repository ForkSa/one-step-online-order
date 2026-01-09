import { apiClient } from "@/lib/api-client"

export const getStore = async (slug: string) => {
    const response = await apiClient<ApiResponse<StoreMenu>>({
        method: "GET",
        url: `/ordering/${slug}`,
    })
    return response
}
