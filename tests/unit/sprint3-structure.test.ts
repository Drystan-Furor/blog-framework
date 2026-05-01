import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function read(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("Sprint 3 hardening structure", () => {
  it("runs format checks before lint and test work in CI", () => {
    const packageJson = JSON.parse(read("package.json"));
    const ci = packageJson.scripts?.ci ?? "";

    expect(packageJson.scripts?.["hooks:check"]).toBe("sh .husky/pre-commit");
    expect(ci.indexOf("npm run format:check")).toBeGreaterThanOrEqual(0);
    expect(ci.indexOf("npm run lint")).toBeGreaterThan(ci.indexOf("npm run format:check"));
  });

  it("documents and smoke-checks the optional local pre-commit hook", () => {
    const hook = read(".husky/pre-commit");

    expect(hook).toContain("npm run format:check");
    expect(hook).toContain("npm run lint");
  });

  it("provides onboarding for setup, content, quality gates, preview, deploy, and duplication", () => {
    const readme = read("README.md");

    for (const phrase of [
      "Node.js 22",
      "npm install",
      "npm run dev",
      "npm run new:article -- article-slug",
      "src/content/articles/<slug>/index.md",
      "npm run format:check",
      "npm run lint",
      "npm run test:unit",
      "npm run test:e2e:smoke",
      "npm run ci",
      "GITHUB_PAGES=true npm run build",
      "npm run preview",
      "GitHub Pages",
      "Duplicate the starter"
    ]) {
      expect(readme).toContain(phrase);
    }
  });

  it("documents branch protection and exact merge check names", () => {
    const docs = read("docs/merge-checks.md");
    const ciWorkflow = read(".github/workflows/ci.yml");

    expect(ciWorkflow).toContain("checks:");
    expect(docs).toContain("CI / checks");
    expect(docs).toContain("master");
    expect(docs).toContain("main");
    expect(docs).toContain("Deploy GitHub Pages");
  });

  it("installs Playwright browsers before CI smoke tests run in GitHub Actions", () => {
    const ciWorkflow = read(".github/workflows/ci.yml");
    const installDependenciesIndex = ciWorkflow.indexOf("npm ci");
    const installBrowsersIndex = ciWorkflow.indexOf("npx playwright install --with-deps chromium");
    const runChecksIndex = ciWorkflow.indexOf("npm run ci");

    expect(installDependenciesIndex).toBeGreaterThanOrEqual(0);
    expect(installBrowsersIndex).toBeGreaterThan(installDependenciesIndex);
    expect(runChecksIndex).toBeGreaterThan(installBrowsersIndex);
  });

  it("adds a static 404 route", () => {
    expect(existsSync(join(root, "src/pages/404.astro"))).toBe(true);
  });
});
