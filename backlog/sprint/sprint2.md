# Sprint 2 - Make It Browseable and Deployable

## Goal

Turn the vertical slice into a deployable catalogue: article navigation, related discovery, static search, tag browsing, SEO artifacts, CI checks, and GitHub Pages deployment.

## Success Criteria

- Users can search and discover articles without server support.
- Article pages include previous/next, related articles, SEO metadata, sitemap, and RSS.
- GitHub Actions validates changes and deploys the static site to GitHub Pages.

## Stories

| # | Story | Backlog | WSJF | Sprint Acceptance | Verification |
| ---: | --- | --- | ---: | --- | --- |
| 1 | SP-11 - Previous and Next Article Links | PB-012 | 9.50 | Article footers link to adjacent articles. | Resolver unit tests and e2e footer check. |
| 2 | SP-12 - Related Articles | PB-018 | 5.67 | Footer shows related articles by shared metadata. | Related scoring unit tests and e2e check. |
| 3 | SP-13 - Static Search Index | PB-010 | 6.50 | Build emits a static search index for public articles. | Search index unit tests and build output check. |
| 4 | SP-14 - Search UI and Ranking | PB-011 | 5.00 | Users can search and receive ranked results. | Ranking unit tests and Playwright search tests. |
| 5 | SP-15 - Tags and Category Filters | PB-017 | 5.67 | Tag/category pages list matching articles. | Tag extraction tests and e2e navigation. |
| 6 | SP-16 - SEO Basics | PB-013 | 6.67 | Article pages include title, description, canonical, robots, Open Graph metadata, and schema.org Article JSON-LD. | SEO/helper tests and DOM meta assertions. |
| 7 | SP-17 - Sitemap | PB-019 | 8.00 | Build emits `sitemap.xml` for public routes. | Build artifact XML check. |
| 8 | SP-18 - RSS Feed | PB-020 | 4.67 | Build emits RSS feed with latest articles. | RSS output test. |
| 9 | SP-19 - GitHub Actions CI | PB-015 | 8.67 | CI runs install, lint/check, tests, build, and smoke tests. | Local `npm run ci` plus workflow review. |
| 10 | SP-20 - GitHub Pages Deployment | PB-016 | 6.75 | Default branch deploys `dist/` to GitHub Pages. | Production preview and Pages workflow. |

## Sprint Refinement Focus

- Confirm deployed URL and whether `base` is required.
- Confirm search scope: title-only, metadata, or full text.
- Confirm related article scoring priority.
- Confirm whether tag pages should be indexed.
