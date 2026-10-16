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

  it("defines GitHub checks and Pages deployment", () => {
    const workflow = readFileSync(join(root, ".github/workflows/pages.yml"), "utf8");

    expect(workflow).toContain("npm run ci");
    expect(workflow).toContain("GITHUB_PAGES=true npm run build");
    expect(workflow).toContain("actions/configure-pages@v6");
    expect(workflow).toContain("actions/upload-pages-artifact@v5");
    expect(workflow).toContain("actions/deploy-pages@v5");
    expect(workflow).toContain("pages: write");
    expect(workflow).toContain("id-token: write");
  });

  it("checks pull requests but deploys only pushes to master", () => {
    const workflow = readFileSync(join(root, ".github/workflows/pages.yml"), "utf8");

    expect(workflow).toContain("pull_request:");
    expect(workflow).toContain("push:");
    expect(workflow).toContain("branches: [master]");
    expect(workflow).toContain("github.event_name == 'push'");
    expect(workflow).not.toContain("secrets.");
  });

  it("configures Astro for the repository GitHub Pages URL", () => {
    const config = readFileSync(join(root, "astro.config.mjs"), "utf8");

    expect(config).toContain('site: "https://drystan-furor.github.io"');
    expect(config).toContain("base: repositoryBase");
    expect(config).toContain('repositoryBase = isGitHubPagesBuild ? "/blog-framework" : "/"');
  });
});
