// scripts/lib/anthropic-sitemap-cleanliness.test.ts
//
// Regression guard for vendor/anthropic-sitemap/. The pre-fix
// `vendor/anthropic-engineering/` mirror used selector `"article|main"`
// (literal pipe — not valid CSS) which silently fell through to <body>,
// dumping site nav, footer, and Next.js cookie banner into every file.
// The new mirror uses cheerio comma-list `"article, main"`.
//
// @tdd green
//
// Citations:
//   @cite vendor/anthropic-sitemap/crawl.json
//   @cite seeds/posture/session-start.xml

import { strict as assert } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VENDOR_DIR = resolve(__dirname, "..", "..", "vendor", "anthropic-sitemap");

const TOPOLOGY_DIRS = [
  resolve(VENDOR_DIR, "engineering"),
  resolve(VENDOR_DIR, "news"),
  resolve(VENDOR_DIR, "research"),
  resolve(VENDOR_DIR, "learn"),
  resolve(VENDOR_DIR, "product"),
  resolve(VENDOR_DIR, "features"),
  resolve(VENDOR_DIR, "economic-futures"),
  resolve(VENDOR_DIR, "claude"),
];

const FORBIDDEN_SIGNATURES: { needle: string; reason: string }[] = [
  { needle: "<script", reason: "raw <script> leaked through turndown" },
  { needle: "<style", reason: "raw <style> leaked through turndown" },
  { needle: "Skip to main content", reason: "site-nav skip-link leaked (selector matched <body>)" },
  { needle: "SiteHeader-module-scss", reason: "Next.js site-header CSS-module leaked" },
  { needle: "[Skip to footer]", reason: "site-nav footer link leaked" },
];

function stripCodeBlocks(body: string): string {
  return body.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

function listPosts(): string[] {
  const out: string[] = [];
  for (const dir of TOPOLOGY_DIRS) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (f.endsWith(".md")) out.push(resolve(dir, f));
    }
  }
  return out;
}

test("vendor/anthropic-sitemap mirror is populated across topologies", () => {
  const posts = listPosts();
  assert.ok(posts.length >= 200, `expected ≥200 fetched posts, got ${posts.length}`);
  // Engineering topology specifically must be present — that's the user's
  // primary use case for this mirror.
  const engineering = posts.filter((p) => p.includes("/engineering/"));
  assert.ok(engineering.length >= 20, `expected ≥20 engineering posts, got ${engineering.length}`);
});

test("every post is free of Next.js site-nav leakage", () => {
  const posts = listPosts();
  if (posts.length === 0) return;
  const violations: string[] = [];
  for (const path of posts) {
    const body = stripCodeBlocks(readFileSync(path, "utf8"));
    for (const { needle, reason } of FORBIDDEN_SIGNATURES) {
      if (body.includes(needle)) {
        violations.push(`${path}: ${reason} (found '${needle}')`);
      }
    }
  }
  assert.deepEqual(violations, [], `cleanliness violations:\n${violations.slice(0, 10).join("\n")}`);
});

test("the user-reported effective-harnesses post extracts cleanly", () => {
  const path = resolve(VENDOR_DIR, "engineering", "effective-harnesses-for-long-running-agents.md");
  if (!existsSync(path)) return; // not in current page_cap window — populated-mirror test covers floor
  const body = readFileSync(path, "utf8");
  assert.ok(body.length > 1000, `body suspiciously short: ${body.length}B`);
  // The first content paragraph mentions the agent-harness topic.
  assert.ok(
    body.toLowerCase().includes("long-running agents") || body.toLowerCase().includes("context window"),
    "first-content keyword check failed; markdown likely starts with site nav",
  );
  // No skip-link sentinel anywhere.
  assert.ok(!body.includes("Skip to main content"), "skip-link leaked into effective-harnesses post");
});

test("every post has non-trivial prose content", () => {
  const posts = listPosts();
  if (posts.length === 0) return;
  const tooSmall: string[] = [];
  for (const path of posts) {
    const size = statSync(path).size;
    if (size < 300) tooSmall.push(`${path}: ${size}B`);
  }
  assert.deepEqual(tooSmall, [], `posts with suspiciously little content:\n${tooSmall.slice(0, 5).join("\n")}`);
});
