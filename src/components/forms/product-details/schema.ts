import { z } from "zod"

export const productDetailsSchema = z.object({
    variation: z.number().optional(),
    addons: z.array(z.number()).optional(),
    note: z.string().optional(),
})

export const createProductDetailsSchema = (hasDifferences: boolean) => {
    if (hasDifferences) {
        return productDetailsSchema
            .extend({
                variation: z.number().optional(),
            })
            .refine((data) => data.variation !== undefined, {
                message: "حدد الإختلاف المطلوب",
                path: ["variation"],
            })
    }
    return productDetailsSchema
}

export type ProductDetailsSchema = z.infer<typeof productDetailsSchema>
