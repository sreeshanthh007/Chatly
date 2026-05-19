import { z } from "zod";
import { emailSchema } from "./email.validator";

export const loginSchema = z.object({
  ...emailSchema.shape,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
