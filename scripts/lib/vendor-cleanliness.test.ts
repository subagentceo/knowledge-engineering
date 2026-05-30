// scripts/lib/vendor-cleanliness.test.ts
//
// Generic per-vendor quality guardrails. Iterates every vendor/<name>/
// that has a crawl.json + at least one fetched .md (or .mdx) file and
// asserts:
//
//   1. The mirror is non-empty (catches future "empty mirror" regressions
//      like the OVS1-4 set where crawler had never run).
//   2. No leakage markers in any file (raw script/style tags, Next.js
//      site nav, Webflow loaders, raw React `export const`).
//   3. Each file's first non-blank, non-frontmatter, non-blockquote line
//      starts with `#` (catches the OVS10 "selector returns sidebar TOC
//      before headline" class of regression).
//
// Per-vendor overrides live in the EXCEPTIONS map below. Add a row
// there (with reason) instead of weakening the global assertions.
//
// @tdd green
//
// Citations:
//   @cite vendor/claude-sitemap/crawl.json
//   @cite vendor/anthropic-sitemap/crawl.json
//   @cite seeds/posture/session-start.xml

import { strict as assert } from "node:assert";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VENDOR_ROOT = resolve(__dirname, "..", "..", "vendor");

interface VendorException {
  /** Skip the "mirror is populated" assertion entirely. */
  skipPopulated?: boolean;
  /** Skip the "first content line is a #-headline" assertion entirely. */
  skipHeadline?: boolean;
  /** Substrings allowed despite matching a leakage signature. */
  allowedSubstrings?: string[];
  /** Reason — keep this filled in so the next reader knows why. */
  reason: string;
}

const EXCEPTIONS: Record<string, VendorException> = {
  anthropics: {
    allowedSubstrings: ["<script", "<style"],
    reason:
      "code.claude.com / platform.claude.com / claude.com/docs serve MDX with embedded React components for sales CTAs ('Deploying Claude Code across your organization? Talk to sales'). Those components include inline <script> and <style> blocks as JSX. Vendor-canonical for first-party Anthropic docs.",
  },
  gcp: {
    skipPopulated: true,
    skipHeadline: true,
    reason:
      "Deferred 2026-05-16 — no working markdown endpoint exists for cloud.google.com. See vendor/gcp/crawl.json 'note' field.",
  },
  "parallel-web": {
    skipHeadline: true,
    allowedSubstrings: ["export const PanelHeader", "<script", "<style"],
    reason:
      "docs.parallel.ai prefixes every .md endpoint with a 3-line '> ## Documentation Index' blockquote; the H1 follows on a later line. Same MDX shape as Anthropics — inline React component definitions are part of canonical docs.",
  },
  cloudflare: {
    skipPopulated: true,
    reason:
      "Mirrors developers.cloudflare.com via cloudflare-index-md — most files land as .llms.txt sidecars, not .md. The walk below only counts .md/.mdx so this looks empty; it isn't.",
  },
  intercom: {
    skipHeadline: true,
    reason:
      "developers.intercom.com .md endpoints start with a paragraph index of sibling pages above the H1; the H1 follows. Vendor-canonical.",
  },
  sift: {
    skipHeadline: true,
    reason:
      "sift.com is a marketing site — pages start with a hero image or G2-badge link before the H1. Real content is present and clean.",
  },
  "anthropic-sitemap": {
    skipHeadline: true,
    reason:
      "anthropic.com renders article titles outside <article> in the Next.js page header. The article extracted content (correctly) doesn't include the H1. Fix needs a separate selector pass to splice in document.title or <h1> from page header — out of this test's scope.",
  },
  aws: {
    skipHeadline: true,
    reason:
      "AWS docs serve .md endpoints that frequently begin with a warning callout or product-status banner before the H1. Vendor-canonical formatting.",
  },
  "wellarchitected-github": {
    skipHeadline: true,
    reason:
      "wellarchitected.github.com renders a 'Content Library' breadcrumb link or GitHub-mark image before the H1 inside <article>/<main>. The H1 follows. Vendor-canonical Hugo theme formatting.",
  },
  "docs-github": {
    allowedSubstrings: ["<style"],
    reason:
      "docs.github.com's /api/article/body endpoint occasionally emits inline <style> blocks for syntax-highlighting samples (e.g. Copilot IDE-suggestions page). The surrounding prose is clean markdown — the <style> is upstream content, not a chassis extraction bug.",
  },
  "claude-sitemap": {
    skipHeadline: true,
    allowedSubstrings: ["<script"],
    reason:
      "claude.com renders blog post titles outside the .u-rich-text-blog content container (Webflow). Some support-articles discuss security concepts using `<script>` in prose (e.g. XSS examples). The extracted body still has clean prose.",
  },
  stripe: {
    allowedSubstrings: ["<script", "<style"],
    reason:
      "Stripe's quickstart docs embed raw HTML examples inline (indented but not always cleanly fenced). The `<script src=stripe.js>` tags are part of the canonical embed instructions.",
  },
  nimble: {
    allowedSubstrings: ["<script", "<style"],
    reason:
      "docs.nimbleway.com is Mintlify MDX; some marketing pages include inline React style components.",
  },
  commonmark: {
    skipPopulated: true, // hand-mirrored verbatim spec, not crawled — no .checksums.json
    skipHeadline: true, // spec.md leads with YAML frontmatter (title/author/version), H1 follows
    allowedSubstrings: ["<script", "<style"],
    reason:
      "vendor/commonmark/ is the CommonMark 0.31.2 spec mirrored verbatim from the commonmark-spec study clone (the normalization ANCHOR, not a crawled subprocessor). It is a literal specification document: it leads with YAML frontmatter, was never crawled (no checksums), and its code-fenced test examples contain raw <script>/<style> markup as spec test cases. Excluded from prettier too (.prettierignore). See docs/reference/commonmark-normalization.md.",
  },
  docker: {
    allowedSubstrings: ["<script"],
    reason:
      "docs.docker.com serves a native text/markdown twin (docker-md transform). A few pages embed asciinema terminal-recording players as raw `<script async src=https://asciinema.org/...js>` tags inside the canonical markdown (e.g. desktop/features/containerd, ai/gordon/how-to/cli, engine/release-notes/27). Same class as Stripe's inline `<script src=stripe.js>` embeds — upstream content, not a turndown leak (this mirror does no HTML scraping).",
  },
  "osv-scanner": {
    skipHeadline: true,
    reason:
      "Material for MkDocs renders ordered-list breadcrumb nav above the article H1. Extracted body starts with the breadcrumb; H1 follows.",
  },
  "brave-search": {
    skipHeadline: true,
    reason:
      "Index-style pages (category landing pages) start with a child-link list rather than an H1. Vendor-canonical.",
  },
  openfeature: {
    skipHeadline: true,
    reason:
      "Docusaurus category index pages render as link-card grids without an H1. Real content pages start with H1 cleanly per OVS10.",
  },
};

