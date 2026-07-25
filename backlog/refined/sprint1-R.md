# Sprint 1 Refined - Prove the Static Blog Spine

## Source

Input read: `backlog/sprint/sprint1.md`

Intent: build a static GitHub Pages website that catalogs articles shared by the developer's wife, keeps article source
as Markdown folders, transforms Markdown into static HTML during the build pipeline, remains easy to browse, and is easy
to duplicate as a starter.

## Sprint Goal

Create the smallest verifiable Astro starter slice: documented project structure, architecture decisions, one Markdown
article rendered as static HTML, a browseable index grid, responsive behavior, system light/dark mode, and first
Playwright smoke coverage.

## Working Assumptions

- Package manager is npm unless a later refinement changes it.
- Recommended article source path is `src/content/articles/<slug>/index.md` with colocated images.
- Public article URLs use `/articles/<slug>/` unless the product owner chooses `/blog/<slug>/`.
- The Hello World article remains starter content and can be replaced by the first real shared article.
- Sprint 1 proves the static content spine only; search, deploy, SEO, previous/next, tags, RSS, and sitemap remain later
  sprint work unless pulled forward explicitly.

## Definition of Done

- Each story has a failing validation before implementation or a documented checklist when the deliverable is an ADR.
- `npm run build` produces static HTML for the Hello World article.
- `npm run test:e2e:smoke` validates the home page, article page, and responsive browse baseline.
- The implementation stays aligned with `docs/folder-structure.md`.
- Open product decisions are captured as refinement questions instead of hidden in implementation.

## Story Execution Order

1. SP-01 establishes folders and scripts.
2. SP-02 and SP-03 record architecture decisions before framework-specific implementation grows.
3. SP-05 defines content validation before real article rendering.
4. SP-04 and SP-06 prove Markdown to static routes.
5. SP-07 and SP-08 prove browsing and responsive layout.
6. SP-09 applies theme tokens across the first pages.
7. SP-10 locks the slice with Playwright smoke coverage.

## SP-01 - Astro Folder Structure and NPM Scripts

Backlog: PB-001

User story: As a developer, I want a standard Astro single-repo folder structure and npm scripts, so contributors know
where source, content, tests, config, scripts, and build artifacts belong.

Acceptance criteria:

- Given a fresh clone, when I inspect the repository, then the documented locations exist or are explicitly scheduled:
  `src/`, `src/content/articles/`, `src/pages/`, `src/components/`, `src/layouts/`, `src/styles/`, `src/lib/`, `tests/`,
  `scripts/`, `docs/`, and `.github/workflows/`.
- Given `package.json`, when I inspect scripts, then it defines or documents `dev`, `check`, `build`, `preview`,
  `test`, `test:unit`, `test:e2e`, `test:e2e:smoke`, `lint`, `format:check`, `ci`, and `new:article`.
- Given a duplicated starter, when site metadata and article content are replaced, then the documented structure still
  describes the expected project layout.

TDD validations:

- Red: add a structure/script verification test or checklist that fails while required folders or scripts are missing.
- Green: add only the missing folders, placeholder files, or scripts needed to satisfy the verification.
- Refactor: remove any placeholder that is not needed for the sprint goal.

Not in scope:

- Implementing the full article creation script beyond a documented command placeholder.
- Building GitHub Pages deployment workflow logic.

Open questions:

- Confirm Node LTS version for local development and CI.
- Confirm whether npm remains the package manager.

## SP-02 - Framework Decision Record

Backlog: PB-002

User story: As a maintainer, I want a decision record selecting Astro over Vite-only, Webpack, and other options, so
architecture choices are traceable.

Acceptance criteria:

- Given the ADR, when a maintainer reads it, then Astro is selected for content-first static output, Markdown support,
  low JavaScript, and GitHub Pages fit.
- Given alternatives, when Vite-only, Webpack, and at least one heavier app framework are listed, then each has concise
  tradeoffs against the article catalogue intent.
- Given future requirements change, when the decision is revisited, then the ADR states replacement triggers.

TDD validations:

- Red: create an ADR checklist that fails if context, decision, alternatives, consequences, and revisit triggers are
  missing.
- Green: write the ADR until the checklist passes.
- Refactor: keep the ADR concise and remove speculative platform detail.

Not in scope:

- Benchmarking every static-site framework.
- Choosing hosting beyond GitHub Pages.

Open questions:

- Confirm ADR directory and filename convention, recommended as `docs/adr/0001-framework.md`.

## SP-03 - UI Library Decision Record

Backlog: PB-003

User story: As a maintainer, I want a decision record selecting Astro components and vanilla JavaScript by default, so
React or Vue is added only if the product needs it.

Acceptance criteria:

- Given the ADR, when a developer reads it, then Astro components plus minimal vanilla JavaScript are the default.
- Given richer interactions become necessary, when React, Vue, Svelte, or another UI framework is reconsidered, then the
  ADR states adoption criteria.
