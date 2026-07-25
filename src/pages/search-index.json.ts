import { getCollection } from "astro:content";
import { createSearchDocuments } from "../lib/search";

export async function GET() {
  const articles = await getCollection("articles");

  return new Response(JSON.stringify(createSearchDocuments(articles), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
