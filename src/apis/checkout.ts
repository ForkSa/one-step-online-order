import { apiClient } from "@/lib/api-client"

export const checkout = async (inputs: CheckoutInputs, storeSlug: string) => {
    const response = await apiClient<ApiResponse<{ order_id: number }>>({
        url: `/ordering/${storeSlug}/cart/checkout`,
        method: "POST",
        data: inputs,
    })
    return response
}
