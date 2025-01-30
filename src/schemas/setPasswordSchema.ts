import { z } from 'zod';

export const emailSchema = z.object({
    password: z.string().min(2,{message: "Should be minimum 6 character"}),
    confirmPassword: z.string().min(2,{message: "Should be minimum 6 character"})
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );


