import { z } from "zod";

export const CategoriesSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
});

export const LinkSchema = z.object({
  label: z.string(),
  openInNewTab: z.boolean(),
  url: z.string(),
});

export type Categories = z.infer<typeof CategoriesSchema>;

export type Link = z.infer<typeof LinkSchema>;