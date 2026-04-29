const articleImageUrls = import.meta.glob<string>(
  "/src/content/articles/**/*.{avif,webp,png,jpg,jpeg,svg}",
  {
    eager: true,
    import: "default",
    query: "?url"
  }
);

export function getArticleImageUrl(slug: string, imagePath: string) {
  const fileName = imagePath.replace(/^\.\//, "");
  const imageUrl = articleImageUrls[`/src/content/articles/${slug}/${fileName}`];

  if (!imageUrl) {
    throw new Error(`Missing article image for ${slug}: ${imagePath}`);
  }

  return imageUrl;
}
