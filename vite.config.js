import path from "node:path";
import { fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import { glob } from "glob";
import { defineConfig } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~/": path.join(dirname, "src/"),
    },
  },
  root: path.join(dirname, "src/"),
  base: "./",
  publicDir: path.join(dirname, "public/"),
  build: {
    outDir: path.join(dirname, "dist/"),
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync(path.join(dirname, "src/*.html")),
    },
  },
});
