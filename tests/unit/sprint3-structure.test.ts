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
      "CODEBERG_PAGES=true npm run build",
      "npm run preview",
      "Codeberg Pages",
      "Duplicate Starter"
    ]) {
      expect(readme).toContain(phrase);
    }
  });

  it("documents branch protection and exact merge check names", () => {
    const docs = read("docs/merge-checks.md");
    const workflow = read(".woodpecker.yml");

    expect(workflow).toContain("npm run ci");
    expect(docs).toContain("Woodpecker / checks");
    expect(docs).toContain("deploy-codeberg-pages");
    expect(docs).toContain("master");
  });

  it("runs CI before publishing Codeberg Pages", () => {
    const workflow = read(".woodpecker.yml");
    const checkIndex = workflow.indexOf("npm run ci");
    const deployIndex = workflow.indexOf("deploy-codeberg-pages");
    const buildIndex = workflow.indexOf("CODEBERG_PAGES=true npm run build");

    expect(checkIndex).toBeGreaterThanOrEqual(0);
    expect(deployIndex).toBeGreaterThan(checkIndex);
    expect(buildIndex).toBeGreaterThan(deployIndex);
  });

  it("adds a static 404 route", () => {
    expect(existsSync(join(root, "src/pages/404.astro"))).toBe(true);
  });
});
