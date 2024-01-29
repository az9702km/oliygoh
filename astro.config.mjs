import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    format: "file",
    assets: "assets",
  },
  compressHTML: false,
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "[name].mjs",
          chunkFileNames: "chunks/[name].mjs",
          assetFileNames: "assets/[name][extname]",
        },
      },
    },
  },
});
