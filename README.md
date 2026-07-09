# Shared Article Catalogue

A static Astro starter for cataloging articles shared by my wife. Markdown article folders become static HTML during the build pipeline, so the site can run on Codeberg Pages without a server.

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

Articles live in `src/content/articles/<slug>/index.md` with colocated media files. Frontmatter schema requires title, summary, subject, published date, hero image path, and image alt text.

Create a starter article folder with:

```sh
npm run new:article -- article-slug
```

The command writes `src/content/articles/<slug>/index.md` and a colocated `image.svg` placeholder. Replace TODO image alt text before publishing.

## Quality Gates

Use commands before opening a pull request:

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

Build normal local static output:

```sh
npm run build
```

Build with the Codeberg Pages repository base path:

```sh
CODEBERG_PAGES=true npm run build
```

Preview the built site:

```sh
npm run preview
```

## Codeberg Pages

Woodpecker builds with `CODEBERG_PAGES=true` so internal links and assets use `/blog-framework/`, then publishes `dist/` to the repository branch `pages`.

Migration checklist from GitHub:

- Import or push this repository to `https://codeberg.org/drystan-furor/blog-framework`.
- Enable the repository in Codeberg Woodpecker.
- Add Woodpecker repository secrets `codeberg_username` and `codeberg_token`. The token needs repository write access.
- In Codeberg repository settings, add a Forgejo webhook with target `https://drystan-furor.codeberg.page/blog-framework/` and branch filter `pages`.
- Push to `master`; Woodpecker runs checks, rebuilds the site, and force-publishes the generated files to `pages`.

## Duplicate Starter

When duplicating starter, update:

- `astro.config.mjs` production site origin and repository base path.
- `src/lib/site.ts` the public site title, description, and origin.
- `.woodpecker.yml` if the default branch is not `master`.
- Article folders under `src/content/articles/`.

See `docs/merge-checks.md` protected branch required check guidance.
