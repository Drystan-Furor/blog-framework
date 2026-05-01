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

## 2026-04-30 - Sprint 2 Browseable Catalogue Implemented

- Input executed from `backlog/refined/sprint2-R.md`.
- Implementation branch: `codex/implement-sprint2`, branched from the active Sprint 2 refinement branch because the refined sprint file was the task input in the workspace.
- Delivered article discovery helpers for public sorting, previous/next navigation, and related article ranking by tags, subject, recency, and slug.
- Added static search: `dist/search-index.json`, `/search/` UI, title/tag/subject/summary/body ranking helpers, and base-aware result links for GitHub Pages.
- Added tag and subject browse pages, SEO metadata/canonical/Open Graph/Article JSON-LD, generated `sitemap.xml`, generated `rss.xml`, and a pull-request CI workflow.
- Verification completed: red unit tests failed first for missing Sprint 2 behavior; `npm run format:check`, `npm run ci`, and `GITHUB_PAGES=true npm run build` pass. The Pages-shaped build emits base-prefixed search links plus absolute sitemap/RSS URLs under `https://drystan-furor.github.io/blog-framework/`.

## 2026-05-01 - Sprint 3 Refinement

- Input read: `backlog/sprint/sprint3.md`.
- Refined Sprint 3 output written to `backlog/refined/sprint3-R.md` with TDD-focused user stories, acceptance criteria, validations, working assumptions, Sprint 1 and Sprint 2 baseline, story ordering, validation matrix, and exit criteria.
- Sprint 3 is scoped to hardening the starter: image optimization, semantic HTML and keyboard accessibility, contrast checks, lint/format hooks, expanded unit and component coverage, article creation workflow, README onboarding, static 404 handling, and merge-check guidance.
- The `sprint1.md` wording in the task was treated as a typo because the ACT block explicitly named `backlog/sprint/sprint3.md` as input and `backlog/refined/sprint3-R.md` as output.
- Remaining open decisions are intentionally tracked in the refined output: WCAG level, Husky default behavior, component test framework, protected branch name, image fallback policy, article template defaults, and merge queue guidance.

## 2026-05-01 - Sprint 3 Starter Hardening Implemented

- Input executed from `backlog/refined/sprint3-R.md`.
- Implementation branch: `codex/implement-sprint3`, branched from `codex/refine-sprint3` because the refined sprint file was the task input in the active workspace.
- Delivered required article image alt metadata, image dimensions/loading attributes for cards and hero images, skip-link/focus/footer semantics, no-JavaScript article readability coverage, contrast token validation, optional `.husky/pre-commit` hook smoke, component-state contracts, safer article creation, README onboarding, merge-check guidance, and a static `404.html`.
- The known malformed Markdown image in `src/content/articles/schermtijd-en-gezin/index.md` is excluded in `.prettierignore` so the new format gate can pass without performing unrelated content cleanup.
- Added Sprint 3 validation: 57 Vitest unit tests across schema/content/contrast/component contracts/article creation/docs/workflows, and 13 Playwright smoke tests covering browsing, search, image stability, keyboard navigation, no-JavaScript reading, static 404 recovery, responsive overflow, and theme tokens.
- Verification completed: `npm run format:check`, `npm run hooks:check`, `git diff --check`, `npm run ci`, and `GITHUB_PAGES=true npm run build` pass.
