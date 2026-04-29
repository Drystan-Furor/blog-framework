import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const slug = process.argv[2];

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new:article -- article-slug");
  process.exit(1);
}

const articleDir = join(process.cwd(), "src", "content", "articles", slug);
const today = new Date().toISOString().slice(0, 10);

await mkdir(articleDir, { recursive: false });
await writeFile(
  join(articleDir, "index.md"),
  `---
title: "New Shared Article"
subtitle: ""
summary: "Write the first sentence. Write the second sentence. Write the third sentence."
subject: "Uncategorized"
publishedAt: "${today}"
image: "./image.svg"
tags: []
draft: true
---

Replace this starter body with the article notes.
`
);
await writeFile(
  join(articleDir, "image.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">Article image placeholder</title>
  <desc id="desc">Layered paper shapes for a shared article.</desc>
  <rect width="1200" height="800" fill="#f8faf7"/>
  <rect x="150" y="145" width="690" height="500" rx="28" fill="#2f6f62"/>
  <rect x="270" y="225" width="760" height="430" rx="28" fill="#f2c14e"/>
  <rect x="220" y="180" width="760" height="430" rx="28" fill="#ffffff"/>
  <path d="M300 305h540M300 380h420M300 455h500" stroke="#2f3842" stroke-width="34" stroke-linecap="round"/>
  <circle cx="900" cy="280" r="86" fill="#a33d5f"/>
</svg>
`
);

console.log(`Created src/content/articles/${slug}/`);
