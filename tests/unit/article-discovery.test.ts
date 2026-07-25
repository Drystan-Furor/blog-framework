import { describe, expect, it } from "vitest";
import { getAdjacentArticles, getPublicArticles, getRelatedArticles } from "../../src/lib/articles";

function article(overrides: {
  id: string;
  title: string;
  publishedAt: string;
  subject?: string;
  tags?: string[];
  draft?: boolean;
}) {
  return {
    id: `${overrides.id}/index`,
    body: `${overrides.title} body`,
    data: {
      title: overrides.title,
      subtitle: "",
      summary: `${overrides.title} summary`,
      subject: overrides.subject ?? "General",
      publishedAt: new Date(overrides.publishedAt),
      image: "./image.svg",
      imageAlt: "Article image alt text.",
      tags: overrides.tags ?? [],
      sourceUrl: "https://example.com",
      sharedBy: "wife",
      draft: overrides.draft ?? false
    }
  };
}

describe("article discovery helpers", () => {
  it("sorts public articles by date, title, and slug while excluding drafts", () => {
    const publicArticles = getPublicArticles([
      article({ id: "draft", title: "Draft", publishedAt: "2026-05-01", draft: true }),
      article({ id: "beta", title: "Beta", publishedAt: "2026-04-30" }),
      article({ id: "alpha-b", title: "Alpha", publishedAt: "2026-04-30" }),
      article({ id: "alpha-a", title: "Alpha", publishedAt: "2026-04-30" }),
      article({ id: "older", title: "Older", publishedAt: "2026-04-01" })
    ]);

    expect(publicArticles.map((entry) => entry.id)).toEqual([
      "alpha-a/index",
      "alpha-b/index",
      "beta/index",
      "older/index"
    ]);
  });

  it("resolves adjacent newer and older public articles", () => {
    const articles = getPublicArticles([
      article({ id: "newer", title: "Newer", publishedAt: "2026-05-01" }),
      article({ id: "current", title: "Current", publishedAt: "2026-04-15" }),
      article({ id: "older", title: "Older", publishedAt: "2026-04-01" })
    ]);

    expect(getAdjacentArticles(articles, articles[1])).toMatchObject({
      previous: { id: "newer/index" },
      next: { id: "older/index" }
    });
    expect(getAdjacentArticles(articles, articles[0]).previous).toBeUndefined();
    expect(getAdjacentArticles(articles, articles[2]).next).toBeUndefined();
  });

  it("ranks related articles by tags, subject fallback, recency, and slug", () => {
    const current = article({
      id: "current",
      title: "Current",
      publishedAt: "2026-04-20",
      subject: "AI",
      tags: ["prompting", "design"]
    });
    const related = getRelatedArticles(
      current,
      [
        current,
        article({
          id: "subject-only",
          title: "Subject",
          publishedAt: "2026-05-01",
          subject: "AI"
        }),
        article({
          id: "tag-match-b",
          title: "Tag B",
          publishedAt: "2026-04-30",
          subject: "Other",
          tags: ["prompting"]
        }),
        article({
          id: "tag-match-a",
          title: "Tag A",
          publishedAt: "2026-04-30",
          subject: "Other",
          tags: ["prompting"]
        }),
        article({
          id: "draft-match",
          title: "Draft",
          publishedAt: "2026-05-02",
          subject: "AI",
          tags: ["prompting"],
          draft: true
        }),
        article({ id: "unrelated", title: "Unrelated", publishedAt: "2026-05-03" })
      ],
      3
    );

    expect(related.map((entry) => entry.id)).toEqual([
      "tag-match-a/index",
      "tag-match-b/index",
      "subject-only/index"
    ]);
  });
});
