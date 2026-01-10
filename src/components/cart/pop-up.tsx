import { useAtomValue } from "jotai"

import { createPortal } from "react-dom"
import { Link } from "react-router"

import { cartSummary } from "@/atoms"

export default function CartPopup() {
    const summary = useAtomValue(cartSummary)

    const isEmpty = summary?.items?.length === 0

    if (isEmpty) return null

    return createPortal(
        <Link
            to="/checkout"
            className="fixed max-w-[600px] bg-secondary w-[calc(100%-2rem)] mx-auto flex items-center justify-between left-1/2 -translate-x-1/2 bottom-4 z-50 py-2 px-3 rounded-2xl "
        >
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-2xl text-white p-4 bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="m15.37 3.44l3.212 5.562h3.423v2h-1.167l-.757 9.083a1 1 0 0 1-.996.917H4.925a1 1 0 0 1-.997-.917l-.757-9.083H2.005v-2h3.422L8.639 3.44l1.732 1l-2.634 4.562h8.535L13.639 4.44zm-2.365 9.562h-2v4h2zm-4 0h-2v4h2zm8 0h-2v4h2z"
                        />
                    </svg>
                </span>

                <p className=" font-medium text-lg text-white">عرض السلة</p>
            </div>

            <span className="font-semibold text-sm text-white">{summary?.total?.toFixed(2)} ر.س</span>
        </Link>,
        document.getElementById("app-portal") as HTMLElement
    )
}
