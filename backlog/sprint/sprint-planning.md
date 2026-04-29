# Sprint Planning

## Source

Derived from `backlog/roadmap/roadmap.md`, which is derived from `base/essence.md`.

Each story below includes WSJF scoring and spec-driven TDD delivery notes. Stories SP-01 through SP-30 are split into three sprints of 10 stories each.

## Sprint Allocation

| Sprint | Stories | Outcome |
| --- | --- | --- |
| Sprint 1 | SP-01 to SP-10 | Prove Astro structure, Markdown build, responsive browse slice, theme, and first tests. |
| Sprint 2 | SP-11 to SP-20 | Add search, tags, navigation, SEO, CI, and GitHub Pages deploy. |
| Sprint 3 | SP-21 to SP-30 | Harden images, accessibility, tests, starter workflow, onboarding, and merge readiness. |

## SP-01 - Astro Folder Structure and NPM Scripts

Backlog: PB-001
Epic: E1
WSJF: (BV 9 + TC 9 + RR 9) / Size 3 = 9.00

User story: As a developer, I want a standard Astro single-repo folder structure and npm scripts, so contributors know where source, content, tests, config, scripts, and build artifacts belong.

Specs:

- Given a fresh clone, when I inspect the repository, then I can identify source, content, assets, tests, scripts, docs, and GitHub workflow locations.
- Given `package.json`, when I inspect scripts, then dev, check, build, preview, lint, format, unit test, e2e test, smoke test, CI, and article creation commands are documented or implemented.
- Given the starter is duplicated, when I change site metadata and add Markdown, then the documented structure still applies.

TDD delivery:

- Add a structure/script verification test or checklist before implementing the scaffold.
- Make the test/check fail on missing required folders or scripts.
- Add the minimum folders and scripts needed to satisfy the check.

Refinement questions:

- Confirm npm is the package manager instead of pnpm, yarn, or bun.
- Confirm Node LTS version for local and CI.
- Confirm whether exact `blogs/<slug>/index.md` compatibility is required in Sprint 1 or can remain Astro-native.

## SP-02 - Framework Decision Record

Backlog: PB-002
Epic: E1
WSJF: (BV 8 + TC 8 + RR 9) / Size 2 = 12.50

User story: As a maintainer, I want a decision record selecting Astro over Vite-only, Webpack, and other options, so architecture choices are traceable.

Specs:

- Given the decision record, when a maintainer reads it, then Astro is selected for content-first static output, Markdown support, low JavaScript, and GitHub Pages fit.
- Given alternatives, when Vite-only, Webpack, and other frameworks are listed, then each has a concise tradeoff.
- Given future changes, when the decision is revisited, then acceptance criteria for replacing Astro are clear.

TDD delivery:

- Write an ADR content checklist first.
- Add the ADR and verify it covers decision, context, options, consequences, and revisit triggers.

Refinement questions:

- Should ADRs live under `docs/adr/`?
- Should the project use numbered ADR filenames?

## SP-03 - UI Library Decision Record

Backlog: PB-003
Epic: E1
WSJF: (BV 7 + TC 7 + RR 8) / Size 2 = 11.00

User story: As a maintainer, I want a decision record selecting Astro components and vanilla JavaScript by default, so React or Vue is added only if the product needs it.

Specs:

- Given the decision record, when a developer reads it, then minimal vanilla JavaScript is the default.
- Given richer interactions are needed, when future work evaluates React or Vue, then the criteria for adding a framework are explicit.
- Given the static reading experience, when JavaScript is disabled, then core article reading remains supported.

TDD delivery:

- Add an ADR checklist assertion.
- Document the decision and verify it names alternatives, current choice, and adoption threshold.

Refinement questions:

- Is no-JavaScript article reading a hard MVP requirement?
- Are there any planned interactions that require a UI framework?

## SP-04 - Hello World Markdown Article

Backlog: PB-004
Epic: E2
WSJF: (BV 10 + TC 9 + RR 9) / Size 3 = 9.33

User story: As a developer, I want a Hello World article rendered from Markdown, so the content pipeline is proven on day one.

Specs:

- Given `src/content/articles/hello-world/index.md`, when `npm run build` runs, then a static article page is produced.
- Given the article page, when viewed in a browser, then title, subtitle, H1, image, summary, and body render correctly.
- Given the index page, when the Hello World article exists, then it appears as a card.

