import { type UseQueryResult, useQuery, useInfiniteQuery, type UseInfiniteQueryResult, type InfiniteData } from "@tanstack/react-query"

import { getRestaurants } from "@/apis/restaurants"

export const RESTAURANTS_QUERY_KEY = "restaurants"

export const useRestaurants = (params?: string): UseQueryResult<PaginatedApiResponse<RestaurantType>, Error> => {
    return useQuery<PaginatedApiResponse<RestaurantType>, Error>({
        queryKey: [RESTAURANTS_QUERY_KEY, params],
        queryFn: async () => {
            const response = await getRestaurants(params)
            return response?.data
        },
        placeholderData: (previousData) => previousData,
    })
}

export const useInfiniteRestaurants = (params?: string): UseInfiniteQueryResult<InfiniteData<PaginatedApiResponse<RestaurantType>>, Error> => {
    return useInfiniteQuery({
        queryKey: [RESTAURANTS_QUERY_KEY, "infinite", params],
        queryFn: async ({ pageParam = 1 }) => {
            const pageQuery = `page=${pageParam}`
            const queryParams = params ? `${params}&${pageQuery}` : pageQuery
            const response = await getRestaurants(queryParams)
            return response?.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage?.pagination?.has_more) {
                return (lastPage.pagination.current_page || 0) + 1
            }
            return undefined
        },
    })
}
