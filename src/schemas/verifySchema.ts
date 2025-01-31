import { z } from "zod";

export const verifySchema = z.object({
    otp: z.string().length(6, "Verification Code Must be 6 Digits")
})