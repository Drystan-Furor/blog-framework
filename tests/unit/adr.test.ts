import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readDoc(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("architecture decision records", () => {
  it("documents the Astro framework decision", () => {
    const adr = readDoc("docs/adr/0001-framework.md");

    expect(adr).toContain("## Context");
    expect(adr).toContain("## Decision");
    expect(adr).toContain("Astro");
    expect(adr).toContain("Markdown");
    expect(adr).toContain("GitHub Pages");
    expect(adr).toContain("## Alternatives");
    expect(adr).toContain("Vite-only");
    expect(adr).toContain("Webpack");
    expect(adr).toContain("Next.js");
    expect(adr).toContain("## Consequences");
    expect(adr).toContain("## Revisit Triggers");
  });

  it("documents the default UI library decision", () => {
    const adr = readDoc("docs/adr/0002-ui-library.md");

    expect(adr).toContain("## Decision");
    expect(adr).toContain("Astro components");
    expect(adr).toContain("vanilla JavaScript");
    expect(adr).toContain("## Alternatives");
    expect(adr).toContain("React");
    expect(adr).toContain("Vue");
    expect(adr).toContain("Svelte");
    expect(adr).toContain("## Adoption Threshold");
    expect(adr).toContain("## No-JavaScript Stance");
  });
});
