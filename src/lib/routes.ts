export type RouteEntry = {
  id: string;
};

export function articleSlugFromId(id: string) {
  return id.replace(/\.md$/, "").replace(/\/index$/, "");
}

export function articlePathFromSlug(slug: string): `/articles/${string}/` {
  return `/articles/${slug}/`;
}

export function pathWithBase(path: `/${string}`, baseUrl = import.meta.env.BASE_URL) {
  const basePath = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");

  return `${basePath}${path}`;
}

export function articleUrlFromSlug(slug: string, baseUrl = import.meta.env.BASE_URL) {
  return pathWithBase(articlePathFromSlug(slug), baseUrl);
}

export function createArticleRoutes<TEntry extends RouteEntry>(articles: TEntry[]) {
  return articles.map((article) => ({
    params: { slug: articleSlugFromId(article.id) },
    props: { article }
  }));
}
