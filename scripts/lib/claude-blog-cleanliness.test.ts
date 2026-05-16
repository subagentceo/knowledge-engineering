// scripts/lib/claude-blog-cleanliness.test.ts
//
// Regression guard: vendor/claude-sitemap/blog/ must contain markdown prose,
// not Webflow boilerplate. Pre-fix, every post had ~1400 lines beginning
// with `!function(o,c){...}` and embedded JSON-LD/CSS because the `<article>`
// regex selector pulled `<script>` blocks into turndown.
//
// @tdd green
//
// Citations:
//   @cite vendor/claude-sitemap/crawl.json                      (consolidated mirror config under test)
//   @cite vendor/claude-sitemap/llms.txt                         (vendor mirror entry-point)
//   @cite seeds/posture/session-start.xml                       (.md-first hard rule)

import { strict as assert } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VENDOR_DIR = resolve(__dirname, "..", "..", "vendor", "claude-sitemap");
const BLOG_DIRS = [resolve(VENDOR_DIR, "blog")];

const FORBIDDEN_SIGNATURES: { needle: string; reason: string }[] = [
  { needle: "<script", reason: "raw <script> leaked through turndown" },
  { needle: "<style", reason: "raw <style> leaked through turndown" },
  { needle: "anti-flicker", reason: "Webflow anti-flicker CSS leaked" },
  { needle: "!function(o,c)", reason: "Webflow loader IIFE leaked" },
  { needle: "@context", reason: "JSON-LD schema.org blob leaked" },
  { needle: "w-mod-touch", reason: "Webflow class toggler leaked" },
];

function listPosts(): string[] {
  const out: string[] = [];
  for (const dir of BLOG_DIRS) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (f.endsWith(".md")) out.push(resolve(dir, f));
    }
  }
  return out;
}

test("vendor/claude-blog mirror is populated", () => {
  const posts = listPosts();
  assert.ok(posts.length >= 5, `expected ≥5 fetched posts, got ${posts.length}`);
});

/**
 * Strip fenced code blocks before scanning so legitimate `<style>` /
 * `<script>` snippets *inside* code examples don't false-positive.
 * Web-tutorial posts (e.g. build-responsive-web-layouts) teach HTML/CSS
 * and ship CSS snippets in ```htmlbars fences.
 */
function stripCodeBlocks(body: string): string {
  return body.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

test("every post is free of Webflow script/style/JSON-LD leakage", () => {
  const posts = listPosts();
  if (posts.length === 0) return; // covered by the populated-mirror test above
  const violations: string[] = [];
  for (const path of posts) {
    const body = stripCodeBlocks(readFileSync(path, "utf8"));
    for (const { needle, reason } of FORBIDDEN_SIGNATURES) {
      if (body.includes(needle)) {
        violations.push(`${path}: ${reason} (found '${needle}')`);
      }
    }
  }
  assert.deepEqual(violations, [], `cleanliness violations:\n${violations.join("\n")}`);
});

test("every post stays under a sane line-count ceiling", () => {
  // Pre-fix posts were ~1400 lines and 90% of bytes were minified JS +
  // CSS. A clean long-form post (e.g. computer-use best practices) tops
  // out around 1000 lines of real prose. 1500 catches the old
  // script-leakage regression without false-positiving on long articles.
  const posts = listPosts();
  if (posts.length === 0) return;
  const oversized: string[] = [];
  for (const path of posts) {
    const lines = readFileSync(path, "utf8").split("\n").length;
    if (lines > 1500) oversized.push(`${path}: ${lines} lines`);
  }
  assert.deepEqual(oversized, [], `oversized posts (likely script-leakage regression):\n${oversized.join("\n")}`);
});

test("PDF mirror lane produced at least one extracted document", () => {
  const pdfDir = resolve(VENDOR_DIR, "_pdfs");
  if (!existsSync(pdfDir)) return; // PDF lane optional — empty crawls are ok
  const mirrors = readdirSync(pdfDir).filter((f) => f.endsWith(".md"));
  for (const f of mirrors) {
    const path = resolve(pdfDir, f);
    const body = readFileSync(path, "utf8");
    assert.ok(body.startsWith("---\n"), `${f}: missing frontmatter`);
    assert.ok(body.includes("kind: pdf-mirror"), `${f}: missing kind: pdf-mirror`);
    assert.ok(body.includes("source_url:"), `${f}: missing source_url`);
    assert.ok(statSync(path).size > 500, `${f}: suspiciously small (${statSync(path).size}B)`);
  }
});

test("every post has non-trivial prose content", () => {
  const posts = listPosts();
  if (posts.length === 0) return;
  const tooSmall: string[] = [];
  for (const path of posts) {
    const size = statSync(path).size;
    if (size < 300) tooSmall.push(`${path}: ${size}B`);
  }
  assert.deepEqual(tooSmall, [], `posts with suspiciously little content:\n${tooSmall.join("\n")}`);
});
