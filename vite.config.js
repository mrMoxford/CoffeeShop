import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],

  build: {
    outDir: "dist",
    sourcemap: false, // disable in production
    minify: "esbuild", // fast and small
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 4096, // inline small assets
  },
});
