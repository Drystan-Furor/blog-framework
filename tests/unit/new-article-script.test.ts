import { describe, expect, it } from "vitest";
import {
  assertValidSlug,
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
    expect(markdown).toContain("tags: []");
    expect(markdown).toContain('sourceUrl: "https://example.com/prompt-design"');
    expect(markdown).toContain('sharedAt: "2026-04-30"');
    expect(markdown).toContain("draft: false");
  });

  it("rejects slugs that would not create deterministic article routes", () => {
    expect(() => assertValidSlug("Prompt Design")).toThrow("Usage:");
  });
});
