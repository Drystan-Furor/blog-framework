# ADR 0001: Use Astro for the Static Article Catalogue

## Context

The site needs to catalogue articles shared by the developer's wife, keep article source as local Markdown folders, and
publish static HTML that can run on GitHub Pages without a server.

Sprint 1 needs the smallest starter slice: one Markdown article, generated static article routes, a browseable index, and
tests that prove the build pipeline.

## Decision

Use Astro as the site framework.

Astro fits the catalogue because it is content-first, supports Markdown and content collections, emits static HTML by
default, and keeps JavaScript out of article reading unless a later interaction truly needs it. `astro build` is the
Markdown-to-HTML transform in the pipeline, and its output can be hosted directly on GitHub Pages.

## Alternatives

- Vite-only: good for custom front-end apps, but it would require hand-rolling routing, Markdown loading, and static
  article generation that Astro already provides.
- Webpack: flexible, but heavier than the current content catalogue needs and less direct for Markdown-first static
  output.
- Next.js: capable static output, but its application model and React dependency are more than Sprint 1 needs for a
  low-JavaScript article catalogue.

## Consequences

Article source lives under `src/content/articles/<slug>/index.md`, frontmatter is validated before publishing, and static
routes are generated at build time. Contributors need Node and npm, but they do not need a database, CMS, or server
runtime.

## Revisit Triggers

Reconsider the framework if the project needs authenticated authoring, server-rendered personalization, complex
client-side application state, or a host that cannot serve Astro's static output cleanly.
