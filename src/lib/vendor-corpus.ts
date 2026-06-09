/**
 * Vendor-corpus enumeration + CSL extraction across ALL mirrored vendors.
 *
 * Generalizes src/lib/csl.ts (anthropic-sitemap research lane) to the full
 * vendor/ tree. Enumeration is git-aware (`git ls-files`) per the OHYG1
 * rule — third_party/ and other untracked paths never enter the corpus.
 *
 * URL reconstruction is per-vendor: mirrors are laid out either as
 * vendor/<name>/<host>/<path>.md (host embedded in the tree) or as
 * vendor/<name>/<path>.md with the host carried here. Vendors without a
 * mapping yield items with no URL — null over guess.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite https://github.com/citation-style-language/schema (csl-data.json)
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { researchDocToCslItem, type CslItem } from "./csl.js";

// vendor/<name>/<host-looking-dir>/... — first segment with a dot is a host
const HOST_DIR_RE = /^vendor\/[^/]+\/((?:[a-z0-9-]+\.)+[a-z]{2,})\/(.+)\.md$/;

// Hostless mirrors: vendor/<name>/<path>.md → https://<host>/<path>
const VENDOR_HOSTS: Record<string, string> = {
  "anthropic-sitemap": "www.anthropic.com",
  "claude-sitemap": "claude.com",
  cloudflare: "developers.cloudflare.com",
  modelcontextprotocol: "modelcontextprotocol.io",
  openfeature: "openfeature.dev",
  opentelemetry: "opentelemetry.io",
  neon: "neon.com",
  stripe: "docs.stripe.com",
  turbopuffer: "turbopuffer.com",
  workos: "workos.com",
};

export function corpusPathToUrl(relPath: string): string | undefined {
  const hosted = relPath.match(HOST_DIR_RE);
  if (hosted?.[1] !== undefined && hosted[2] !== undefined) {
    return `https://${hosted[1]}/${hosted[2]}`;
  }
  const m = relPath.match(/^vendor\/([^/]+)\/(.+)\.md$/);
  if (m?.[1] === undefined || m[2] === undefined) return undefined;
  if (m[2].startsWith("_pdfs/")) return undefined; // hash-named PDF mirrors carry no slug
  const host = VENDOR_HOSTS[m[1]];
  return host === undefined ? undefined : `https://${host}/${m[2]}`;
}

export function vendorOf(relPath: string): string | undefined {
  return relPath.match(/^vendor\/([^/]+)\//)?.[1];
}

/** Tracked markdown corpus, git-aware (excludes third_party/ by construction). */
export function listCorpus(repoRoot: string): string[] {
  const out = execFileSync("git", ["ls-files", "vendor/**/*.md", "vendor/*/*.md"], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return [...new Set(out.split("\n").filter((p) => p.endsWith(".md")))].sort();
}

export function corpusDocToCslItem(relPath: string, markdown: string): CslItem {
  const base = researchDocToCslItem(relPath, markdown);
  const url = corpusPathToUrl(relPath);
  const vendor = vendorOf(relPath);
  return {
    ...base,
    ...(url !== undefined ? { URL: url } : {}),
    ...(vendor !== undefined && vendor !== "anthropic-sitemap"
      ? { publisher: vendor, type: "webpage" as const }
      : {}),
  };
}

export interface CorpusStats {
  total: number;
  byVendor: Record<string, number>;
}

export function buildCorpusItems(repoRoot: string): { items: CslItem[]; stats: CorpusStats } {
  const items: CslItem[] = [];
  const byVendor: Record<string, number> = {};
  for (const rel of listCorpus(repoRoot)) {
    const vendor = vendorOf(rel);
    if (vendor === undefined) continue;
    items.push(corpusDocToCslItem(rel, readFileSync(resolve(repoRoot, rel), "utf8")));
    byVendor[vendor] = (byVendor[vendor] ?? 0) + 1;
  }
  return { items, stats: { total: items.length, byVendor } };
}
