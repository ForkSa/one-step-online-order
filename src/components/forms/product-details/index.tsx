import { zodResolver } from "@hookform/resolvers/zod"
import { useAtomValue } from "jotai"

import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { cartSummary } from "@/atoms"
import CartPopup from "@/components/cart/pop-up"
import ProductDetailsAddons from "@/components/forms/product-details/Addons"
import ProductDetailsDifferences from "@/components/forms/product-details/differences"
import ProductDetailsNoteDialog from "@/components/forms/product-details/note-dialog"
import { type ProductDetailsSchema, createProductDetailsSchema } from "@/components/forms/product-details/schema"
import { useValidateCart } from "@/hooks/use-cart"

interface Props {
    product: Product | null
    slug: string | undefined
}

export default function ProductDetailsForm({ product, slug }: Props) {
    const hasDifferences = (product?.differences?.length ?? 0) > 0 || false
    const summary = useAtomValue(cartSummary)

    const findSummaryItem = summary?.items?.find((item) => item?.product_id === product?.id)

    const form = useForm<ProductDetailsSchema>({
        resolver: zodResolver(createProductDetailsSchema(hasDifferences)),
        values: {
            variation: findSummaryItem?.difference_id ?? undefined,
            addons: findSummaryItem?.addons?.map((addon) => Number(addon?.addon_id)) ?? [],
            note: findSummaryItem?.notes ?? "",
        },
    })

    const { mutate: validateCart, isPending } = useValidateCart()

    const onSubmit = (inputs: ProductDetailsSchema) => {
        if (!inputs || !slug) return
        validateCart({
            product: {
                product_id: product?.id ?? 0,
                note: inputs?.note,
                difference_id: inputs?.variation,
                addons: inputs?.addons?.map((addon) => ({ addon_id: addon ?? 0 })) ?? [],
            },
        })
    }

    if (!product) {
        return (
            <div className="mt-6 container">
                <p className="text-center text-gray-500">Product not found</p>
            </div>
        )
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form?.handleSubmit(onSubmit)}>
                    <div className="mt-6 md:pb-[120px] pb-[150px] container">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{product?.name?.ar}</h3>
                            <p className="text-xl font-bold text-secondary whitespace-nowrap mr-2">
                                {product?.price} ر.س
                            </p>
                        </div>

                        <p className="text-sm text-gray-600">{product?.description?.ar}</p>

                        <FormField
                            control={form.control}
                            name="variation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ProductDetailsDifferences
                                            product={product}
                                            isError={!!form?.formState?.errors?.variation}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="addons"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ProductDetailsAddons product={product} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <ProductDetailsNoteDialog onSubmit={(value) => form.setValue("note", value)} className="mt-6" />

                        <ButtonWithLoading loading={isPending} type="submit" className="w-full mt-6">
                            إضافة إلى السلة
                        </ButtonWithLoading>
                    </div>
                </form>
            </Form>

            <CartPopup />
        </>
    )
}