TDD delivery:

- Write a failing Playwright smoke test for the Hello World article.
- Add the Markdown entry and route generation.
- Pass the smoke test and build.

Refinement questions:

- What should the default starter article say?
- Should starter content be removed before production use or remain as an example?

## SP-05 - Article Content Schema

Backlog: PB-005
Epic: E2
WSJF: (BV 9 + TC 8 + RR 9) / Size 3 = 8.67

User story: As a developer, I want article frontmatter validated, so content mistakes fail early with clear errors.

Specs:

- Given a valid article, when the content collection loads, then required fields are typed and available to pages.
- Given a missing title, summary, subject, date, or image, when the build runs, then the build fails with a clear validation error.
- Given optional fields such as source URL or related tags, when omitted, then defaults remain predictable.

TDD delivery:

- Add unit tests with valid and invalid Markdown fixtures.
- Implement `src/content.config.ts` with Zod validation.
- Confirm invalid fixtures fail validation and valid fixtures pass.

Refinement questions:

- Which fields are required for the personal catalogue: source URL, shared date, why-important note, or subject?
- Should drafts be excluded from production builds?

## SP-06 - Static Article Routes

Backlog: PB-006
Epic: E2
WSJF: (BV 10 + TC 8 + RR 8) / Size 4 = 6.50

User story: As a site owner, I want each Markdown article folder to generate a static article route, so GitHub Pages can host the result.

Specs:

- Given multiple article folders, when the build runs, then each public article has a deterministic URL.
- Given nested folder names, when URLs are generated, then slugs remain stable and URL-safe.
- Given an article is marked draft, when production builds run, then the article is excluded if draft handling is enabled.

TDD delivery:

- Write tests for slug generation and route list generation.
- Implement `getStaticPaths()` for article pages.
- Verify `dist/` includes expected article HTML.

Refinement questions:

- Should URLs use `/articles/<slug>/` or `/blog/<slug>/`?
- Should slug come from folder name only, title only, or folder name with title fallback?

## SP-07 - Article Index Grid

Backlog: PB-007
Epic: E3
WSJF: (BV 10 + TC 8 + RR 7) / Size 4 = 6.25

User story: As a user, I want an article index grid with images, titles, and previews, so I can browse shared articles quickly.

Specs:

- Given articles exist, when I open the index, then each card shows image, title, and a three-sentence preview.
- Given a card is selected, when I activate it with mouse or keyboard, then I navigate to the article.
- Given an article has missing optional image fallback support, when rendered, then the card remains visually stable.

TDD delivery:

- Add component or e2e tests for card content and navigation.
- Implement `ArticleCard.astro` and index page list.
- Verify visible card content and links.

Refinement questions:

- Should the preview be manually authored or generated from article body?
- Should cards show shared date, source domain, or tags in MVP?

## SP-08 - Responsive Grid and Pagination

Backlog: PB-008
Epic: E3
WSJF: (BV 9 + TC 8 + RR 7) / Size 5 = 4.80

User story: As a user, I want responsive grids and pagination, so browsing does not become overwhelming on desktop or mobile.

Specs:

- Given desktop width, when articles are listed, then the page shows a 4x3 grid with 12 articles per page.
- Given mobile portrait width, when articles are listed, then the page shows 2 columns and supports up to 18 visible tiles before pagination.
- Given mobile landscape width, when articles are listed, then the page shows 3 columns.

TDD delivery:

- Write pagination unit tests for page size and offsets.
- Add Playwright viewport smoke tests for desktop, mobile portrait, and mobile landscape.
- Implement responsive CSS and pagination controls.

Refinement questions:

- Should tablet match desktop 4 columns exactly or adapt down at narrow tablet widths?
- Should mobile "18 tiles" mean 2x9 scrollable before pagination?

## SP-09 - Theme Tokens and System Dark Mode

Backlog: PB-009
Epic: E1
WSJF: (BV 8 + TC 7 + RR 7) / Size 3 = 7.33

User story: As a user, I want the site to respect system light/dark settings, so reading matches my device preference.

Specs:

- Given system light mode, when the site loads, then light tokens are applied.
- Given system dark mode, when the site loads, then dark tokens are applied.
- Given colors need maintenance, when a developer edits theme tokens, then colors are centralized in one file or config.

