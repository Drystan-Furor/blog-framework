import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const articlesRoot = join(root, "src/content/articles");
const articlePaths = readdirSync(articlesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join("src/content/articles", entry.name, "index.md"));

function frontmatter(path: string) {
  const markdown = readFileSync(join(root, path), "utf8");
  const match = markdown.match(/^---\n(?<frontmatter>[\s\S]*?)\n---/);
  return match?.groups?.frontmatter ?? "";
}

describe("Sprint 3 article media metadata", () => {
  it("requires each public article hero image to have explicit alt text", () => {
    const missingAltText = articlePaths.filter(
      (path) => !/^imageAlt:\s*".+"/m.test(frontmatter(path))
    );

    expect(missingAltText).toEqual([]);
  });
});
