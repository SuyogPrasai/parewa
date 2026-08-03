import { z } from "zod";

import { ArticleSchema } from "./articleSchema";

export const SlideSchema = z.object({
  title: z.string(),
  author: z.string(),
});

export const ArticlesResultSchema = z.object({
  total: z.number(),
  articles: z.array(ArticleSchema),
});

export type Slide = z.infer<typeof SlideSchema>;

export type ArticlesResult = z.infer<typeof ArticlesResultSchema>;