TDD delivery:

- Add visual or DOM smoke assertions for theme token presence.
- Implement CSS custom properties and `prefers-color-scheme`.
- Verify article and index pages consume tokens.

Refinement questions:

- Is manual theme switching required, or only system mode?
- Should tokens live in CSS, JSON, or YAML?

## SP-10 - First Playwright Smoke Suite

Backlog: PB-014
Epic: E7
WSJF: (BV 8 + TC 8 + RR 10) / Size 3 = 8.67

User story: As a developer, I want Playwright smoke tests, so the core static site flow is verified end to end.

Specs:

- Given a production preview server, when smoke tests run, then home, article page, and search entry point load.
- Given responsive viewports, when tests run, then desktop and mobile layouts render without critical overflow.
- Given a broken article route, when tests run, then the failure points to the missing page or selector.

TDD delivery:

- Add failing Playwright tests for existing expected routes.
- Implement enough app structure for them to pass.
- Wire the smoke suite into `npm run test:e2e:smoke`.

Refinement questions:

- Should Playwright run against `astro preview` only, or against dev server during local work?
- Which browsers are required for MVP: Chromium only or Chromium/Firefox/WebKit?

## SP-11 - Previous and Next Article Links

Backlog: PB-012
Epic: E5
WSJF: (BV 7 + TC 6 + RR 6) / Size 2 = 9.50

User story: As a reader, I want previous and next article links, so I can move through the catalogue without returning to the index.

Specs:

- Given articles sorted by date, when I view an article, then previous and next links point to adjacent articles.
- Given the first or last article, when I view its footer, then missing neighbors are handled cleanly.
- Given keyboard navigation, when links receive focus, then labels remain clear.

TDD delivery:

- Unit test previous/next resolver with first, middle, and last articles.
- Render footer links in the article layout.
- Add an e2e assertion for a middle article.

Refinement questions:

- Should adjacency be chronological, manual order, or tag-specific?
- Should hidden draft articles be ignored in navigation?

## SP-12 - Related Articles

Backlog: PB-018
Epic: E5
WSJF: (BV 7 + TC 5 + RR 5) / Size 3 = 5.67

User story: As a reader, I want "you may also like" related articles, so I can discover more articles by subject.

Specs:

- Given an article has tags or subject, when related articles render, then articles with shared metadata are shown.
- Given no related articles exist, when the footer renders, then the section is omitted or displays a clear empty state.
- Given the current article, when related articles are calculated, then the current article is excluded.

TDD delivery:

- Unit test related article scoring and exclusion.
- Implement related article component.
- Add e2e check for the footer section.

Refinement questions:

- Should related articles prioritize shared subject, tags, chronology, or manual references?
- How many related articles should show?

## SP-13 - Static Search Index

Backlog: PB-010
Epic: E4
WSJF: (BV 10 + TC 8 + RR 8) / Size 4 = 6.50

User story: As a user, I want a static search index generated during build, so search works on GitHub Pages.

Specs:

- Given article content, when the build runs, then a search index artifact contains title, summary, subject, tags, URL, and searchable body text.
- Given draft articles, when production build runs, then drafts are excluded.
- Given 200+ articles, when the index is generated, then output stays small enough for client-side loading.

TDD delivery:

- Unit test search index generation from fixture articles.
- Implement the index builder in `src/lib/search.ts` or a script endpoint.
- Verify the generated artifact exists in `dist/`.

Refinement questions:

- Is full body search required in MVP or are title/summary/tags enough?
- Should the search index be JSON, page data, or a bundled client module?

## SP-14 - Search UI and Ranking

Backlog: PB-011
Epic: E4
WSJF: (BV 10 + TC 8 + RR 7) / Size 5 = 5.00

User story: As a user, I want a search box with ranked results, so I can find articles by keywords or titles.

Specs:

- Given a query matching a title, when I search, then title matches rank above body-only matches.
- Given a query matching tags or subject, when I search, then relevant articles are returned.
- Given no results, when I search, then the empty state is useful and does not break layout.

TDD delivery:

- Unit test ranking weights.
- Add Playwright tests for successful search and no-result search.
- Implement minimal vanilla JS search UI.

