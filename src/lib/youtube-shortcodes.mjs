const YOUTUBE_SHORTCODE_PATTERN = /^\s*\{\{<\s*youtube\s+([A-Za-z0-9_-]+)\s*>\}\}\s*$/;
const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{6,}$/;

export function createYouTubeEmbedHtml(videoId) {
  if (!YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) {
    throw new Error(`Invalid YouTube video id: ${videoId}`);
  }

  return `<div class="youtube-embed" data-youtube-id="${videoId}"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video ${videoId}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
}

function textValue(node) {
  if (!node || node.type !== "paragraph" || !Array.isArray(node.children)) return "";
  if (node.children.length !== 1 || node.children[0]?.type !== "text") return "";

  return node.children[0].value ?? "";
}

function replaceParagraph(node) {
  const shortcode = textValue(node);
  const match = shortcode.match(YOUTUBE_SHORTCODE_PATTERN);
  if (!match) return node;

  return {
    type: "html",
    value: createYouTubeEmbedHtml(match[1])
  };
}

export function replaceHugoYouTubeShortcodeParagraphs(node) {
  if (!node || !Array.isArray(node.children)) return;

  node.children = node.children.map((child) => {
    const replacement = replaceParagraph(child);
    replaceHugoYouTubeShortcodeParagraphs(replacement);
    return replacement;
  });
}

export default function hugoYouTubeShortcodes() {
  return (tree) => {
    replaceHugoYouTubeShortcodeParagraphs(tree);
  };
}
