# Sprint 2 Refined - Make the Catalogue Browseable and Deployable

## Source

Input read: `backlog/sprint/sprint2.md`

Memory read: `base/memories.md`

Sprint 1 reference read: `backlog/refined/sprint1-R.md`

Intent: build a static GitHub Pages website that catalogs articles shared by the developer's wife, keeps article source
as Markdown folders, transforms Markdown into static HTML during the build pipeline, remains easy to browse, and is easy
to duplicate as a starter.

## Sprint 1 Baseline

- Astro 6 is the selected static framework.
- Article source lives at `src/content/articles/<slug>/index.md` with colocated images.
- Public article URLs use `/articles/<slug>/` under the configured site base.
- The current starter has static article routes, a browseable index, responsive grid behavior, pagination helpers, theme
  tokens, and Playwright smoke coverage.
- GitHub Pages deployment has already been added on `master`; Sprint 2 keeps deployment in scope as validation and
  hardening rather than duplicating workflow definitions.

## Sprint Goal

Make the starter genuinely browseable and publishable for a growing catalogue: article-to-article navigation, related
discovery, static search, tag/category browsing, SEO artifacts, RSS, sitemap, CI validation, and GitHub Pages deployment
verification.

## Working Assumptions

- The site remains fully static and public.
- Search runs in the browser from a generated static index, with no server or external search service.
- Search should include title, summary, subject, tags, and rendered article body unless narrowed later.
- Previous/next ordering is by published date descending, then title, then slug for deterministic ties.
- Related article ranking starts with shared tags, then shared subject, then recency.
- Draft articles are excluded from search, tag pages, sitemap, RSS, related links, and previous/next navigation.
- GitHub Pages target URL is `https://drystan-furor.github.io/blog-framework/`.

## Definition of Done

- Each story starts with a failing test, artifact check, or documented red checklist before implementation.
- `npm run ci` passes locally and in GitHub Actions.
- `GITHUB_PAGES=true npm run build` emits static output with `/blog-framework/` asset and internal link prefixes.
- Published GitHub Pages returns HTTP 200 for the home page and at least one article page.
- Search, tags, sitemap, RSS, and metadata artifacts include only public articles.
- The starter remains easy to duplicate by changing site metadata and article content without rewriting the build system.

## Story Execution Order

1. SP-11 adds deterministic previous/next navigation on article pages.
2. SP-12 adds related articles while article footer work is already active.
3. SP-13 creates the build-time search index.
4. SP-14 builds the client search UI against that generated index.
5. SP-15 exposes tag and category browse paths.
6. SP-16 adds SEO metadata and structured data using the same route helpers.
7. SP-17 and SP-18 emit sitemap and RSS from the public route/content model.
8. SP-19 hardens CI around the full static validation path.
9. SP-20 verifies GitHub Pages publication and documents the deployment assertion.

## SP-11 - Previous and Next Article Links

Backlog: PB-012

User story: As a reader, I want previous and next article links on each article page, so I can continue browsing the
catalogue without returning to the index.

Acceptance criteria:

- Given public articles are sorted by published date descending, when an article page renders, then the footer links to
  the adjacent newer and older public articles.
- Given the first article in sort order, when the footer renders, then it omits or disables the newer previous link
  without creating a dead link.
- Given the last article in sort order, when the footer renders, then it omits or disables the older next link without
  creating a dead link.
- Given draft articles exist, when adjacent articles are resolved, then drafts are excluded.
- Given two articles share the same published date, when ordering is resolved, then title and slug provide deterministic
  tie breakers.

TDD validations:

- Red: add unit tests for adjacent article resolution covering middle, first, last, draft exclusion, and tie breakers.
- Red: add a Playwright article footer check that fails until adjacent links are visible and navigable.
- Green: implement the smallest pure resolver and article footer markup needed to pass.
- Refactor: keep sort and adjacency logic reusable by related articles, sitemap, RSS, and search where practical.

Not in scope:

- Infinite article reading.
- Client-side history manipulation.
- Personalized article ordering.

Open questions:

- Confirm visible labels: "Previous"/"Next", "Newer"/"Older", or article-title-only links.
- Confirm whether chronological direction should follow newest-first or oldest-first reading order.

## SP-12 - Related Articles

Backlog: PB-018

User story: As a reader, I want related article suggestions, so I can find other shared articles that connect by topic or
subject.

Acceptance criteria:

- Given an article has tags, when related articles are calculated, then articles sharing tags rank above articles sharing
  only subject.
- Given no tags overlap, when articles share subject, then subject matches can still appear.
- Given candidates tie, when ordering is resolved, then recent public articles rank before older articles and slug breaks
  final ties.
