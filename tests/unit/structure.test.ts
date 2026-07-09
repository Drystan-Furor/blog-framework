import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("project structure", () => {
  it("keeps the Sprint 1 starter folders in place", () => {
    const requiredPaths = [
      "src",
      "src/content/articles",
      "src/pages",
      "src/components",
      "src/layouts",
      "src/styles",
      "src/lib",
      "tests",
      "scripts",
      "docs"
    ];

    expect(requiredPaths.filter((path) => !existsSync(join(root, path)))).toEqual([]);
  });

  it("defines expected npm scripts", () => {
    const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const requiredScripts = [
      "dev",
      "check",
      "build",
      "preview",
      "test",
      "test:unit",
      "test:e2e",
      "test:e2e:smoke",
      "lint",
      "format:check",
      "ci",
      "new:article"
    ];

    expect(requiredScripts.filter((script) => !packageJson.scripts?.[script])).toEqual([]);
  });

  it("defines Woodpecker checks and Codeberg Pages deployment", () => {
    const workflow = readFileSync(join(root, ".woodpecker.yml"), "utf8");

    expect(workflow).toContain("npm run ci");
    expect(workflow).toContain("CODEBERG_PAGES=true npm run build");
    expect(workflow).toContain("from_secret: codeberg_username");
    expect(workflow).toContain("from_secret: codeberg_token");
    expect(workflow).toContain("HEAD:pages --force");
    expect(workflow).toContain("branch: master");
  });

  it("keeps deployment secrets out of pull request workflows", () => {
    const workflow = readFileSync(join(root, ".woodpecker.yml"), "utf8");

    expect(workflow).toContain("event: push");
    expect(workflow).not.toContain("event: pull_request");
  });

  it("configures Astro for the repository Codeberg Pages URL", () => {
    const config = readFileSync(join(root, "astro.config.mjs"), "utf8");

    expect(config).toContain('site: "https://drystan-furor.codeberg.page"');
    expect(config).toContain("base: repositoryBase");
    expect(config).toContain('repositoryBase = isCodebergPagesBuild ? "/blog-framework" : "/"');
  });
});