const FORBIDDEN_SIGNATURES: { needle: string; reason: string }[] = [
  { needle: "<script", reason: "raw <script> leaked through turndown" },
  { needle: "<style", reason: "raw <style> leaked through turndown" },
  { needle: "anti-flicker", reason: "Webflow anti-flicker CSS leaked" },
  { needle: "!function(o,c)", reason: "Webflow loader IIFE leaked" },
  { needle: "SiteHeader-module-scss", reason: "Next.js site-header CSS leaked" },
  { needle: "var __next_f", reason: "Next.js __next_f stream leaked" },
  { needle: "window.__INITIAL_STATE__", reason: "client hydration state leaked" },
  { needle: "export const PanelHeader", reason: "raw React JSX export leaked (Mintlify .md endpoint failure mode)" },
  { needle: "Skip to main content", reason: "site-nav skip-link leaked (selector matched <body>)" },
];

function stripFencedCodeBlocks(body: string): string {
  // Strip fenced code blocks, inline code, AND 4-space-indented code blocks
  // (the CommonMark indented-code form, used by Stripe's docs to embed HTML
  // examples). All three can legitimately contain script/style tags and
  // SiteHeader-like strings in tutorial content.
  return body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "")
    .replace(/^([ \t]{4,}.*\n?)+/gm, "");
}

function listMarkdownFiles(vendorDir: string): string[] {
  const out: string[] = [];
  const visit = (dir: string): void => {
    if (!existsSync(dir)) return;
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      // Skip hidden, the PDF sidecar tree, and any top-level non-content files.
      if (ent.name.startsWith(".") || ent.name === "_pdfs") continue;
      const full = resolve(dir, ent.name);
      if (ent.isDirectory()) {
        visit(full);
        continue;
      }
      if (ent.name === "urls.md" || ent.name === "llms.txt") continue;
      if (ent.name.endsWith(".md") || ent.name.endsWith(".mdx")) {
        out.push(full);
      }
    }
  };
  visit(vendorDir);
  return out;
}

