# Sprint 3 Refined - Harden the Starter

## Source

Input read: `backlog/sprint/sprint3.md`

Memory read: `base/memories.md`

Handoff read: `base/handoffs.md`

Sprint 1 reference read: `backlog/refined/sprint1-R.md`

Sprint 2 reference read: `backlog/refined/sprint2-R.md`

Intent: build a static GitHub Pages website that catalogs articles shared by the developer's wife, keeps article source
as Markdown folders, transforms Markdown into static HTML during the build pipeline, remains easy to browse, and is easy
to duplicate as a starter.

## Sprint 1 and Sprint 2 Baseline

- Astro 6 is the selected static framework.
- Article source lives at `src/content/articles/<slug>/index.md` with colocated media.
- Public article URLs use `/articles/<slug>/` under the configured site base.
- Sprint 1 delivered the static content spine: schema validation, generated routes, index grid, responsive pagination,
  theme tokens, ADRs, and smoke coverage.
- Sprint 2 delivered browse and publishing surfaces: previous/next links, related articles, static search, tag and
  subject pages, SEO metadata, sitemap, RSS, CI, and GitHub Pages validation.
- GitHub Pages target URL is `https://drystan-furor.github.io/blog-framework/`.

## Sprint Goal

Make the starter practical to keep long term: optimized media, keyboard and semantic accessibility, contrast validation,
linting and formatting guardrails, broader test coverage, article scaffolding, README onboarding, static 404 handling,
and merge-check guidance.

## Working Assumptions

- The request mentions `sprint1.md`, but the concrete ACT block names `backlog/sprint/sprint3.md` as input and
  `backlog/refined/sprint3-R.md` as output, so this refinement follows Sprint 3.
- WCAG target defaults to AA unless the developer later chooses a stricter threshold.
- Husky hooks are useful but optional for users duplicating the starter; CI commands remain the required source of
  truth.
- Component tests should use the smallest harness compatible with Astro components and existing Vitest conventions.
- The protected branch name remains `master` unless the repository is renamed to `main`.
- No server, CMS, database, or runtime image service is introduced.

## Definition of Done

- Each story starts with a failing test, artifact check, or documented red checklist before implementation.
- `npm run ci` passes locally.
- `GITHUB_PAGES=true npm run build` passes and emits static output suitable for GitHub Pages.
- Browsing remains usable with keyboard navigation and without client JavaScript for article reading.
- Image, accessibility, contrast, lint, format, unit, component, e2e, and documentation checks are either automated or
  documented with a repeatable manual fallback.
- The starter remains easy to duplicate by changing site metadata and adding Markdown article folders.

## Story Execution Order

1. SP-21 improves image handling first because visual stability affects article pages, cards, and e2e assertions.
2. SP-22 hardens semantic HTML and keyboard paths while the rendered UI is under review.
3. SP-23 codifies contrast thresholds after semantic states and focus styles are known.
4. SP-24 adds lint, format, and hook guardrails once the quality commands are stable.
5. SP-25 broadens unit coverage for shared parsing, pagination, theme, SEO, and search logic.
6. SP-26 adds component coverage for UI states that are too small for full e2e tests.
7. SP-27 finishes the article creation script and template for maintainer workflow.
8. SP-28 updates README onboarding from the validated command set.
9. SP-29 adds the static 404 page after route and theme behavior is settled.
10. SP-30 documents branch protection and merge checks from the final CI workflow names.

## SP-21 - Image Optimization

Backlog: PB-021

User story: As a reader, I want article images to load efficiently without shifting the layout, so the catalogue feels
fast and readable on GitHub Pages.

Acceptance criteria:

- Given an article has a colocated hero or content image, when the site builds, then the rendered page uses optimized
  image output or an explicitly justified pass-through path.
- Given article cards render thumbnails, when the index loads, then cards reserve stable image dimensions before images
  finish loading.
- Given non-critical article imagery appears below the initial viewport, when HTML is inspected, then those images are
  lazy-loaded.
- Given an image is above the fold or is the article's primary visual, when HTML is inspected, then it is not
  unnecessarily lazy-loaded.
- Given an image is missing required alternative text, when validation runs, then the check fails with the article path
  or component context.
