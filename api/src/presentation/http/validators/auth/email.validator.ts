
import {z} from "zod";
export const emailSchema = z.object({
    email:z.string().email("Invalid Email")
})

export type EmailRequestInput = z.infer<typeof emailSchema>