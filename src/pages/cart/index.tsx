import { useAtomValue } from "jotai"
import { Banknote, ChevronRight, CreditCardIcon, WalletIcon } from "lucide-react"

import { useState } from "react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import OrderDetails from "@/components/ui/cart/order-details"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { cartSummaryAtom } from "@/atoms"

export default function Cart() {
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const summary = useAtomValue(cartSummaryAtom)

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
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit p-4">
                    <h1 className="text-xl font-bold text-gray-900 mb-4">نوع الدفع</h1>

                    <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-3 gap-x-3"
                    >
                        <RadioGroupItem value="visa" id="payment-visa" className="peer sr-only" />
                        <label
                            htmlFor="payment-visa"
                            className={`
                                relative flex items-center gap-[4px] justify-center  p-2 rounded-xl  cursor-pointer transition-all
                                ${paymentMethod === "visa" ? " bg-primary" : " border bg-white "}
                                    `}
                        >
                            <span
                                className={`font-medium  text-sm  ${paymentMethod === "visa" ? "text-white" : "text-black"}`}
                            >
                                كاش و فيزا
                            </span>
                            <WalletIcon
                                className={`w-6 h-6 shrink-0 ${paymentMethod === "visa" ? "text-white" : "text-black"}`}
                            />
                        </label>

                        <RadioGroupItem value="visa-cash" id="payment-visa-cash" className="peer sr-only" />
                        <label
                            htmlFor="payment-visa-cash"
                            className={`
                                relative flex items-center gap-[4px]  justify-center p-2 rounded-xl  cursor-pointer transition-all
                                    ${paymentMethod === "visa-cash" ? " bg-primary " : "  border bg-white "} 
                                `}
                        >
                            <span
                                className={`font-medium  text-sm  ${paymentMethod === "visa-cash" ? "text-white" : "text-black"}`}
                            >
                                فيزا
                            </span>
                            <CreditCardIcon
                                className={`w-6 h-6 ${paymentMethod === "visa-cash" ? "text-white" : "text-black"}`}
                            />
                        </label>
                        <RadioGroupItem value="cash" id="payment-cash" className="peer sr-only" />
                        <label
                            htmlFor="payment-cash"
                            className={`
                                            relative flex items-center gap-[4px] justify-center  p-2 rounded-xl  cursor-pointer transition-all
                                            ${paymentMethod === "cash" ? " bg-primary " : " border m"}
                                        `}
                        >
                            <span
                                className={`font-medium text-sm  ${paymentMethod === "cash" ? "text-white" : "text-black"}`}
                            >
                                كاش
                            </span>
                            <Banknote className={`w-6 h-6 ${paymentMethod === "cash" ? "text-white" : "text-black"}`} />
                        </label>
                    </RadioGroup>

                    <h1 className="text-xl font-bold text-gray-900 mt-4">ادخل رقم الطاولة</h1>
                    <Input
                        type="number"
                        placeholder="اكتب هنا"
                        className="w-full mt-2 bg-gray-400 border-none rounded-[8px] placeholder:font-medium placeholder:text-sm"
                    />
                </div>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4">
                    <h3 className="text-xl font-bold text-gray-900">ملخص الطلب</h3>
                    <p className=" font-medium text-sm flex items-center justify-between mt-4">
                        عدد المنتجات في السلة <span className=" font-bold text-gray-150">{summary.itemCount}</span>
                    </p>
                    <p className=" font-medium text-sm flex items-center justify-between mt-2">
                        إجمالي السعر بدون الضريبة
                        <span className=" font-bold text-gray-150">{summary.subtotal.toFixed(2)} ر.س</span>
                    </p>
                    <p className=" font-medium text-sm flex items-center justify-between mt-2">
                        قيمة الضريبة<span className=" font-bold text-gray-150">{summary.tax.toFixed(2)} ر.س</span>
                    </p>
                    <p className=" font-medium text-sm flex items-center justify-between mt-4">
                        الإجمالي النهائي<span className=" font-bold  text-primary">{summary.total.toFixed(2)} ر.س</span>
                    </p>
                </div>
            </div>
            <div className=" max-w-[600px] mx-auto mt-[76px] p-4">
                <Button className=" w-full py-6">تأكيد طلب الأوردر</Button>
            </div>
        </div>
    )
}