- Given `GITHUB_PAGES=true npm run build` runs, when built HTML is inspected, then image URLs are safe under the
  `/blog-framework/` base.

TDD validations:

- Red: add a unit or structure test that fails until article image metadata includes dimensions and alternative text.
- Red: add Playwright assertions for article-card image stability, expected lazy-loading, and no responsive overflow.
- Red: add a build artifact check for base-prefixed optimized image URLs.
- Green: implement the smallest Astro image/component changes needed for optimized output and stable layout.
- Refactor: share image rendering conventions between cards and article pages without creating a broad media framework.

Not in scope:

- Runtime image resizing services.
- User-upload workflows.
- CDN-specific optimization.

Open questions:

- Confirm whether SVG article images stay pass-through while raster images use Astro image processing.
- Confirm whether article cards require thumbnails for every article or may fall back to text-only cards.

## SP-22 - Semantic HTML and Keyboard Accessibility

Backlog: PB-022

User story: As a keyboard or assistive-technology reader, I want the catalogue navigation and articles to use semantic
HTML, so browsing works without pointer-only interactions or client JavaScript.

Acceptance criteria:

- Given the home, article list, search, tag, subject, article, and footer surfaces render, when HTML is inspected, then
  each page has one main landmark and a meaningful heading hierarchy.
- Given a keyboard user starts at the top of a page, when they tab through navigation, search, pagination, article cards,
  related links, and footer links, then focus order follows the visual reading order.
- Given interactive elements receive focus, when focus is visible, then the indicator is clearly distinguishable in light
  and dark themes.
- Given JavaScript is disabled, when an article page loads, then article reading, static links, and footer navigation
  still work.
- Given pagination, search, and taxonomy links render, when activated by keyboard, then they navigate without requiring
  pointer-specific events.
- Given automated accessibility smoke checks are available, when they run, then no critical landmark, name, or keyboard
  violations are reported.

TDD validations:

- Red: add Playwright keyboard traversal tests for index, article, pagination, search, and footer navigation.
- Red: add a no-JavaScript article readability test that fails if core content depends on client scripts.
- Red: add semantic structure assertions for landmarks, heading order, link names, and active/focusable controls.
- Green: adjust markup, labels, focus styles, and link/button usage with the smallest component changes needed.
- Refactor: consolidate repeated navigation semantics only where existing components already share responsibility.

Not in scope:

- Full manual screen-reader certification.
- Client-side router behavior.
- User preference panels beyond the existing theme behavior.

Open questions:

- Confirm whether axe should become a required dependency or remain an optional smoke check.
- Confirm whether a skip link should be visible on focus only or always visible.

## SP-23 - Contrast Checks

Backlog: PB-023

User story: As a reader, I want text, controls, links, and focus states to meet contrast expectations in both themes,
so the catalogue remains readable in normal use.

Acceptance criteria:

- Given light theme tokens are evaluated, when contrast checks run, then body text, muted text, links, buttons, borders,
  and focus indicators meet the agreed threshold.
- Given dark theme tokens are evaluated, when contrast checks run, then the same token pairs meet the agreed threshold.
- Given a token pair fails contrast, when the check reports failure, then it names the token pair and computed ratio.
- Given theme tokens change, when `npm run ci` or the documented quality command runs, then regressions are caught before
  merge.
- Given non-token hardcoded colors are introduced in core styles, when validation runs, then they are either covered by a
  contrast check or explicitly reviewed.

TDD validations:

- Red: add contrast unit tests or a small contrast script that fails for at least one intentionally low-ratio fixture.
- Red: add checks for light and dark body, muted, link, button, border, and focus token pairs.
- Green: implement threshold-aware contrast validation and adjust tokens only where tests prove failure.
- Refactor: keep contrast pair definitions close to theme token definitions so future theme changes are easy to audit.

Not in scope:

- Perceptual color palette redesign.
- User-selectable custom themes.
- Browser extension or OS-level contrast overrides.

Open questions:

- Confirm WCAG level: AA is assumed, AAA would require stricter copy and muted-token decisions.
- Confirm whether image overlays need automated contrast checks in Sprint 3.

## SP-24 - Linting, Formatting, and Pre-Commit Hooks

Backlog: PB-026

