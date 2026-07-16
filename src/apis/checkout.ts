import { apiClient } from "@/lib/api-client"

export const checkout = async (inputs: CheckoutInputs, storeSlug: string, sessionId?: string) => {
    const response = await apiClient<ApiResponse<CheckoutResponse>>({
        url: `/ordering/${storeSlug}/cart/checkout`,
        method: "POST",
        data: inputs,
        headers: {
            "X-Session-Id": sessionId || "",
        },
    })
    return response
}