- Given JavaScript is disabled, when a reader opens an article page, then core article reading remains a supported
  requirement.

TDD validations:

- Red: create an ADR checklist assertion that fails without decision, alternatives, adoption threshold, and no-JavaScript
  reading stance.
- Green: write the ADR until it satisfies the checklist.
- Refactor: keep framework adoption criteria tied to real interaction needs.

Not in scope:

- Adding React, Vue, or another client framework in Sprint 1.
- Building search UI interactions.

Open questions:

- Confirm no-JavaScript article reading is a hard MVP requirement.

## SP-04 - Hello World Markdown Article

Backlog: PB-004

User story: As a developer, I want a Hello World article rendered from Markdown, so the content pipeline is proven on day
one.

Acceptance criteria:

- Given `src/content/articles/hello-world/index.md`, when `npm run build` runs, then a static article HTML page is
  generated under `dist/`.
- Given the article page is opened, when the content renders, then title, subtitle, H1, summary, subject, image, and body
  are visible.
- Given the article exists, when the index page renders, then the Hello World article appears as a browseable card.
- Given the starter is duplicated, when the article is replaced, then the pipeline still works without copying an old
  article file by hand.

TDD validations:

- Red: write a failing Playwright smoke test for the Hello World article page and index card.
- Green: add the Markdown article, content loading, and page rendering needed to pass.
- Refactor: keep starter article copy minimal and remove duplicated rendering logic.

Not in scope:

- Importing articles from external URLs.
- Generating thumbnails automatically.

Open questions:

- Confirm final starter article wording.
- Confirm whether starter content is committed permanently or replaced before first production deploy.

## SP-05 - Article Content Schema

Backlog: PB-005

User story: As a developer, I want article frontmatter validated, so content mistakes fail early with clear errors.

Acceptance criteria:

- Given a valid article, when Astro loads content collections, then required frontmatter is typed and available to pages.
- Given `title`, `summary`, `subject`, `publishedAt`, or `image` is missing, when validation runs, then it fails with a
  clear error.
- Given optional fields such as `subtitle`, `tags`, `sourceUrl`, `sharedBy`, `sharedAt`, or `draft` are omitted, when
  validation runs, then defaults or optional behavior are predictable.
- Given an invalid date, URL, tag list, or image path is provided, when validation runs, then the build fails before
  publishing.

TDD validations:

- Red: add unit tests or fixture checks for one valid article and several invalid articles.
- Green: implement `src/content.config.ts` with Zod validation and the smallest required schema.
- Refactor: extract pure schema helpers only if tests become hard to read.

Not in scope:

- Full editorial workflow.
- Draft previews outside local development.

Open questions:

- Confirm whether `sourceUrl`, `sharedAt`, and a "why this matters" note are required for the wife's article catalogue.
- Confirm whether drafts are excluded in production during Sprint 1 or Sprint 2.

## SP-06 - Static Article Routes

Backlog: PB-006

User story: As a site owner, I want each Markdown article folder to generate a static article route, so GitHub Pages can
host the result without a server.

Acceptance criteria:

- Given one or more article folders, when `npm run build` runs, then each public article produces a deterministic static
  URL.
- Given the Hello World article folder is named `hello-world`, when the route is generated, then the URL is
  `/articles/hello-world/` under the configured site base.
- Given an article is renamed, when tests run, then route expectations fail clearly instead of silently publishing a
  broken link.
- Given production output is inspected, when `dist/` is checked, then article HTML exists without requiring server-side
  rendering.

TDD validations:

- Red: write route helper tests for slug generation and route list generation.
- Green: implement Astro `getStaticPaths()` for article pages.
- Refactor: keep routing logic pure enough to test without launching Astro when practical.

Not in scope:

- Previous/next article routing.
- Tag pages and search result pages.

Open questions:

- Confirm URL shape: `/articles/<slug>/` or `/blog/<slug>/`.
- Confirm slug source: folder name only, title fallback, or explicit frontmatter slug.

## SP-07 - Article Index Grid

Backlog: PB-007

User story: As a user, I want an article index grid with images, titles, and previews, so I can browse shared articles
quickly.

Acceptance criteria:

- Given public articles exist, when I open the index page, then each card shows image, title, and a three-sentence
  preview.
- Given a card is focused, when I activate it with keyboard, then I navigate to the matching article.
- Given a card is clicked with a pointer, when the link activates, then I navigate to the matching article.
- Given article metadata includes subject or tags, when rendered in Sprint 1, then the card layout can omit them unless
  explicitly pulled into MVP card display.

TDD validations:

- Red: add a component or Playwright test that fails until card content and navigation are present.
- Green: implement `ArticleCard.astro` and index page rendering.
- Refactor: keep card markup semantic and avoid client JavaScript for basic navigation.

Not in scope:

- Search filtering.
- Tag/category filter controls.
- Related articles.

Open questions:

