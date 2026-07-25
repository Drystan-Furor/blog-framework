# Sprint 1 Static Blog Spine Artifact

## Input

- Read: `backlog/refined/sprint1-R.md`
- Intent: static GitHub Pages article catalogue from Markdown folders, easy to browse and duplicate as a starter.

## Completed Stories

- SP-01: Astro folder structure and npm scripts are present and verified by unit tests.
- SP-02: Framework ADR selects Astro and records alternatives, consequences, and revisit triggers.
- SP-03: UI library ADR selects Astro components plus minimal vanilla JavaScript and records adoption criteria.
- SP-04: Hello World Markdown article renders from `src/content/articles/hello-world/index.md`.
- SP-05: Article frontmatter schema validates required fields, optional defaults, dates, URLs, tags, image paths, and drafts.
- SP-06: Static article route generation publishes `/articles/hello-world/`.
- SP-07: Index grid renders browseable article cards with image, title, and three-sentence summary.
- SP-08: Pagination helpers and responsive grid behavior are covered by unit and smoke tests.
- SP-09: Shared CSS theme tokens support system light/dark mode.
- SP-10: Playwright smoke suite covers home, article navigation, responsive overflow, and theme-token presence.

## Verification

- `npm run format:check`: passed.
- `npm run ci`: passed.
- `npm audit --omit=dev`: passed with 0 production vulnerabilities.
- Build output includes:
  - `dist/index.html`
  - `dist/articles/index.html`
  - `dist/articles/hello-world/index.html`

## Notes

- Astro telemetry is disabled in npm scripts so local commands do not write outside the repository.
- Astro was upgraded to `^6.1.10` after `npm audit --omit=dev` identified a production advisory in the Astro 5 range.
- Playwright preview needs permission to bind to `127.0.0.1:4321` in this sandboxed environment.
