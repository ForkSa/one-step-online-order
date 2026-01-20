import { type UseQueryResult, useQuery } from "@tanstack/react-query"

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
