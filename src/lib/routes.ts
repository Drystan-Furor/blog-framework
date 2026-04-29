export type RouteEntry = {
  id: string;
};

export function articleSlugFromId(id: string) {
  return id.replace(/\.md$/, "").replace(/\/index$/, "");
}

export function articleUrlFromSlug(slug: string) {
  return `/articles/${slug}/`;
}

export function createArticleRoutes<TEntry extends RouteEntry>(articles: TEntry[]) {
  return articles.map((article) => ({
    params: { slug: articleSlugFromId(article.id) },
    props: { article }
  }));
}
