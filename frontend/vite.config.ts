// Vite is now first-party Cloudflare tooling (VoidZero acquisition,
// 2026-06-04) — a native `vite deploy` path for Workers is on the roadmap.
// @cite vendor/cloudflare/www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-voidzero-to-build-the-future-of-the-ai-native-web.md
// @cite seeds/citations/voidzero-cloudflare.md
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    target: "es2022",
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
});
