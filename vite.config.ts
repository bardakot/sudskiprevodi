import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: "static-directory-index",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const pathname = req.url?.split("?")[0] ?? "/";
          if (!pathname.endsWith("/") || pathname === "/") {
            next();
            return;
          }

          const indexPath = path.resolve(__dirname, "public", `.${pathname}index.html`);
          if (fs.existsSync(indexPath)) {
            req.url = `${pathname}index.html${req.url?.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""}`;
          }
          next();
        });
      },
    },
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "motion-vendor";
          if (id.includes("react") || id.includes("scheduler")) return "react-vendor";
          if (id.includes("@radix-ui")) return "radix-vendor";
          return "vendor";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
