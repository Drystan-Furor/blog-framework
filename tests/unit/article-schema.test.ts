import { describe, expect, it } from "vitest";
import { articleFrontmatterSchema } from "../../src/lib/article-schema";

const validArticle = {
  title: "Hello World Shared Article",
  subtitle: "The starter article",
  summary:
    "This catalogue starts with one article. It proves Markdown can become static HTML. It keeps replacement simple.",
  subject: "Starter",
  publishedAt: "2026-04-29",
  image: "./image.svg",
  imageAlt: "Layered article pages on a reading desk.",
  sourceUrl: "https://example.com/hello-world",
  sharedAt: "2026-04-29"
};

describe("article frontmatter schema", () => {
  it("accepts valid article metadata and applies predictable defaults", () => {
    const result = articleFrontmatterSchema.safeParse(validArticle);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.tags).toEqual([]);
    expect(result.data.sharedBy).toBe("wife");
    expect(result.data.draft).toBe(false);
    expect(result.data.publishedAt).toBeInstanceOf(Date);
  });

  it.each(["title", "summary", "subject", "publishedAt", "image", "imageAlt"] as const)(
    "requires %s",
    (field) => {
      const article = { ...validArticle };
      delete article[field];

      expect(articleFrontmatterSchema.safeParse(article).success).toBe(false);
    }
  );

  it("rejects invalid dates, URLs, tags, and image paths", () => {
    expect(
      articleFrontmatterSchema.safeParse({ ...validArticle, publishedAt: "not-a-date" }).success
    ).toBe(false);
    expect(
      articleFrontmatterSchema.safeParse({ ...validArticle, sourceUrl: "not-a-url" }).success
    ).toBe(false);
    expect(articleFrontmatterSchema.safeParse({ ...validArticle, tags: [""] }).success).toBe(false);
    expect(
      articleFrontmatterSchema.safeParse({ ...validArticle, image: "../image.svg" }).success
    ).toBe(false);
  });
});
