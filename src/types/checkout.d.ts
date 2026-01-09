type CheckoutInputs = {
    order_type: string
    table_number: string
    payment_method: number
    paid_with_cash: number
    paid_with_visa: number
    branch_id: number
    order_note: string
    items: ValidateCartItemType[]
}

type CheckoutPageInputs = {
    payType: PayType
    tableNumber: string
}
