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
      "docs",
      ".github/workflows"
    ];

    expect(requiredPaths.filter((path) => !existsSync(join(root, path)))).toEqual([]);
  });

  it("defines the expected npm scripts", () => {
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
});
