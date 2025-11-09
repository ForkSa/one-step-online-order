import { useAsyncRetry } from "react-use"

import { dummyRestaurants, getRestaurant } from "@/apis/restaurants"

export const useRestaurants = () => {
    return useAsyncRetry(async () => {
        const response = await dummyRestaurants()
        return response
    })
}

export const useRestaurant = (id: string) => {
    return useAsyncRetry(async () => {
        const response = await getRestaurant(id)
        return response
    }, [id])
}
