
interface NotModalProps {

    tempNote: string
    setTempNote: (value: string) => void
    note: string
    setIsNoteModalOpen: (value: boolean) => void
    setValue: (field: string, value: string) => void
    
}
export default function NotModal({ tempNote, setTempNote, note, setIsNoteModalOpen, setValue }: NotModalProps) {
  return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">ملاحظة علي المنتج</h3>

                            <h4 className="pb-2">اضافة ملاحظة</h4>
                            <textarea
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                                placeholder="اكتب هنا"
                                className="w-full min-h-[120px] bg-gray-400 p-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none resize-none"
                            />

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("note", tempNote)
                                        setIsNoteModalOpen(false)
                                    }}
                                    className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTempNote(note)
                                        setIsNoteModalOpen(false)
                                    }}
                                    className="flex-1  text-gray-700 font-semibold py-3 rounded-xl  border "
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>  )
}
