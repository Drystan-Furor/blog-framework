import { getCollection } from "astro:content";
import { createSitemapXml } from "../lib/site-artifacts";

export async function GET() {
  const articles = await getCollection("articles");

  return new Response(createSitemapXml({ articles }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
