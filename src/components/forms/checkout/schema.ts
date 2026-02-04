import { z } from "zod"

import CashIcon from "@/assets/icons/cash"
import MoneyIcon from "@/assets/icons/money"

//import WalletIcon from "@/assets/icons/wallet"

export const payTypes = {
    CASH: "0",
    CARD: "1",
    WALLET: "2",
} as const

export type PayType = (typeof payTypes)[keyof typeof payTypes]

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
    // {
    //     label: "كاش وفيزا",
    //     value: payTypes.WALLET,
    //     icon: WalletIcon,
    // },
]

export const checkoutFormSchema = z
    .object({
        payType: z.enum([payTypes.CASH, payTypes.CARD, payTypes.WALLET]),
        tableNumber: z.string().min(1, {
            message: "رقم الطاولة يجب أن يكون موجود",
        }),
    })
    .refine(
        (data) => {
            return /^\d{1,3}$/.test(data.tableNumber)
        },
        {
            message: "رقم الطاولة يجب أن يكون رقماً من 1 إلى 3 أرقام",
            path: ["tableNumber"],
        }
    )

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>
