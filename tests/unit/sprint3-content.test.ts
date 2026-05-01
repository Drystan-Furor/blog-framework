import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const articlePaths = [
  "src/content/articles/hello-world/index.md",
  "src/content/articles/prompt-design/index.md",
  "src/content/articles/test-2/index.md",
  "src/content/articles/schermtijd-en-gezin/index.md"
];

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
