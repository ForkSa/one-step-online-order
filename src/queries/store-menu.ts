import { type UseQueryResult, useQuery } from "@tanstack/react-query"

import { getStore } from "@/apis/store"

export const STORE_QUERY_KEY = "store"

export const useStore = (slug: string): UseQueryResult<StoreMenu, Error> => {
    return useQuery({
        queryKey: [STORE_QUERY_KEY, slug],
        queryFn: async () => {
            const response = await getStore(slug)
            return response?.data
        },
    })
}
