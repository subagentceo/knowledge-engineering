#!/usr/bin/env tsx
/**
 * frontend/scripts/build-vendor-manifest.ts
 *
 * Phase 13.B+ (O7). Build-time step: walks vendor/, copies all .md
 * files into frontend/public/vendor/<vendor>/<path>.md (so Vite
 * picks them up as static assets), and emits frontend/public/vendor-manifest.json
 * listing the available pages.
 *
 * The manifest is consumed at runtime by frontend/src/vendor-loader.ts.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
const PUBLIC_VENDOR = resolve(__dirname, "..", "public", "vendor");
const MANIFEST_PATH = resolve(__dirname, "..", "public", "vendor-manifest.json");

interface ManifestEntry {
  vendor: string;
  path: string;
  title: string;
}

function ensureDir(p: string): void {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function* walkMarkdown(root: string): Generator<string> {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdown(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

function extractTitle(body: string, fallback: string): string {
  const m = body.match(/^#\s+(.+)$/m);
  if (m && m[1]) return m[1].trim();
  return fallback;
}

function buildManifest(): ManifestEntry[] {
  if (!existsSync(VENDOR_ROOT)) {
    console.warn(`[build-vendor-manifest] vendor/ not found at ${VENDOR_ROOT}; emitting empty manifest`);
    return [];
  }
  ensureDir(PUBLIC_VENDOR);
  const out: ManifestEntry[] = [];
  for (const vendor of readdirSync(VENDOR_ROOT, { withFileTypes: true })) {
    if (!vendor.isDirectory()) continue;
    const vendorRoot = join(VENDOR_ROOT, vendor.name);
    if (!existsSync(join(vendorRoot, "crawl.json"))) continue;
    for (const md of walkMarkdown(vendorRoot)) {
      const rel = relative(vendorRoot, md);
      // Skip top-level urls.md / llms.txt (they're not content).
      if (rel === "urls.md" || rel === "llms.txt") continue;
      const body = readFileSync(md, "utf8");
      const title = extractTitle(body, rel);
      // Copy into public/vendor/.
      const dest = join(PUBLIC_VENDOR, vendor.name, rel);
      ensureDir(dirname(dest));
      writeFileSync(dest, body);
      out.push({ vendor: vendor.name, path: rel, title });
    }
  }
  return out;
}

function main(): void {
  const pages = buildManifest();
  const manifest = {
    generated_at: new Date().toISOString(),
    pages,
  };
  ensureDir(dirname(MANIFEST_PATH));
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`[build-vendor-manifest] wrote ${pages.length} page(s) → ${MANIFEST_PATH}`);
}

main();