- Given the current article is evaluated, when related results render, then the current article is never included.
- Given fewer than the target number of related articles exist, when the footer renders, then it shows only available
  public matches without placeholder cards.

TDD validations:

- Red: add scoring unit tests for tag overlap, subject fallback, tie breakers, draft exclusion, current article
  exclusion, and max result count.
- Red: add a Playwright check for the related section on an article with at least one matching article.
- Green: implement a small related-article scorer and render compact footer links or cards.
- Refactor: keep scoring weights explicit and local so future ranking changes are easy to test.

Not in scope:

- Machine-learning recommendations.
- Tracking clicks or personalization.
- Related articles based on full text similarity.

Open questions:

- Confirm max related count, recommended as three.
- Confirm whether related UI should use compact links or full cards with images.

## SP-13 - Static Search Index

Backlog: PB-010

User story: As a reader, I want the build to emit a static search index, so articles can be searched on GitHub Pages
without a server.

Acceptance criteria:

- Given public Markdown articles exist, when `npm run build` runs, then `dist/search-index.json` or an equivalent static
  artifact is emitted.
- Given an article is public, when the search index is inspected, then it includes slug, URL, title, summary, subject,
  tags, published date, and searchable body text.
- Given an article is a draft, when the search index is inspected, then it is absent.
- Given article Markdown contains markup, when body text is indexed, then the searchable field is plain text rather than
  raw HTML.
- Given the starter is duplicated, when site content changes, then the index generation stays data-driven from content
  collections rather than hardcoded article names.

TDD validations:

- Red: add unit tests for search document generation from article fixtures, including draft exclusion and body text
  normalization.
- Red: add a build artifact test that fails until the static index exists in `dist/` after build.
- Green: implement the smallest build-time endpoint or script that emits the static JSON index.
- Refactor: share public article filtering with route, sitemap, RSS, and related helpers.

Not in scope:

- Search UI.
- Fuzzy matching libraries.
- Remote indexing services.

Open questions:

- Confirm artifact path: `/search-index.json` or `/assets/search-index.json`.
- Confirm whether full article body is required in the first search index or title/summary/tags are enough.

## SP-14 - Search UI and Ranking

Backlog: PB-011

User story: As a reader, I want a search page with ranked results, so I can quickly find articles by keyword, title,
subject, or tag.

Acceptance criteria:

- Given I open the search page, when JavaScript loads, then it fetches the static search index from the configured site
  base.
- Given I type a query matching an article title, when results update, then title matches rank above summary, subject,
  tag, and body-only matches.
- Given I type a query matching tags or subject, when results update, then matching public articles are shown with title,
  summary, and link.
- Given there are no matches, when results update, then a clear empty state is shown.
- Given JavaScript is disabled, when the search page loads, then the rest of the static site and article reading remain
  usable.

TDD validations:

- Red: add unit tests for query normalization and ranking weights across title, tags, subject, summary, and body.
- Red: add Playwright tests for search load, title match ranking, tag or subject search, no-results state, and base-path
  safe index fetch.
- Green: implement the smallest client script and search page needed to pass.
- Refactor: keep ranking pure and DOM wiring thin.

Not in scope:

- Server-side search.
- Typo-tolerant fuzzy matching unless plain substring search proves insufficient.
- Search analytics.

Open questions:

- Confirm whether the search entry point is `/search/`.
- Confirm whether search results should update on each keystroke or only on submit.

## SP-15 - Tags and Category Filters

Backlog: PB-017

User story: As a reader, I want tag and category browse pages, so I can scan articles by the topics my wife repeatedly
shares.

Acceptance criteria:

- Given articles have tags, when the site builds, then static tag pages are generated for public article tags.
- Given articles have subjects or categories, when the site builds, then static subject/category pages are generated if
  category browsing is enabled for Sprint 2.
- Given I open a tag page, when matching articles exist, then it lists matching public articles using the standard card
  pattern.
- Given a draft article has a tag, when tag pages render, then that draft does not appear and does not create an orphan
  public tag page.
- Given a tag contains spaces or uppercase text, when URLs are generated, then slugs are normalized deterministically.

TDD validations:

- Red: add unit tests for tag extraction, tag slug normalization, public article filtering, and route generation.
- Red: add Playwright navigation checks from an article or index tag link to a tag page.
- Green: implement static tag pages and only the minimum subject/category pages agreed for this sprint.
- Refactor: reuse article card/index components instead of creating a separate browsing surface.

Not in scope:

- Multi-select faceted filtering.
- Client-side combined filters.
- Tag management UI.

