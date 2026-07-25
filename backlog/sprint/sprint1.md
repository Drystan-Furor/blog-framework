# Sprint 1 - Prove the Static Blog Spine

## Goal

Create the smallest useful Astro starter path: documented structure, architecture decisions, Markdown Hello World
article, static article route, responsive index grid, system theme, and first Playwright smoke coverage.

## Success Criteria

- A Markdown article can become static HTML.
- The article appears on a responsive index grid.
- Light/dark mode follows system settings.
- Playwright smoke tests prove the first user journey.
- The starter remains aligned with `docs/folder-structure.md`.

## Stories

|  # | Story                                          | Backlog |  WSJF | Sprint Acceptance                                                                  | Verification                                    |
|---:|------------------------------------------------|---------|------:|------------------------------------------------------------------------------------|-------------------------------------------------|
|  1 | SP-01 - Astro Folder Structure and NPM Scripts | PB-001  |  9.00 | Standard folders and npm workflows are documented or scaffolded.                   | Structure/script check or manual checklist.     |
|  2 | SP-02 - Framework Decision Record              | PB-002  | 12.50 | Astro is selected with alternatives and tradeoffs recorded.                        | ADR checklist passes.                           |
|  3 | SP-03 - UI Library Decision Record             | PB-003  | 11.00 | Astro components plus vanilla JS are the default UI choice.                        | ADR checklist passes.                           |
|  4 | SP-04 - Hello World Markdown Article           | PB-004  |  9.33 | Hello World Markdown renders to a static article page.                             | Playwright smoke and build output check.        |
|  5 | SP-05 - Article Content Schema                 | PB-005  |  8.67 | Required article frontmatter is validated.                                         | Unit tests for valid and invalid fixtures.      |
|  6 | SP-06 - Static Article Routes                  | PB-006  |  6.50 | Article folders generate deterministic static URLs.                                | Route helper tests and `dist/` check.           |
|  7 | SP-07 - Article Index Grid                     | PB-007  |  6.25 | Index cards show image, title, and preview.                                        | Component/e2e card checks.                      |
|  8 | SP-08 - Responsive Grid and Pagination         | PB-008  |  4.80 | Desktop, tablet, mobile portrait, and mobile landscape grid rules are implemented. | Pagination unit tests and viewport smoke tests. |
|  9 | SP-09 - Theme Tokens and System Dark Mode      | PB-009  |  7.33 | Theme tokens are centralized and `prefers-color-scheme` works.                     | DOM/style smoke checks.                         |
| 10 | SP-10 - First Playwright Smoke Suite           | PB-014  |  8.67 | Home, article, and responsive baseline flows are covered.                          | `npm run test:e2e:smoke`.                       |

## Sprint Refinement Focus

- Confirm npm and Node version.
- Confirm article source path: Astro-native `src/content/articles` or exact `blogs/<slug>`.
- Confirm article URL shape: `/articles/<slug>/` or `/blog/<slug>/`.
- Confirm whether starter content remains in production.
