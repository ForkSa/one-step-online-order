import { z } from "zod"

import type { StoreInfo } from "@/atoms"
import CashIcon from "@/assets/icons/cash"
import MoneyIcon from "@/assets/icons/money"

export const payTypes = {
    CASH: "0",
    CARD: "1",
    WALLET: "2",
} as const

export type PayType = (typeof payTypes)[keyof typeof payTypes]

export const orderTypes = {
    DINE_IN: "dine-in",
    TAKEAWAY: "takeaway",
    DELIVERY: "delivery",
} as const

export const OrderTypesArray = [
    { label: "داخل المطعم", value: orderTypes.DINE_IN },
    { label: "استلام", value: orderTypes.TAKEAWAY },
    { label: "توصيل", value: orderTypes.DELIVERY },
]

export const PayTypesArray = [
    {
        label: "كاش",
        value: payTypes.CASH,
        icon: MoneyIcon,
    },
    {
        label: "فيزا",
        value: payTypes.CARD,
        icon: CashIcon,
    },
]

export const createCheckoutFormSchema = (storeInfo: StoreInfo) => {
    const isBranchQr = storeInfo.source === "branch" || Boolean(storeInfo.branch_qr)
    const isTableQr = storeInfo.source === "table" || Boolean(storeInfo.qr)

    return z
        .object({
            payType: z.enum([payTypes.CASH, payTypes.CARD, payTypes.WALLET]),
            orderType: isBranchQr
                ? z.enum([orderTypes.DINE_IN, orderTypes.TAKEAWAY, orderTypes.DELIVERY])
                : z.string().optional(),
            tableNumber: z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (isBranchQr && data.orderType === orderTypes.DINE_IN) {
                if (!data.tableNumber?.trim()) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "رقم الطاولة يجب أن يكون موجود",
                        path: ["tableNumber"],
                    })
                    return
                }

                if (!/^\d{1,3}$/.test(data.tableNumber)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "رقم الطاولة يجب أن يكون رقماً من 1 إلى 3 أرقام",
                        path: ["tableNumber"],
                    })
                }
            }

            if (!isBranchQr && !isTableQr && !data.tableNumber?.trim()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "رقم الطاولة يجب أن يكون موجود",
                    path: ["tableNumber"],
                })
            }
        })
}

export type CheckoutFormSchemaType = z.infer<ReturnType<typeof createCheckoutFormSchema>>
