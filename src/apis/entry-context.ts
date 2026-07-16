import { apiClient } from "@/lib/api-client"

export const getEntryContext = async (slug: string, params: EntryContextParams) => {
    const searchParams = new URLSearchParams()

    if (params.qr) searchParams.set("qr", params.qr)
    if (params.branch_qr) searchParams.set("branch_qr", params.branch_qr)

    const response = await apiClient<ApiResponse<EntryContextData>>({
        url: `/ordering/${slug}/entry-context?${searchParams.toString()}`,
        method: "GET",
    })

    return response
}
