import type { ImageMetadata } from "astro";

type ArticleImageAsset = string | ImageMetadata;

export type ArticleImage = {
  src: string;
  width: number;
  height: number;
};

const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 800;

const articleImageAssets = import.meta.glob<ArticleImageAsset>(
  "/src/content/articles/**/*.{avif,webp,png,jpg,jpeg,svg}",
  {
    eager: true,
    import: "default"
  }
);

function toArticleImage(asset: ArticleImageAsset): ArticleImage {
  if (typeof asset === "string") {
    return {
      src: asset,
      width: DEFAULT_IMAGE_WIDTH,
      height: DEFAULT_IMAGE_HEIGHT
    };
  }

  return {
    src: asset.src,
    width: asset.width ?? DEFAULT_IMAGE_WIDTH,
    height: asset.height ?? DEFAULT_IMAGE_HEIGHT
  };
}

export function getArticleImage(slug: string, imagePath: string) {
  const fileName = imagePath.replace(/^\.\//, "");
  const imageAsset = articleImageAssets[`/src/content/articles/${slug}/${fileName}`];

  if (!imageAsset) {
    throw new Error(`Missing article image for ${slug}: ${imagePath}`);
  }

  return toArticleImage(imageAsset);
}

export function getArticleImageUrl(slug: string, imagePath: string) {
  return getArticleImage(slug, imagePath).src;
}
