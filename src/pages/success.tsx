import { useAtomValue } from "jotai"
import { CheckCircleIcon } from "lucide-react"

import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"

import { storeInfoAtom } from "@/atoms"

export default function SuccessPage() {
    const navigate = useNavigate()
    const { slug } = useAtomValue(storeInfoAtom)

    return (
        <div className="bg-gray-50 min-h-screen px-4 flex items-center justify-center">
            <div className="container bg-white p-6 rounded-xl flex flex-col items-center gap-y-4">
                <CheckCircleIcon className="size-10 text-green-500" />
                <h1 className="text-xl font-bold">تم إنشاء الطلب بنجاح</h1>
                <Button onClick={() => navigate(`/store/${slug}`)}>العودة إلى المطعم</Button>
            </div>
        </div>
    )
}
