import { useAtomValue } from "jotai"
import { ChevronRight, ShoppingCartIcon } from "lucide-react"

import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"

import { cartSummary, storeInfoAtom } from "@/atoms"
import CartDetails from "@/components/cart/details"
import CheckoutForm from "@/components/forms/checkout"

export default function Checkout() {
    const navigate = useNavigate()
    const summary = useAtomValue(cartSummary)
    const { slug } = useAtomValue(storeInfoAtom)

    if (summary?.items?.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen px-4 flex items-center justify-center">
                <div className="container bg-white p-6 rounded-xl flex flex-col items-center gap-y-4">
                    <ShoppingCartIcon className="size-10 text-red-500" strokeWidth={2} />
                    <h1 className="text-xl font-bold">لا يوجد منتجات في السلة</h1>
                    <Button onClick={() => navigate(`/restaurant/${slug}`)}>العودة إلى المطعم</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 py-10">
            <div className="container relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute start-4 top-1/2 -translate-y-1/2 z-10 rounded-lg py-2.5 size-9 grid place-items-center bg-white"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="size-6 -mt-1" />
                </button>
                <h1 className="text-center">السلة</h1>
            </div>

            <div className="container md:mt-[180px] mt-[27px] grid md:grid-cols-2 grid-cols-1 gap-4">
                <CartDetails />
                <CheckoutForm />
            </div>
        </div>
    )
}
