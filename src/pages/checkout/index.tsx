import { ChevronRight } from "lucide-react"

import { useNavigate } from "react-router"

import CartDetails from "@/components/cart/details"
import CheckoutForm from "@/components/forms/checkout"

export default function Checkout() {
    const navigate = useNavigate()

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
