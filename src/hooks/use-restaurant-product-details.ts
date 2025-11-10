import { useAtom } from "jotai"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { addToCartAtom } from "@/atoms"
import type { CartItem } from "@/types/cart"
import type { Addon, DifferentOption, MenuItem } from "@/types/restaurants"

interface UseRestaurantProductDetailsProps {
    productData: MenuItem | null
}

interface FormValues {
    variation: string
    addons: number[]
    quantity: number
    note: string
}

export const useRestaurantProductDetails = ({ productData }: UseRestaurantProductDetailsProps) => {
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
        const selectedVariation = variations.find((v: DifferentOption) => v.name === data.variation)

        const selectedAddons = productData.addons?.filter((addon: Addon) => data.addons.includes(addon.id)) || []

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
            addons: selectedAddons.map((addon: Addon) => ({
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

    return {
        isNoteModalOpen,
        setIsNoteModalOpen,
        tempNote,
        setTempNote,
        control,
        handleSubmit,
        note,
        variations,
        onSubmit,
        setValue,
    }
}
