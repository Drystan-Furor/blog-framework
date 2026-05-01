# Merge Checks

Use pull requests for changes to the starter and protect the default branch before sharing the repository with other
maintainers.

## Required Checks

Require the `CI / checks` status check before merge. That job runs `npm run ci`, which includes formatting, linting,
Astro diagnostics, unit tests, static build, and smoke e2e coverage.

Do not require the `Deploy GitHub Pages / deploy` job for pull requests. Pages deployment runs after changes land on the
default branch.

## Branch Protection

The current repository uses `master`. For repositories that use `main`, apply the same settings to `main` and update the
workflow branch filters.

Recommended branch protection:

- Require a pull request before merging.
- Require `CI / checks` to pass before merging.
- Require branches to be up to date before merging when the repository has multiple active contributors.
- Block force pushes and direct pushes to the protected branch.

If local commands and GitHub status checks diverge, treat that as a workflow or documentation bug and update both places
in the same change.
