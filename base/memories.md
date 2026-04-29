# Memories

## 2026-04-29 - Astro Static Article Catalogue Planning

- Source intent is `base/essence.md`: build a static GitHub Pages article catalogue for articles shared by the developer's wife, with Markdown folders transformed into HTML during the build pipeline.
- Recommended architecture is Astro + build-time content collections + minimal vanilla JavaScript + Playwright + GitHub Pages.
- Recommended article source path is Astro-native `src/content/articles/<slug>/index.md` with a colocated `image.avif`; preserve the original `blogs/<slug>/index.md` request as a refinement/compatibility question if exact root-level paths become mandatory.
- Planning artifacts written from this source are `docs/folder-structure.md`, `backlog/backlog.md`, `backlog/roadmap/roadmap.md`, `backlog/sprint/sprint-planning.md`, and `backlog/sprint/sprint1.md` through `sprint3.md`.
- Sprint planning intentionally uses three sprints with exactly 10 stories each: SP-01 through SP-10, SP-11 through SP-20, and SP-21 through SP-30.
