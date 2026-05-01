import { describe, expect, it } from "vitest";
import { getSubjectGroups, getTagGroups, slugifyTaxonomyValue } from "../../src/lib/taxonomy";

function article(overrides: {
  id: string;
  title: string;
  subject?: string;
  tags?: string[];
  draft?: boolean;
}) {
  return {
    id: `${overrides.id}/index`,
    body: "",
    data: {
      title: overrides.title,
      subtitle: "",
      summary: `${overrides.title} summary`,
      subject: overrides.subject ?? "General",
      publishedAt: new Date("2026-04-30"),
      image: "./image.svg",
      imageAlt: "Article image alt text.",
      tags: overrides.tags ?? [],
      sourceUrl: "https://example.com",
      sharedBy: "wife",
      draft: overrides.draft ?? false
    }
  };
}

describe("taxonomy helpers", () => {
  it("normalizes taxonomy values into stable URL slugs", () => {
    expect(slugifyTaxonomyValue("Prompt Design")).toBe("prompt-design");
    expect(slugifyTaxonomyValue("AI & Reading")).toBe("ai-reading");
  });

  it("groups public articles by tag and subject while excluding drafts", () => {
    const articles = [
      article({
        id: "prompt-design",
        title: "Prompt Design",
        subject: "Prompting",
        tags: ["Prompt Design", "AI"]
      }),
      article({ id: "draft", title: "Draft", subject: "Prompting", tags: ["AI"], draft: true })
    ];

    expect(getTagGroups(articles)).toEqual([
      expect.objectContaining({
        label: "AI",
        slug: "ai",
        articles: [expect.objectContaining({ id: "prompt-design/index" })]
      }),
      expect.objectContaining({
        label: "Prompt Design",
        slug: "prompt-design",
        articles: [expect.objectContaining({ id: "prompt-design/index" })]
      })
    ]);
    expect(getSubjectGroups(articles)).toEqual([
      expect.objectContaining({
        label: "Prompting",
        slug: "prompting",
        articles: [expect.objectContaining({ id: "prompt-design/index" })]
      })
    ]);
  });
});