- Confirm preview source: manually authored `summary` or generated excerpt.
- Confirm whether source domain, shared date, or tags appear on cards in MVP.

## SP-08 - Responsive Grid and Pagination

Backlog: PB-008

User story: As a user, I want responsive grids and pagination, so browsing does not become overwhelming on desktop or
mobile.

Acceptance criteria:

- Given desktop width, when articles are listed, then the page supports a 4 column by 3 row grid with 12 articles per
  page.
- Given tablet width at the selected `md` breakpoint, when articles are listed, then the layout follows the agreed
  tablet grid without horizontal overflow.
- Given mobile portrait width, when articles are listed, then the page uses 2 columns and allows up to 18 visible tiles
  before pagination.
- Given mobile landscape width, when articles are listed, then the page uses 3 columns.
- Given article count exceeds the page size, when pagination controls render, then next and previous page URLs are
  static and keyboard accessible.

TDD validations:

- Red: write pagination unit tests for page size, page count, offsets, first page, and final page.
- Red: add Playwright viewport smoke tests for desktop, tablet, mobile portrait, and mobile landscape.
- Green: implement responsive CSS and static pagination controls.
- Refactor: centralize pagination logic in `src/lib/pagination.ts` if reused by pages or tests.

Not in scope:

- Infinite scroll.
- Client-side filtering.

Open questions:

- Confirm exact tablet breakpoint behavior.
- Confirm whether mobile "18 tiles" means 2 columns by 9 scrollable rows before pagination.

## SP-09 - Theme Tokens and System Dark Mode

Backlog: PB-009

User story: As a user, I want the site to respect system light/dark settings, so reading matches my device preference.

Acceptance criteria:

- Given system light mode, when the site loads, then light theme tokens are applied.
- Given system dark mode, when the site loads, then dark theme tokens are applied through `prefers-color-scheme`.
- Given a developer edits global colors, when they inspect the codebase, then theme values are centralized in one token
  file or config.
- Given article and index pages render, when theme tokens are checked, then both pages consume the same variables.

TDD validations:

- Red: add DOM or style smoke assertions for token presence on index and article pages.
- Green: implement CSS custom properties and `prefers-color-scheme` in the global theme file.
- Refactor: keep tokens named by role, not by one-off page usage.

Not in scope:

- Manual theme switching.
- Theme editor tooling.
- Full WCAG contrast certification, which remains later hardening work.

Open questions:

- Confirm whether tokens should live in CSS, JSON, or YAML for Sprint 1.
- Confirm whether manual theme override is out of MVP.

## SP-10 - First Playwright Smoke Suite

Backlog: PB-014

User story: As a developer, I want Playwright smoke tests, so the core static site flow is verified end to end.

Acceptance criteria:

- Given a production preview server, when `npm run test:e2e:smoke` runs, then the home page loads.
- Given the Hello World card exists, when the smoke test activates it, then the article page loads with expected heading
  and article body.
- Given responsive smoke checks run, when desktop and mobile viewports are tested, then the index grid renders without
  critical overflow.
- Given a route or selector is missing, when smoke tests fail, then the failure points to the broken page or expected
  visible element.

TDD validations:

- Red: write failing Playwright tests for home, article navigation, and responsive baseline before implementing missing
  UI.
- Green: wire the smoke suite into `npm run test:e2e:smoke` and make the minimum implementation pass.
- Refactor: keep smoke tests focused on core user journey rather than duplicating unit tests.

Not in scope:

- Full browser matrix unless explicitly required.
- Complete accessibility suite.
- CI workflow integration, which is a later delivery story.

Open questions:

- Confirm whether smoke tests run against `astro preview` only or also `astro dev`.
- Confirm MVP browser scope: Chromium only or Chromium, Firefox, and WebKit.

## Sprint 1 Validation Matrix

| Validation                         | Stories Covered              | Expected Command or Check                    |
|------------------------------------|------------------------------|----------------------------------------------|
| Structure/script verification      | SP-01                        | Structure test or manual checklist           |
| ADR checklist                      | SP-02, SP-03                 | ADR checklist test or documented review      |
| Content schema fixtures            | SP-05                        | `npm run test:unit`                          |
| Route and pagination unit tests    | SP-06, SP-08                 | `npm run test:unit`                          |
| Markdown to static HTML build      | SP-04, SP-06                 | `npm run build`                              |
| Browse and responsive smoke checks | SP-04, SP-07, SP-08, SP-10   | `npm run test:e2e:smoke`                     |
| Theme smoke checks                 | SP-09                        | Unit, DOM, or Playwright style assertions    |

## Sprint 1 Exit Criteria

- A developer can clone the repo, install dependencies, run checks, build static HTML, and preview the first article.
- A reader can browse from index to article on desktop and mobile.
- The build fails early when required article metadata is missing or invalid.
- The implementation is simple enough to duplicate as a starter without a CMS or server runtime.
- Remaining decisions are explicitly tracked and do not block proving the static blog spine.
