import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { articleFrontmatterSchema } from "./lib/article-schema";

const articles = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/articles" }),
  schema: articleFrontmatterSchema
});

export const collections = { articles };
