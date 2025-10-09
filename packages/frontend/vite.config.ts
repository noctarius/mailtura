import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    preserveSymlinks: true, // this is the fix!
  },
  appType: "spa",
  esbuild: {
    platform: "browser",
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("moment"))
              return "vendor-moment";
            if (id.includes("lucide-react"))
              return "vendor-lucide";
            if (id.includes("echarts"))
              return "vendor-echarts";
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
