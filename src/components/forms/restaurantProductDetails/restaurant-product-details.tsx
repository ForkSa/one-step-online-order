/* eslint-disable @typescript-eslint/no-explicit-any */
import NotModal from "@/components/ui/product-details/not-modal"

import { useRestaurantProductDetails } from "@/hooks/use-restaurant-product-details"
import type { MenuItem } from "@/types/restaurants"

import AddonController from "./addon-controller"
import DifferentController from "./differnts-controller"

interface RestaurantProductDetailsFormProps {
    productData: MenuItem | null
}

export default function RestaurantProductDetailsForm({ productData }: RestaurantProductDetailsFormProps) {
    const {
        isNoteModalOpen,
        setIsNoteModalOpen,
        tempNote,
        setTempNote,
        control,
        handleSubmit,
        note,
        variations,
        onSubmit,
        setValue,
    } = useRestaurantProductDetails({ productData })

    if (!productData) {
        return (
            <div className="mt-6 container">
                <p className="text-center text-gray-500">Product not found</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 md:pb-[120px] pb-[150px] container">
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{productData.name}</h3>
                        <p className="text-xl font-bold text-secondary whitespace-nowrap mr-2">
                            {productData.price} ر.س
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{productData.description}</p>
                </div>

                {variations.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-semibold text-lg mb-4">إختر الإختلاف</h3>
                        <DifferentController control={control} productData={productData} />
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-4">الإضافات</h3>

                    <AddonController control={control} productData={productData} />
                    <button
                        type="button"
                        onClick={() => {
                            setTempNote(note)
                            setIsNoteModalOpen(true)
                        }}
                        className="mt-4 w-full p-4 rounded-xl border-2  flex justify-between items-center border-gray-300 hover:border-primary/50 transition-colors text-gray-600 hover:text-primary font-medium"
                    >
                        <p className="text-sm font-medium">هل يوجد اي طلب خاص ؟</p>
                        <span className=" font-medium text-primary">أضف ملاحظة</span>
                    </button>
                </div>

                {/* Quantity and Add to Cart Section */}
                <div className="md:mt-8 mt-[20px] flex items-center justify-between gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-primary text-white font-semibold py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors text-lg"
                    >
                        إضافة إلى السلة
                    </button>
                </div>

                {isNoteModalOpen && (
                    <NotModal
                        tempNote={tempNote}
                        setTempNote={setTempNote}
                        note={note}
                        setIsNoteModalOpen={setIsNoteModalOpen}
                        setValue={setValue as any}
                    />
                )}
            </div>
        </form>
    )
}
