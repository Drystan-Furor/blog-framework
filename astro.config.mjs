import { defineConfig } from "astro/config";
import hugoYouTubeShortcodes from "./src/lib/youtube-shortcodes.mjs";

const isCodebergPagesBuild = process.env.CODEBERG_PAGES === "true";
const repositoryBase = isCodebergPagesBuild ? "/blog-framework" : "/";

export default defineConfig({
  site: "https://drystan-furor.codeberg.page",
  base: repositoryBase,
  output: "static",
  markdown: {
    remarkPlugins: [hugoYouTubeShortcodes]
  }
});
