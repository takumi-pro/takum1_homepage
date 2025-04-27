// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	site: "https://takumidiary.com",
	integrations: [icon(), sitemap()],
	markdown: {
		syntaxHighlight: {
			type: "shiki",
			excludeLangs: ["plaintext", "Dockerfile", "gemfile", "mermaid", "js"],
		},
		rehypePlugins: [rehypeMermaid],
	},
});
