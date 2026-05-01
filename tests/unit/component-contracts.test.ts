import { describe, expect, it } from "vitest";
import {
  createArticleCardView,
  createPaginationView,
  createSearchUiState
} from "../../src/lib/component-contracts";
import { paginateItems } from "../../src/lib/pagination";

function article(overrides: { id: string; image?: string; tags?: string[] }) {
  return {
    id: `${overrides.id}/index`,
    data: {
      title: "Prompt Design",
      subtitle: "",
      summary: "A concise article summary.",
      subject: "Prompting",
      publishedAt: new Date("2026-04-30"),
      image: overrides.image ?? "./image.svg",
      imageAlt: "Layered article pages on a reading desk.",
      tags: overrides.tags ?? ["prompting", "design"],
      sourceUrl: "https://example.com",
      sharedBy: "wife",
      draft: false
    }
  };
}

describe("component state contracts", () => {
  it("describes a complete article card state", () => {
    expect(createArticleCardView(article({ id: "prompt-design" }))).toMatchObject({
      title: "Prompt Design",
      summary: "A concise article summary.",
      subject: "Prompting",
      tags: ["prompting", "design"],
      href: "/articles/prompt-design/",
      image: {
        alt: "Layered article pages on a reading desk.",
        path: "./image.svg"
      }
    });
  });

  it("describes an article card without optional media", () => {
    expect(createArticleCardView(article({ id: "prompt-design", image: "" })).image).toBeNull();
  });

  it("describes first, middle, and last pagination states", () => {
    const first = createPaginationView(paginateItems(["a", "b", "c"], 1, 1));
    const middle = createPaginationView(paginateItems(["a", "b", "c"], 2, 1));
    const last = createPaginationView(paginateItems(["a", "b", "c"], 3, 1));

    expect(first.previous).toBeNull();
    expect(first.next?.href).toBe("/articles/page/2/");
    expect(middle.previous?.href).toBe("/articles/");
    expect(middle.next?.href).toBe("/articles/page/3/");
    expect(last.previous?.href).toBe("/articles/page/2/");
    expect(last.next).toBeNull();
  });

  it("describes search loading, results, empty, and error states", () => {
    expect(createSearchUiState({ query: "", documents: [], loading: true })).toMatchObject({
      status: "Loading search index.",
      results: [],
      empty: false,
      error: false
    });

    expect(
      createSearchUiState({
        query: "prompt",
        documents: [
          {
            slug: "prompt-design",
            url: "/articles/prompt-design/",
            title: "Prompt Design",
            summary: "A prompt article.",
            subject: "Prompting",
            tags: ["prompting"],
            publishedAt: "2026-04-30",
            body: "Prompt body"
          }
        ]
      })
    ).toMatchObject({
      status: "",
      results: [expect.objectContaining({ slug: "prompt-design" })],
      empty: false,
      error: false
    });

    expect(createSearchUiState({ query: "missing", documents: [] })).toMatchObject({
      status: "",
      results: [],
      empty: true,
      error: false
    });

    expect(createSearchUiState({ query: "prompt", documents: [], error: true })).toMatchObject({
      status: "Search is temporarily unavailable.",
      results: [],
      empty: false,
      error: true
    });
  });
});
