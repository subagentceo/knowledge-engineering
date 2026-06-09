/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite vendor/anthropic-sitemap/research/team/economic-research.md
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { researchDocToCslItem, vendorPathToUrl, CslItem } from "./csl.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// ── url mapping ───────────────────────────────────────────────────────────────
assert.equal(
  vendorPathToUrl("vendor/anthropic-sitemap/research/clio.md"),
  "https://www.anthropic.com/research/clio",
);
assert.equal(vendorPathToUrl("vendor/anthropic-sitemap/_pdfs/096d94c1.md"), undefined);
assert.equal(vendorPathToUrl("vendor/cloudflare/workers/index.md"), undefined);

// ── extraction from synthetic markdown ───────────────────────────────────────
const synthetic = [
  "# Tracking AI adoption",
  "",
  "Economic ResearchSep 15, 2025",
  "",
  "This report maps how Claude is used differently across US states and countries, finding strong correlations between income and AI adoption patterns worldwide.",
].join("\n");

const item = researchDocToCslItem("vendor/anthropic-sitemap/research/tracking.md", synthetic);
assert.equal(item.title, "Tracking AI adoption");
assert.equal(item.type, "article");
assert.equal(item.URL, "https://www.anthropic.com/research/tracking");
assert.deepEqual(item.issued, { "date-parts": [[2025, 9, 15]] });
assert.ok(item.abstract?.startsWith("This report maps"));
assert.equal(item.id, "anthropic-sitemap:research:tracking");

// determinism: same input → same output
assert.deepEqual(
  researchDocToCslItem("vendor/anthropic-sitemap/research/tracking.md", synthetic),
  item,
);

// ── extraction from the real mirrored corpus ─────────────────────────────────
const econPath = "vendor/anthropic-sitemap/research/team/economic-research.md";
const econ = researchDocToCslItem(econPath, readFileSync(resolve(REPO_ROOT, econPath), "utf8"));
assert.equal(econ.title, "Economic Research");
assert.equal(econ.publisher, "Anthropic");
assert.ok(CslItem.safeParse(econ).success);

// pdf mirrors become type=document with no URL
const pdf = researchDocToCslItem("vendor/anthropic-sitemap/_pdfs/abc123.md", "# Some paper\n");
assert.equal(pdf.type, "document");
assert.equal(pdf.URL, undefined);

console.log("csl.test.ts OK");
