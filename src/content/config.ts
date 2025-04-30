import { z, defineCollection } from "astro:content";
import { rssSchema } from "@astrojs/rss";

// ブログコレクションのスキーマを定義
const blogCollection = defineCollection({
	schema: rssSchema.extend({
		categories: z.array(z.string()).optional(),
		ai_generated: z.boolean().optional(), // AI生成ラベルを追加
	}),
	// schema: z.object({
	//   title: z.string(),
	//   pubDate: z.coerce.date(),
	//   description: z.string(),
	//   author: z.string().default('Anonymous'),
	//   image: z.object({
	//     url: z.string(),
	//     alt: z.string(),
	//   }).optional(),
	//   tags: z.array(z.string()),
	// })
});

// worksコレクションのスキーマを定義
const worksCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.object({
			url: z.string(),
			alt: z.string(),
		}),
		pubDate: z.coerce.date(),
		url: z.string().optional(),
	}),
});

// コレクションをエクスポート
export const collections = {
	blog: blogCollection,
	works: worksCollection,
};
