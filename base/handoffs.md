# Handoffs

## 2026-04-29 - Planning Artifacts Completed

Status: completed for the requested documentation and backlog planning task.

Completed outputs:

- `docs/folder-structure.md`: recommended Astro folder structure, npm scripts, build pipeline, and GitHub Pages notes.
- `backlog/backlog.md`: prioritized backlog derived from `base/essence.md`.
- `backlog/roadmap/roadmap.md`: roadmap with WSJF scoring and epics.
- `backlog/sprint/sprint-planning.md`: 30 spec-driven TDD delivery stories with WSJF scores and refinement questions.
- `backlog/sprint/sprint1.md`: 10 stories.
- `backlog/sprint/sprint2.md`: 10 stories.
- `backlog/sprint/sprint3.md`: 10 stories.
- `base/memories.md`: updated with the architecture and planning decisions.

No blocker handoff is required. Remaining refinement questions are captured inside the sprint planning document, especially:

- Exact article source path: Astro-native `src/content/articles/<slug>/index.md` or exact root-level `blogs/<slug>/index.md`.
- Production GitHub Pages URL and whether Astro `base` is required.
- Search depth: title/metadata only or full article body.
- Whether article source URLs or the catalogue URLs should be canonical.
- WCAG target level and protected branch name.

## 2026-04-29 - Sprint 1 Refinement Completed

Status: completed for the requested Sprint 1 refinement task.

Completed outputs:

- `backlog/sprint/sprint1.md`: read as the sprint input.
- `backlog/refined/sprint1-R.md`: written with TDD spec-driven user stories, acceptance criteria, validations, working assumptions, story execution order, validation matrix, and exit criteria.
- `base/memories.md`: updated with the Sprint 1 refinement memory.
- `base/handoffs.md`: updated with this completion summary.

No blocker handoff is required. Remaining refinement questions are captured inside `backlog/refined/sprint1-R.md`.

## 2026-04-29 - Sprint 1 Static Blog Spine Completed

Status: completed for the requested Sprint 1 implementation task.

Completed outputs:

- `package.json`, `package-lock.json`, and project configs for Astro, TypeScript, Vitest, Playwright, ESLint, and Prettier.
- `src/content/articles/hello-world/index.md` plus colocated `image.svg`, rendered to `/articles/hello-world/`.
- `src/content.config.ts` and `src/lib/article-schema.ts` for validated article frontmatter.
- `src/pages/`, `src/components/`, `src/layouts/`, `src/styles/`, and `src/lib/` for the static article catalogue, responsive grid, pagination helpers, and theme tokens.
- `docs/adr/0001-framework.md` and `docs/adr/0002-ui-library.md` for Sprint 1 architecture decisions.
- `tests/unit/` and `tests/e2e/smoke.spec.ts` covering every Sprint 1 story validation path.
- `artifact/sprint1-static-blog-spine.md` with the delivery and verification summary.

Verification:

- `npm run format:check`: passed.
- `npm run ci`: passed, including lint, Astro check, 19 unit tests, build, and 4 Playwright smoke tests.
- `npm audit --omit=dev`: passed with 0 production vulnerabilities.

No blocker handoff is required. The remaining product refinement questions from `backlog/refined/sprint1-R.md` are still valid for later sprints, especially production GitHub Pages URL/base, exact tablet pagination behavior, and whether source URL/shared date become required catalogue metadata.

## 2026-04-30 - Sprint 2 Refinement Completed

Status: completed for the requested Sprint 2 refinement task.

Completed outputs:

- `backlog/sprint/sprint2.md`: read as the sprint input.
- `base/memories.md`: read for project context and updated with the Sprint 2 refinement memory.
- `base/handoffs.md`: updated with this completion summary.
- `backlog/refined/sprint2-R.md`: written with TDD spec-driven user stories, acceptance criteria, validations, working assumptions, Sprint 1 baseline, story execution order, validation matrix, and exit criteria.
- `tests/unit/refined-sprint2.test.ts`: added to verify the refined sprint artifact plus memory and handoff updates.

Verification:

- Targeted red test was run before the output existed and failed for the expected missing artifact/memory/handoff reasons.
- `npm run test:unit -- refined-sprint2`: passed.
- `npx prettier --check backlog/refined/sprint2-R.md base/memories.md base/handoffs.md tests/unit/refined-sprint2.test.ts`: passed.
- `git diff --check`: passed.
- `npm run ci`: passed.

No blocker handoff is required. Remaining refinement questions are captured inside `backlog/refined/sprint2-R.md`, especially search depth, tag/category taxonomy, related article UI/count, canonical URL policy, RSS path/limit, CI workflow split, and default branch naming.

## 2026-04-30 - Sprint 2 Browseable Catalogue Completed

Status: completed for the requested Sprint 2 implementation task.

Completed outputs:

- `src/lib/articles.ts`, `src/lib/search.ts`, `src/lib/taxonomy.ts`, `src/lib/site.ts`, and `src/lib/site-artifacts.ts`: shared helpers for public sorting, adjacent articles, related ranking, static search, taxonomy slugs/groups, absolute URLs, sitemap XML, and RSS XML.
- `src/layouts/BaseLayout.astro` and `src/layouts/ArticleLayout.astro`: SEO metadata, canonical/Open Graph tags, Article JSON-LD, tag/subject links, previous/next navigation, and related articles.
- `src/pages/search/index.astro`, `src/pages/search-index.json.ts`, `src/pages/tags/[tag].astro`, `src/pages/subjects/[subject].astro`, `src/pages/sitemap.xml.ts`, and `src/pages/rss.xml.ts`: static browse/search/SEO/feed surfaces.
- `.github/workflows/ci.yml`: pull request/default branch CI checks without Pages deployment.
- `tests/unit/article-discovery.test.ts`, `tests/unit/search.test.ts`, `tests/unit/taxonomy.test.ts`, `tests/unit/site-artifacts.test.ts`, and expanded smoke/structure tests for Sprint 2 behavior.

Verification:

- Red Sprint 2 unit tests were run first and failed for the expected missing helpers/workflow.
- `npm run test:unit -- article-discovery search taxonomy site-artifacts structure`: passed after implementation.
- `npm run test:e2e:smoke`: passed with 8 smoke tests.
- `GITHUB_PAGES=true npm run build`: passed and emitted base-prefixed search links plus absolute sitemap/RSS URLs.
- `npm run format:check`: passed.
- `git diff --check`: passed.
- `npm run ci`: passed.

No blocker handoff is required. One pre-existing workspace edit remains unstaged in `backlog/refined/sprint2-R.md`; it is formatting-only input-file churn and was not included in the implementation commit.
