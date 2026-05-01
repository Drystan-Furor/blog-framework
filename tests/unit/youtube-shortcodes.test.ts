import { describe, expect, it } from "vitest";
import {
  createYouTubeEmbedHtml,
  replaceHugoYouTubeShortcodeParagraphs
} from "../../src/lib/youtube-shortcodes.mjs";

describe("Hugo YouTube shortcode rendering", () => {
  it("creates a privacy-enhanced responsive YouTube embed", () => {
    expect(createYouTubeEmbedHtml("gyUHCCCOqX8")).toContain(
      'src="https://www.youtube-nocookie.com/embed/gyUHCCCOqX8"'
    );
    expect(createYouTubeEmbedHtml("gyUHCCCOqX8")).toContain('class="youtube-embed"');
    expect(createYouTubeEmbedHtml("gyUHCCCOqX8")).toContain('loading="lazy"');
  });

  it("replaces standalone Hugo YouTube shortcode paragraphs with embed HTML nodes", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "{{< youtube gyUHCCCOqX8 >}}" }]
        },
        {
          type: "paragraph",
          children: [{ type: "text", value: "Keep normal text." }]
        }
      ]
    };

    replaceHugoYouTubeShortcodeParagraphs(tree);

    expect(tree.children[0]).toMatchObject({
      type: "html",
      value: expect.stringContaining("youtube-nocookie.com/embed/gyUHCCCOqX8")
    });
    expect(tree.children[1]).toMatchObject({
      type: "paragraph",
      children: [{ type: "text", value: "Keep normal text." }]
    });
  });

  it("rejects unsafe video identifiers", () => {
    expect(() => createYouTubeEmbedHtml('bad" id')).toThrow("Invalid YouTube video id");
  });
});
