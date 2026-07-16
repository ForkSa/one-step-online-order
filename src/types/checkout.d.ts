type PaymentMethod = "cash" | "visa" | "cash_and_visa"

type CheckoutOrder = {
    id: number
    session_id: string
    branch_id: number
    table_id?: number
    status: string
    order_type: string
    table_number: string
    payment_method: PaymentMethod
    paid_with_cash: string
    paid_with_visa: string
    total: string
    items: OrderSummaryItemType[]
}

type CheckoutInputs = {
    qr?: string
    branch_qr?: string
    order_type?: string
    table_number?: string
    payment_method: PaymentMethod
    paid_with_cash: number
    paid_with_visa: number
    order_note?: string
    items: ValidateCartItemType[]
}

type CheckoutPageInputs = {
    payType: PayType
    tableNumber?: string
    orderType?: string
}

type CheckoutResponse = {
    order: CheckoutOrder
}
