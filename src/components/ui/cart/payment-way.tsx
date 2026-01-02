import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import CardIcon from "@/assets/icons/card-icon"
import MoneysIcon from "@/assets/icons/moneys-icon"
import WalletIcon from "@/assets/icons/wallet-icon"

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
                    <WalletIcon className={` ${paymentMethod === "visa" ? "white" : "black"}`} />
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
                    <CardIcon className={`${paymentMethod === "visa-cash" ? "white" : "black"}`} />
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
                    <MoneysIcon className={`${paymentMethod === "cash" ? "white" : "black"}`} />
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
