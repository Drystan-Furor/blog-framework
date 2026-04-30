import { describe, expect, it } from "vitest";
import { createRssXml, createSitemapXml } from "../../src/lib/site-artifacts";
import { absoluteUrl } from "../../src/lib/site";

function article(overrides: { id: string; title: string; subject?: string; tags?: string[] }) {
  return {
    id: `${overrides.id}/index`,
    body: `${overrides.title} body`,
    data: {
      title: overrides.title,
      subtitle: "",
      summary: `${overrides.title} summary`,
      subject: overrides.subject ?? "General",
      publishedAt: new Date("2026-04-30"),
      image: "./image.svg",
      tags: overrides.tags ?? [],
      sourceUrl: "https://example.com",
      sharedBy: "wife",
      draft: false
    }
  };
}

describe("site artifacts", () => {
  it("builds absolute URLs for the GitHub Pages base path", () => {
    expect(absoluteUrl("/articles/hello-world/", "/blog-framework/")).toBe(
      "https://drystan-furor.github.io/blog-framework/articles/hello-world/"
    );
  });

  it("creates well-formed sitemap XML with public routes", () => {
    const xml = createSitemapXml({
      articles: [article({ id: "hello-world", title: "Hello World", tags: ["starter"] })],
      baseUrl: "/blog-framework/"
    });

    expect(xml).toContain("<urlset");
    expect(xml).toContain("https://drystan-furor.github.io/blog-framework/");
    expect(xml).toContain("https://drystan-furor.github.io/blog-framework/search/");
    expect(xml).toContain("https://drystan-furor.github.io/blog-framework/tags/starter/");
    expect(xml).toContain("https://drystan-furor.github.io/blog-framework/articles/hello-world/");
  });

  it("creates RSS XML with latest public article metadata", () => {
    const xml = createRssXml({
      articles: [article({ id: "hello-world", title: "Hello World" })],
      baseUrl: "/blog-framework/"
    });

    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<title>Hello World</title>");
    expect(xml).toContain(
      "<link>https://drystan-furor.github.io/blog-framework/articles/hello-world/</link>"
    );
    expect(xml).toContain('<guid isPermaLink="true">');
  });
});
