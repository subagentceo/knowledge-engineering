#!/usr/bin/env tsx
// scripts/audit-sitemap-coverage.ts
//
// Sitemap coverage audit. Fetches every sitemap.xml URL configured in
// vendor/*/crawl.json, classifies each URL via the same inAllowlist gate
// the crawler uses, and prints coverage stats.
//
// Closes the "Verification" loop for the OBLOGS1 audit
// (docs/audits/2026-05-22-sitemap-audit-OBLOGS1.md). Provides a
// reproducible measurement so config drift is detectable.
//
// Citations:
//   @cite docs/audits/2026-05-22-sitemap-audit-OBLOGS1.md
//   @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
//
// Usage:
//   npx tsx scripts/audit-sitemap-coverage.ts                 # all vendors with sitemap_xml_sources
//   npx tsx scripts/audit-sitemap-coverage.ts <vendor>        # single vendor
//   npx tsx scripts/audit-sitemap-coverage.ts --verbose       # print uncovered URLs

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { type AllowlistConfig } from "./lib/allowlist.js";
import { classify } from "./lib/sitemap-classify.js";
import { parseSitemapXml } from "./lib/sitemap-xml.js";

interface CrawlConfig extends AllowlistConfig {
  name: string;
  sitemap_xml_sources?: string[];
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");

const S1_THRESHOLD = 0.95;

interface VendorResult {
  vendor: string;
  total: number;
  allowed: number;
  denied: number;
  uncovered: string[];
  s1: number;
  passes: boolean;
}

function listVendors(filter?: string): string[] {
  if (!existsSync(VENDOR_ROOT)) return [];
  const all = readdirSync(VENDOR_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => existsSync(resolve(VENDOR_ROOT, n, "crawl.json")));
  return filter ? all.filter((n) => n === filter) : all;
}

function loadConfig(vendor: string): CrawlConfig {
  const path = resolve(VENDOR_ROOT, vendor, "crawl.json");
  return JSON.parse(readFileSync(path, "utf8")) as CrawlConfig;
}

async function auditVendor(vendor: string, verbose: boolean): Promise<VendorResult | null> {
  const cfg = loadConfig(vendor);
  if (!cfg.sitemap_xml_sources?.length) return null;

  // Fetch + parse every sitemap source. sitemap-index entries that
  // themselves contain <loc>https://.../sitemap.xml</loc> need recursion;
  // for the OBLOGS1 surface (claude.com, www.anthropic.com,
  // support.claude.com) these are flat sitemap.xml — recursion is a
  // follow-up.
  const urls = new Set<string>();
  for (const src of cfg.sitemap_xml_sources) {
    const r = await fetch(src);
    if (!r.ok) {
      console.error(`  fetch failed for ${src}: ${r.status}`);
      continue;
    }
    const body = await r.text();
    for (const u of parseSitemapXml(body)) urls.add(u);
  }

  const counts = { allowed: 0, denied: 0, uncovered: [] as string[] };
  for (const url of urls) {
    const k = classify(url, cfg);
    if (k === "uncovered") counts.uncovered.push(url);
    else counts[k] += 1;
  }

  const total = urls.size;
  const reachable = total - counts.denied;
  const s1 = reachable > 0 ? counts.allowed / reachable : 1;
  const passes = s1 >= S1_THRESHOLD;

  console.log(`\n=== ${vendor} ===`);
  console.log(`  total:     ${total}`);
  console.log(`  allowed:   ${counts.allowed}`);
  console.log(`  denied:    ${counts.denied}`);
  console.log(`  uncovered: ${counts.uncovered.length}`);
  console.log(`  S1 coverage: ${(s1 * 100).toFixed(1)}% (threshold ${(S1_THRESHOLD * 100).toFixed(0)}%) ${passes ? "PASS" : "FAIL"}`);
  if (verbose && counts.uncovered.length > 0) {
    console.log(`\n  Uncovered URLs:`);
    for (const u of counts.uncovered.sort()) console.log(`    ${u}`);
  }

  return {
    vendor,
    total,
    allowed: counts.allowed,
    denied: counts.denied,
    uncovered: counts.uncovered,
    s1,
    passes,
  };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose");
  const vendor = args.find((a) => !a.startsWith("--"));

  const vendors = listVendors(vendor);
  if (vendors.length === 0) {
    console.error(`No vendors found${vendor ? ` matching '${vendor}'` : ""}.`);
    process.exit(1);
  }

  const results: VendorResult[] = [];
  for (const v of vendors) {
    const r = await auditVendor(v, verbose);
    if (r) results.push(r);
  }

  if (results.length === 0) {
    console.log("\n(no vendors with sitemap_xml_sources)");
    process.exit(0);
  }

  console.log("\n=== summary ===");
  for (const r of results) {
    const status = r.passes ? "PASS" : "FAIL";
    console.log(
      `  ${r.vendor.padEnd(20)} ${status.padEnd(4)} s1=${(r.s1 * 100).toFixed(1)}% allowed=${r.allowed} uncovered=${r.uncovered.length}`,
    );
  }

  const anyFail = results.some((r) => !r.passes);
  process.exit(anyFail ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
