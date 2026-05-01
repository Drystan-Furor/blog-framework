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
});
