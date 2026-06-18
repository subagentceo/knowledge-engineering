#!/usr/bin/env tsx
// scripts/crawl-registries.ts
//
// Registry API crawler for npmjs.com, pypi.org, and crates.io.
// Fetches package READMEs via JSON APIs (no HTML scraping needed).
//
// URL topology:
//   npm:    vendor/npmjs.com/<@scope/package>.md
//   pypi:   vendor/pypi.org/<package>.md
//   crates: vendor/crates.io/<crate>.md
//
// @cite vendor/npmjs.com/crawl.json
// @cite vendor/pypi.org/crawl.json
// @cite vendor/crates.io/crawl.json
// @cite scripts/lib/checksums.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { loadChecksums, saveChecksums } from "./lib/checksums.js";

function safeOutPath(base: string, relPath: string): string {
  const abs = resolve(base, relPath);
  if (!abs.startsWith(base + "/")) throw new Error(`path traversal rejected: ${relPath}`);
  return abs;
}

const GH_REPO_RE = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");

// ── npm registry ──────────────────────────────────────────────────────────────

interface NpmCrawlConfig {
  packages: Record<string, { path: string }>;
}

async function crawlNpm(): Promise<void> {
  const cfg = JSON.parse(
    readFileSync(resolve(VENDOR_ROOT, "npmjs.com/crawl.json"), "utf8"),
  ) as NpmCrawlConfig;
  const checksums = loadChecksums(VENDOR_ROOT, "npmjs.com");
  let written = 0;

  for (const [pkg, spec] of Object.entries(cfg.packages)) {
    const encoded = pkg.replace(/\//g, "%2F");
    const apiUrl = `https://registry.npmjs.org/${encoded}`;

    try {
      const res = await fetch(apiUrl, {
        headers: { "Accept": "application/json", "User-Agent": "knowledge-engineering-crawler/1.0" },
      });
      if (!res.ok) { console.warn(`[npm] ${pkg}: ${res.status}`); continue; }

      const data = (await res.json()) as {
        readme?: string;
        description?: string;
        "dist-tags"?: { latest?: string };
        versions?: Record<string, { readme?: string; description?: string }>;
      };

      const latest = data["dist-tags"]?.latest;
      const readme =
        data.readme ??
        (latest ? data.versions?.[latest]?.readme : undefined) ??
        data.description ??
        `# ${pkg}\n\nNo README available.`;

      const sha256 = createHash("sha256").update(readme).digest("hex");
      if (checksums[pkg]?.sha256 === sha256) continue;

      const outPath = safeOutPath(resolve(VENDOR_ROOT, "npmjs.com"), spec.path);
      mkdirSync(dirname(outPath), { recursive: true });

      const header = `<!-- source: https://registry.npmjs.org/ latest: ${latest ?? "unknown"} -->\n\n`;
      writeFileSync(outPath, header + readme, "utf8");

      checksums[pkg] = { sha256, lastStatus: 200 };
      written++;
      console.log(`[npm] ${pkg} → ${spec.path}`);
    } catch (err) {
      console.error(`[npm] ${pkg}:`, err);
    }

    await new Promise((r) => setTimeout(r, 100));
  }

  saveChecksums(VENDOR_ROOT, "npmjs.com", checksums);
  console.log(`[npm] done — ${written} packages written`);
}

// ── PyPI ──────────────────────────────────────────────────────────────────────

interface PypiCrawlConfig {
  packages: Record<string, { path: string }>;
}

async function crawlPypi(): Promise<void> {
  const cfg = JSON.parse(
    readFileSync(resolve(VENDOR_ROOT, "pypi.org/crawl.json"), "utf8"),
  ) as PypiCrawlConfig;
  const checksums = loadChecksums(VENDOR_ROOT, "pypi.org");
  let written = 0;

  for (const [pkg, spec] of Object.entries(cfg.packages)) {
    const apiUrl = `https://pypi.org/pypi/${pkg}/json`;

    try {
      const res = await fetch(apiUrl, {
        headers: { "Accept": "application/json", "User-Agent": "knowledge-engineering-crawler/1.0" },
      });
      if (!res.ok) { console.warn(`[pypi] ${pkg}: ${res.status}`); continue; }

      const data = (await res.json()) as {
        info: { description?: string; summary?: string; version?: string; home_page?: string };
        urls?: { url?: string }[];
      };

      const description =
        data.info.description && data.info.description !== "UNKNOWN"
          ? data.info.description
          : `# ${pkg}\n\n${data.info.summary ?? "No description available."}\n\nHomepage: ${data.info.home_page ?? ""}`;

      const sha256 = createHash("sha256").update(description).digest("hex");
      if (checksums[pkg]?.sha256 === sha256) continue;

      const outPath = safeOutPath(resolve(VENDOR_ROOT, "pypi.org"), spec.path);
      mkdirSync(dirname(outPath), { recursive: true });

      const header = `<!-- source: https://pypi.org/pypi/ version: ${data.info.version ?? "unknown"} -->\n\n`;
      writeFileSync(outPath, header + description, "utf8");

      checksums[pkg] = { sha256, lastStatus: 200 };
      written++;
      console.log(`[pypi] ${pkg} → ${spec.path}`);
    } catch (err) {
      console.error(`[pypi] ${pkg}:`, err);
    }

    await new Promise((r) => setTimeout(r, 100));
  }

  saveChecksums(VENDOR_ROOT, "pypi.org", checksums);
  console.log(`[pypi] done — ${written} packages written`);
}

// ── crates.io ─────────────────────────────────────────────────────────────────

interface CratesCrawlConfig {
  _user_agent_required: string;
  packages: Record<string, { path: string; github?: string }>;
}

async function crawlCrates(): Promise<void> {
  const cfg = JSON.parse(
    readFileSync(resolve(VENDOR_ROOT, "crates.io/crawl.json"), "utf8"),
  ) as CratesCrawlConfig;
  const checksums = loadChecksums(VENDOR_ROOT, "crates.io");
  // crates.io requires a descriptive User-Agent
  const ua = cfg._user_agent_required;
  let written = 0;

  for (const [crate, spec] of Object.entries(cfg.packages)) {
    const apiUrl = `https://crates.io/api/v1/crates/${crate}`;

    try {
      const res = await fetch(apiUrl, {
        headers: { "Accept": "application/json", "User-Agent": ua },
      });
      if (!res.ok) { console.warn(`[crates] ${crate}: ${res.status}`); continue; }

      const data = (await res.json()) as {
        crate: {
          description?: string;
          homepage?: string;
          repository?: string;
          newest_version?: string;
          readme?: string;
        };
      };

      // If crate has a github repo listed, try to fetch README from raw.githubusercontent.com
      let readme: string | null = null;
      const rawGhRepo = spec.github ?? data.crate.repository?.replace("https://github.com/", "");
      const ghRepo = rawGhRepo && GH_REPO_RE.test(rawGhRepo) ? rawGhRepo : null;

      if (ghRepo) {
        const base = "https://raw.githubusercontent.com";
        const mainRes = await fetch(`${base}/${ghRepo}/main/README.md`, { headers: { "User-Agent": ua } });
        if (mainRes.ok) readme = await mainRes.text();
        if (!readme) {
          const masterRes = await fetch(`${base}/${ghRepo}/master/README.md`, { headers: { "User-Agent": ua } });
          if (masterRes.ok) readme = await masterRes.text();
        }
      }

      if (!readme) {
        readme = `# ${crate}\n\n${data.crate.description ?? "No description."}\n\nRepository: ${data.crate.repository ?? ""}\n`;
      }

      const sha256 = createHash("sha256").update(readme).digest("hex");
      if (checksums[crate]?.sha256 === sha256) continue;

      const outPath = safeOutPath(resolve(VENDOR_ROOT, "crates.io"), spec.path);
      mkdirSync(dirname(outPath), { recursive: true });

      const header = `<!-- source: https://crates.io/api/v1/crates/ version: ${data.crate.newest_version ?? "unknown"} -->\n\n`;
      writeFileSync(outPath, header + readme, "utf8");

      checksums[crate] = { sha256, lastStatus: 200 };
      written++;
      console.log(`[crates] ${crate} → ${spec.path}`);
    } catch (err) {
      console.error(`[crates] ${crate}:`, err);
    }

    // crates.io rate limit: 1 req/s for authenticated, be polite
    await new Promise((r) => setTimeout(r, 1000));
  }

  saveChecksums(VENDOR_ROOT, "crates.io", checksums);
  console.log(`[crates] done — ${written} packages written`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const targets = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const run = (name: string) => targets.length === 0 || targets.includes(name);

  if (run("npm")) await crawlNpm();
  if (run("pypi")) await crawlPypi();
  if (run("crates")) await crawlCrates();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
