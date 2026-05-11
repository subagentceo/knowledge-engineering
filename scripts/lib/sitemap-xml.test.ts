// scripts/lib/sitemap-xml.test.ts
//
// Citations:
//   @cite rubrics/phase-13.md            (O2 — sitemap.xml discovery)

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isSitemapIndex, parseSitemapXml } from "./sitemap-xml.js";

test("extracts <loc> entries from a flat urlset", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://openfeature.dev/docs/reference/intro/</loc></url>
  <url><loc>https://openfeature.dev/docs/reference/concepts/</loc></url>
</urlset>`;
  assert.deepEqual(parseSitemapXml(xml), [
    "https://openfeature.dev/docs/reference/intro/",
    "https://openfeature.dev/docs/reference/concepts/",
  ]);
});

test("extracts child sitemap URLs from a sitemap-index", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://openfeature.dev/sitemap-0.xml</loc></sitemap>
  <sitemap><loc>https://openfeature.dev/sitemap-1.xml</loc></sitemap>
</sitemapindex>`;
  assert.equal(isSitemapIndex(xml), true);
  assert.deepEqual(parseSitemapXml(xml), [
    "https://openfeature.dev/sitemap-0.xml",
    "https://openfeature.dev/sitemap-1.xml",
  ]);
});

test("isSitemapIndex returns false for flat urlset", () => {
  const xml = `<urlset><url><loc>https://x/</loc></url></urlset>`;
  assert.equal(isSitemapIndex(xml), false);
});

test("dedupes repeated <loc> entries preserving order", () => {
  const xml = `<urlset>
    <url><loc>https://x/a</loc></url>
    <url><loc>https://x/b</loc></url>
    <url><loc>https://x/a</loc></url>
  </urlset>`;
  assert.deepEqual(parseSitemapXml(xml), ["https://x/a", "https://x/b"]);
});

test("decodes XML entities in URL", () => {
  const xml = `<urlset><url><loc>https://x/q?a=1&amp;b=2</loc></url></urlset>`;
  assert.deepEqual(parseSitemapXml(xml), ["https://x/q?a=1&b=2"]);
});

test("skips malformed URLs without throwing", () => {
  const xml = `<urlset>
    <url><loc>not-a-url</loc></url>
    <url><loc>https://x/ok</loc></url>
  </urlset>`;
  assert.deepEqual(parseSitemapXml(xml), ["https://x/ok"]);
});

test("handles surrounding whitespace inside <loc>", () => {
  const xml = `<urlset><url><loc>
    https://x/spaced
  </loc></url></urlset>`;
  assert.deepEqual(parseSitemapXml(xml), ["https://x/spaced"]);
});

test("empty input yields empty result", () => {
  assert.deepEqual(parseSitemapXml(""), []);
  assert.equal(isSitemapIndex(""), false);
});
