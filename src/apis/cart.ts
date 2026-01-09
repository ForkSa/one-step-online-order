import { apiClient } from "@/lib/api-client"

export const validateCart = async (inputs: ValidateCartInputs, storeSlug: string) => {
    const response = await apiClient<ApiResponse<OrderSummaryResponseType>>({
        url: `/ordering/${storeSlug}/cart/validate`,
        method: "POST",
        data: inputs,
    })
    return response
}
