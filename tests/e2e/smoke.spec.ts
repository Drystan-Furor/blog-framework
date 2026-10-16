import { expect, test, type Page } from "@playwright/test";

type ArticleReference = { href: string; title: string };

async function articleReferences(page: Page): Promise<ArticleReference[]> {
  await page.goto("/");
  const cards = page.getByTestId("article-card");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  const articles: ArticleReference[] = [];
  for (let index = 0; index < count; index += 1) {
    const card = cards.nth(index);
    const href = await card.getByTestId("article-card-link").getAttribute("href");
    const title = (await card.locator(".article-card__title").innerText()).trim();
    expect(href).toMatch(/^\/articles\/[^/]+\/$/);
    expect(title).not.toBe("");
    articles.push({ href: href!, title });
  }

  return articles;
}

async function firstArticle(page: Page) {
  return (await articleReferences(page))[0];
}

async function firstTaggedArticle(page: Page) {
  for (const article of await articleReferences(page)) {
    await page.goto(article.href);
    const tags = page.getByLabel("Article tags").getByRole("link");
    if ((await tags.count()) > 0) return { article, tag: tags.first() };
  }
  return null;
}

test.describe("@smoke static article catalogue", () => {
  test("home page renders article cards from collection data", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Yonify Artikel Catalogus" })).toBeVisible();

    const card = page.getByTestId("article-card").first();
    await expect(card).toBeVisible();
    await expect(card.locator(".article-card__title")).not.toHaveText("");
    await expect(card.locator(".article-card__summary")).not.toHaveText("");
    await expect(card.getByLabel("Article metadata")).toContainText("Subject:");

    const image = card.locator("img");
    await expect(image).toHaveAttribute("alt", /.+/);
    await expect(image).toHaveAttribute("width", /\d+/);
    await expect(image).toHaveAttribute("height", /\d+/);
  });

  test("article cards navigate to their generated article page", async ({ page }) => {
    const article = await firstArticle(page);
    await page.getByTestId("article-card-link").first().click();

    expect(new URL(page.url()).pathname).toBe(article.href);
    await expect(page.getByRole("heading", { level: 1, name: article.title })).toBeVisible();
    await expect(page.locator(".article-body")).not.toHaveText("");
    await expect(page.locator(".article-hero__meta")).toContainText("Subject:");
  });

  test("primary header stays sticky on index and article pages", async ({ page }) => {
    const article = await firstArticle(page);
    for (const path of ["/", article.href]) {
      await page.goto(path);
      const header = page.locator(".site-header");
      await expect(header).toHaveCSS("position", "sticky");
      await expect(header.getByRole("link", { name: "Artikelen" })).toBeVisible();
      await expect(header.getByRole("link", { name: "Zoek" })).toBeVisible();

      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForFunction(() => window.scrollY > 0);
      const position = await header.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return { bottom: box.bottom, top: box.top };
      });
      expect(position.top).toBeGreaterThanOrEqual(0);
      expect(position.top).toBeLessThanOrEqual(1);
      expect(position.bottom).toBeGreaterThan(0);
    }
  });

  test("article footer exposes generated adjacent navigation", async ({ page }) => {
    const articles = await articleReferences(page);
    await page.goto(articles[0].href);
    const navigation = page.getByRole("navigation", { name: "Adjacent articles" });
    await expect(navigation).toBeVisible();
    if (articles.length > 1) {
      await expect(navigation.getByRole("link")).toHaveCount(1);
      await expect(navigation.getByRole("link")).toHaveAttribute("href", /^\/articles\/[^/]+\/$/);
    }
  });

  test("search finds current collection entries and handles empty results", async ({ page }) => {
    const article = await firstArticle(page);
    await page.goto("/search/");
    const search = page.getByRole("searchbox", { name: "Search articles" });
    await search.fill(article.title);
    await expect(page.getByTestId("search-result").first()).toContainText(article.title);
    await search.fill("query-that-cannot-match-any-generated-article");
    await expect(page.getByTestId("search-empty")).toBeVisible();
  });

  test("tag links open generated taxonomy pages", async ({ page }) => {
    const tagged = await firstTaggedArticle(page);
    test.skip(!tagged, "No tagged public article is available");
    if (!tagged) return;

    const tag = (await tagged.tag.innerText()).trim();
    const href = await tagged.tag.getAttribute("href");
    await tagged.tag.click();
    expect(new URL(page.url()).pathname).toBe(href);
    await expect(page.getByRole("heading", { name: `Tag: ${tag}` })).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: tagged.article.title })
    ).toBeVisible();
  });

  test("article pages expose matching SEO metadata and structured data", async ({ page }) => {
    const article = await firstArticle(page);
    await page.goto(article.href);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe(`https://drystan-furor.github.io${article.href}`);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    const structuredData = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}"
    );
    expect(structuredData).toMatchObject({
      "@type": "Article",
      headline: article.title,
      url: canonical
    });
  });

  test("article images follow their scaling contracts", async ({ page }) => {
    const article = await firstArticle(page);
    await page.goto(article.href);

    const hero = page.locator(".article-hero__image");
    const heroStyle = await hero.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return {
        objectFit: window.getComputedStyle(element).objectFit,
        renderedRatio: box.width / box.height
      };
    });
    expect(heroStyle.objectFit).toBe("cover");
    expect(Math.abs(heroStyle.renderedRatio - 16 / 9)).toBeLessThan(0.01);

    const images = page.locator(".article-body img");
    const count = await images.count();

    for (let index = 0; index < count; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      const dimensions = await image.evaluate(async (element: HTMLImageElement) => {
        if (!element.complete) {
          await new Promise<void>((resolve) => {
            element.addEventListener("load", () => resolve(), { once: true });
          });
        }
        const box = element.getBoundingClientRect();
        return {
          naturalRatio: element.naturalWidth / element.naturalHeight,
          renderedRatio: box.width / box.height,
          renderedWidth: box.width
        };
      });
      expect(dimensions.renderedWidth).toBeGreaterThan(0);
      expect(Math.abs(dimensions.renderedRatio - dimensions.naturalRatio)).toBeLessThan(0.01);
    }
  });

  test("card and hero images expose stable loading metadata", async ({ page }) => {
    const article = await firstArticle(page);
    const cardImage = page.getByTestId("article-card").first().locator("img");
    await expect(cardImage).toHaveAttribute("alt", /.+/);
    await expect(cardImage).toHaveAttribute("loading", "lazy");
    await expect(cardImage).toHaveAttribute("decoding", "async");
    await expect(cardImage).toHaveAttribute("width", /\d+/);
    await expect(cardImage).toHaveAttribute("height", /\d+/);

    await page.goto(article.href);
    const heroImage = page.locator(".article-hero__image");
    await expect(heroImage).toHaveAttribute("alt", /.+/);
    await expect(heroImage).toHaveAttribute("loading", "eager");
    await expect(heroImage).toHaveAttribute("fetchpriority", "high");
    await expect(heroImage).toHaveAttribute("width", /\d+/);
    await expect(heroImage).toHaveAttribute("height", /\d+/);
  });

  test("keyboard navigation exposes shared navigation controls", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Yonify Artikel catalogus" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Artikelen" }).first()).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Zoek" }).first()).toBeFocused();

    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    await page.goto("/search/");
    for (let index = 0; index < 5; index += 1) await page.keyboard.press("Tab");
    await expect(page.getByRole("searchbox", { name: "Search articles" })).toBeFocused();
  });

  test("article reading works without client JavaScript", async ({ browser, baseURL, page }) => {
    const article = await firstArticle(page);
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
    const noScriptPage = await context.newPage();
    try {
      await noScriptPage.goto(article.href);
      await expect(
        noScriptPage.getByRole("heading", { level: 1, name: article.title })
      ).toBeVisible();
      await expect(noScriptPage.locator(".article-body")).not.toHaveText("");
      await expect(noScriptPage.getByRole("link", { name: "Artikelen" }).first()).toBeVisible();
    } finally {
      await context.close();
    }
  });

  test("article body stays centered on desktop and aligned on mobile", async ({ page }) => {
    const article = await firstArticle(page);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(article.href);
    const desktop = await page.evaluate(() => {
      const section = document.querySelector(".article-page")?.getBoundingClientRect();
      const hero = document.querySelector(".article-hero")?.getBoundingClientRect();
      const body = document.querySelector(".article-body")?.getBoundingClientRect();
      if (!section || !hero || !body) throw new Error("Article layout elements are missing");
      return {
        viewportCenter: window.innerWidth / 2,
        pageCenter: section.left + section.width / 2,
        bodyCenter: body.left + body.width / 2,
        bodyTop: body.top,
        heroBottom: hero.bottom
      };
    });
    expect(Math.abs(desktop.bodyCenter - desktop.viewportCenter)).toBeLessThanOrEqual(8);
    expect(Math.abs(desktop.bodyCenter - desktop.pageCenter)).toBeLessThanOrEqual(8);
    expect(desktop.bodyTop).toBeGreaterThan(desktop.heroBottom);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(article.href);
    const mobile = await page.evaluate(() => {
      const section = document.querySelector(".article-page")?.getBoundingClientRect();
      const body = document.querySelector(".article-body")?.getBoundingClientRect();
      if (!section || !body) throw new Error("Article layout elements are missing");
      return {
        pageLeft: section.left,
        pageRight: section.right,
        bodyLeft: body.left,
        bodyRight: body.right
      };
    });
    expect(Math.abs(mobile.bodyLeft - mobile.pageLeft)).toBeLessThanOrEqual(1);
    expect(Math.abs(mobile.bodyRight - mobile.pageRight)).toBeLessThanOrEqual(1);
  });

  test("static 404 page keeps themed recovery links", async ({ page }) => {
    const response = await page.goto("/not-a-real-article/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse articles" })).toHaveAttribute(
      "href",
      "/articles/"
    );
    await expect(page.getByRole("link", { name: "Search catalogue" })).toHaveAttribute(
      "href",
      "/search/"
    );
    await expect(page.locator("html")).toHaveCSS("background-color", /rgb/);
  });

  test("responsive article grids avoid horizontal overflow", async ({ page }) => {
    for (const viewport of [
      { width: 1280, height: 900 },
      { width: 820, height: 1180 },
      { width: 390, height: 844 },
      { width: 844, height: 390 }
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await expect(page.getByTestId("article-grid")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }
  });

  test("index and article pages expose shared theme tokens", async ({ page }) => {
    const article = await firstArticle(page);
    for (const path of ["/", article.href]) {
      await page.goto(path);
      const token = await page
        .locator("html")
        .evaluate((element) =>
          window.getComputedStyle(element).getPropertyValue("--color-background").trim()
        );
      expect(token).not.toBe("");
    }
  });
});
