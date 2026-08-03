import { z } from "zod";

import { ArticleAuthorSchema } from "./authorSchema";
import { CategoriesSchema } from "./CategoriesSchema";
import { PortableTextContentSchema } from "./portableTextSchema";
import { SanityImageSchema } from "./sanityImageSchema";

export type { PortableTextContent } from "./portableTextSchema";

const ArticleFieldsSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  oneLiner: z.string().nullish(),
  content: PortableTextContentSchema.nullish(),
  featuredImage: SanityImageSchema.nullish(),
  imageDescription: z.string().nullish(),
  author: ArticleAuthorSchema,
  category: CategoriesSchema,
  tags: z.array(z.string()).nullish(),
  publishedAt: z.string(),
});

export const SubArticleSchema = ArticleFieldsSchema;

export const ArticleSchema = ArticleFieldsSchema.extend({

  relatedArticles: z.array(SubArticleSchema).nullish(),
  latestArticles: z.array(SubArticleSchema).nullish(),
});

export type Article = z.infer<typeof ArticleSchema>;
