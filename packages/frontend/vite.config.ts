import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";

import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monacoEditorDirectory = pathResolve(__dirname, "node_modules/monaco-editor");

const baseUrl = process.env.DASHBOARD_BASE_URL ?? "/";
const normalizedBaseUrl = `/${baseUrl.replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");

export default defineConfig({
  base: normalizedBaseUrl,
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "safari-pinned-tab.svg",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      workbox: {
        maximumFileSizeToCacheInBytes: 10000000,
      },
      manifest: {
        name: "Mailtura",
        short_name: "Mailtura",
        description: "The Universal Email API: Build with templates, send with any provider.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: normalizedBaseUrl,
        scope: normalizedBaseUrl,
        icons: [
          {
            src: "icons/maskable-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/maskable-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-solid"],
    include: ["monaco-editor", "solid-monaco"],
  },
  resolve: {
    preserveSymlinks: false,
    alias: {
      "monaco-editor": monacoEditorDirectory,
    },
  },
  appType: "spa",
  esbuild: {
    platform: "browser",
  },
  build: {
    manifest: true,
    sourcemap: true,
    copyPublicDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Ensure worker not being bundled
            if (id.includes("monaco-editor") && id.includes("worker")) return undefined;

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
