import { PassThrough } from 'stream';
import { z } from 'zod';

export const usernameValidation = z
                                    .string()
                                    .min(2, "Username should be at least 2 characters long")
                                    .max(20, "Username at max be 20 characters long")
                                    .regex(/^[a-zA-Z0-9_-]{4,16}$/, "Username cannot contain Special Character")

            
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(6,{message: "Should be minimum 6 character"}),
    confirmPassword: z.string().min(6,{message: "Should be minimum 6 character"})
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );


