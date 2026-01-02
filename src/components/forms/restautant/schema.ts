import { z } from "zod"

export const chooseBranchSchema = z.object({
    branchId: z
        .string({
            required_error: "يرجى اختيار الفرع",
        })
        .min(1, "يرجى اختيار الفرع"),
})

export type ChooseBranchFormValues = z.infer<typeof chooseBranchSchema>
