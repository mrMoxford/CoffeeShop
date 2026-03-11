import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// 🔹 Vite config
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // allows imports like "@/components/..."
    },
  },

  optimizeDeps: {
    include: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 4096,
    rollupOptions: {
      // 🔹 Ignore "use client" warnings
      onwarn(warning, warn) {
        if (
          typeof warning === "object" &&
          warning.message?.includes('"use client"')
        ) {
          return;
        }
        warn(warning);
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});