Open questions:

- Confirm whether "category" is the existing `subject` field or a new frontmatter field.
- Confirm whether tag pages should be included in sitemap and search results in Sprint 2.

## SP-16 - SEO Basics

Backlog: PB-013

User story: As a site owner, I want article SEO metadata, so shared article catalogue pages have useful titles,
descriptions, canonical URLs, social previews, and structured data.

Acceptance criteria:

- Given an article page renders, when the HTML is inspected, then it includes a specific title, meta description, canonical
  URL, robots metadata, Open Graph title, Open Graph description, Open Graph type, and Open Graph URL.
- Given article metadata is available, when structured data renders, then schema.org Article JSON-LD includes headline,
  description, datePublished, URL, and image when available.
- Given the GitHub Pages base path is active, when canonical and Open Graph URLs render, then they use
  `https://drystan-furor.github.io/blog-framework/` routes.
- Given an index or search page renders, when metadata is inspected, then page-specific title and description are present.
- Given draft articles exist, when metadata artifacts are generated, then drafts remain excluded from public route lists.

TDD validations:

- Red: add unit tests for absolute URL/canonical helper behavior under local base and GitHub Pages base.
- Red: add DOM or Playwright assertions for article meta tags and JSON-LD.
- Green: extend the base/article layouts with the smallest metadata API needed by pages.
- Refactor: centralize site metadata and URL helpers to avoid string duplication.

Not in scope:

- Full social card image generation.
- Analytics or webmaster verification tags.
- Custom per-platform metadata beyond basic Open Graph.

Open questions:

- Confirm final site title and default description.
- Confirm whether original source article URL or catalogue URL should be canonical.

## SP-17 - Sitemap

Backlog: PB-019

User story: As a site owner, I want a generated sitemap, so crawlers can discover public catalogue pages on GitHub Pages.

Acceptance criteria:

- Given `npm run build` runs, when `dist/sitemap.xml` is inspected, then it exists.
- Given public pages exist, when the sitemap is parsed, then it includes home, articles index, article pages, search page,
  and any public tag/category pages selected for Sprint 2.
- Given draft articles exist, when the sitemap is parsed, then draft article URLs are absent.
- Given GitHub Pages base is active, when URLs are emitted, then they are absolute URLs under
  `https://drystan-furor.github.io/blog-framework/`.
- Given sitemap XML is generated, when parsed by a standard XML parser, then it is well-formed.

TDD validations:

- Red: add a build artifact test that fails until `dist/sitemap.xml` exists.
- Red: add XML parsing assertions for required public URLs, draft exclusion, and absolute GitHub Pages URLs.
- Green: implement a minimal static sitemap endpoint or build script.
- Refactor: reuse the same public route list used by search and RSS where practical.

Not in scope:

- Image sitemap extensions.
- News sitemap extensions.
- Submitting the sitemap to search engines.

Open questions:

- Confirm whether tag/category pages are indexed immediately or after taxonomy stabilizes.
- Confirm whether `lastmod` should use article published date, shared date, or file modification time.

## SP-18 - RSS Feed

Backlog: PB-020

User story: As a reader, I want an RSS feed, so I can follow newly catalogued shared articles from a feed reader.

Acceptance criteria:

- Given `npm run build` runs, when `dist/rss.xml` or `dist/feed.xml` is inspected, then it exists.
- Given public articles exist, when the feed is parsed, then it includes latest public articles with title, link, summary,
  published date, and stable GUID.
- Given draft articles exist, when the feed is parsed, then drafts are absent.
- Given GitHub Pages base is active, when feed links are emitted, then they are absolute URLs under the published site
  URL.
- Given more articles exist than the feed limit, when the feed renders, then it includes only the agreed latest count in
  deterministic order.

TDD validations:

- Red: add feed generation unit tests or XML artifact tests for item fields, ordering, draft exclusion, and absolute URLs.
- Red: add a build output check for the selected feed path.
- Green: implement the minimal RSS endpoint or build script.
- Refactor: share public article sorting with previous/next and sitemap generation.

Not in scope:

- Atom and JSON Feed unless requested.
- Full article body in feed items.
- Subscriber tracking.

Open questions:

- Confirm feed path: `/rss.xml` or `/feed.xml`.
- Confirm feed item limit, recommended as 20 latest public articles.

## SP-19 - GitHub Actions CI

Backlog: PB-015

User story: As a maintainer, I want GitHub Actions CI checks, so every change validates linting, type checks, tests,
static build, and smoke tests before deployment or merge.

Acceptance criteria:

