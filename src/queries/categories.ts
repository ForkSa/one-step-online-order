import { useQuery } from "@tanstack/react-query"
import type { UseQueryResult } from "@tanstack/react-query"

import { getCategories } from "@/apis/categories"

export const CATEGORIES_QUERY_KEY = "categories"

export const useCategories = (slug: string): UseQueryResult<PaginatedApiResponse<Category>, Error> => {
    return useQuery<PaginatedApiResponse<Category>, Error>({
        queryKey: [CATEGORIES_QUERY_KEY, slug],
        queryFn: async () => {
            const response = await getCategories(slug)
            return response
        },
    })
}
