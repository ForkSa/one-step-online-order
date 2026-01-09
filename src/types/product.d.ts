interface CategoryProducts {
    id: number
    parent_id: number | null
    image: string | null
    name: LocalizedName
    name_text: string
    main_category_name: string
    products: Product[]
    parent: CategoryProducts | null
}

type ImageValue = {
    url: string
    deleteUrl: string | null
}

type OrderType = {
    id: number
    image: string | null
    name_txt: string
    name: LocalizedText
    settings: unknown | null
    is_default: number
    is_active: number
    require_client_data: number
    change_is_active_status_url: string
    change_is_require_client_data_status_url: string
    change_is_is_default_status_url: string
}

type ProductPrice = {
    id: number
    pricable_id: number
    pricable_type: "App\\Models\\Product" | "App\\Models\\Difference"
    order_type_id: number
    order_type: OrderType
    price: string
    price_before_tax: number
    price_after_tax: number
}

type ProductCategory = {
    id: number
    parent_id: number | null
    image: string | null
    name: LocalizedText
    name_text: string
    main_category_name: string
}

type ProductDifference = {
    id: number
    image: string | null
    image_value: ImageValue[]
    name_txt: string
    name: LocalizedText
    price: string
    price_before_tax: string
    price_after_tax: string
    prices: ProductPrice[]
}

type Addon = {
    id: number
    image: string | null
    name_txt: string
    name: LocalizedText
    price: string
    price_before_tax: string
    price_after_tax: string
}

type Product = {
    id: number
    image: string
    name: LocalizedText
    name_txt: string
    description: LocalizedText
    price: string
    price_before_tax: number
    price_after_tax: number
    discount_percentage: number | null
    category_id: number
    category_name: string
    category: ProductCategory
    addons: Addon[]
    differences: ProductDifference[]
    prices: ProductPrice[]
}