User story: As a maintainer, I want repeatable lint, format, and optional pre-commit guardrails, so the starter stays
consistent without relying on memory.

Acceptance criteria:

- Given a maintainer runs `npm run lint`, when source files are checked, then lint violations fail the command.
- Given a maintainer runs `npm run format:check`, when tracked source and docs files are checked, then formatting
  drift fails the command.
- Given a maintainer runs `npm run ci`, when the command completes, then lint and format checks are included before
  build/e2e smoke validation.
- Given hooks are enabled, when a commit is attempted with lint or format failures, then the hook blocks the commit.
- Given a duplicator does not want local hooks, when they follow README setup, then hooks are documented as optional and
  CI remains authoritative.
- Given hook dependencies are not installed, when normal build/test commands run, then they do not fail solely because
  Husky is absent.

TDD validations:

- Red: add package-script or structure tests that fail until lint, format check, CI, and hook-related scripts are
  discoverable.
- Red: add a documented hook smoke check that proves the hook invokes the same public commands.
- Green: wire ESLint, Prettier, CI script ordering, and optional Husky configuration with minimal package churn.
- Refactor: remove only hook or lint configuration that this story makes redundant; leave unrelated style choices alone.

Not in scope:

- Opinionated rewrite of existing formatting style.
- Commit message linting.
- Organization-wide shared ESLint packages.

Open questions:

- Confirm whether Husky should be installed by default or documented as opt-in.
- Confirm whether format fixing belongs in a hook or only `format:check` should block commits.

## SP-25 - Unit Tests for Parsing and Config Logic

Backlog: PB-024

User story: As a maintainer, I want focused unit tests around parsing, pagination, theme, SEO, and search helpers, so
changes to catalogue rules are caught quickly.

Acceptance criteria:

- Given article frontmatter is parsed, when required fields are missing or invalid, then unit tests cover the failure
  cases with useful messages.
- Given pagination helpers receive edge-case counts, when pages are generated, then unit tests cover empty, exact page
  size, overflow, and invalid page-size behavior.
- Given theme tokens and shared layout metadata are changed, when unit tests run, then token contract and site config
  expectations are validated.
- Given SEO helpers build canonical, sitemap, RSS, or JSON-LD URLs, when base path and site URL are configured, then
  unit tests cover GitHub Pages-safe output.
- Given search helpers normalize and rank queries, when unit tests run, then title, tag, subject, summary, body, empty
  query, and no-match paths are covered.
- Given tests use fixtures, when fixture content changes, then expectations remain deterministic and avoid network
  access.

TDD validations:

- Red: identify one uncovered parsing/config edge case per helper area and add failing Vitest coverage first.
- Red: run `npm run test:unit` and confirm the new cases fail for missing behavior or missing assertions before fixes.
- Green: implement only the helper changes needed to satisfy the new edge-case coverage.
- Refactor: organize fixtures and helper factories only when repetition makes the tests hard to read.

Not in scope:

- Snapshot-heavy tests for full HTML pages.
- Replacing Playwright smoke coverage with unit tests.
- Testing Astro internals.

Open questions:

- Confirm minimum coverage threshold, if any, before adding numeric coverage gates.
- Confirm whether invalid article fixtures should live under `tests/fixtures` or inline in unit tests.

## SP-26 - Component Tests for Cards, Pagination, and Search

Backlog: PB-025

User story: As a maintainer, I want component-level tests for article cards, pagination, and search states, so UI
behavior can be validated without paying the cost of full e2e tests for every state.

Acceptance criteria:

- Given an article card renders with full metadata, when component tests inspect it, then title, summary, subject, tags,
  image alt text, published date, and link target are present.
- Given an article card renders without optional media, when component tests inspect it, then the card remains readable
  and has no broken image markup.
- Given pagination renders first, middle, and last page states, when component tests inspect it, then active, previous,
  next, and disabled/omitted links are correct.
- Given search has loading, results, empty, and error states, when component tests render those states, then names and
  messages are accessible and stable.
- Given the component harness runs, when `npm run test:unit` or a documented component test command executes, then these
  states are covered in CI.

TDD validations:

- Red: add component test fixtures for card, pagination, and search states that fail until the harness and component
  exports support them.
