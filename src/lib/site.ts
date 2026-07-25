import { pathWithBase } from "./routes";

export const SITE_TITLE = "Shared Article Catalogue";
export const SITE_DESCRIPTION = "A static catalogue of shared articles.";
export const SITE_ORIGIN = "https://drystan-furor.github.io";

export function absoluteUrl(path: `/${string}`, baseUrl = import.meta.env.BASE_URL) {
  return new URL(pathWithBase(path, baseUrl), SITE_ORIGIN).toString();
}

export function pageTitle(title: string) {
  return title === SITE_TITLE ? title : `${title} | ${SITE_TITLE}`;
}
