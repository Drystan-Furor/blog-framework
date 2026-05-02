# Product Backlog

## Source of Truth

Input read: `base/essence.md`

Review input read:

- `backlog/refined/sprint1-R.md`
- `backlog/refined/sprint2-R.md`
- `backlog/refined/sprint3-R.md`
- `base/memories.md`

Intent: build a static GitHub Pages website that catalogs articles shared by the developer's wife, keeps the article
source as Markdown folders, transforms Markdown into HTML in the build pipeline, and stays easy to browse and duplicate
as a starter.

Architecture recommendation from the source: Astro + Markdown/content collections + minimal vanilla JavaScript +
Playwright + GitHub Pages.

## Backlog Status

Sprints 1, 2, and 3 have implementation proof in `base/memories.md`, so their completed stories were moved out of this
active backlog and into `backlog/work-done.md`.

This file now contains only remaining work to be done.

## Working Assumptions

- The MVP and starter hardening scope is complete unless new regressions are found.
- The remaining backlog is future scope and should be pulled forward only after product owner confirmation.
- Articles are authored manually as Markdown first; URL import and automatic thumbnails remain future scope unless
  confirmed.
- The recommended Astro-native content path remains `src/content/articles/<slug>/index.md` with colocated media.
- The first release remains fully static and public unless the product owner changes the content policy.

## Work To Be Done

| Rank | ID     | Epic        | Story                                                          | Acceptance Summary                                                                                     | Source Trace                          |
|-----:|--------|-------------|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------------------------------|
|    1 | PB-031 | Docs        | Add architecture diagrams for build, content, and deploy flow. | Mermaid diagrams explain how Markdown becomes deployed HTML.                                           | architecture diagrams                 |
|    2 | PB-032 | Maintenance | Add Dependabot and dependency security scanning.               | Dependency updates and risky packages are surfaced automatically.                                      | Dependabot, security scanning         |
|    3 | PB-033 | Delivery    | Add pull request preview deployments.                          | Pull requests can be reviewed as temporary deployed previews.                                          | preview deployments                   |
|    4 | PB-034 | Release     | Add versioned releases and changelog generation.               | Releases are tagged and changes are traceable.                                                        | versioned releases, changelog         |
|    5 | PB-035 | Portability | Add Markdown backup/export.                                    | Content can be exported or copied without losing metadata.                                             | backup/export                         |
|    6 | PB-036 | Analytics   | Add privacy-friendly analytics.                                | Usage can be measured without invasive tracking.                                                       | analytics                             |
|    7 | PB-037 | Theme       | Add theme editor or generated theme config tooling.            | Maintainer can adjust design tokens safely beyond manual config editing.                              | theme editor                          |
|    8 | PB-038 | Search      | Add advanced search ranking.                                   | Results weight title, tags, subject, and content with tuned scoring.                                  | advanced ranking search               |
|    9 | PB-039 | Import      | Add saved URL/article import workflow.                         | A shared URL can be transformed into a draft Markdown article.                                        | import from saved URLs/articles       |
|   10 | PB-040 | Media       | Add automatic screenshots/thumbnails.                          | Article thumbnails can be generated when no image is provided.                                        | screenshots/thumbnails auto-generated |
|   11 | PB-041 | Scope       | Resolve language/public/static/content policy decisions.       | Single language, public/private, fully static, Markdown-only, and search-depth choices are documented. | refinement questions                  |

## Future Cut Line

PB-031 through PB-041 stay out of the completed MVP and starter-hardening baseline until the product owner explicitly
pulls them into a new sprint.
