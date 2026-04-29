import { z } from "astro/zod";

const requiredText = z.string().trim().min(1);
const optionalText = z.string().trim().optional();
const dateField = z.coerce.date();

export const articleFrontmatterSchema = z.object({
  title: requiredText,
  subtitle: optionalText,
  summary: requiredText,
  subject: requiredText,
  publishedAt: dateField,
  image: z
    .string()
    .regex(
      /^\.\/(?!.*\.\.)[A-Za-z0-9][A-Za-z0-9._/-]*\.(avif|webp|png|jpe?g|svg)$/i,
      "Use a colocated image path such as ./image.svg"
    ),
  tags: z.array(requiredText).default([]),
  sourceUrl: z.url().optional(),
  sharedBy: z.string().trim().min(1).default("wife"),
  sharedAt: dateField.optional(),
  draft: z.boolean().default(false)
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
