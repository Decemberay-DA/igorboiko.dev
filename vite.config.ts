import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import svg from "vite-plugin-svg";

import string from "vite-plugin-string";

export default defineConfig({
	plugins: [
		vue(),
		// svg(),
		string({
			include: ["**/*.glsl"],
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@views": "/src/views",
			"@scripts": "/src/scripts",
		},
	},
});
