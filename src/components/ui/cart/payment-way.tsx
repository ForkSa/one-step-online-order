import { Banknote, CreditCardIcon, WalletIcon } from "lucide-react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Input } from "../input"

interface PaymentWayProps {
    paymentMethod: string
    setPaymentMethod: (value: string) => void
}
export default function PaymentWay({ paymentMethod, setPaymentMethod }: PaymentWayProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-4">نوع الدفع</h1>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-x-3">
                <RadioGroupItem value="visa" id="payment-visa" className="peer sr-only" />
                <label
                    htmlFor="payment-visa"
                    className={`
                relative flex items-center gap-[4px] justify-center  p-2 rounded-xl  cursor-pointer transition-all
                ${paymentMethod === "visa" ? " bg-primary" : " border bg-white "}
                    `}
                >
                    <span className={`font-medium  text-sm  ${paymentMethod === "visa" ? "text-white" : "text-black"}`}>
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
                    <span className={`font-medium text-sm  ${paymentMethod === "cash" ? "text-white" : "text-black"}`}>
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
    )
}
