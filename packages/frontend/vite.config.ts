import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";

import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monacoEditorDirectory = pathResolve(__dirname, "../../node_modules/monaco-editor");

export default defineConfig({
  plugins: [solidPlugin()],
  optimizeDeps: {
    exclude: ["lucide-solid"],
    include: ["monaco-editor", "solid-monaco"],
  },
  resolve: {
    preserveSymlinks: false,
    alias: {
      "monaco-editor": monacoEditorDirectory,
    }
  },
  appType: "spa",
  esbuild: {
    platform: "browser",
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("moment")) return "vendor-moment";
            if (id.includes("lucide-solid")) return "vendor-lucide";
            if (id.includes("echarts")) return "vendor-echarts";
            if (id.includes("monaco-editor") && id.includes("worker"))
              return undefined;
            return "vendor";
          }

          if (id.includes("/src/pages")) {
            const match = id.match(/src\/pages\/([^/]+)/);
            return match ? `page-${match[1]}` : "pages";
          }
        },
      },
    },
  },
});
