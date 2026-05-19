import { z } from "zod";
import { emailSchema } from "./email.validator";

export const emailOtpSchema = z.object({
  ...emailSchema.shape,
  otp: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type EmailOtpInput = z.infer<typeof emailOtpSchema>;
