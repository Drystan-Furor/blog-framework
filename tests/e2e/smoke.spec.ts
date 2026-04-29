import { expect, test } from "@playwright/test";

test.describe("@smoke static article catalogue", () => {
  test("home page shows the Hello World article card", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Shared Article Catalogue" })).toBeVisible();
    await expect(
      page.getByTestId("article-card").filter({ hasText: "Hello World Shared Article" })
    ).toBeVisible();
    await expect(
      page.getByAltText("Abstract reading desk for Hello World Shared Article")
    ).toBeVisible();
  });

  test("article card navigates to the static article page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("article-card-link").click();

    await expect(page).toHaveURL(/\/articles\/hello-world\/$/);
    await expect(page.getByRole("heading", { name: "Hello World Shared Article" })).toBeVisible();
    await expect(page.getByText("This article proves the Markdown folder pipeline.")).toBeVisible();
    await expect(page.getByText("Subject: Starter")).toBeVisible();
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
    for (const path of ["/", "/articles/hello-world/"]) {
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
