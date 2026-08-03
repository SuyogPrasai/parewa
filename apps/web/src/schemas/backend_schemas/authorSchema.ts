import { z } from "zod";

import { SanityImageSchema } from "./sanityImageSchema";

export const ArticleAuthorSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  displayName: z.string(),
  batch: z.string().nullish(),
  displayPicture: SanityImageSchema.nullish(),
  email: z.string().nullish(),
  fullName: z.string(),
  grade: z.string().nullish(),
  roll: z.string().nullish(),
  role: z.string(),
  position: z.string().nullish(),
  graduatedYear: z.number().optional(),
  contactNumber: z.string().nullish(),
  initials: z.string().nullish(),
  department: z.string().nullish(),
  house: z.string().nullish(),
  organization: z.string().nullish(),
});

export type ArticleAuthor = z.infer<typeof ArticleAuthorSchema>;
