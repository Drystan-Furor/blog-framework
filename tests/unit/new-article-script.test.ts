import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import {
  assertValidSlug,
  createArticle,
  createArticleMarkdown,
  titleFromSlug
} from "../../scripts/new-article.mjs";

describe("new article script", () => {
  it("creates readable titles from article slugs", () => {
    expect(titleFromSlug("prompt-design")).toBe("Prompt Design");
  });

  it("creates public, guide-aligned frontmatter by default", () => {
    const markdown = createArticleMarkdown("prompt-design", "2026-04-30");

    expect(markdown).toContain('title: "Prompt Design"');
    expect(markdown).toContain('imageAlt: "TODO: Describe the article image."');
    expect(markdown).toContain("tags: []");
    expect(markdown).toContain('sourceUrl: "https://example.com/prompt-design"');
    expect(markdown).toContain('sharedAt: "2026-04-30"');
    expect(markdown).toContain("draft: false");
  });

  it("rejects slugs that would not create deterministic article routes", () => {
    expect(() => assertValidSlug("Prompt Design")).toThrow("Usage:");
  });

  it("creates a complete article folder without overwriting existing content", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "article-script-"));

    try {
      await expect(createArticle("screen-free-day", cwd)).resolves.toBe(
        "Created src/content/articles/screen-free-day/"
      );

      const markdown = await readFile(
        join(cwd, "src/content/articles/screen-free-day/index.md"),
        "utf8"
      );
      const image = await readFile(join(cwd, "src/content/articles/screen-free-day/image.svg"));

      expect(markdown).toContain('imageAlt: "TODO: Describe the article image."');
      expect(image.byteLength).toBeGreaterThan(0);
      await expect(createArticle("screen-free-day", cwd)).rejects.toThrow();
    } finally {
      await rm(cwd, { recursive: true, force: true });
    }
  });

  it("rejects unsafe slugs before writing partial folders", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "article-script-"));

    try {
      await expect(createArticle("../bad", cwd)).rejects.toThrow("Usage:");
      await expect(access(join(cwd, "src"))).rejects.toThrow();
    } finally {
      await rm(cwd, { recursive: true, force: true });
    }
  });
});
