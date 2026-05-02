import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("article page layout CSS", () => {
  const css = readFileSync(join(root, "src/styles/global.css"), "utf8");

  it("does not shift desktop article content into a two-column layout", () => {
    expect(css).not.toMatch(
      /@media\s*\(min-width:\s*1120px\)\s*{[\s\S]*\.article-page\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*0\.8fr\)\s+minmax\(0,\s*1\.2fr\)/
    );
  });

  it("centers the desktop reading column without changing the base mobile article column", () => {
    expect(css).toMatch(
      /\.article-page\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);[\s\S]*}/
    );
    expect(css).toMatch(
      /@media\s*\(min-width:\s*1120px\)\s*{[\s\S]*\.article-hero,\s*\.article-body,\s*\.article-footer\s*{[\s\S]*margin-inline:\s*auto;/
    );
  });

  it("renders markdown tables as readable cards with a header banner", () => {
    expect(css).toMatch(/\.article-body\s+table\s*{[\s\S]*border-radius:\s*var\(--radius-card\)/);
    expect(css).toMatch(/\.article-body\s+table\s*{[\s\S]*box-shadow:\s*var\(--shadow-card\)/);
    expect(css).toMatch(/\.article-body\s+thead\s*{[\s\S]*background:/);
    expect(css).toMatch(/\.article-body\s+th\s*{[\s\S]*text-transform:\s*uppercase/);
    expect(css).toMatch(/\.article-body\s+tbody\s+tr:nth-child\(even\)\s*{[\s\S]*background:/);
  });
});