Refinement questions:

- Should search update as the user types or only on submit?
- Should results show highlighted terms?

## SP-15 - Tags and Category Filters

Backlog: PB-017
Epic: E4
WSJF: (BV 7 + TC 5 + RR 5) / Size 3 = 5.67

User story: As a user, I want tag and category filters, so I can browse topics easily.

Specs:

- Given articles with tags, when I open a tag page, then matching articles are listed.
- Given an article page, when tags are visible, then each tag links to its filtered page.
- Given a nonexistent tag route, when requested, then it returns a static 404.

TDD delivery:

- Unit test tag extraction and slug generation.
- Implement static tag routes.
- Add e2e test for tag navigation.

Refinement questions:

- Are "tags", "categories", and "subject" separate concepts or should subject be the primary category?
- Should tag pages be indexed by search engines?

## SP-16 - SEO Basics

Backlog: PB-013
Epic: E6
WSJF: (BV 8 + TC 6 + RR 6) / Size 3 = 6.67

User story: As a new article, I want SEO fundamentals in the HTML, so pages are shareable and discoverable.

Specs:

- Given an article, when rendered, then meta title, description, canonical URL, robots, Open Graph tags, and schema.org Article JSON-LD are present.
- Given missing optional social image data, when rendered, then a default image or safe omission is used.
- Given a site base URL, when canonical links render, then they include the correct GitHub Pages base.

TDD delivery:

- Unit test SEO metadata construction.
- Add DOM assertions in Playwright for key meta tags.
- Implement SEO helper, structured data helper, and layout integration.

Refinement questions:

- What is the production `site` URL?
- Should article source URLs be canonical or should canonical point to this catalogue?

## SP-17 - Sitemap

Backlog: PB-019
Epic: E6
WSJF: (BV 6 + TC 5 + RR 5) / Size 2 = 8.00

User story: As a user, I want a sitemap generated on build, so pages are discoverable.

Specs:

- Given public pages and articles, when the build runs, then `sitemap.xml` includes their URLs.
- Given draft articles, when the sitemap builds, then drafts are excluded.
- Given GitHub Pages base path, when URLs are generated, then sitemap URLs are absolute and correct.

TDD delivery:

- Add a build-output test for sitemap existence and key URLs.
- Configure Astro sitemap support or endpoint.
- Verify generated XML.

Refinement questions:

- Should tag pages be included?
- Should sitemap priority/changefreq be specified or omitted?

## SP-18 - RSS Feed

Backlog: PB-020
Epic: E6
WSJF: (BV 6 + TC 4 + RR 4) / Size 3 = 4.67

User story: As a subscriber, I want an RSS feed, so I can follow updates.

Specs:

- Given published articles, when the feed builds, then latest articles appear in RSS.
- Given article metadata, when feed items render, then title, URL, date, and summary are included.
- Given draft articles, when feed builds, then drafts are excluded.

TDD delivery:

- Add a feed-output test for expected item fields.
- Implement `src/pages/rss.xml.ts`.
- Verify RSS output after build.

Refinement questions:

- How many feed items should be included?
- Should full content or summaries appear in the feed?

## SP-19 - GitHub Actions CI

Backlog: PB-015
Epic: E7
WSJF: (BV 9 + TC 9 + RR 8) / Size 3 = 8.67

User story: As a maintainer, I want CI build checks, so every push is validated automatically.

Specs:

- Given a pull request, when CI runs, then install, lint, check, unit tests, build, and smoke tests run.
- Given a failing command, when CI completes, then the failing step is visible.
- Given dependency installs, when CI runs, then the lockfile provides reproducible installs.

TDD delivery:

- Add local `npm run ci` first.
- Add workflow that calls the same command or equivalent steps.
- Validate locally before relying on GitHub Actions.

Refinement questions:

- Should CI run on every branch push, pull request, or only pull request?
- Should e2e smoke run in CI from Sprint 2 or after deployment only?

## SP-20 - GitHub Pages Deployment

Backlog: PB-016
Epic: E7
WSJF: (BV 10 + TC 9 + RR 8) / Size 4 = 6.75

User story: As a maintainer, I want deployment to GitHub Pages, so the static catalogue is published automatically.

Specs:

