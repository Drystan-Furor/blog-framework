import { formatArticleDate, getArticleUrl, type ArticleRecord } from "./articles";
import type { PaginationPage } from "./pagination";
import { pathWithBase } from "./routes";
import { searchDocuments, type SearchDocument, type SearchResult } from "./search";

export type ArticleCardView = {
  title: string;
  summary: string;
  subject: string;
  tags: string[];
  publishedDate: string;
  href: string;
  image: {
    path: string;
    alt: string;
  } | null;
};

export function createArticleCardView(article: ArticleRecord): ArticleCardView {
  return {
    title: article.data.title,
    summary: article.data.summary,
    subject: article.data.subject,
    tags: article.data.tags ?? [],
    publishedDate: formatArticleDate(article.data.publishedAt),
    href: getArticleUrl(article),
    image: article.data.image
      ? {
          path: article.data.image,
          alt: article.data.imageAlt
        }
      : null
  };
}

function pageHref(pageNumber: number, basePath: `/${string}`) {
  return pathWithBase(pageNumber === 1 ? `${basePath}/` : `${basePath}/page/${pageNumber}/`);
}

export function createPaginationView(
  page: PaginationPage<unknown>,
  basePath: `/${string}` = "/articles"
) {
  return {
    label: `Page ${page.page} of ${page.totalPages}`,
    previous: page.hasPrevious
      ? {
          label: "Previous",
          href: pageHref(page.previousPage ?? 1, basePath)
        }
      : null,
    next: page.hasNext
      ? {
          label: "Next",
          href: pageHref(page.nextPage ?? page.totalPages, basePath)
        }
      : null
  };
}

export type SearchUiState = {
  status: string;
  results: SearchResult[];
  empty: boolean;
  error: boolean;
};

export function createSearchUiState({
  query,
  documents,
  loading = false,
  error = false
}: {
  query: string;
  documents: SearchDocument[];
  loading?: boolean;
  error?: boolean;
}): SearchUiState {
  if (error) {
    return {
      status: "Search is temporarily unavailable.",
      results: [],
      empty: false,
      error: true
    };
  }

  if (loading) {
    return {
      status: "Loading search index.",
      results: [],
      empty: false,
      error: false
    };
  }

  const results = searchDocuments(documents, query);
  const hasQuery = query.trim().length > 0;

  return {
    status: hasQuery ? "" : "Type to search saved articles.",
    results,
    empty: hasQuery && results.length === 0,
    error: false
  };
}
