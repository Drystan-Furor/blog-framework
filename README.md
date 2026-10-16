# Shared Article Catalogue

A static Astro starter for cataloging articles shared by my wife. Markdown article folders become static HTML during the build pipeline, so the site can run on GitHub Pages without a server.

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

Build with the GitHub Pages repository base path:

```sh
GITHUB_PAGES=true npm run build
```

Preview the built site:

```sh
npm run preview
```

## GitHub Pages

The `Pages` GitHub Actions workflow checks pull requests and pushes to `master`. A successful `master` push rebuilds with `GITHUB_PAGES=true`, uploads `dist/` as a Pages artifact, and deploys it without committing generated files.

One-time repository setup:

- Open repository Settings, then Pages.
- Select GitHub Actions as the build and deployment source.
- Protect `master` with the `Pages / quality` check.
- Push to `master` and follow the `Pages` workflow in the Actions tab.

## Duplicate Starter

When duplicating starter, update:

- `astro.config.mjs` production site origin and repository base path.
- `src/lib/site.ts` the public site title, description, and origin.
- `.github/workflows/pages.yml` if the default branch is not `master`.
- Article folders under `src/content/articles/`.

See `docs/merge-checks.md` protected branch required check guidance.
