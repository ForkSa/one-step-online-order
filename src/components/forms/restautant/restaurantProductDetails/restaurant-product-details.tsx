import { useAtom } from "jotai"
import { Check } from "lucide-react"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import { addToCartAtom } from "@/atoms"
import type { CartItem } from "@/types/cart"

// Type definitions
interface Variation {
    id: number
    name: string
    price?: number
}

interface AddOn {
    id: number
    name: string
    price: number
}

interface MenuItem {
    id: number
    name: string
    price: number
    description: string
    image: string
    differents?: Variation[]
    addons?: AddOn[]
}

interface RestaurantProductDetailsFormProps {
    productData: MenuItem | null
}

interface FormValues {
    variation: string
    addons: number[]
    quantity: number
    note: string
}

export default function RestaurantProductDetailsForm({ productData }: RestaurantProductDetailsFormProps) {
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [tempNote, setTempNote] = useState("")
    const [, addToCart] = useAtom(addToCartAtom)
    const restaurantId = window.location.pathname.split("/")[2]

    const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            variation: productData?.differents?.[0]?.name ?? "",
            addons: [],
            quantity: 1,
            note: "",
        },
    })

    const note = watch("note")

    const variations = productData?.differents ?? []

    const onSubmit = (data: FormValues) => {
        if (!productData) return

        // Find selected variation
        const selectedVariation = variations.find((v) => v.name === data.variation)

        // Find selected addons
        const selectedAddons = productData.addons?.filter((addon) => data.addons.includes(addon.id)) || []

        // Generate unique cart item ID with timestamp to allow duplicates
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substr(2, 9)
        const cartItemId = `${productData?.id}-${selectedVariation?.id || "default"}-${timestamp}-${randomId}`

        // Create cart item
        const cartItem: CartItem = {
            id: cartItemId,
            productId: productData?.id,
            name: productData?.name,
            description: productData?.description,
            price: productData?.price,
            quantity: data?.quantity || 1,
            image: productData?.image,
            variation: selectedVariation
                ? {
                      id: selectedVariation?.id,
                      name: selectedVariation?.name,
                      price: selectedVariation?.price || 0,
                  }
                : undefined,
            addons: selectedAddons.map((addon) => ({
                id: addon.id,
                name: addon.name,
                price: addon.price,
            })),
            note: data.note || undefined,
            restaurantId: restaurantId,
        }

        // Add to cart
        addToCart(cartItem)

        // Reset form
        setValue("quantity", 1)
        setValue("addons", [])
        setValue("note", "")
        setValue("variation", productData?.differents?.[0]?.name ?? "")
    }

    // Handle case when product doesn't exist
    if (!productData) {
        return (
            <div className="mt-6 container">
                <p className="text-center text-gray-500">Product not found</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 container">
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{productData.name}</h3>
                        <p className="text-xl font-bold text-secondary whitespace-nowrap mr-2">
                            {productData.price} ر.س
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{productData.description}</p>
                </div>

                {variations.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-semibold text-lg mb-4">إختر الإختلاف</h3>

                        <Controller
                            name="variation"
                            control={control}
                            render={({ field }) => (
                                <Carousel
                                    opts={{
                                        align: "start",
                                        dragFree: true,
                                        containScroll: "trimSnaps",
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent className="-ml-2 md:-ml-3">
                                        {variations.map((variation) => {
                                            const isSelected = field.value === variation.name

                                            return (
                                                <CarouselItem key={variation.id} className="pl-2 md:pl-3 basis-auto">
                                                    <label
                                                        htmlFor={`variation-${variation.id}`}
                                                        className={`
                                                            relative block min-w-[204px] md:min-w-[250px]
                                                            rounded-2xl p-4 cursor-pointer 
                                                            transition-all duration-300 ease-out
                                                            ${
                                                                isSelected
                                                                    ? "bg-primary text-white shadow-lg scale-[1.02]"
                                                                    : "bg-white border-2 border-gray-200 hover:border-primary/50 hover:shadow-md"
                                                            }
                                                        `}
                                                    >
                                                        <input
                                                            {...field}
                                                            type="radio"
                                                            id={`variation-${variation.id}`}
                                                            value={variation.name}
                                                            checked={isSelected}
                                                            onChange={() => field.onChange(variation.name)}
                                                            className="sr-only"
                                                        />

                                                        <div className="flex justify-between gap-5 items-start mb-6">
                                                            <h4
                                                                className={`
                                                                    font-bold text-sm
                                                                    ${isSelected ? "text-white" : "text-gray-900"}
                                                                `}
                                                            >
                                                                {variation.name}
                                                            </h4>

                                                            <div
                                                                className={`
                                                                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                                                                    transition-all duration-200
                                                                    ${
                                                                        isSelected
                                                                            ? "bg-white border-white"
                                                                            : "bg-transparent border-gray-300"
                                                                    }
                                                                `}
                                                            >
                                                                {isSelected && (
                                                                    <Check
                                                                        className="w-3 h-3 text-primary"
                                                                        strokeWidth={3}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <span
                                                            className={`
                                                                    text-sm font-semibold
                                                                    ${isSelected ? "text-white/90" : "text-secondary"}
                                                                `}
                                                        >
                                                            {variation.price ? `${variation.price}` : productData.price}
                                                            ر.س
                                                        </span>
                                                    </label>
                                                </CarouselItem>
                                            )
                                        })}
                                    </CarouselContent>
                                </Carousel>
                            )}
                        />
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-4">الإضافات</h3>

                    <Controller
                        name="addons"
                        control={control}
                        render={({ field }) => (
                            <Carousel
                                opts={{
                                    align: "start",
                                    dragFree: true,
                                    containScroll: "trimSnaps",
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2 md:-ml-3">
                                    {productData?.addons?.map((addOn) => {
                                        const isSelected = field.value?.includes(addOn.id) || false

                                        return (
                                            <CarouselItem key={addOn.id} className="pl-2 md:pl-3 basis-auto">
                                                <label
                                                    htmlFor={`addon-${addOn.id}`}
                                                    className={`
                                                            relative block min-w-[204px] md:min-w-[250px]
                                                            rounded-2xl p-4 cursor-pointer 
                                                            transition-all duration-300 ease-out
                                                            ${
                                                                isSelected
                                                                    ? " bg-primary text-white "
                                                                    : "bg-white border-2 border-gray-200 hover:border-primary/50 hover:shadow-md"
                                                            }
                                                        `}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`addon-${addOn.id}`}
                                                        checked={isSelected}
                                                        onChange={(e) => {
                                                            const currentValue = field.value || []
                                                            if (e.target.checked) {
                                                                field.onChange([...currentValue, addOn.id])
                                                            } else {
                                                                field.onChange(
                                                                    currentValue.filter((id) => id !== addOn.id)
                                                                )
                                                            }
                                                        }}
                                                        className="sr-only"
                                                    />

                                                    <div className="flex justify-between gap-5 items-start mb-6">
                                                        <h4
                                                            className={`
                                                                    font-bold text-sm
                                                                    ${isSelected ? "text-white" : "text-gray-900"}
                                                                `}
                                                        >
                                                            {addOn.name}
                                                        </h4>

                                                        <div
                                                            className={`
                                                                    w-5 h-5 rounded border-2 flex items-center justify-center
                                                                    transition-all duration-200
                                                                    ${
                                                                        isSelected
                                                                            ? "bg-white border-white"
                                                                            : "bg-transparent border-gray-300"
                                                                    }
                                                                `}
                                                        >
                                                            {isSelected && (
                                                                <Check
                                                                    className="w-3 h-3 text-primary"
                                                                    strokeWidth={3}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <span
                                                            className={`
                                                                    text-sm font-semibold
                                                                    ${isSelected ? "text-white/90" : "text-secondary"}
                                                                `}
                                                        >
                                                            {addOn.price} ر.س
                                                        </span>
                                                    </div>
                                                </label>
                                            </CarouselItem>
                                        )
                                    })}
                                </CarouselContent>
                            </Carousel>
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setTempNote(note)
                            setIsNoteModalOpen(true)
                        }}
                        className="mt-4 w-full p-4 rounded-xl border-2  flex justify-between items-center border-gray-300 hover:border-primary/50 transition-colors text-gray-600 hover:text-primary font-medium"
                    >
                        <p className="text-sm font-medium">هل يوجد اي طلب خاص ؟</p>
                        <span className=" font-medium text-primary">أضف ملاحظة</span>
                    </button>
                </div>

                {/* Quantity and Add to Cart Section */}
                <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-primary text-white font-semibold py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors text-lg"
                    >
                        إضافة إلى السلة
                    </button>
                </div>

                {isNoteModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">ملاحظة علي المنتج</h3>

                            <h4 className="pb-2">اضافة ملاحظة</h4>
                            <textarea
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                                placeholder="اكتب هنا"
                                className="w-full min-h-[120px] bg-gray-400 p-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none resize-none"
                            />

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("note", tempNote)
                                        setIsNoteModalOpen(false)
                                    }}
                                    className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTempNote(note)
                                        setIsNoteModalOpen(false)
                                    }}
                                    className="flex-1  text-gray-700 font-semibold py-3 rounded-xl  border "
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}
