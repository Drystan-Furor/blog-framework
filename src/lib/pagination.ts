export const DEFAULT_PAGE_SIZE = 12;

export type ViewportPageSize = "desktop" | "tablet" | "mobile-portrait" | "mobile-landscape";

const pageSizes: Record<ViewportPageSize, number> = {
  desktop: 12,
  tablet: 12,
  "mobile-portrait": 18,
  "mobile-landscape": 18
};

export type PaginationPage<TItem> = {
  items: TItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  previousPage: number | null;
  nextPage: number | null;
};

export function getPageSize(viewport: ViewportPageSize) {
  return pageSizes[viewport];
}

export function getTotalPages(totalItems: number, pageSize = DEFAULT_PAGE_SIZE) {
  if (pageSize < 1) {
    throw new RangeError("pageSize must be greater than zero");
  }

  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function paginateItems<TItem>(
  items: TItem[],
  page: number,
  pageSize = DEFAULT_PAGE_SIZE
): PaginationPage<TItem> {
  const totalPages = getTotalPages(items.length, pageSize);

  if (page < 1 || page > totalPages) {
    throw new RangeError(`page ${page} is outside the available range 1-${totalPages}`);
  }

  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return {
    items: pageItems,
    page,
    pageSize,
    totalItems: items.length,
    totalPages,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
  };
}
