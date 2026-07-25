import { getArticleSlug, getArticleUrl, getPublicArticles, type ArticleRecord } from "./articles";

export type SearchDocument = {
  slug: string;
  url: string;
  title: string;
  summary: string;
  subject: string;
  tags: string[];
  publishedAt: string;
  body: string;
};

export type SearchResult = SearchDocument & {
  score: number;
};

export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function createSearchDocuments<TArticle extends ArticleRecord>(articles: TArticle[]) {
  return getPublicArticles(articles).map((article) => ({
    slug: getArticleSlug(article),
    url: getArticleUrl(article),
    title: article.data.title,
    summary: article.data.summary,
    subject: article.data.subject,
    tags: article.data.tags ?? [],
    publishedAt: article.data.publishedAt.toISOString().slice(0, 10),
    body: stripMarkdown(article.body ?? "")
  }));
}

function includesTerm(value: string, term: string) {
  return value.toLocaleLowerCase().includes(term);
}

function scoreDocument(document: SearchDocument, terms: string[]) {
  return terms.reduce((score, term) => {
    let termScore = 0;

    if (includesTerm(document.title, term)) termScore += 100;
    if (document.tags.some((tag) => includesTerm(tag, term))) termScore += 70;
    if (includesTerm(document.subject, term)) termScore += 50;
    if (includesTerm(document.summary, term)) termScore += 25;
    if (includesTerm(document.body, term)) termScore += 10;

    return termScore === 0 ? 0 : score + termScore;
  }, 0);
}

export function normalizeSearchQuery(query: string) {
  return query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
}

export function searchDocuments(documents: SearchDocument[], query: string): SearchResult[] {
  const terms = normalizeSearchQuery(query);
  if (terms.length === 0) return [];

  return documents
    .map((document) => ({
      ...document,
      score: scoreDocument(document, terms)
    }))
    .filter((document) => document.score > 0)
    .sort((left, right) => {
      const scoreDiff = right.score - left.score;
      const dateDiff = right.publishedAt.localeCompare(left.publishedAt);
      return scoreDiff || dateDiff || left.title.localeCompare(right.title);
    });
}
