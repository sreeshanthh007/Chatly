import z from "zod";
import { emailSchema } from "./email.validator";


export const changePasswordSchema = z.object({
    ...emailSchema.shape,
    newPassword : z.string().min(6,"Password must be at least 6 characters")
})

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>