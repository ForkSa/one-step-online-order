import { apiClient } from "@/lib/api-client"

export const getCategories = async (slug: string) => {
    const response = await apiClient<PaginatedApiResponse<Category>>({
        method: "GET",
        url: `/ordering/${slug}/categories`,
    })
    return response
}
