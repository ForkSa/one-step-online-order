type OrderSummaryResponseType = {
    summary: OrderSummaryType
}

type OrderSummaryType = {
    items: OrderSummaryItemType[]
    itemCount: number
    subtotal: number
    tax: number
    total: number
}

type OrderSummaryItemType = {
    product_id: number
    product_name: string
    difference_id: number | null
    quantity: number
    unit_price: number
    price_without_tax_unit: number
    addons: OrderSummaryAddonType[]
    tax: number
    total: number
    notes: string
    product_image: string
}

type OrderSummaryAddonType = {
    addon_id: number
    name: string
    quantity: number
    unit_price: number
    price_without_tax_unit: number
    tax_unit: number
    total: number
}

type ValidateCartItemType = {
    product_id: number | string
    notes?: string
    quantity?: number
    difference_id?: number | string
    addons: { addon_id?: number | string; quantity?: number | undefined }[]
}
type ValidateCartInputs = {
    branch_id: string
    items: ValidateCartItemType[]
}
