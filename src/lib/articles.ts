import type { CollectionEntry } from "astro:content";
import { articleSlugFromId, articleUrlFromSlug } from "./routes";

export type ArticleEntry = CollectionEntry<"articles">;

export function getArticleSlug(article: Pick<ArticleEntry, "id">) {
  return articleSlugFromId(article.id);
}

export function getArticleUrl(article: Pick<ArticleEntry, "id">) {
  return articleUrlFromSlug(getArticleSlug(article));
}

export function getPublicArticles(articles: ArticleEntry[]) {
  return articles
    .filter((article) => !article.data.draft)
    .sort((left, right) => {
      const dateDiff = right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
      return dateDiff || left.data.title.localeCompare(right.data.title);
    });
}

export function formatArticleDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
