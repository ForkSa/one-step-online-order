import { z } from "zod"

export const chooseBranchSchema = z
    .object({
        branchId: z.string().optional(),
    })
    .refine((data) => data?.branchId !== undefined && data?.branchId !== "", {
        message: "يرجى اختيار الفرع",
        path: ["branchId"],
    })

export type ChooseBranchFormValues = z.infer<typeof chooseBranchSchema>