- Given changes reach the default branch, when the Pages workflow runs, then `dist/` is deployed.
- Given the repository is a project page, when links render, then Astro `base` is configured correctly.
- Given deployment completes, when the Pages URL is opened, then home and article pages load.

TDD delivery:

- Add build-output checks for base-aware links.
- Configure `.github/workflows/pages.yml`.
- Test production preview locally and document GitHub Pages settings.

Refinement questions:

- What is the GitHub owner/repo name?
- Will this use `<username>.github.io`, a project page, or a custom domain?

## SP-21 - Image Optimization

Backlog: PB-021
Epic: E6
WSJF: (BV 7 + TC 5 + RR 6) / Size 4 = 4.50

User story: As a user, I want optimized images and lazy loading, so browsing feels fast.

Specs:

- Given article images, when cards and articles render, then images use optimized dimensions and lazy loading where appropriate.
- Given AVIF/WebP support, when the browser loads images, then efficient formats are preferred with safe fallback behavior.
- Given missing image data, when a card renders, then layout remains stable.

TDD delivery:

- Add e2e assertions for image alt text, dimensions, and lazy loading.
- Use Astro image processing for article assets.
- Verify build output size and rendered layout.

Refinement questions:

- Is `image.avif` mandatory for every article?
- Should remote source images be allowed?

## SP-22 - Semantic HTML and Keyboard Accessibility

Backlog: PB-022
Epic: E6
WSJF: (BV 8 + TC 5 + RR 8) / Size 3 = 7.00

User story: As a user, I want accessible pages with semantic HTML and keyboard navigation, so the site works for everyone.

Specs:

- Given keyboard-only use, when browsing the index, then cards, pagination, search, and navigation are reachable.
- Given article pages, when read by assistive technology or loaded without client JavaScript, then landmarks and headings are semantic and article content remains readable.
- Given focus movement, when controls are activated, then focus indicators are visible.

TDD delivery:

- Add Playwright keyboard navigation checks.
- Add axe or equivalent accessibility smoke tests if chosen.
- Fix semantics and focus states.

Refinement questions:

- Is an automated accessibility library required in MVP?
- Which WCAG level is expected?

## SP-23 - Contrast Checks

Backlog: PB-023
Epic: E6
WSJF: (BV 7 + TC 4 + RR 8) / Size 2 = 9.50

User story: As a user, I want readable light and dark themes, so text remains legible.

Specs:

- Given light mode tokens, when contrast is checked, then body text and controls meet the agreed threshold.
- Given dark mode tokens, when contrast is checked, then body text and controls meet the agreed threshold.
- Given token changes, when checks run, then insufficient contrast is caught.

TDD delivery:

- Add a unit test or script that checks token contrast pairs.
- Tune tokens until checks pass.
- Include the check in CI if stable.

Refinement questions:

- Should contrast target WCAG AA or AAA?
- Which token pairs must be checked?

## SP-24 - Linting, Formatting, and Pre-Commit Hooks

Backlog: PB-026
Epic: E7
WSJF: (BV 6 + TC 5 + RR 8) / Size 3 = 6.33

User story: As a developer, I want linting, formatting, and pre-commit hooks, so broken code is caught before commit.

Specs:

- Given source files, when `npm run lint` runs, then code quality rules are checked.
- Given source files, when `npm run format:check` runs, then formatting drift is detected.
- Given a commit, when hooks are installed, then selected checks run before the commit completes.

TDD delivery:

- Add a failing lint/format check against known bad fixture or script validation.
- Configure ESLint, Prettier, and Husky minimally.
- Verify scripts run locally.

Refinement questions:

- Should hooks run tests or only fast lint/format checks?
- Should Husky be included in MVP or documented as optional?

## SP-25 - Unit Tests for Parsing and Config Logic

Backlog: PB-024
Epic: E7
WSJF: (BV 7 + TC 6 + RR 9) / Size 3 = 7.33

User story: As a developer, I want unit tests for parsing Markdown and config logic, so regressions are caught quickly.

Specs:

- Given article fixtures, when parsing runs, then metadata is normalized predictably.
- Given pagination inputs, when page data is calculated, then page counts and offsets are correct.
- Given theme or SEO config, when helpers run, then required defaults are present.

TDD delivery:

