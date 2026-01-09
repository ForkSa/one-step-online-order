import { apiClient } from "@/lib/api-client"

export const getProducts = async (slug: string, categoryId: number) => {
    const response = await apiClient<ApiResponse<CategoryProducts>>({
        method: "GET",
        url: `/ordering/${slug}/categories/${categoryId}`,
    })
    return response
}

export const getProductById = async (slug: string, id: number) => {
    const response = await apiClient<ApiResponse<Product>>({
        method: "GET",
        url: `/ordering/${slug}/product/${id}`,
    })
    return response
}
