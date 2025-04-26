import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
export async function GET(context) {
	const posts = await getCollection("blog");

	// Sort posts by publication date in descending order
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		// Required RSS feed metadata
		title: "Takumi Blog",
		description: "Engineering and technology insights",
		site: context.site,

		// Generate items array from blog posts
		// items: await pagesGlobToRssItems(import.meta.glob("./blog/**/*.md")),

		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/posts/${post.slug}/`,
			categories: post.data.categories,
			// content: sanitizeHtml(parser.render(post.body)),
			// stylesheet: "/rss/styles.xsl",
			// Optional: include author if available
			...(post.data.author && { author: post.data.author }),
		})),

		// Optional RSS customizations
		// customData: "<language>ja</language>",
		// stylesheet: "/rss/styles.xsl",
	});
}
