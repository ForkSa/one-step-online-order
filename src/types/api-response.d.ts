interface ApiResponse<T> {
    data: T
    message: string
    statue: number
}

interface PageInfo {
    currentPage: number
    nextPage: number | null
    nextPageUrl: string | null
    previousPageUrl: string | null
    onFirstPage: boolean
    perPage: number
    hasMorePages: boolean
    lastPage: number
    total: number
}

interface PaginatedApiResponse<T> {
    data: T[]
    pageInfo: PageInfo
    message: string
    statue: number
}

interface ErrorResponse {
    data: {
        message: string
        code: number
        statue: number
    }
}
