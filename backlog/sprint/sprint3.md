# Sprint 3 - Harden the Starter

## Goal

Make the starter practical to keep: optimized media, accessibility and contrast checks, broader test coverage, lint/format hooks, article generation, onboarding, 404 handling, and merge-check guidance.

## Success Criteria

- Article cards and pages handle images efficiently.
- Core browsing works with keyboard and readable contrast in light/dark modes.
- Local quality gates cover unit, component, lint, format, and e2e smoke behavior.
- A maintainer can create an article and onboard from the README.

## Stories

| # | Story | Backlog | WSJF | Sprint Acceptance | Verification |
| ---: | --- | --- | ---: | --- | --- |
| 1 | SP-21 - Image Optimization | PB-021 | 4.50 | Article images are optimized, lazy-loaded where appropriate, and stable in layout. | Image e2e assertions and build output review. |
| 2 | SP-22 - Semantic HTML and Keyboard Accessibility | PB-022 | 7.00 | Index, article, pagination, search, and footer navigation are keyboard reachable; articles remain readable without client JavaScript. | Keyboard Playwright checks and optional axe smoke. |
| 3 | SP-23 - Contrast Checks | PB-023 | 9.50 | Light and dark theme token pairs meet agreed contrast thresholds. | Contrast script or unit tests. |
| 4 | SP-24 - Linting, Formatting, and Pre-Commit Hooks | PB-026 | 6.33 | ESLint, Prettier, and Husky workflows are available. | `npm run lint`, `npm run format:check`, hook check. |
| 5 | SP-25 - Unit Tests for Parsing and Config Logic | PB-024 | 7.33 | Parsing, pagination, theme/SEO/search helpers have unit coverage. | `npm run test:unit`. |
| 6 | SP-26 - Component Tests for Cards, Pagination, and Search | PB-025 | 4.50 | Key UI states are validated outside full e2e tests. | Component test command or documented harness. |
| 7 | SP-27 - Article Creation Script and Template | PB-027 | 10.00 | `npm run new:article -- <slug>` creates a safe starter entry. | Script tests for create, duplicate, invalid slug. |
| 8 | SP-28 - README Onboarding | PB-028 | 9.00 | README explains install, dev, article creation, test, build, preview, and deploy. | Documentation checklist and command existence check. |
| 9 | SP-29 - Static 404 Page | PB-029 | 7.50 | Build emits a useful themed `404.html`. | Playwright 404 route test and `dist/404.html` check. |
| 10 | SP-30 - Branch Protection and Merge Check Guidance | PB-030 | 8.00 | Required checks and protected branch setup are documented. | Workflow job names and docs review. |

## Sprint Refinement Focus

- Confirm WCAG target level.
- Confirm whether Husky hooks are mandatory or optional.
- Confirm component testing framework.
- Confirm protected branch name: `master` or `main`.
