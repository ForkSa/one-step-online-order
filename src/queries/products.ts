import { useQuery } from "@tanstack/react-query"
import type { UseQueryResult } from "@tanstack/react-query"

import { getProductById, getProducts } from "@/apis/products"

export const PRODUCTS_QUERY_KEY = "products"

export const useProducts = (slug: string, categoryId: number): UseQueryResult<CategoryProducts, Error> => {
    return useQuery<CategoryProducts, Error>({
        queryKey: [PRODUCTS_QUERY_KEY, slug, categoryId],
        queryFn: async () => {
            if (!categoryId || !slug) throw new Error("Category ID and slug are required")

            const response = await getProducts(slug, categoryId)
            return response?.data
        },
        placeholderData: (previousData) => previousData,
        enabled: !!slug && !!categoryId,
    })
}

export const PRODUCT_BY_ID_QUERY_KEY = "productById"

export const useProductById = (slug: string, id: number): UseQueryResult<Product, Error> => {
    return useQuery<Product, Error>({
        queryKey: [PRODUCT_BY_ID_QUERY_KEY, slug, id],
        queryFn: async () => {
            if (!slug || !id) throw new Error("Slug and ID are required")
            const response = await getProductById(slug, id)
            return response?.data
        },
        placeholderData: (previousData) => previousData,
        enabled: !!slug && !!id,
    })
}
