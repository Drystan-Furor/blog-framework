import { expect, test } from "@playwright/test";

test.describe("@smoke static article catalogue", () => {
  test("home page shows public article cards", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Shared Article Catalogue" })).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Hello World Shared Article" })
    ).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Prompt Design" })
    ).toBeVisible();
    await expect(
      page
        .getByTestId("article-card")
        .filter({ hasText: "Hello World Shared Article" })
        .getByAltText("Layered article pages on a reading desk.")
    ).toBeVisible();
  });

  test("article card navigates to the static article page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByTestId("article-card")
      .filter({ hasText: "Hello World Shared Article" })
      .click();

    await expect(page).toHaveURL(/\/articles\/hello-world\/$/);
    await expect(page.getByRole("heading", { name: "Hello World Shared Article" })).toBeVisible();
    await expect(page.getByText("This article proves the Markdown folder pipeline.")).toBeVisible();
    await expect(page.getByText("Subject: Starter")).toBeVisible();
  });

  test("article footer links to adjacent and related articles", async ({ page }) => {
    await page.goto("/articles/test-2/");

    await expect(page.getByRole("navigation", { name: "Adjacent articles" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Newer: Prompt Design/ })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Older: Hello World Shared Article/ })
    ).toBeVisible();
    await expect(page.getByRole("region", { name: "Related articles" })).toContainText(
      "Hello World Shared Article"
    );
  });

  test("search page ranks title matches and handles empty results", async ({ page }) => {
    await page.goto("/search/");

    const search = page.getByRole("searchbox", { name: "Search articles" });
    await search.fill("Prompt Design");
    await expect(page.getByTestId("search-result").first()).toContainText("Prompt Design");

    await search.fill("not-in-the-catalogue");
    await expect(page.getByTestId("search-empty")).toBeVisible();
  });

  test("tag pages list matching public articles", async ({ page }) => {
    await page.goto("/articles/prompt-design/");
    await page.getByLabel("Article tags").getByRole("link", { name: "prompting" }).click();

    await expect(page).toHaveURL(/\/tags\/prompting\/$/);
    await expect(page.getByRole("heading", { name: "Tag: prompting" })).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Prompt Design" })
    ).toBeVisible();
  });

  test("article pages expose SEO metadata and structured data", async ({ page }) => {
    await page.goto("/articles/hello-world/");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://drystan-furor.github.io/articles/hello-world/"
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(structuredData).toContain("Hello World Shared Article");
  });

  test("schermtijd article images keep their aspect ratio when scaled", async ({ page }) => {
    await page.goto("/articles/schermtijd-en-gezin/");

    for (const alt of ["img_1.png", "img_4.png"]) {
      const image = page.getByAltText(alt);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();

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

  test("article card and hero images expose stable loading metadata", async ({ page }) => {
    await page.goto("/");

    const cardImage = page
      .getByTestId("article-card")
      .filter({ hasText: "Hello World Shared Article" })
      .locator("img");

    await expect(cardImage).toHaveAttribute("alt", "Layered article pages on a reading desk.");
    await expect(cardImage).toHaveAttribute("loading", "lazy");
    await expect(cardImage).toHaveAttribute("decoding", "async");
    await expect(cardImage).toHaveAttribute("width", /\d+/);
    await expect(cardImage).toHaveAttribute("height", /\d+/);

    await page.goto("/articles/hello-world/");
    const heroImage = page.getByAltText("Layered article pages on a reading desk.");

    await expect(heroImage).toHaveAttribute("loading", "eager");
    await expect(heroImage).toHaveAttribute("fetchpriority", "high");
    await expect(heroImage).toHaveAttribute("width", /\d+/);
    await expect(heroImage).toHaveAttribute("height", /\d+/);
  });

  test("keyboard navigation exposes skip link, primary nav, search, and footer links", async ({
    page
  }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Shared Article Catalogue" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Articles" }).first()).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Search" }).first()).toBeFocused();

    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    await page.goto("/search/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("searchbox", { name: "Search articles" })).toBeFocused();
  });

  test("article reading and footer navigation work without client JavaScript", async ({
    browser,
    baseURL
  }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
    const noScriptPage = await context.newPage();

    try {
      await noScriptPage.goto("/articles/test-2/");
      await expect(noScriptPage.getByRole("heading", { name: "Test 2" })).toBeVisible();
      await expect(
        noScriptPage.getByRole("link", { name: /Older: Hello World Shared Article/ })
      ).toBeVisible();
      await expect(noScriptPage.getByRole("link", { name: "Articles" }).first()).toBeVisible();
    } finally {
      await context.close();
    }
  });

  test("article body is centered on desktop without changing mobile column behavior", async ({
    page
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/articles/prompt-design/");

    const desktopLayout = await page.evaluate(() => {
      const pageSection = document.querySelector(".article-page")?.getBoundingClientRect();
      const hero = document.querySelector(".article-hero")?.getBoundingClientRect();
      const body = document.querySelector(".article-body")?.getBoundingClientRect();
      if (!pageSection || !hero || !body) throw new Error("Article layout elements are missing");

      return {
        viewportCenter: window.innerWidth / 2,
        pageCenter: pageSection.left + pageSection.width / 2,
        bodyCenter: body.left + body.width / 2,
        bodyTop: body.top,
        heroBottom: hero.bottom
      };
    });

    expect(Math.abs(desktopLayout.bodyCenter - desktopLayout.viewportCenter)).toBeLessThanOrEqual(
      8
    );
    expect(Math.abs(desktopLayout.bodyCenter - desktopLayout.pageCenter)).toBeLessThanOrEqual(8);
    expect(desktopLayout.bodyTop).toBeGreaterThan(desktopLayout.heroBottom);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/articles/prompt-design/");

    const mobileLayout = await page.evaluate(() => {
      const pageSection = document.querySelector(".article-page")?.getBoundingClientRect();
      const hero = document.querySelector(".article-hero")?.getBoundingClientRect();
      const body = document.querySelector(".article-body")?.getBoundingClientRect();
      if (!pageSection || !hero || !body) throw new Error("Article layout elements are missing");

      return {
        pageLeft: pageSection.left,
        pageRight: pageSection.right,
        bodyLeft: body.left,
        bodyRight: body.right,
        bodyTop: body.top,
        heroBottom: hero.bottom
      };
    });

    expect(Math.abs(mobileLayout.bodyLeft - mobileLayout.pageLeft)).toBeLessThanOrEqual(1);
    expect(Math.abs(mobileLayout.bodyRight - mobileLayout.pageRight)).toBeLessThanOrEqual(1);
    expect(mobileLayout.bodyTop).toBeGreaterThan(mobileLayout.heroBottom);
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

  test("responsive grids render without critical horizontal overflow", async ({ page }) => {
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
    for (const path of ["/", "/articles/hello-world/", "/articles/prompt-design/"]) {
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
