interface ApiResponse<T> {
    data: T
    message: string
    statue: number
}

interface PageInfo {
    current_page: number
    has_more: boolean
    last_page: number
    per_page: number
    total: number
}

interface PaginatedApiResponse<T> {
    data: T[]
    pagination: PageInfo
}

interface ErrorResponse {
    data: {
        message: string
        code: number
        statue: number
    }
}
