import { z } from "zod";

const emailSchema = z.string()
  .email("Invalid email format")
  .regex(/^[a-zA-Z0-9._%+-]+@bnks\.edu\.np$/, "Email must be a @bnks.edu.np email");

export const emailVerifySchema = z.object({
  email: emailSchema,
});