- Add Vitest and fixtures first.
- Write failing tests for schema helpers, pagination, and SEO/search helpers.
- Implement minimal pure functions to pass.

Refinement questions:

- Should tests use real Astro content APIs or pure helper fixtures?
- Which logic belongs in `src/lib/` for testability?

## SP-26 - Component Tests for Cards, Pagination, and Search

Backlog: PB-025
Epic: E7
WSJF: (BV 6 + TC 5 + RR 7) / Size 4 = 4.50

User story: As a developer, I want component-level tests for key UI pieces, so behavior is validated without relying only on full e2e tests.

Specs:

- Given an article card, when rendered with article data, then image, title, summary, and link are present.
- Given pagination data, when rendered, then previous/next and page links are correct.
- Given search UI state, when rendered, then empty, loading, result, and no-result states are handled.

TDD delivery:

- Select a component test approach compatible with Astro.
- Write failing tests for card, pagination, and search states.
- Implement or adapt components until tests pass.

Refinement questions:

- Should component testing use Astro's testing utilities, Playwright component mode, or a lighter render harness?
- Are component tests required before MVP deploy or acceptable in Sprint 3?

## SP-27 - Article Creation Script and Template

Backlog: PB-027
Epic: E8
WSJF: (BV 8 + TC 5 + RR 7) / Size 2 = 10.00

User story: As a maintainer, I want a script that creates a new article from a template, so new Markdown entries are not copied from old articles.

Specs:

- Given a slug, when `npm run new:article -- <slug>` runs, then a folder with `index.md` and placeholder image guidance is created.
- Given an existing slug, when the script runs, then it refuses to overwrite content.
- Given the template, when generated, then required fields are obvious and not filled with misleading old content.

TDD delivery:

- Add script tests for create, duplicate, and invalid slug cases.
- Implement `scripts/new-article.mjs`.
- Verify generated content passes schema only after placeholders are replaced.

Refinement questions:

- Should the script create an empty image placeholder or only instructions?
- Should it support `blogs/<slug>` compatibility?

## SP-28 - README Onboarding

Backlog: PB-028
Epic: E8
WSJF: (BV 7 + TC 5 + RR 6) / Size 2 = 9.00

User story: As a contributor, I want clear README steps, so I can start in minutes.

Specs:

- Given a new clone, when I read the README, then install, dev, test, build, preview, and deploy steps are clear.
- Given a new article, when I follow README instructions, then I can create and validate it.
- Given GitHub Pages deployment, when I follow README instructions, then I know where to set Pages source and site/base values.

TDD delivery:

- Add a documentation checklist.
- Update README with commands and expected outputs.
- Verify every documented command exists.

Refinement questions:

- Should README describe this as a personal article catalogue, a generic blog starter, or both?
- Should deployment instructions include screenshots or text only?

## SP-29 - Static 404 Page

Backlog: PB-029
Epic: E7
WSJF: (BV 5 + TC 4 + RR 6) / Size 2 = 7.50

User story: As a user, I want a useful 404 page, so dead links are handled gracefully.

Specs:

- Given an unknown route on GitHub Pages, when requested, then `404.html` is served.
- Given the 404 page, when viewed, then it links back to the article index and search.
- Given theme settings, when the 404 page renders, then it uses the same layout and tokens.

TDD delivery:

- Add a Playwright test for the 404 route in preview.
- Implement `src/pages/404.astro`.
- Verify build emits `dist/404.html`.

Refinement questions:

- Should the 404 include recent articles?
- Should it include a search box?

## SP-30 - Branch Protection and Merge Check Guidance

Backlog: PB-030
Epic: E7
WSJF: (BV 5 + TC 4 + RR 7) / Size 2 = 8.00

User story: As a maintainer, I want pull requests to require passing checks, so the main branch remains stable.

Specs:

- Given the repository uses GitHub, when branch protection is configured, then required checks include CI build and smoke tests.
- Given a maintainer reads the docs, when they configure branch protection, then they know which checks to require.
- Given checks fail, when a pull request is reviewed, then merge is blocked until fixed.

TDD delivery:

- Add docs that name exact expected check jobs.
- Ensure workflow job names are stable.
- Verify local CI command mirrors required checks.

Refinement questions:

- Should branch protection be configured manually or through repository settings automation?
- Which branch name should be protected: `master` or `main`?
