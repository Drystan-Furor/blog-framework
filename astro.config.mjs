import { defineConfig } from "astro/config";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: "https://drystan-furor.github.io",
  base: isGitHubPagesBuild ? "/blog-framework" : "/",
  output: "static"
});
