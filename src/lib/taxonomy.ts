import { getPublicArticles, type ArticleRecord } from "./articles";
import { pathWithBase } from "./routes";

export type TaxonomyGroup<TArticle extends ArticleRecord = ArticleRecord> = {
  label: string;
  slug: string;
  articles: TArticle[];
};

export function slugifyTaxonomyValue(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function groupByValue<TArticle extends ArticleRecord>(
  articles: TArticle[],
  getValues: (article: TArticle) => string[]
) {
  const groups = new Map<string, TaxonomyGroup<TArticle>>();

  for (const article of getPublicArticles(articles)) {
    for (const value of getValues(article)) {
      const label = value.trim();
      const slug = slugifyTaxonomyValue(label);

      if (!label || !slug) continue;

      const existing = groups.get(slug);
      if (existing) {
        existing.articles.push(article);
      } else {
        groups.set(slug, { label, slug, articles: [article] });
      }
    }
  }

  return [...groups.values()].sort((left, right) => left.label.localeCompare(right.label));
}

export function getTagGroups<TArticle extends ArticleRecord>(articles: TArticle[]) {
  return groupByValue(articles, (article) => article.data.tags ?? []);
}

export function getSubjectGroups<TArticle extends ArticleRecord>(articles: TArticle[]) {
  return groupByValue(articles, (article) => [article.data.subject]);
}

export function tagPathFromSlug(slug: string): `/tags/${string}/` {
  return `/tags/${slug}/`;
}

export function subjectPathFromSlug(slug: string): `/subjects/${string}/` {
  return `/subjects/${slug}/`;
}

export function tagUrlFromSlug(slug: string, baseUrl = import.meta.env.BASE_URL) {
  return pathWithBase(tagPathFromSlug(slug), baseUrl);
}

export function subjectUrlFromSlug(slug: string, baseUrl = import.meta.env.BASE_URL) {
  return pathWithBase(subjectPathFromSlug(slug), baseUrl);
}
