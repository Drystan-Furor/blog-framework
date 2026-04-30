# Memories

## 2026-04-29 - Astro Static Article Catalogue Planning

- Source intent is `base/essence.md`: build a static GitHub Pages article catalogue for articles shared by the developer's wife, with Markdown folders transformed into HTML during the build pipeline.
- Recommended architecture is Astro + build-time content collections + minimal vanilla JavaScript + Playwright + GitHub Pages.
- Recommended article source path is Astro-native `src/content/articles/<slug>/index.md` with a colocated `image.avif`; preserve the original `blogs/<slug>/index.md` request as a refinement/compatibility question if exact root-level paths become mandatory.
- Planning artifacts written from this source are `docs/folder-structure.md`, `backlog/backlog.md`, `backlog/roadmap/roadmap.md`, `backlog/sprint/sprint-planning.md`, and `backlog/sprint/sprint1.md` through `sprint3.md`.
- Sprint planning intentionally uses three sprints with exactly 10 stories each: SP-01 through SP-10, SP-11 through SP-20, and SP-21 through SP-30.

## 2026-04-29 - Sprint 1 Refinement

- Input read: `backlog/sprint/sprint1.md`.
- Refined Sprint 1 output written to `backlog/refined/sprint1-R.md` with TDD-focused user stories, Given/When/Then acceptance criteria, validations, story ordering, assumptions, and exit criteria.
- Sprint 1 remains scoped to proving the static Astro content spine: structure, ADRs, content schema, Markdown article rendering, static routes, index grid, responsive pagination, system theme, and Playwright smoke coverage.
- Remaining open decisions are intentionally tracked in the refined output: Node/npm version, article source path compatibility, article URL shape, required catalogue metadata, tablet/mobile pagination details, token storage, and Playwright browser scope.

## 2026-04-29 - Sprint 1 Static Blog Spine Implemented

- Input read and executed from `backlog/refined/sprint1-R.md`.
- Implementation branch: `feature/sprint1-static-blog-spine`, created from `master`, then the refined sprint input commit was cherry-picked onto it.
- Delivered an Astro 6 static starter with Markdown article folders at `src/content/articles/<slug>/index.md`, content schema validation in `src/content.config.ts`, static article routes at `/articles/<slug>/`, a browseable home/articles index grid, responsive CSS, system light/dark theme tokens, and a `new:article` script.
- Added ADRs for framework and UI-library decisions in `docs/adr/0001-framework.md` and `docs/adr/0002-ui-library.md`.
- Added Sprint 1 validation: 19 Vitest unit tests for structure, ADRs, content schema, routing, and pagination; 4 Playwright smoke tests for home, article navigation, responsive overflow, and shared theme tokens.
- Verification completed: `npm run format:check`, `npm run ci`, and `npm audit --omit=dev` all pass. `npm run build` produces `dist/index.html`, `dist/articles/index.html`, and `dist/articles/hello-world/index.html`.

## 2026-04-30 - Sprint 2 Refinement

- Input read: `backlog/sprint/sprint2.md`.
- Refined Sprint 2 output written to `backlog/refined/sprint2-R.md` with TDD-focused user stories, acceptance criteria, validations, story ordering, assumptions, validation matrix, and exit criteria.
- Sprint 2 is scoped to making the catalogue browseable and deployable: previous/next links, related articles, static search index, search UI/ranking, tag/category browsing, SEO metadata, sitemap, RSS, CI, and GitHub Pages deployment validation.
- Current implementation baseline noted in the refined output: Sprint 1 article spine exists, and GitHub Pages deployment already exists on `master`; SP-20 remains as validation/hardening so future work avoids duplicate workflow logic.
- Remaining open decisions are intentionally tracked in the refined output: search index path and depth, related article count/UI, category versus subject taxonomy, canonical URL policy, sitemap tag indexing, RSS path/limit, CI workflow split, and default branch name.
