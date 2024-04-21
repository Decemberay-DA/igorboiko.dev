import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import string from "vite-plugin-string";

export default defineConfig({
	plugins: [
		vue(),
		string({
			include: ["**/*.glsl"],
		}),
	],
	// build: {
	// 	sourcemap: true,
	// },
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@views": "/src/views",
			"@scripts": "/src/scripts",
		},
	},
});
