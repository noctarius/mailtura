import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";

import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monacoEditorDirectory = pathResolve(__dirname, "../../node_modules/monaco-editor");

const baseUrl = process.env.DASHBOARD_BASE_URL;

export default defineConfig({
  base: baseUrl,
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
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Ensure worker not being bundled
            if (id.includes("monaco-editor") && id.includes("worker"))
              return undefined;

            if (id.includes("moment")) return "vendor-moment";
            if (id.includes("lucide-solid")) return "vendor-lucide";
            if (id.includes("echarts")) return "vendor-echarts";
            if (id.includes("lodash")) return "vendor-lodash";
            if (id.includes("tanstack")) return "vendor-tanstack";
            if (id.includes("monaco-editor")) return "vendor-monaco";
            if (id.includes("state-local")) return "vendor-state-local";
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
