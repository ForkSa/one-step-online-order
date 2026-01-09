import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    type CheckoutFormSchemaType,
    PayTypesArray,
    checkoutFormSchema,
    payTypes,
} from "@/components/forms/checkout/schema"
import OrderSummary from "@/components/order/summary"
import { useCheckout } from "@/hooks/use-checkout"

export default function CheckoutForm() {
    const form = useForm<CheckoutFormSchemaType>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            payType: payTypes.CASH,
            tableNumber: "",
        },
    })

    const selectedPayType = form?.watch("payType")

    const { mutate: checkoutMutation, isPending } = useCheckout()

    const onSubmit = (inputs: CheckoutFormSchemaType) => {
        checkoutMutation(inputs)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white rounded-2xl p-4">
                    <h3 className="text-lg font-semibold">ملخص الطلب</h3>

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
                                        <label htmlFor={payType.value}>
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
                </div>

                <OrderSummary className="mt-4" />

                <ButtonWithLoading loading={isPending} className="w-full mt-6">
                    تأكيد طلب الأوردر
                </ButtonWithLoading>
            </form>
        </Form>
    )
}
