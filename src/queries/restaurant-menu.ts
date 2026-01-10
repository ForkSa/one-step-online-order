import { type UseQueryResult, useQuery } from "@tanstack/react-query"

import { getStore } from "@/apis/store"

export const RESTAURANT_MENU_QUERY_KEY = "restaurant-menu"

export const useRestaurantMenu = (slug: string): UseQueryResult<RestaurantMenu, Error> => {
    return useQuery({
        queryKey: [RESTAURANT_MENU_QUERY_KEY, slug],
        queryFn: async () => {
            const response = await getStore(slug)
            return response?.data
        },
    })
}
