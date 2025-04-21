import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const posts = await getCollection("blog");
	return rss({
		// Required RSS feed metadata
		title: "Takumi Blog",
		description: "Engineering and technology insights",
		site: context.site,
		// Generate items array from blog posts
		items: await pagesGlobToRssItems(import.meta.glob("./blog/**/*.md")),
		// Optional RSS customizations
		customData: "<language>ja</language>",
		stylesheet: "/rss/styles.xsl",
	});
}