- Given code is pushed to the default branch, when GitHub Actions runs, then install, lint, Astro check, unit tests,
  build, and smoke tests complete.
- Given a pull request is opened, when GitHub Actions runs, then the same validation path runs without publishing a Pages
  deployment from untrusted branches.
- Given dependencies are installed in CI, when the workflow runs, then it uses `npm ci` or the Astro action's lockfile
  aware install behavior.
- Given a validation step fails, when the workflow completes, then the failed command is visible in Actions logs.
- Given Pages deployment exists, when CI and deploy responsibilities overlap, then the workflow remains simple and avoids
  duplicate builds where possible.

TDD validations:

- Red: add workflow structure tests that fail unless required CI commands or Astro action inputs are present.
- Red: run the workflow-equivalent local command, `npm run ci`, before marking the story complete.
- Green: add or adjust GitHub Actions YAML with the minimum jobs needed for PR checks and default-branch deploy checks.
- Refactor: keep deployment permissions limited to the deploy job or deploy workflow.

Not in scope:

- Branch protection changes unless repository permissions allow and the product owner requests it.
- Matrix testing across every Node version.
- Dependabot or security scanning, which remains later hardening.

Open questions:

- Confirm whether CI should be a separate workflow from Pages deployment or a shared workflow with conditional deploy.
- Confirm whether PR checks should run Playwright smoke tests on every PR.

## SP-20 - GitHub Pages Deployment

Backlog: PB-016

User story: As a site owner, I want the default branch to deploy the built static artifact to GitHub Pages, so the
catalogue is publicly visitable at the expected project URL.

Acceptance criteria:

- Given GitHub Pages settings are inspected, when the repository is queried, then Pages uses Source: GitHub Actions.
- Given the default branch receives a successful deploy workflow run, when GitHub Pages publishes, then
  `https://drystan-furor.github.io/blog-framework/` returns HTTP 200.
- Given an article page is requested, when `https://drystan-furor.github.io/blog-framework/articles/hello-world/` is
  visited, then it returns HTTP 200 and contains the article heading.
- Given the Pages build runs, when generated HTML is inspected, then asset and internal links are prefixed with
  `/blog-framework/`.
- Given the starter is duplicated, when repository owner/name changes, then the deploy URL and base path are isolated in
  config rather than scattered through page templates.

TDD validations:

- Red: add workflow/config tests that fail unless Pages deploy workflow, `site`, and GitHub Pages base behavior are
  present.
- Red: run `GITHUB_PAGES=true npm run build` and inspect generated links before pushing.
- Green: implement or validate the Pages workflow and Astro config needed to deploy `dist/`.
- Refactor: route internal links through shared helpers instead of hardcoding the base path in templates.

Not in scope:

- Custom domain setup.
- Pull request preview environments.
- Deploying private or authenticated content.

Open questions:

- Confirm whether deployment should remain on `master` or move to `main`.
- Confirm whether Pages verification should be automated in CI or kept as a release checklist.

## Sprint 2 Validation Matrix

| Validation                              | Stories Covered            | Expected Command or Check                                             |
|-----------------------------------------|----------------------------|------------------------------------------------------------------------|
| Adjacent and related article unit tests | SP-11, SP-12               | `npm run test:unit`                                                    |
| Article footer Playwright checks        | SP-11, SP-12               | `npm run test:e2e:smoke` or targeted Playwright test                   |
| Search document generation tests        | SP-13                      | `npm run test:unit` and build artifact check                           |
| Search UI/ranking tests                 | SP-14                      | `npm run test:unit` plus Playwright search flow                        |
| Tag/category route tests                | SP-15                      | `npm run test:unit` plus Playwright tag navigation                     |
| SEO metadata assertions                 | SP-16                      | Unit URL helper tests plus DOM/Playwright metadata checks              |
| Sitemap and RSS artifact checks         | SP-17, SP-18               | `npm run build` and XML artifact parsing                               |
| CI workflow validation                  | SP-19                      | `npm run ci` and workflow structure test                               |
| Pages deployment validation             | SP-20                      | `GITHUB_PAGES=true npm run build`, GitHub Pages settings, live URL 200 |

## Sprint 2 Exit Criteria

- A reader can browse from article to adjacent article, related articles, tag pages, search results, and back to articles
  without server support.
- A maintainer can add Markdown articles and trust the build to update search, sitemap, RSS, tag pages, and navigation.
- Crawlers and feed readers have static metadata artifacts for public content.
- GitHub Actions validates changes and publishes the static site to GitHub Pages.
- The starter remains simple enough to duplicate by editing config and content rather than changing architecture.
