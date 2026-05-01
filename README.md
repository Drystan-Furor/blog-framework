# Shared Article Catalogue

A static Astro starter for cataloging articles shared by my wife. Markdown article folders become static HTML during the
build pipeline, so the site can run on GitHub Pages without a server.

## Requirements

- Node.js 22
- npm

## Install

```sh
npm install
```

## Develop

```sh
npm run dev
```

The development server renders the same article source used by the static build.

## Article Content

Articles live in `src/content/articles/<slug>/index.md` with colocated media files. The frontmatter schema requires a
title, summary, subject, published date, hero image path, and image alt text.

Create a starter article folder with:

```sh
npm run new:article -- article-slug
```

The command writes `src/content/articles/<slug>/index.md` and a colocated `image.svg` placeholder. Replace the TODO
image alt text before publishing.

## Quality Gates

Use these commands before opening a pull request:

```sh
npm run format:check
npm run lint
npm run test:unit
npm run test:e2e:smoke
npm run ci
```

Local hooks are optional. To smoke-check the provided pre-commit hook directly, run:

```sh
npm run hooks:check
```

CI remains the required source of truth for merges.

## Build And Preview

Build the normal local static output:

```sh
npm run build
```

Build with the GitHub Pages base path:

```sh
GITHUB_PAGES=true npm run build
```

Preview the built site:

```sh
npm run preview
```

## GitHub Pages

The Pages workflow builds with `GITHUB_PAGES=true` so internal links and assets use `/blog-framework/`. Configure GitHub
Pages to deploy from GitHub Actions.

## Duplicate the starter

When duplicating the starter, update:

- `astro.config.mjs` for the production site origin and repository base path.
- `src/lib/site.ts` for the public site title, description, and origin.
- `.github/workflows/*.yml` if the default branch is not `master`.
- Article folders under `src/content/articles/`.

See `docs/merge-checks.md` for protected branch and required check guidance.
