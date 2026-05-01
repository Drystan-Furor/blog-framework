import { defineConfig } from "astro/config";
import hugoYouTubeShortcodes from "./src/lib/youtube-shortcodes.mjs";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: "https://drystan-furor.github.io",
  base: isGitHubPagesBuild ? "/blog-framework" : "/",
  output: "static",
  markdown: {
    remarkPlugins: [hugoYouTubeShortcodes]
  }
});
