# Recommended Astro Folder Structure and NPM Scripts

## Decision

Use Astro with build-time content collections, local Markdown article folders, minimal vanilla JavaScript, Playwright smoke tests, and GitHub Pages deployment.

This matches the intent: a static website where shared articles are catalogued as Markdown files, converted to HTML during the build pipeline, easy to browse, and easy to duplicate as a starter.

References checked on 2026-04-29:

- Astro project structure: https://docs.astro.build/en/basics/project-structure/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro CLI scripts: https://docs.astro.build/en/reference/cli-reference/
- Astro GitHub Pages deployment: https://docs.astro.build/en/guides/deploy/github/

## Recommended Structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- docs/
|   `-- folder-structure.md
|-- public/
|   |-- favicon.svg
|   |-- robots.txt
|   `-- site.webmanifest
|-- scripts/
|   |-- new-article.mjs
|   `-- validate-content.mjs
|-- src/
|   |-- assets/
|   |   `-- images/
|   |-- components/
|   |   |-- ArticleCard.astro
|   |   |-- Pagination.astro
|   |   |-- SearchBox.astro
|   |   `-- ThemeMeta.astro
|   |-- content/
|   |   `-- articles/
|   |       |-- hello-world/
|   |       |   |-- index.md
|   |       |   `-- image.avif
|   |       `-- another-shared-article/
|   |           |-- index.md
|   |           `-- image.avif
|   |-- content.config.ts
|   |-- layouts/
|   |   |-- BaseLayout.astro
|   |   `-- ArticleLayout.astro
|   |-- lib/
|   |   |-- articles.ts
|   |   |-- pagination.ts
|   |   |-- search.ts
|   |   `-- seo.ts
|   |-- pages/
|   |   |-- 404.astro
|   |   |-- index.astro
|   |   |-- rss.xml.ts
|   |   |-- articles/
|   |   |   |-- index.astro
|   |   |   `-- [...slug].astro
|   |   `-- tags/
|   |       `-- [tag].astro
|   |-- styles/
|   |   |-- global.css
|   |   `-- tokens.css
|   `-- types/
|       `-- article.ts
|-- tests/
|   |-- e2e/
|   |   |-- smoke.spec.ts
|   |   |-- article-browse.spec.ts
|   |   `-- search.spec.ts
|   |-- fixtures/
|   |   `-- articles/
|   `-- unit/
|       |-- content-schema.test.ts
|       |-- pagination.test.ts
|       `-- search-index.test.ts
|-- astro.config.mjs
|-- eslint.config.js
|-- package.json
|-- playwright.config.ts
|-- prettier.config.mjs
|-- tsconfig.json
`-- vitest.config.ts
```

## Folder Rules

Use `src/pages/` for file-based routes. Astro requires this folder for routes.

Use `src/content/articles/<slug>/index.md` for articles. This is the Astro-native version of the requested article starter shape:

```text
src/content/articles/<article-slug>/index.md
src/content/articles/<article-slug>/image.avif
```

If an exact root-level `blogs/<name>/index.md` source path becomes mandatory, keep the rest of this structure and point the Astro content collection loader at `./blogs` instead. The recommended default is `src/content/articles` because it keeps article content close to Astro's content tooling.

Use `src/content.config.ts` for the article schema. The first version should validate at least:

```yaml
title: "Article title"
subtitle: "Optional supporting title"
summary: "Three sentence preview for cards and metadata."
subject: "Primary subject"
tags: ["topic", "theme"]
sourceUrl: "https://example.com/original-article"
sharedBy: "wife"
sharedAt: "2026-04-29"
publishedAt: "2026-04-29"
image: "./image.avif"
draft: false
```

Use `src/lib/` for pure logic that can be unit tested without rendering Astro components: article sorting, pagination, previous/next resolution, related article matching, search index construction, and SEO metadata.

Use `src/components/` for reusable Astro UI elements. Keep components framework-free until a specific interaction needs more than vanilla JavaScript.

Use `src/styles/tokens.css` for global design tokens: colors, light/dark theme variables, spacing, typography, breakpoints, and radii.

Use `public/` only for assets that should be copied without processing, such as `robots.txt`, `favicon.svg`, and web manifests. Article images should stay beside the Markdown entry so Astro can process and optimize them.

Use `scripts/` only for project automation that Astro does not provide directly, such as creating a new article folder from a template or running extra content validation.

## Recommended NPM Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "check": "astro check",
    "build": "astro check && astro build",
    "build:only": "astro build",
    "preview": "astro preview",
    "preview:prod": "npm run build && astro preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:smoke": "playwright test --grep @smoke",
    "new:article": "node scripts/new-article.mjs",
    "validate:content": "node scripts/validate-content.mjs",
    "ci": "npm run lint && npm run check && npm run test:unit && npm run build && npm run test:e2e:smoke",
    "clean": "rimraf dist .astro"
  }
}
```

## Build Pipeline

The build pipeline should stay simple:

```text
Markdown article folders
-> Astro content collection schema validation
-> Astro static route generation
-> search/rss/sitemap artifacts
-> dist/ static HTML/CSS/JS/images
-> GitHub Pages deployment
```

The core Markdown-to-HTML transformation is `astro build`. Extra scripts should support content creation or validation, not replace Astro's build system.

## GitHub Pages Notes

Use the official Astro GitHub Pages workflow pattern with `withastro/action` and `actions/deploy-pages`.

Set `site` in `astro.config.mjs` to the deployed GitHub Pages URL.

Set `base` in `astro.config.mjs` when deploying to a project page such as `https://<username>.github.io/<repo>/`. Skip `base` only for a user or organization site named `<username>.github.io` or when using a custom domain.

Commit the package manager lockfile so the GitHub Action can detect and install dependencies consistently.

## Starter Duplication Rules

A duplicated starter should require only these edits before first deploy:

1. Change site title, description, URL, and GitHub Pages `base`.
2. Replace the Hello World article in `src/content/articles/hello-world/`.
3. Run `npm run new:article -- <slug>` for each new article.
4. Run `npm run ci`.
5. Push to GitHub and enable Pages with GitHub Actions as the source.
