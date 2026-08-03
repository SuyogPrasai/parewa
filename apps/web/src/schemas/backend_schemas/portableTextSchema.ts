import { z } from "zod";

const PortableTextSpanSchema = z.object({
  _key: z.string(),
  _type: z.literal("span"),
  text: z.string(),
  marks: z.array(z.string()).optional(),
});

// Allow additional properties for custom mark definitions
const PortableTextMarkDefSchema = z.object({
  _key: z.string(),
  _type: z.string(),
}).passthrough();

// Allow additional properties for custom block types
const PortableTextBlockSchema = z.object({
  _key: z.string(),
  _type: z.string(),
  style: z.string().optional(),
  children: z.array(PortableTextSpanSchema).optional(),
  markDefs: z.array(PortableTextMarkDefSchema).optional(),
  level: z.number().optional(),
  listItem: z.string().optional(),
}).passthrough();

export const PortableTextContentSchema = z.array(PortableTextBlockSchema);
export type PortableTextContent = z.infer<typeof PortableTextContentSchema>;