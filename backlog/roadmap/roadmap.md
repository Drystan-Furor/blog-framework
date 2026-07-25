# Roadmap

## WSJF Method

WSJF = (Business Value + Time Criticality + Risk Reduction / Opportunity Enablement) / Job Size

Scores use a 1-10 scale. Higher WSJF usually ships earlier. Job Size is relative effort, where 1 is smallest and 10 is
largest. The rank below respects hard dependencies first, then WSJF within those constraints.

## Epics

| Epic | Name                                | Outcome                                                                                         |
|------|-------------------------------------|-------------------------------------------------------------------------------------------------|
| E1   | Foundation and Starter Architecture | Astro project shape, npm workflows, decision records, and Hello World vertical slice are clear. |
| E2   | Markdown Content Pipeline           | Markdown article folders validate, build, and become static HTML pages.                         |
| E3   | Browse Experience                   | Users can browse articles through a responsive card grid with controlled pagination.            |
| E4   | Search and Discovery                | Users can search and filter 200+ articles on static hosting.                                    |
| E5   | Article Navigation                  | Article pages support previous/next navigation and related discovery.                           |
| E6   | SEO, Feeds, and Media               | Articles are discoverable, shareable, and fast.                                                 |
| E7   | Quality and Delivery                | Tests, CI, and GitHub Pages deployment make changes safe to ship.                               |
| E8   | Starter Maintenance                 | The project remains easy to duplicate, operate, and evolve.                                     |

## Prioritized Roadmap

| Rank | Backlog IDs                    | Epic | Initiative                                                       | BV | TC | RR/OE | Size | WSJF | Release Target |
|-----:|--------------------------------|------|------------------------------------------------------------------|---:|---:|------:|-----:|-----:|----------------|
|    1 | PB-001, PB-002, PB-003         | E1   | Astro structure, npm scripts, and architecture decisions         |  9 |  9 |     9 |    3 | 9.00 | Sprint 1       |
|    2 | PB-004, PB-005, PB-006         | E2   | Hello World Markdown-to-HTML article pipeline                    | 10 |  9 |     9 |    4 | 7.00 | Sprint 1       |
|    3 | PB-014, PB-024                 | E7   | First TDD safety net with Playwright smoke and unit tests        |  8 |  8 |    10 |    4 | 6.50 | Sprint 1       |
|    4 | PB-007, PB-008                 | E3   | Article index grid, responsive layout, and pagination foundation | 10 |  8 |     7 |    5 | 5.00 | Sprint 1       |
|    5 | PB-009                         | E1   | Global theme tokens and automatic light/dark mode                |  8 |  7 |     7 |    3 | 7.33 | Sprint 1       |
|    6 | PB-012, PB-018                 | E5   | Previous/next and related article discovery                      |  7 |  6 |     6 |    3 | 6.33 | Sprint 2       |
|    7 | PB-010, PB-011, PB-038         | E4   | Static search index, search UI, and ranked results               | 10 |  8 |     8 |    6 | 4.33 | Sprint 2       |
|    8 | PB-013, PB-019, PB-020         | E6   | SEO basics, sitemap, and RSS                                     |  8 |  6 |     6 |    4 | 5.00 | Sprint 2       |
|    9 | PB-015, PB-016                 | E7   | CI checks and GitHub Pages deployment                            | 10 |  9 |     8 |    5 | 5.40 | Sprint 2       |
|   10 | PB-017                         | E4   | Tags and category browsing                                       |  7 |  5 |     5 |    3 | 5.67 | Sprint 2       |
|   11 | PB-021                         | E6   | Image optimization and fallbacks                                 |  7 |  5 |     6 |    4 | 4.50 | Sprint 3       |
|   12 | PB-022, PB-023                 | E6   | Accessibility and contrast hardening                             |  8 |  5 |     8 |    4 | 5.25 | Sprint 3       |
|   13 | PB-025, PB-026                 | E7   | Component tests, linting, formatting, and pre-commit hooks       |  6 |  5 |     8 |    4 | 4.75 | Sprint 3       |
|   14 | PB-027, PB-028                 | E8   | Article starter script and onboarding                            |  8 |  5 |     7 |    3 | 6.67 | Sprint 3       |
|   15 | PB-029, PB-030                 | E7   | Static 404 and merge-check guidance                              |  5 |  4 |     6 |    3 | 5.00 | Sprint 3       |
|   16 | PB-031, PB-041                 | E8   | Architecture diagrams and unresolved scope decisions             |  5 |  3 |     8 |    4 | 4.00 | Later          |
|   17 | PB-032                         | E8   | Dependency and security automation                               |  6 |  4 |     8 |    4 | 4.50 | Later          |
|   18 | PB-033                         | E7   | Pull request preview deployments                                 |  5 |  3 |     5 |    5 | 2.60 | Later          |
|   19 | PB-034, PB-035                 | E8   | Release traceability and content portability                     |  4 |  3 |     5 |    4 | 3.00 | Later          |
|   20 | PB-036, PB-037, PB-039, PB-040 | E8   | Analytics, theme editor, URL import, and generated thumbnails    |  4 |  2 |     4 |    8 | 1.25 | Later          |

## Release Milestones

### Sprint 1 - Prove the Static Blog Spine

Goal: a duplicate-ready Astro starter can render a Markdown Hello World article, show it in a responsive index, apply
theme tokens, and run the first tests.

Primary risks reduced:

- Wrong framework or folder structure.
- Markdown-to-HTML pipeline not proven early.
- Layout rules becoming ambiguous.

### Sprint 2 - Make It Browseable and Deployable

Goal: the site supports useful navigation, search, tags, SEO basics, CI, and GitHub Pages deployment.

Primary risks reduced:

- Static search does not scale to 200+ articles.
- GitHub Pages `site` and `base` configuration is wrong.
- Article discovery is too shallow.

### Sprint 3 - Harden the Starter

Goal: improve article creation, accessibility, media performance, local quality gates, onboarding, 404 handling, and
merge readiness.

Primary risks reduced:

- Starter is difficult to duplicate.
- Content or UI regressions are missed locally.
- Site quality is acceptable only on happy-path desktop browsing.

## Later Roadmap

Later work remains valuable but should not delay the MVP:

- Pull request preview deployments.
- Versioned releases and changelog generation.
- Markdown backup/export.
- Privacy-friendly analytics.
- Theme editor.
- URL/article import.
- Automatic thumbnails or screenshots.
- Additional architecture diagrams.
- Dependency update and security automation.
