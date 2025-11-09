import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useRestaurant } from "@/hooks/use-restaurants"

import { type ChooseBranchFormValues, chooseBranchSchema } from "./schema"

interface ChoosingBranchFormProps {
    loading?: boolean
    isThereBranches: boolean
    restaurantId: string
    title?: string
    onSubmitSuccess?: (branchId: string) => void
}

export default function ChoosingBranchForm({
    loading = false,
    onSubmitSuccess,
    restaurantId,
    isThereBranches,
}: ChoosingBranchFormProps) {
    const navigate = useNavigate()

    const { value: restaurant } = useRestaurant(restaurantId)

    const form = useForm<ChooseBranchFormValues>({
        resolver: zodResolver(chooseBranchSchema),
        defaultValues: {
            branchId: "",
        },
    })

    async function onSubmit(inputs: ChooseBranchFormValues) {
        try {
            if (isThereBranches) {
                if (!inputs.branchId) {
                    form.setError("branchId", {
                        type: "manual",
                        message: "يرجى اختيار الفرع",
                    })
                    return
                }
                if (onSubmitSuccess) {
                    onSubmitSuccess(inputs.branchId)
                }
            }

            navigate(`/restaurant/${restaurantId}/menu`)
        } catch (error) {
            console.error("Error:", error)
        }
    }
    
    function handleNextClick() {
        if (!isThereBranches) {
            navigate(`/restaurant/${restaurantId}/menu`)
        }
    }

    return (
        <div className="container mt-6 space-y-6">
            <Form {...form}>
                <FormLoading loading={loading}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="relative h-[400px] md:h-[300px]">
                            {isThereBranches && (
                                <FormField
                                    control={form.control}
                                    name="branchId"
                                    render={({ field }) => (
                                        <FormItem className="!space-y-2">
                                            <FormLabel className="font-medium text-lg">إختر الفرع</FormLabel>
                                            <Select onValueChange={field?.onChange} value={field?.value} dir="rtl">
                                                <FormControl>
                                                    <SelectTrigger className="w-full border-none bg-white-200 !p-6">
                                                        <SelectValue placeholder="اختر من هنا" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {restaurant?.branches &&
                                                        restaurant?.branches?.map((branch) => (
                                                            <SelectItem
                                                                key={branch?.id.toString()}
                                                                value={branch?.id.toString()}
                                                            >
                                                                <div className="flex flex-col items-start">
                                                                    <span className="font-semibold">
                                                                        {branch?.name}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {branch?.address}
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <ButtonWithLoading
                                type={isThereBranches ? "submit" : "button"}
                                size="lg"
                                className="w-full absolute -bottom-[26px] left-1/2 -translate-x-1/2 "
                                loading={form?.formState?.isSubmitting}
                                onClick={handleNextClick}
                            >
                                التالي
                            </ButtonWithLoading>
                        </div>
                    </form>
                </FormLoading>
            </Form>
        </div>
    )
}
