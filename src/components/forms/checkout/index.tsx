import { zodResolver } from "@hookform/resolvers/zod"
import { useAtomValue } from "jotai"

import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { storeInfoAtom } from "@/atoms"
import {
    OrderTypesArray,
    PayTypesArray,
    createCheckoutFormSchema,
    orderTypes,
    payTypes,
} from "@/components/forms/checkout/schema"
import OrderSummary from "@/components/order/summary"
import { useCheckout } from "@/hooks/use-checkout"

export default function CheckoutForm() {
    const storeInfo = useAtomValue(storeInfoAtom)
    const isBranchQr = storeInfo.source === "branch" || Boolean(storeInfo.branch_qr)
    const isTableQr = storeInfo.source === "table" || Boolean(storeInfo.qr)

    const schema = useMemo(() => createCheckoutFormSchema(storeInfo), [storeInfo])

    const availableOrderTypes = useMemo(() => {
        if (!isBranchQr) return []

        const types = storeInfo.available_order_types ?? [orderTypes.DINE_IN, orderTypes.TAKEAWAY, orderTypes.DELIVERY]

        return OrderTypesArray.filter((type) => types.includes(type.value))
    }, [isBranchQr, storeInfo.available_order_types])

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            payType: payTypes.CASH,
            orderType: storeInfo.order_type ?? orderTypes.DINE_IN,
            tableNumber: storeInfo.table?.table_number ?? "",
        },
    })

    const selectedPayType = form?.watch("payType")
    const selectedOrderType = form?.watch("orderType")

    const { mutate: checkoutMutation, isPending } = useCheckout()

    const onSubmit = (inputs: {
        payType: (typeof payTypes)[keyof typeof payTypes]
        orderType?: string
        tableNumber?: string
    }) => {
        checkoutMutation(inputs)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white rounded-2xl p-4">
                    <h3 className="text-lg font-semibold">ملخص الطلب</h3>

                    {isTableQr && storeInfo.table?.table_number && (
                        <p className="mt-4 text-sm text-gray-600">
                            الطاولة: <span className="font-semibold">{storeInfo.table.table_number}</span>
                        </p>
                    )}

                    {isBranchQr && availableOrderTypes.length > 0 && (
                        <FormField
                            control={form.control}
                            name="orderType"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel className="text-lg">نوع الطلب</FormLabel>
                                    <Select onValueChange={field.onChange} dir="rtl" value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full border-none bg-gray-100 !p-4">
                                                <SelectValue placeholder="اختر نوع الطلب" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availableOrderTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="payType"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel className="text-lg"> نوع الدفع</FormLabel>
                                <RadioGroup
                                    value={String(field.value)}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    dir="rtl"
                                    className="grid grid-cols-3 gap-2 mt-2"
                                >
                                    {PayTypesArray.map((payType) => (
                                        <label htmlFor={payType.value} key={payType.value}>
                                            <RadioGroupItem
                                                value={payType.value}
                                                id={payType.value}
                                                className="hidden"
                                            />
                                            <p
                                                className={cn(
                                                    "font-medium text-sm flex items-center justify-center gap-x-2 border rounded-xl py-2.5 px-2",
                                                    payType.value === selectedPayType &&
                                                        "bg-primary border-primary text-white"
                                                )}
                                            >
                                                <payType.icon className="size-5" />
                                                {payType.label}
                                            </p>
                                        </label>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!isTableQr && (isBranchQr ? selectedOrderType === orderTypes.DINE_IN : true) && (
                        <FormField
                            control={form.control}
                            name="tableNumber"
                            render={({ field }) => (
                                <FormItem className="mt-6">
                                    <FormLabel className="text-lg">ادخل رقم الطاولة</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="اكتب هنا"
                                            {...field}
                                            className="border-transparent shadow-none bg-gray-100 fill-current"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <OrderSummary className="mt-4" />

                <ButtonWithLoading loading={isPending} className="w-full mt-6">
                    تأكيد طلب الأوردر
                </ButtonWithLoading>
            </form>
        </Form>
    )
}
