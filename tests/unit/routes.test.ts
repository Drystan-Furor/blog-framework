import { describe, expect, it } from "vitest";
import {
  articleSlugFromId,
  articleUrlFromSlug,
  createArticleRoutes,
  pathWithBase
} from "../../src/lib/routes";

describe("article routes", () => {
  it("uses the folder name as the public article slug", () => {
    expect(articleSlugFromId("hello-world/index")).toBe("hello-world");
    expect(articleSlugFromId("hello-world/index.md")).toBe("hello-world");
  });

  it("creates deterministic article URLs", () => {
    expect(articleUrlFromSlug("hello-world")).toBe("/articles/hello-world/");
  });

  it("prefixes URLs with the configured deployment base", () => {
    expect(pathWithBase("/", "/blog-framework/")).toBe("/blog-framework/");
    expect(articleUrlFromSlug("hello-world", "/blog-framework/")).toBe(
      "/blog-framework/articles/hello-world/"
    );
  });

  it("creates route params from article entries", () => {
    expect(createArticleRoutes([{ id: "hello-world/index" }])).toEqual([
      {
        params: { slug: "hello-world" },
        props: { article: { id: "hello-world/index" } }
      }
    ]);
  });
});
