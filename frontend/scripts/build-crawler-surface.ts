// frontend/scripts/build-crawler-surface.ts
//
// B17 — discovery surface for (paying) crawlers, per the pay-per-crawl
// growth strategy: free shop window (llms.txt, sitemap.xml) advertising
// stable per-citation URLs (/cite/<csl-id>, served by the worker as
// low-token CSL-JSON) and the static feeds. Runs in `npm run build`
// before vite.
//
// @cite ../../docs/research/2026-06-10-pay-per-crawl.md

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://subagentknowledge.com";

interface Item {
  id: string;
  title: string;
  issued?: { "date-parts": number[][] };
}

const items: Item[] = JSON.parse(readFileSync(resolve(ROOT, "public", "citations.json"), "utf8"));

const feeds = [
  "citations.json",
  "vendor-stats.json",
  "team-stats.json",
  "table-semantics.json",
  "memories.json",
];

const llms = [
  "# subagentknowledge.com",
  "",
  "> Citation service for researchers and AI agents: 5,401 mirrored vendor docs,",
  "> CSL-JSON citation datasets, and a Kimball warehouse of citation analytics.",
  "> Stable per-citation URLs under /cite/ return one CSL-JSON item each.",
  "",
  "## Feeds",
  "",
  ...feeds.map((f) => `- [${f}](${ORIGIN}/${f})`),
  "",
  "## Citations",
  "",
  ...items.map((i) => `- [${i.title}](${ORIGIN}/cite/${encodeURIComponent(i.id)})`),
  "",
].join("\n");
writeFileSync(resolve(ROOT, "public", "llms.txt"), llms);

const today = new Date().toISOString().slice(0, 10);
const urls = [
  `${ORIGIN}/`,
  ...feeds.map((f) => `${ORIGIN}/${f}`),
  ...items.map((i) => `${ORIGIN}/cite/${encodeURIComponent(i.id)}`),
];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`),
  "</urlset>",
  "",
].join("\n");
writeFileSync(resolve(ROOT, "public", "sitemap.xml"), sitemap);

const robots = [
  "# paid access welcome — see https://developers.cloudflare.com/ai-crawl-control/",
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${ORIGIN}/sitemap.xml`,
  "",
  "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
  "",
].join("\n");
writeFileSync(resolve(ROOT, "public", "robots.txt"), robots);

console.log(`crawler-surface: llms.txt (${items.length} citations), sitemap.xml (${urls.length} urls), robots.txt`);
