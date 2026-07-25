import { describe, expect, it } from "vitest";
import {
  DEFAULT_PAGE_SIZE,
  getPageSize,
  getTotalPages,
  paginateItems
} from "../../src/lib/pagination";

describe("pagination", () => {
  const items = Array.from({ length: 25 }, (_, index) => `article-${index + 1}`);

  it("uses a 12 item desktop page for a 4 by 3 grid", () => {
    expect(DEFAULT_PAGE_SIZE).toBe(12);
    expect(getPageSize("desktop")).toBe(12);
  });

  it("captures the Sprint 1 responsive page-size assumptions", () => {
    expect(getPageSize("tablet")).toBe(12);
    expect(getPageSize("mobile-portrait")).toBe(18);
    expect(getPageSize("mobile-landscape")).toBe(18);
  });

  it("calculates page counts and slices", () => {
    expect(getTotalPages(items.length, 12)).toBe(3);
    expect(paginateItems(items, 1, 12).items).toEqual(items.slice(0, 12));
    expect(paginateItems(items, 3, 12).items).toEqual(items.slice(24, 25));
  });

  it("returns static previous and next page metadata", () => {
    expect(paginateItems(items, 2, 12)).toMatchObject({
      page: 2,
      totalPages: 3,
      hasPrevious: true,
      hasNext: true,
      previousPage: 1,
      nextPage: 3
    });
  });

  it("fails clearly when a requested page is outside the available range", () => {
    expect(() => paginateItems(items, 0, 12)).toThrow(RangeError);
    expect(() => paginateItems(items, 4, 12)).toThrow(RangeError);
  });
});
