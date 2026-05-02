# How to Add a New Article

This site turns Markdown article folders into static HTML during `npm run build`. Each article has its own folder under
`src/content/articles/`, which makes the starter easy to duplicate and keeps article text beside its image.

## Article Folder Shape

The starter article is `src/content/articles/hello-world/`:

```text
src/content/articles/hello-world/
|-- index.md
`-- image.svg
```

The folder name is the public slug. `hello-world` becomes:

```text
/articles/hello-world/
```

Use lowercase letters, numbers, and hyphens for new slugs:

```text
good: article-about-food-systems
bad: Article About Food Systems
```

## How `hello-world/index.md` Is Built

`src/content/articles/hello-world/index.md` has two parts: frontmatter metadata and Markdown body content.

```md
---
title: "Hello World Shared Article"
subtitle: "A starter article for the catalogue"
summary: "This catalogue starts with one article. It proves Markdown can become static HTML. It keeps replacement simple."
subject: "Starter"
publishedAt: "2026-04-29"
image: "./image.svg"
tags: ["starter"]
sourceUrl: "https://example.com/hello-world"
sharedAt: "2026-04-29"
---

This article proves the Markdown folder pipeline.
```

Required fields:

- `title`: shown on the card and article page.
- `summary`: the three-sentence card preview.
- `subject`: shown on the article page.
- `publishedAt`: publication date in `YYYY-MM-DD` format.
- `image`: colocated image path, usually `./image.svg`, `./image.png`, `./image.jpg`, `./image.webp`, or `./image.avif`.

Optional fields:

- `subtitle`: supporting article heading.
- `tags`: topic labels for later filtering/search work.
- `sourceUrl`: original article URL.
- `sharedBy`: defaults to `wife`.
- `sharedAt`: date the article was shared.
- `draft`: when `true`, the article is excluded from public article lists.

The body below the frontmatter is normal Markdown. It becomes the readable article content in the built HTML page.

## Add an Article

Create a starter folder with:

```bash
npm run new:article -- article-slug
```

Example:

```bash
npm run new:article -- food-systems-reading
```

That creates:

```text
src/content/articles/food-systems-reading/
|-- index.md
`-- image.svg
```

The generated article is visible by default because it includes `draft: false`. That keeps the maintainer workflow
direct: create the article, build, preview, and visually verify the card and article page.

Then edit `index.md`:

1. Replace `title`, `subtitle`, `summary`, `subject`, `publishedAt`, and any optional metadata.
2. Replace the Markdown body with notes or article context.
3. Replace `image.svg` or update `image` to point at the colocated image file.
4. Keep `draft: false` when the article should appear on the public index.

Use `draft: true` only when the article should be intentionally hidden from the index and static article routes.

## Build the Static Artifact

```bash
npm run new:article -- glutenvrije-broodjes
```

Run:

```bash
npm run build
```

This validates content, checks Astro types, and writes the static site artifact to `dist/`.

Expected output for a public article:

```text
dist/articles/<article-slug>/index.html
```

If required frontmatter is missing or invalid, the build should fail before anything is published.

## Preview Locally

After `npm run build`, run:

```bash
npm run preview -- --host 127.0.0.1 --port 4321
```

Open:

```text
http://127.0.0.1:4321/
```

Check that the new article appears on the index grid and that its card opens `/articles/<article-slug>/`.

## Final Validation

Before pushing, run:

```bash
npm run ci
```

This runs linting, Astro checks, unit tests, the static build, and the Playwright smoke suite.
