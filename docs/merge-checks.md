# Merge Checks

Use pull requests for changes to this starter when sharing the repository with other maintainers, and protect the default branch.

## Required Checks

Require the `Woodpecker / checks` status check before merge. The check step runs `npm run ci`, including formatting, linting, Astro diagnostics, unit tests, static build, and smoke e2e coverage.

Do not expose deployment secrets to pull requests. The `deploy-codeberg-pages` step only runs for pushes to `master`, after checks pass, and publishes the generated `dist/` output to the Codeberg Pages `pages` branch.

## Branch Protection

The current repository uses `master`. For repositories using `main`, apply settings to `main` and update `.woodpecker.yml` branch filters.

Recommended branch protection:

- Require pull request before merging.
- Require `Woodpecker / checks` to pass before merging.
- Require branches to be up to date before merging if the repository has multiple active contributors.
- Block force pushes and direct pushes to the protected branch.

If local commands and Woodpecker status checks diverge, treat the workflow documentation as a bug and update both places in the same change.
