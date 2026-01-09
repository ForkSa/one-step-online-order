import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"

import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { storeInfoAtom } from "@/atoms"
import { type ChooseBranchFormValues, chooseBranchSchema } from "@/components/forms/store-menu/schema"

type ChooseBranchFormProps = {
    loading?: boolean
    title?: string
    branches: Branch[]
    slug: string
}

export default function ChooseBranchForm({ loading = false, branches, slug }: ChooseBranchFormProps) {
    const navigate = useNavigate()

    const currentBranches = useMemo(
        () => branches?.map((branch) => ({ id: String(branch?.id), name: branch?.name?.ar })),
        [branches]
    )

    const [storeInfo, setStoreInfo] = useAtom(storeInfoAtom)

    const form = useForm<ChooseBranchFormValues>({
        resolver: zodResolver(chooseBranchSchema),
        defaultValues: {
            branchId: "",
        },
    })

    // Update form when storeInfo loads from localStorage on page reload
    useEffect(() => {
        if (!form) return

        const branchId = storeInfo?.branch?.id ?? ""
        const currentFormValue = form.getValues("branchId")

        if (branchId && branchId !== currentFormValue) {
            setTimeout(() => {
                form.setValue("branchId", branchId, { shouldValidate: true })
            }, 0)
        }
    }, [storeInfo?.branch?.id, form])

    async function onSubmit(inputs: ChooseBranchFormValues) {
        try {
            if (!storeInfo?.branch) {
                setStoreInfo({
                    branch: {
                        id: inputs?.branchId ?? "",
                        name: currentBranches?.find((branch) => branch?.id.toString() === inputs?.branchId)?.name ?? "",
                    },
                    slug,
                })
            }

            navigate(`/store/${slug}/items`)
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div className="container  mt-6 space-y-6">
            <Form {...form}>
                <FormLoading loading={loading}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="relative h-[400px] md:h-[300px]">
                            <FormField
                                control={form.control}
                                name="branchId"
                                render={({ field }) => (
                                    <FormItem className="!space-y-2">
                                        <FormLabel className="font-medium text-lg">إختر الفرع</FormLabel>
                                        <Select
                                            key={`select-${storeInfo?.branch?.id ?? "empty"}`}
                                            onValueChange={field?.onChange}
                                            dir="rtl"
                                            value={field?.value ?? undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full border-none bg-white-200 !p-6">
                                                    <SelectValue placeholder="اختر من هنا" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {currentBranches?.map((branch) => (
                                                    <SelectItem
                                                        key={branch?.id.toString()}
                                                        value={branch?.id.toString()}
                                                    >
                                                        <div className="flex flex-col items-start">
                                                            <span className="font-semibold">{branch?.name}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <ButtonWithLoading
                                type="submit"
                                size="lg"
                                className="w-full mt-6"
                                loading={form?.formState?.isSubmitting}
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
