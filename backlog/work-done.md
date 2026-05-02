# Work Done

## Source of Truth

Input read:

- `backlog/refined/sprint1-R.md`
- `backlog/refined/sprint2-R.md`
- `backlog/refined/sprint3-R.md`
- `base/memories.md`

Intent: keep the active backlog limited to work still to be done, and move sprint stories with proof of work into this
completed-work record.

## Proof Standard

A backlog item is listed here when its sprint story has implementation proof in `base/memories.md`, including delivered
scope and verification commands. The proof entries used for this review are:

- `2026-04-29 - Sprint 1 Static Blog Spine Implemented`
- `2026-04-30 - Sprint 2 Browseable Catalogue Implemented`
- `2026-05-01 - Sprint 3 Starter Hardening Implemented`

## Sprint 1 Done - Static Blog Spine

Proof of work: delivered Astro 6 static starter, Markdown article folders, content schema validation, static article
routes, article grid, responsive pagination, theme tokens, ADRs, and smoke coverage. Verification completed with
`npm run format:check`, `npm run ci`, and `npm audit --omit=dev`.

| ID     | Sprint Story | Epic       | Completed Story                                                                    |
|--------|--------------|------------|------------------------------------------------------------------------------------|
| PB-001 | SP-01        | Foundation | Define Astro single-repo folder structure and npm scripts.                         |
| PB-002 | SP-02        | Foundation | Record framework decision for Astro over Vite-only, Webpack, and other options.    |
| PB-003 | SP-03        | Foundation | Record UI decision for Astro components plus vanilla JS over Vue/React by default. |
| PB-004 | SP-04        | Foundation | Scaffold a Hello World Markdown article and generated article page.                |
| PB-005 | SP-05        | Content    | Define article content schema and validation.                                      |
| PB-006 | SP-06        | Content    | Generate static article routes from Markdown folders.                              |
| PB-007 | SP-07        | Browse     | Build article index grid cards.                                                    |
| PB-008 | SP-08        | Browse     | Implement responsive grid and pagination rules.                                    |
| PB-009 | SP-09        | Theme      | Add global theme tokens and automatic light/dark mode.                             |
| PB-014 | SP-10        | Quality    | Add Playwright smoke tests.                                                        |

## Sprint 2 Done - Browseable and Deployable Catalogue

Proof of work: delivered previous/next links, related articles, static search index and search UI, tag and subject browse
pages, SEO metadata, sitemap, RSS, CI workflow, and GitHub Pages build validation. Verification completed with Sprint 2
red tests first, `npm run test:unit -- article-discovery search taxonomy site-artifacts structure`,
`npm run test:e2e:smoke`, `GITHUB_PAGES=true npm run build`, `npm run format:check`, `git diff --check`, and
`npm run ci`.

| ID     | Sprint Story | Epic       | Completed Story                             |
|--------|--------------|------------|---------------------------------------------|
| PB-012 | SP-11        | Navigation | Add previous and next article links.        |
| PB-018 | SP-12        | Navigation | Add related articles by shared tags/subjects. |
| PB-010 | SP-13        | Search     | Generate client-side static search index.   |
| PB-011 | SP-14        | Search     | Build search UI and results.                |
| PB-017 | SP-15        | Browse     | Add tags and category filters.              |
| PB-013 | SP-16        | SEO        | Add SEO basics to article pages.            |
| PB-019 | SP-17        | SEO        | Generate `sitemap.xml`.                     |
| PB-020 | SP-18        | SEO        | Generate RSS feed.                          |
| PB-015 | SP-19        | Delivery   | Add GitHub Actions CI checks.               |
| PB-016 | SP-20        | Delivery   | Deploy static artifact to GitHub Pages.     |

## Sprint 3 Done - Starter Hardening

Proof of work: delivered article image metadata and dimensions, semantic and keyboard accessibility hardening, contrast
validation, optional pre-commit hook smoke, component-state contracts, safer article creation, README onboarding,
merge-check guidance, and static 404 handling. Verification completed with Sprint 3 red tests first,
`npm run test:unit`, `npm run test:e2e:smoke`, `npm run format:check`, `npm run hooks:check`, `git diff --check`,
`npm run ci`, and `GITHUB_PAGES=true npm run build`.

| ID     | Sprint Story | Epic          | Completed Story                                                                         |
|--------|--------------|---------------|-----------------------------------------------------------------------------------------|
| PB-021 | SP-21        | Media         | Optimize article images.                                                               |
| PB-022 | SP-22        | Accessibility | Ensure semantic HTML, keyboard navigation, and no-JavaScript article reading.          |
| PB-023 | SP-23        | Accessibility | Check light/dark contrast.                                                             |
| PB-026 | SP-24        | Quality       | Add linting, formatting, and pre-commit hooks.                                         |
| PB-024 | SP-25        | Quality       | Add unit tests for content parsing and config logic.                                   |
| PB-025 | SP-26        | Quality       | Add component tests for cards, pagination, and search UI.                              |
| PB-027 | SP-27        | Starter       | Add article creation script/template.                                                  |
| PB-028 | SP-28        | Docs          | Add README onboarding.                                                                 |
| PB-029 | SP-29        | Reliability   | Add `404.html` route.                                                                  |
| PB-030 | SP-30        | Quality       | Require passing checks before merge.                                                   |

## Remaining Work

The remaining backlog starts at PB-031 and is tracked in `backlog/backlog.md`.