function listVendorDirs(): string[] {
  if (!existsSync(VENDOR_ROOT)) return [];
  return readdirSync(VENDOR_ROOT, { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() && existsSync(resolve(VENDOR_ROOT, e.name, "crawl.json")),
    )
    .map((e) => e.name)
    .sort();
}

/** Find the first "content" line of a markdown file — skip YAML frontmatter,
 *  blank lines, leading blockquotes (vendor preambles), and standalone
 *  skip-to-content nav links. */
function firstContentLine(body: string): string | null {
  const lines = body.split(/\r?\n/);
  let i = 0;
  // Skip YAML frontmatter.
  if (lines[0]?.trim() === "---") {
    i = 1;
    while (i < lines.length && lines[i].trim() !== "---") i += 1;
    if (i < lines.length) i += 1;
  }
  // Skip blanks, blockquote preambles, and standalone navigation links
  // like `[Skip to content](#_top)` that some doc engines emit as the
  // first body element.
  const SKIP_LINK_RE = /^\[[^\]]*\]\(#[^)]+\)\s*$/;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "" || t.startsWith(">") || SKIP_LINK_RE.test(t)) {
      i += 1;
      continue;
    }
    return t;
  }
  return null;
}

const vendors = listVendorDirs();

test("every vendor with a crawl.json + .checksums.json has at least 1 .md file", () => {
  const violations: string[] = [];
  for (const v of vendors) {
    if (EXCEPTIONS[v]?.skipPopulated) continue;
    const checksums = resolve(VENDOR_ROOT, v, ".checksums.json");
    // A vendor without .checksums.json has never been crawled; not an empty-
    // mirror regression — that's covered by a separate test below.
    if (!existsSync(checksums)) continue;
    const files = listMarkdownFiles(resolve(VENDOR_ROOT, v));
    if (files.length === 0) {
      violations.push(`vendor/${v}/ — 0 .md files despite checksums.json present`);
    }
  }
  assert.deepEqual(violations, [], `empty-mirror regressions:\n${violations.join("\n")}`);
});

test("every vendor has a .checksums.json (= crawl has run at least once)", () => {
  const violations: string[] = [];
  for (const v of vendors) {
    if (EXCEPTIONS[v]?.skipPopulated) continue;
    const checksums = resolve(VENDOR_ROOT, v, ".checksums.json");
    if (!existsSync(checksums)) {
      violations.push(`vendor/${v}/.checksums.json missing — crawl has never run`);
    }
  }
  assert.deepEqual(violations, [], `vendors that never ran:\n${violations.join("\n")}`);
});

test("no file contains structural leakage markers (outside code blocks)", () => {
  const violations: string[] = [];
  for (const v of vendors) {
    const exception = EXCEPTIONS[v];
    const allowed = new Set(exception?.allowedSubstrings ?? []);
    for (const path of listMarkdownFiles(resolve(VENDOR_ROOT, v))) {
      const body = stripFencedCodeBlocks(readFileSync(path, "utf8"));
      for (const { needle, reason } of FORBIDDEN_SIGNATURES) {
        if (allowed.has(needle)) continue;
        if (body.includes(needle)) {
          violations.push(`${path}: ${reason} (needle: '${needle}')`);
        }
      }
    }
  }
  // Cap reporting to the first 10 hits so a wide regression doesn't drown
  // the test output.
  if (violations.length > 10) {
    assert.fail(
      `${violations.length} leakage violations; first 10:\n${violations.slice(0, 10).join("\n")}`,
    );
  }
  assert.deepEqual(violations, [], `leakage violations:\n${violations.join("\n")}`);
});

test("every file's first content line is an H1/H2 heading", () => {
  const violations: string[] = [];
  for (const v of vendors) {
    if (EXCEPTIONS[v]?.skipHeadline) continue;
    for (const path of listMarkdownFiles(resolve(VENDOR_ROOT, v))) {
      const body = readFileSync(path, "utf8");
      // Suspiciously short files are caught by a separate test.
      if (statSync(path).size < 100) continue;
      const line = firstContentLine(body);
      if (line === null) continue;
      if (!line.startsWith("#")) {
        violations.push(`${path}: first content line is not a #-heading (got: '${line.slice(0, 80)}')`);
      }
    }
  }
  if (violations.length > 10) {
    assert.fail(
      `${violations.length} headline violations; first 10:\n${violations.slice(0, 10).join("\n")}`,
    );
  }
  assert.deepEqual(violations, [], `headline violations:\n${violations.join("\n")}`);
});

test("every file has non-trivial body size", () => {
  const violations: string[] = [];
  for (const v of vendors) {
    if (EXCEPTIONS[v]?.skipPopulated) continue;
    for (const path of listMarkdownFiles(resolve(VENDOR_ROOT, v))) {
      const size = statSync(path).size;
      // Stubs <12B are almost always empty pages or 404 artifacts.
      // Legitimate short content exists at this scale (one-line section
      // index pages like `# Completions`, ~14B).
      if (size < 12) {
        violations.push(`${path}: ${size}B (suspiciously small)`);
      }
    }
  }
  if (violations.length > 10) {
    assert.fail(
      `${violations.length} size violations; first 10:\n${violations.slice(0, 10).join("\n")}`,
    );
  }
  assert.deepEqual(violations, [], `size violations:\n${violations.join("\n")}`);
});
