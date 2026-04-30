import { getCollection } from "astro:content";
import { createRssXml } from "../lib/site-artifacts";

export async function GET() {
  const articles = await getCollection("articles");

  return new Response(createRssXml({ articles }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
