import { z } from "zod"

export const loginFormSchema = z.object({
    email: z.string().email({
        message: "البريد الإلكتروني غير صالح",
    }),
    password: z.string().min(8, {
        message: "كلمة المرور غير صالحة",
    }),
    fcmToken: z.string().min(10).max(200).optional(),
    platform: z.enum(["WEB", "ANDROID", "IOS"]).optional(),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
