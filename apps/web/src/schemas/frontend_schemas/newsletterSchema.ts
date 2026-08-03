import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.email(),
});
  