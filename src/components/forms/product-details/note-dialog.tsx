import { useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

type Props = {
    onSubmit: (note: string) => void
    className?: string
}

export default function ProductDetailsNoteDialog({ onSubmit, className }: Readonly<Props>) {
    const [note, setNote] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
    }
    const handleSubmit = () => {
        onSubmit?.(note)
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
        setNote("")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className={cn("rounded-lg border border-gray-200 p-3", className)}>
                <p className={cn("text-sm font-medium flex justify-between items-center", note && "pb-2")}>
                    هل يوجد اي طلب خاص ؟{" "}
                    <DialogTrigger asChild>
                        <span className="font-medium text-primary">أضف ملاحظة</span>
                    </DialogTrigger>
                </p>

                {note && <p className="text-xs text-gray-600 pt-3 border-t border-gray-200">{note}</p>}
            </div>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>ملاحظة علي المنتج</DialogTitle>
                </DialogHeader>

                <div>
                    <FormLabel>اضافة ملاحظة</FormLabel>
                    <Textarea
                        autoFocus={false}
                        value={note}
                        onChange={handleChange}
                        placeholder="اكتب هنا"
                        className="w-full min-h-[75px] bg-gray-400 p-3 rounded-xl focus:border-primary focus:outline-none resize-none mt-2 text-sm"
                    />
                </div>

                <DialogFooter className="grid grid-cols-2 gap-2">
                    <Button type="submit" onClick={handleSubmit}>
                        حفظ
                    </Button>
                    <Button type="button" variant="outline" className="border-black" onClick={handleCancel}>
                        إلغاء
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
