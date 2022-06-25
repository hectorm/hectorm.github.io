import { fileURLToPath } from "url";
import glob from "glob";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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
