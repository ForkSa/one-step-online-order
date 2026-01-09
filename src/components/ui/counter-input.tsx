import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"

type Props = {
    className?: string
    value: number
    loading?: boolean
    onChange: (value: number) => void
}

export default function CounterInput({ value, loading = false, onChange, className }: Props) {
    const handleDecrement = () => {
        onChange(value - 1)
    }

    const handleIncrement = () => {
        onChange(value + 1)
    }

    const DecrementIcon =
        value > 1 ? <MinusIcon className="size-4" /> : <TrashIcon className="size-4 text-destructive" />

    return (
        <div
            className={cn(
                "flex items-center gap-x-2 justify-between border border-gray-150 rounded-xl p-1.5 relative",
                className,
                loading && "pointer-events-none"
            )}
        >
            <Button
                variant="secondary"
                className="size-8 text-white rounded-lg"
                onClick={handleIncrement}
                disabled={loading}
            >
                <PlusIcon className="size-4" />
            </Button>
            <p className="text-lg font-medium px-2">{value}</p>
            <Button
                variant="outline"
                className="size-8 border-black rounded-lg p-0"
                onClick={handleDecrement}
                disabled={loading}
            >
                {DecrementIcon}
            </Button>

            {loading && (
                <div className="absolute grid place-items-center inset-0 z-10 bg-white/80 rounded-xl">
                    <Loader className="size-5" />
                </div>
            )}
        </div>
    )
}
