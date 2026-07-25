# ADR 0002: Use Astro Components and Minimal Vanilla JavaScript

## Context

The first catalogue slice is mostly reading and browsing: index cards, article pages, static pagination, and shared theme
tokens. Those requirements do not need a client-side component framework.

## Decision

Use Astro components for reusable markup and vanilla JavaScript only when a concrete browser interaction requires it.
Sprint 1 does not add React, Vue, Svelte, or another UI runtime.

## Alternatives

- React: valuable for rich stateful interfaces, but unnecessary for static article cards and Markdown article pages.
- Vue: similarly useful for interactive applications, but it adds a runtime before the catalogue has runtime
  interactions.
- Svelte: lighter than some alternatives, but still a client framework the current reading flow does not require.

## Adoption Threshold

Add a UI framework only after a real feature needs durable client state, reusable interactive widgets, or complex
progressive enhancement that would be harder to maintain in vanilla JavaScript.

## No-JavaScript Stance

Core article reading and index navigation must work without JavaScript. Links, static article pages, and pagination stay
server-rendered at build time.

## Consequences

The default implementation remains easy to duplicate, inspect, and host on GitHub Pages. Future interactive features can
still use islands when the product need is clear.
