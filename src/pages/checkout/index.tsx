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
        <div className=" relative w-full min-h-screen bg-gray-50 pb-6">
            <div className=" container flex items-center md:gap-x-[800px] gap-x-[144px] pt-[60px]">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-lg py-2.5 px-3 bg-white"
                    aria-label="Back to menu"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <h1 className="text-2xl font-bold  ">السلة</h1>
            </div>

            <div className="container md:mt-[180px] mt-[27px] grid md:grid-cols-2 grid-cols-1 gap-4">
                <CartDetails />
                <CheckoutForm />
            </div>
        </div>
    )
}
