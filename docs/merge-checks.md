# Merge checks

Use pull requests for changes to this starter when sharing the repository with other maintainers, and protect the default branch.

## Required checks

Require the `Pages / quality` status check before merge. The job runs `npm run ci`, including formatting, linting, Astro diagnostics, unit tests, a static build, and generic smoke E2E coverage.

The `Pages / deploy` job only runs after a successful build from `master` or a manual workflow run. Pull requests never receive Pages write or OIDC permissions.

## Branch protection

The current repository uses `master`. For repositories using `main`, apply settings to `main` and update `.github/workflows/pages.yml` branch filters.

Recommended branch protection:

- Require pull request before merging.
- Require `Pages / quality` to pass before merging.
- Require branches to be up to date before merging if the repository has multiple active contributors.
- Block force pushes and direct pushes to the protected branch.

If local commands and GitHub status checks diverge, treat the workflow documentation as a bug and update both places in the same change.
