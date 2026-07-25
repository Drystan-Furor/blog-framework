import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export function assertValidSlug(slug) {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Usage: npm run new:article -- article-slug");
  }
}

export function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function createArticleMarkdown(slug, today) {
  const title = titleFromSlug(slug);

  return `---
title: "${title}"
subtitle: ""
summary: "Write the first sentence. Write the second sentence. Write the third sentence."
subject: "Uncategorized"
publishedAt: "${today}"
image: "./image.svg"
imageAlt: "TODO: Describe the article image."
tags: []
sourceUrl: "https://example.com/${slug}"
sharedAt: "${today}"
draft: false
---

Replace this starter body with the article notes.
`;
}

export function createArticleImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">Article image placeholder</title>
  <desc id="desc">Layered paper shapes for a shared article.</desc>
  <rect width="1200" height="800" fill="#f8faf7"/>
  <rect x="150" y="145" width="690" height="500" rx="28" fill="#2f6f62"/>
  <rect x="270" y="225" width="760" height="430" rx="28" fill="#f2c14e"/>
  <rect x="220" y="180" width="760" height="430" rx="28" fill="#ffffff"/>
  <path d="M300 305h540M300 380h420M300 455h500" stroke="#2f3842" stroke-width="34" stroke-linecap="round"/>
  <circle cx="900" cy="280" r="86" fill="#a33d5f"/>
</svg>
`;
}

export async function createArticle(slug, cwd = process.cwd()) {
  assertValidSlug(slug);

  const articlesDir = join(cwd, "src", "content", "articles");
  const articleDir = join(cwd, "src", "content", "articles", slug);
  const today = new Date().toISOString().slice(0, 10);

  await mkdir(articlesDir, { recursive: true });
  await mkdir(articleDir, { recursive: false });
  await writeFile(join(articleDir, "index.md"), createArticleMarkdown(slug, today));
  await writeFile(join(articleDir, "image.svg"), createArticleImageSvg());

  return `Created src/content/articles/${slug}/`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(await createArticle(process.argv[2]));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
