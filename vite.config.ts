import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import string from "vite-plugin-string";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        string({
            include: ["**/*.glsl"],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