- Red: run the selected component test command and confirm it fails on missing harness or missing accessible state.
- Green: expose the smallest renderable component surfaces and harness configuration needed for deterministic tests.
- Refactor: keep component tests focused on rendered contracts and leave route-level flows in Playwright.

Not in scope:

- Visual regression screenshot infrastructure.
- Testing every CSS declaration.
- Replacing e2e smoke tests for full navigation.

Open questions:

- Confirm component test framework: Astro test utilities, Vitest with server-side rendering, or Playwright component
  testing.
- Confirm whether search state rendering should be extracted from page script code before testing.

## SP-27 - Article Creation Script and Template

Backlog: PB-027

User story: As a maintainer, I want a reliable article creation command, so adding a shared article starts from a valid
Markdown folder without copying old content by hand.

Acceptance criteria:

- Given a maintainer runs `npm run new:article -- <slug>`, when the slug is valid and unused, then a new
  `src/content/articles/<slug>/index.md` file is created from a valid template.
- Given the slug contains uppercase letters, spaces, path traversal, or unsafe characters, when the command runs, then it
  fails without writing partial files.
- Given the target article folder already exists, when the command runs, then it fails without overwriting content.
- Given the command succeeds, when the generated article is checked, then required frontmatter fields are present with
  safe starter values and clear TODO placeholders.
- Given a colocated media placeholder is part of the template, when generated, then image guidance does not create a
  broken production image by default.
- Given the starter is duplicated, when the command runs in the duplicate, then it relies on local config and paths
  rather than repository-specific names.

TDD validations:

- Red: add script tests for successful creation, duplicate slug, invalid slug, path traversal, and no partial writes.
- Red: add a schema validation test against the generated template.
- Green: implement the smallest CLI behavior and template needed to pass the creation and validation tests.
- Refactor: share slug validation only if another existing module already needs the same contract.

Not in scope:

- Interactive prompts.
- Fetching article metadata from external URLs.
- Editing or deleting existing articles.

Open questions:

- Confirm default template values for author, subject, tags, summary, and draft status.
- Confirm whether the script should support `--title` or remain slug-only for Sprint 3.

## SP-28 - README Onboarding

Backlog: PB-028

User story: As someone duplicating the starter, I want concise README onboarding, so I can install, add articles, test,
build, preview, and deploy the catalogue without reading the implementation first.

Acceptance criteria:

- Given a new maintainer opens the README, when they follow setup instructions, then required Node/npm version,
  installation, development server, article creation, test, build, preview, and deploy commands are listed.
- Given the starter is duplicated, when site identity changes are needed, then the README names the site metadata and
  GitHub Pages settings that must be edited.
- Given articles are added, when onboarding explains content structure, then it points to
  `src/content/articles/<slug>/index.md` and colocated media expectations.
- Given quality gates are described, when commands are listed, then `npm run format:check`, `npm run lint`,
  `npm run test:unit`, `npm run test:e2e:smoke`, `npm run ci`, and `GITHUB_PAGES=true npm run build` are covered.
- Given optional hooks exist, when onboarding describes them, then it distinguishes optional local hooks from required
  CI checks.
- Given a reader wants to browse locally, when README instructions mention preview, then they include the static preview
  flow rather than only the dev server.

TDD validations:

- Red: add documentation structure tests or checklist assertions that fail until the README covers setup, content,
  quality gates, build, preview, deploy, and duplication steps.
- Red: add package-script existence checks for every command the README asks users to run.
- Green: update the README with only validated commands and repository-specific settings that actually exist.
- Refactor: remove stale README instructions made obsolete by Sprint 1 through Sprint 3 work.

Not in scope:

- Long-form product marketing copy.
- Hosted documentation site.
- Screenshots unless they are needed to explain setup.

Open questions:

- Confirm whether README should keep a brief project motivation section about cataloging articles from the developer's
  wife.
- Confirm whether GitHub Pages deploy instructions should target Actions only or also manual Pages settings.

## SP-29 - Static 404 Page

Backlog: PB-029

User story: As a reader, I want a useful static 404 page, so broken or old links still keep me inside the article
catalogue.

Acceptance criteria:

- Given `npm run build` runs, when output is inspected, then `dist/404.html` exists.
- Given an unknown GitHub Pages path is requested, when the static 404 page renders, then it uses the same theme tokens,
  layout shell, and navigation as the rest of the site.
- Given the 404 page renders, when links are inspected, then it offers a route back to home and article browsing with
  base-safe URLs.
- Given JavaScript is disabled, when the 404 page loads, then the content and recovery links remain usable.
- Given `GITHUB_PAGES=true npm run build` runs, when `404.html` is inspected, then assets and internal links work under
  the `/blog-framework/` base path.

TDD validations:

- Red: add a build artifact test that fails until `dist/404.html` is emitted.
- Red: add a Playwright unknown-route check against preview output for themed content and recovery links.
- Red: add a base-path build assertion for links and assets in `404.html`.
- Green: add the smallest static 404 route/page using existing layout and navigation.
- Refactor: reuse existing site metadata and layout helpers without adding a special 404 framework.

Not in scope:

- Search suggestions on the 404 page.
- Client-side redirect rules.
- Analytics for broken links.

Open questions:

- Confirm 404 copy tone: minimal utility copy is assumed.
- Confirm whether the article index or search page should be the primary recovery link.

## SP-30 - Branch Protection and Merge Check Guidance

Backlog: PB-030

User story: As a maintainer, I want branch protection and merge-check guidance, so changes to the starter are merged
only after the documented quality gates pass.

Acceptance criteria:

- Given the CI workflow defines required jobs, when the merge-check documentation is read, then it names the exact job
  names to require in GitHub branch protection.
- Given the default branch is protected, when guidance is followed, then direct pushes are discouraged and pull requests
  require passing checks before merge.
- Given GitHub Pages deployment exists, when guidance is followed, then Pages deployment remains separate from pull
  request validation unless intentionally configured otherwise.
- Given a duplicated starter uses `main` instead of `master`, when guidance is read, then the branch name difference is
  called out without requiring code changes.
- Given local commands and CI checks diverge, when documentation is reviewed, then the source of truth is clear and the
  mismatch is treated as a documentation or workflow bug.

TDD validations:

- Red: add workflow/documentation checks that fail until required CI job names are discoverable and documented.
- Red: add README or docs assertions for protected branch name, required checks, pull-request flow, and Pages deploy
  notes.
- Green: document the current workflow names and branch protection steps without changing deployment behavior unless a
  test proves the workflow is wrong.
- Refactor: keep merge guidance close to onboarding or CI docs so it is easy for duplicators to find.

Not in scope:

- Applying GitHub branch protection through the API.
- Organization policy enforcement.
- Release automation.

Open questions:

- Confirm protected branch name: `master` is assumed from the current repository.
- Confirm whether merge queue guidance is needed or normal required checks are enough.

## Validation Matrix

| Area | Required validation |
| --- | --- |
| Image optimization | Unit/structure checks for image metadata, Playwright layout checks, build artifact review |
| Semantic accessibility | Keyboard Playwright checks, semantic assertions, no-JavaScript article readability |
| Contrast | Automated token-pair contrast script or unit tests in the quality path |
| Lint/format/hooks | `npm run lint`, `npm run format:check`, CI script check, optional hook smoke |
| Unit coverage | `npm run test:unit` with parsing, pagination, theme, SEO, and search edge cases |
| Component coverage | Component harness command or documented integration into `npm run test:unit` |
| Article creation | Script tests for create, duplicate, invalid slug, path traversal, and schema validity |
| README onboarding | Documentation checklist plus command existence checks |
| Static 404 | `dist/404.html` artifact check and Playwright unknown-route smoke |
| Merge checks | Workflow job-name and documentation assertions |

## Sprint Exit Criteria

- SP-21 through SP-30 acceptance criteria are either complete or explicitly deferred with owner and reason.
- `npm run format:check`, `npm run lint`, `npm run test:unit`, `npm run test:e2e:smoke`, and `npm run ci` pass.
- `GITHUB_PAGES=true npm run build` passes and emits expected static artifacts, including `404.html`.
- README and branch-protection guidance match actual package scripts and GitHub Actions workflow job names.
- No blocker handoff remains open for the requested Sprint 3 refinement task.
