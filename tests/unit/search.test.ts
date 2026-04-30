import { describe, expect, it } from "vitest";
import { createSearchDocuments, searchDocuments, stripMarkdown } from "../../src/lib/search";

function article(overrides: {
  id: string;
  title: string;
  summary?: string;
  subject?: string;
  tags?: string[];
  body?: string;
  draft?: boolean;
}) {
  return {
    id: `${overrides.id}/index`,
    body: overrides.body ?? `${overrides.title} **body**`,
    data: {
      title: overrides.title,
      subtitle: "",
      summary: overrides.summary ?? `${overrides.title} summary`,
      subject: overrides.subject ?? "General",
      publishedAt: new Date("2026-04-30"),
      image: "./image.svg",
      tags: overrides.tags ?? [],
      sourceUrl: "https://example.com",
      sharedBy: "wife",
      draft: overrides.draft ?? false
    }
  };
}

describe("static search", () => {
  it("normalizes markdown body text for indexing", () => {
    expect(stripMarkdown("## Title\nRead [this](https://example.com) and `code`.")).toBe(
      "Title Read this and code."
    );
  });

  it("creates public article search documents", () => {
    const documents = createSearchDocuments([
      article({
        id: "prompt-design",
        title: "Prompt Design",
        subject: "Prompting",
        tags: ["design"],
        body: "Prompt **body**"
      }),
      article({ id: "draft", title: "Draft", draft: true })
    ]);

    expect(documents).toEqual([
      expect.objectContaining({
        slug: "prompt-design",
        url: "/articles/prompt-design/",
        title: "Prompt Design",
        subject: "Prompting",
        tags: ["design"],
        body: "Prompt body"
      })
    ]);
  });

  it("ranks title matches above tags, subject, summary, and body matches", () => {
    const documents = createSearchDocuments([
      article({ id: "title", title: "Search Needle" }),
      article({ id: "tag", title: "Tag Match", tags: ["needle"] }),
      article({ id: "subject", title: "Subject Match", subject: "Needle" }),
      article({ id: "summary", title: "Summary Match", summary: "Needle appears here" }),
      article({ id: "body", title: "Body Match", body: "Needle appears here" })
    ]);

    expect(searchDocuments(documents, "needle").map((document) => document.slug)).toEqual([
      "title",
      "tag",
      "subject",
      "summary",
      "body"
    ]);
    expect(searchDocuments(documents, "missing")).toEqual([]);
  });
});
