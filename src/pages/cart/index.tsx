import { ChevronRight } from "lucide-react"

import { useState } from "react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import OrderDetails from "@/components/ui/cart/order-details"
import OrderSummary from "@/components/ui/cart/order-summary"
import PaymentWay from "@/components/ui/cart/payment-way"

export default function Cart() {
    const [paymentMethod, setPaymentMethod] = useState("cash")

    return (
        <div className=" relative w-full min-h-screen  bg-gray-50">
            <div className=" flex  items-center  gap-x-[144px] pt-[60px] pr-4   ">
                <Link to="#" className=" rounded-lg py-2.5 px-3  bg-white shadow-lg  " aria-label="Back to menu">
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 " />
                </Link>
                <h1 className="text-2xl font-bold  ">السلة</h1>
            </div>

            <div className=" container md:mt-[180px] mt-[27px] grid  md:grid-cols-2 grid-cols-1 gap-4">
                <OrderDetails />
                <PaymentWay paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                <OrderSummary />
            </div>
            <div className=" max-w-[600px] mx-auto mt-[76px] p-4">
                <Button className=" w-full py-6">تأكيد طلب الأوردر</Button>
            </div>
        </div>
    )
}
