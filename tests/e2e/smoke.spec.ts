import { expect, test } from "@playwright/test";

test.describe("@smoke static article catalogue", () => {
  test("home page shows public article cards", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Yonify Artikel Catalogus" })).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Yoga Voor Stofwisseling" })
    ).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Schermtijd En Gezin" })
    ).toBeVisible();
    await expect(
      page
        .getByTestId("article-card")
        .filter({ hasText: "Yoga Voor Stofwisseling" })
        .getByAltText("afbeelding van een persoon die yoga doet.")
    ).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Yoga Voor Stofwisseling" })
    ).toContainText("Subject: Yoga");
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Yoga Voor Stofwisseling" })
    ).toContainText("Tags: yoga, gezondheid");
  });

  test("article card navigates to the static article page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("article-card").filter({ hasText: "Yoga Voor Stofwisseling" }).click();

    await expect(page).toHaveURL(/\/articles\/yoga-voor-stofwisseling\/$/);
    await expect(page.getByRole("heading", { name: "Yoga Voor Stofwisseling" })).toBeVisible();
    await expect(page.getByText("Stimuleren van de stofwisseling Yoga")).toBeVisible();
    await expect(page.getByText("Subject: Yoga")).toBeVisible();
  });

  test("article footer links to adjacent articles", async ({ page }) => {
    await page.goto("/articles/yoga-voor-stofwisseling/");

    await expect(page.getByRole("navigation", { name: "Adjacent articles" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Older: Volkoren Pannekoeken/ })).toBeVisible();
  });

  test("search page ranks title matches and handles empty results", async ({ page }) => {
    await page.goto("/search/");

    const search = page.getByRole("searchbox", { name: "Search articles" });
    await search.fill("Yoga");
    await expect(page.getByTestId("search-result").first()).toContainText("Yoga Basis");

    await search.fill("not-in-the-catalogue");
    await expect(page.getByTestId("search-empty")).toBeVisible();
  });

  test("tag pages list matching public articles", async ({ page }) => {
    await page.goto("/articles/yoga-voor-stofwisseling/");
    await page.getByLabel("Article tags").getByRole("link", { name: "yoga" }).click();

    await expect(page).toHaveURL(/\/tags\/yoga\/$/);
    await expect(page.getByRole("heading", { name: "Tag: yoga" })).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Yoga Voor Stofwisseling" })
    ).toBeVisible();
  });

  test("article pages expose SEO metadata and structured data", async ({ page }) => {
    await page.goto("/articles/yoga-voor-stofwisseling/");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://drystan-furor.github.io/articles/yoga-voor-stofwisseling/"
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(structuredData).toContain("Yoga Voor Stofwisseling");
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
      .filter({ hasText: "Yoga Voor Stofwisseling" })
      .locator("img");

    await expect(cardImage).toHaveAttribute("alt", "afbeelding van een persoon die yoga doet.");
    await expect(cardImage).toHaveAttribute("loading", "lazy");
    await expect(cardImage).toHaveAttribute("decoding", "async");
    await expect(cardImage).toHaveAttribute("width", /\d+/);
    await expect(cardImage).toHaveAttribute("height", /\d+/);

    await page.goto("/articles/yoga-voor-stofwisseling/");
    const heroImage = page.getByAltText("afbeelding van een persoon die yoga doet.");

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
      await noScriptPage.goto("/articles/yoga-voor-stofwisseling/");
      await expect(
        noScriptPage.getByRole("heading", { name: "Yoga Voor Stofwisseling" })
      ).toBeVisible();
      await expect(
        noScriptPage.getByRole("link", { name: /Older: Volkoren Pannekoeken/ })
      ).toBeVisible();
      await expect(noScriptPage.getByRole("link", { name: "Artikelen" }).first()).toBeVisible();
    } finally {
      await context.close();
    }
  });

  test("yoga article embeds Hugo YouTube shortcodes as videos", async ({ page }) => {
    await page.goto("/articles/yoga-voor-stofwisseling/");

    const videos = page.locator(".youtube-embed iframe");
    await expect(videos).toHaveCount(6);
    await expect(videos.first()).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/gyUHCCCOqX8"
    );
    await expect(videos.first()).toHaveAttribute("loading", "lazy");
    const firstVideoFrame = await page.locator(".youtube-embed").first().boundingBox();
    expect(firstVideoFrame?.width).toBeGreaterThan(300);
    expect(
      Math.abs((firstVideoFrame?.width ?? 0) / (firstVideoFrame?.height ?? 1) - 16 / 9)
    ).toBeLessThan(0.02);
    await expect(page.getByText("{{< youtube gyUHCCCOqX8 >}}")).toHaveCount(0);
  });

  test("article body is centered on desktop without changing mobile column behavior", async ({
    page
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/articles/yoga-voor-stofwisseling/");

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
    await page.goto("/articles/yoga-voor-stofwisseling/");

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

  test("recipe markdown tables render as styled cards", async ({ page }) => {
    for (const article of [
      {
        path: "/articles/glutenvrije-broodjes/",
        headers: ["INGREDIËNTEN", "Hoeveelheid"],
        minimumTables: 1
      },
      {
        path: "/articles/volkoren-pannekoeken/",
        headers: ["Maaltijd", "Bereidingstijd", "Aantal"],
        minimumTables: 3
      }
    ]) {
      await page.goto(article.path);

      const tables = page.locator(".article-body table");
      await expect(tables).toHaveCount(article.minimumTables);
      const firstTable = tables.first();
      await expect(firstTable).toBeVisible();

      for (const header of article.headers) {
        await expect(firstTable.getByRole("columnheader", { name: header })).toBeVisible();
      }

      const tableStyles = await firstTable.evaluate((table) => {
        const tableStyle = window.getComputedStyle(table);
        const header = table.querySelector("thead");
        const headerStyle = header ? window.getComputedStyle(header) : null;
        const tableBox = table.getBoundingClientRect();

        return {
          borderRadius: tableStyle.borderRadius,
          boxShadow: tableStyle.boxShadow,
          headerBackground: headerStyle?.backgroundImage ?? "",
          tableRight: tableBox.right,
          viewportWidth: window.innerWidth
        };
      });

      expect(tableStyles.borderRadius).not.toBe("0px");
      expect(tableStyles.boxShadow).not.toBe("none");
      expect(tableStyles.headerBackground).not.toBe("none");
      expect(tableStyles.tableRight).toBeLessThanOrEqual(tableStyles.viewportWidth + 1);
    }
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
    for (const path of [
      "/",
      "/articles/yoga-voor-stofwisseling/",
      "/articles/schermtijd-en-gezin/"
    ]) {
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
