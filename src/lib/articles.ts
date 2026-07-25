import type { CollectionEntry } from "astro:content";
import { articlePathFromSlug, articleSlugFromId, articleUrlFromSlug } from "./routes";

export type ArticleEntry = CollectionEntry<"articles">;

export type ArticleRecord = {
  id: string;
  body?: string;
  data: {
    title: string;
    subtitle?: string;
    summary: string;
    subject: string;
    publishedAt: Date;
    image: string;
    imageAlt: string;
    tags?: string[];
    sourceUrl?: string;
    sharedBy?: string;
    sharedAt?: Date;
    draft?: boolean;
  };
};

export function getArticleSlug(article: Pick<ArticleRecord, "id">) {
  return articleSlugFromId(article.id);
}

export function getArticlePath(article: Pick<ArticleRecord, "id">) {
  return articlePathFromSlug(getArticleSlug(article));
}

export function getArticleUrl(article: Pick<ArticleRecord, "id">) {
  return articleUrlFromSlug(getArticleSlug(article));
}

export function compareArticlesByPublicOrder(left: ArticleRecord, right: ArticleRecord) {
  const dateDiff = right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
  const titleDiff = left.data.title.localeCompare(right.data.title);
  const slugDiff = getArticleSlug(left).localeCompare(getArticleSlug(right));

  return dateDiff || titleDiff || slugDiff;
}

export function getPublicArticles<TArticle extends ArticleRecord>(articles: TArticle[]) {
  return articles.filter((article) => !article.data.draft).sort(compareArticlesByPublicOrder);
}

export function getAdjacentArticles<TArticle extends ArticleRecord>(
  articles: TArticle[],
  currentArticle: Pick<TArticle, "id">
) {
  const publicArticles = getPublicArticles(articles);
  const currentSlug = getArticleSlug(currentArticle);
  const currentIndex = publicArticles.findIndex(
    (article) => getArticleSlug(article) === currentSlug
  );

  return {
    previous: currentIndex > 0 ? publicArticles[currentIndex - 1] : undefined,
    next:
      currentIndex >= 0 && currentIndex < publicArticles.length - 1
        ? publicArticles[currentIndex + 1]
        : undefined
  };
}

function normalizedTags(article: ArticleRecord) {
  return new Set((article.data.tags ?? []).map((tag) => tag.toLocaleLowerCase()));
}

export function getRelatedArticles<TArticle extends ArticleRecord>(
  currentArticle: TArticle,
  articles: TArticle[],
  limit = 3
) {
  const currentSlug = getArticleSlug(currentArticle);
  const currentTags = normalizedTags(currentArticle);
  const currentSubject = currentArticle.data.subject.toLocaleLowerCase();

  return getPublicArticles(articles)
    .filter((article) => getArticleSlug(article) !== currentSlug)
    .map((article) => {
      const tagOverlap = [...normalizedTags(article)].filter((tag) => currentTags.has(tag)).length;
      const subjectScore = article.data.subject.toLocaleLowerCase() === currentSubject ? 1 : 0;

      return {
        article,
        score: tagOverlap * 10 + subjectScore * 3
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => {
      const scoreDiff = right.score - left.score;
      return scoreDiff || compareArticlesByPublicOrder(left.article, right.article);
    })
    .slice(0, limit)
    .map((candidate) => candidate.article);
}

export function formatArticleDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
