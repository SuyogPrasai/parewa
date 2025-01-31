import { z } from 'zod';

export const setPasswordSchema = z.object({
    password: z.string().min(2,{message: "Should be minimum 6 character"}),
    confirm_password: z.string().min(2,{message: "Should be minimum 6 character"})
}).refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );


