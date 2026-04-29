# Product Backlog

## Source of Truth

Input read: `base/essence.md`

Intent: build a static GitHub Pages website that catalogs articles shared by the developer's wife, keeps the article source as Markdown folders, transforms Markdown into HTML in the build pipeline, and stays easy to browse and duplicate as a starter.

Architecture recommendation from the source: Astro + Markdown/content collections + minimal vanilla JavaScript + Playwright + GitHub Pages.

## Working Assumptions

- The MVP is a fully static public website.
- Articles are authored manually as Markdown first; URL import and automatic thumbnails are future scope unless confirmed.
- The recommended Astro-native content path is `src/content/articles/<slug>/index.md` with a colocated image, while the original `root/blogs/<name>/index.md` request remains tracked as a compatibility/refinement point.
- Search should cover title, summary, tags, subject, and article body unless narrowed later.
- The first release optimizes for browsing 200+ articles without introducing a CMS.

## MVP Must Have

| Rank | ID | Epic | Story | Acceptance Summary | Source Trace |
| ---: | --- | --- | --- | --- | --- |
| 1 | PB-001 | Foundation | Define Astro single-repo folder structure and npm scripts. | `docs/folder-structure.md` documents project folders, scripts, build pipeline, and GitHub Pages notes. | standard structure, npm node, npm scripts, starter |
| 2 | PB-002 | Foundation | Record framework decision for Astro over Vite-only, Webpack, and other options. | ADR explains content-first static rationale and tradeoffs. | toolchain selection |
| 3 | PB-003 | Foundation | Record UI decision for Astro components plus vanilla JS over Vue/React by default. | ADR explains low-JS default and criteria for future framework adoption. | JS library selection |
| 4 | PB-004 | Foundation | Scaffold a Hello World Markdown article and generated article page. | A Markdown article builds into static HTML and can be opened in `dist/`. | Hello World iteration, Markdown to HTML |
| 5 | PB-005 | Content | Define article content schema and validation. | Required frontmatter fails build with clear errors when missing or invalid. | title, subtitle, H1, subject, metadata, foolproof template |
| 6 | PB-006 | Content | Generate static article routes from Markdown folders. | Each article folder produces a stable static article URL. | folder of md files transformed into HTML |
| 7 | PB-007 | Browse | Build article index grid cards. | Index shows image, title, and three-sentence preview. | overview tile grid |
| 8 | PB-008 | Browse | Implement responsive grid and pagination rules. | Desktop/tablet show 4x3 max 12 with pagination; mobile portrait 2 columns; mobile landscape 3 columns; mobile supports up to 18 before pagination. | responsive grid rules, not overwhelming |
| 9 | PB-009 | Theme | Add global theme tokens and automatic light/dark mode. | Colors are centrally configured and respect system color scheme. | global colors, light/dark config, system settings |
| 10 | PB-010 | Search | Generate client-side static search index. | Build emits a search index for static hosting with title, tags, summary, subject, and body content. | global search, 200+ pages |
| 11 | PB-011 | Search | Build search UI and results. | Users can search by keyword/title and receive ranked, usable results without server support. | search across blogs |
| 12 | PB-012 | Navigation | Add previous and next article links. | Article footer links to adjacent articles by defined chronology. | previous/next article |
| 13 | PB-013 | SEO | Add SEO basics to article pages. | Article pages include title, description, canonical URL support, robots metadata, Open Graph basics, and schema.org Article JSON-LD. | SEO fundamentals, structured data |
| 14 | PB-014 | Quality | Add Playwright smoke tests. | Smoke tests verify home, article page, search entry point, and responsive rendering. | Playwright e2e, TDD discipline |
| 15 | PB-015 | Delivery | Add GitHub Actions CI checks. | Pulls and pushes run install, lint/check, tests, and build. | CI build checks |
| 16 | PB-016 | Delivery | Deploy static artifact to GitHub Pages. | GitHub Actions publishes `dist/` to Pages with correct `site` and `base`. | GitHub Pages deploy |

## Should Have

| Rank | ID | Epic | Story | Acceptance Summary | Source Trace |
| ---: | --- | --- | --- | --- | --- |
| 17 | PB-017 | Browse | Add tags and category filters. | Users can browse by tag/category pages and combine with article metadata. | tags, category filters |
| 18 | PB-018 | Navigation | Add related articles by shared tags/subjects. | Article footer shows "you may also like" using shared tags or subject. | related posts, subjects |
| 19 | PB-019 | SEO | Generate `sitemap.xml`. | Build emits a sitemap containing public article and index routes. | sitemap |
| 20 | PB-020 | SEO | Generate RSS feed. | Build emits RSS with latest articles and metadata. | RSS |
| 21 | PB-021 | Media | Optimize article images. | AVIF/WebP image handling keeps cards fast and includes fallback behavior where needed. | AVIF/WebP, image optimization |
| 22 | PB-022 | Accessibility | Ensure semantic HTML, keyboard navigation, and no-JavaScript article reading. | Core pages pass accessibility smoke checks, can be navigated by keyboard, and article content remains readable without client JavaScript. | accessible pages, no-javascript fallback |
| 23 | PB-023 | Accessibility | Check light/dark contrast. | Theme tokens meet WCAG contrast thresholds for main text and controls. | WCAG contrast |
| 24 | PB-024 | Quality | Add unit tests for content parsing and config logic. | Parsing, sorting, pagination, and theme/search helpers have unit coverage. | unit tests |
| 25 | PB-025 | Quality | Add component tests for cards, pagination, and search UI. | UI behavior is validated in isolation where practical. | component tests |
| 26 | PB-026 | Quality | Add linting, formatting, and pre-commit hooks. | ESLint, Prettier, and Husky prevent common local mistakes. | ESLint, Prettier, Husky |
| 27 | PB-027 | Starter | Add article creation script/template. | `npm run new:article -- <slug>` creates a non-copied starter with required fields to fill. | easy duplicate starter, foolproof new md template |
| 28 | PB-028 | Docs | Add README onboarding. | A new contributor can install, add an article, run tests, build, preview, and deploy. | clear onboarding |
| 29 | PB-029 | Reliability | Add `404.html` route. | Dead links render a useful static 404 page. | custom error pages |
| 30 | PB-030 | Quality | Require passing checks before merge. | Branch protection guidance or setup documentation exists. | pull requests require checks |

## Could Have / Later

| Rank | ID | Epic | Story | Acceptance Summary | Source Trace |
| ---: | --- | --- | --- | --- | --- |
| 31 | PB-031 | Docs | Add architecture diagrams for build, content, and deploy flow. | Mermaid diagrams explain how Markdown becomes deployed HTML. | architecture diagrams |
| 32 | PB-032 | Maintenance | Add Dependabot and dependency security scanning. | Dependency updates and risky packages are surfaced automatically. | Dependabot, security scanning |
| 33 | PB-033 | Delivery | Add pull request preview deployments. | Pull requests can be reviewed as temporary deployed previews. | preview deployments |
| 34 | PB-034 | Release | Add versioned releases and changelog generation. | Releases are tagged and changes are traceable. | versioned releases, changelog |
| 35 | PB-035 | Portability | Add Markdown backup/export. | Content can be exported or copied without losing metadata. | backup/export |
| 36 | PB-036 | Analytics | Add privacy-friendly analytics. | Usage can be measured without invasive tracking. | analytics |
| 37 | PB-037 | Theme | Add theme editor or generated theme config tooling. | Maintainer can adjust design tokens safely beyond manual config editing. | theme editor |
| 38 | PB-038 | Search | Add advanced search ranking. | Results weight title, tags, subject, and content with tuned scoring. | advanced ranking search |
| 39 | PB-039 | Import | Add saved URL/article import workflow. | A shared URL can be transformed into a draft Markdown article. | import from saved URLs/articles |
| 40 | PB-040 | Media | Add automatic screenshots/thumbnails. | Article thumbnails can be generated when no image is provided. | screenshots/thumbnails auto-generated |
| 41 | PB-041 | Scope | Resolve language/public/static/content policy decisions. | Single language, public/private, fully static, Markdown-only, and search-depth choices are documented. | refinement questions |

## MVP Cut Line

Ship PB-001 through PB-016 first. PB-017 through PB-030 are next because they improve browsing quality, discoverability, maintainability, and contributor workflow without changing the core architecture.

PB-031 through PB-041 stay out of the MVP unless the product owner explicitly pulls them forward.
