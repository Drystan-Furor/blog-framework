import { defineConfig } from "astro/config";
import hugoYouTubeShortcodes from "./src/lib/youtube-shortcodes.mjs";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const repositoryBase = isGitHubPagesBuild ? "/blog-framework" : "/";

export default defineConfig({
  site: "https://drystan-furor.github.io",
  base: repositoryBase,
  output: "static",
  markdown: {
    remarkPlugins: [hugoYouTubeShortcodes]
  }
});
