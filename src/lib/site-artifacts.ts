import { getArticlePath, getPublicArticles, type ArticleRecord } from "./articles";
import { DEFAULT_PAGE_SIZE, getTotalPages } from "./pagination";
import { absoluteUrl, SITE_DESCRIPTION, SITE_TITLE } from "./site";
import { getSubjectGroups, getTagGroups, subjectPathFromSlug, tagPathFromSlug } from "./taxonomy";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function publicPaths(articles: ArticleRecord[]) {
  const publicArticles = getPublicArticles(articles);
  const totalArticlePages = getTotalPages(publicArticles.length, DEFAULT_PAGE_SIZE);
  const paginatedArticlePaths = Array.from(
    { length: Math.max(0, totalArticlePages - 1) },
    (_, index) => {
      const pageNumber = index + 2;
      return `/articles/page/${pageNumber}/` as const;
    }
  );

  return [
    "/" as const,
    "/articles/" as const,
    "/search/" as const,
    ...paginatedArticlePaths,
    ...publicArticles.map((article) => getArticlePath(article)),
    ...getTagGroups(publicArticles).map((group) => tagPathFromSlug(group.slug)),
    ...getSubjectGroups(publicArticles).map((group) => subjectPathFromSlug(group.slug))
  ];
}

export function createSitemapXml({
  articles,
  baseUrl = import.meta.env.BASE_URL
}: {
  articles: ArticleRecord[];
  baseUrl?: string;
}) {
  const urls = publicPaths(articles)
    .map((path) => `  <url><loc>${escapeXml(absoluteUrl(path, baseUrl))}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function createRssXml({
  articles,
  baseUrl = import.meta.env.BASE_URL,
  limit = 20
}: {
  articles: ArticleRecord[];
  baseUrl?: string;
  limit?: number;
}) {
  const items = getPublicArticles(articles)
    .slice(0, limit)
    .map((article) => {
      const link = absoluteUrl(getArticlePath(article), baseUrl);
      return [
        "    <item>",
        `      <title>${escapeXml(article.data.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <description>${escapeXml(article.data.summary)}</description>`,
        `      <pubDate>${article.data.publishedAt.toUTCString()}</pubDate>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        "    </item>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${escapeXml(absoluteUrl("/", baseUrl))}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    items,
    "  </channel>",
    "</rss>",
    ""
  ].join("\n");
}
