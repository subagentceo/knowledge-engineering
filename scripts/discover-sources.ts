#!/usr/bin/env tsx
// scripts/discover-sources.ts
//
// Phase 7. Refreshes seeds/discovered-sources.json by querying the GitHub
// REST API for org:anthropics + org:modelcontextprotocol repos. Plus a
// drift-check that warns when a vendor in vendor/<name>/ doesn't appear
// in either org (intentional — most vendors are independent companies).
//
// Citations:
//   @cite vendor/anthropics/claude.com/docs/connectors/building.md (Phase 12)
//   @cite seeds/posture/session-start.xml
//
// Usage:
//   GITHUB_TOKEN=<pat> npm run discover:sources       # writes seeds/discovered-sources.json
//   npm run discover:sources -- --check               # drift check only; doesn't write
//
// Auth:
//   - With GITHUB_TOKEN: 5000 req/hour
//   - Without: 60 req/hour (anonymous; will likely succeed for the
//     handful of search calls we make)

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SNAPSHOT = resolve(REPO_ROOT, "seeds", "discovered-sources.json");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");

const TOKEN = process.env.GITHUB_TOKEN;
const ORGS = ["anthropics", "modelcontextprotocol"] as const;

interface Repo {
  name: string;
  stars: number;
  topics: string[];
  description: string | null;
}

interface OrgSnapshot {
  total_count: number;
  snapshot_count: number;
  repos: Repo[];
}

async function searchOrg(org: string, perPage = 30): Promise<OrgSnapshot> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const q = encodeURIComponent(`org:${org} fork:false archived:false`);
  const r = await fetch(
    `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=${perPage}`,
    { headers }
  );
  if (!r.ok) throw new Error(`GitHub search failed for ${org}: ${r.status} ${await r.text()}`);
  const json = (await r.json()) as {
    total_count: number;
    items: Array<{
      name: string;
      stargazers_count: number;
      topics?: string[];
      description: string | null;
    }>;
  };
  return {
    total_count: json.total_count,
    snapshot_count: json.items.length,
    repos: json.items.map((i) => ({
      name: i.name,
      stars: i.stargazers_count,
      topics: i.topics ?? [],
      description: i.description,
    })),
  };
}

function listVendors(): string[] {
  if (!existsSync(VENDOR_ROOT)) return [];
  return readdirSync(VENDOR_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(resolve(VENDOR_ROOT, e.name, "crawl.json")))
    .map((e) => e.name)
    .sort();
}

function driftCheck(snapshot: Record<string, OrgSnapshot>): string[] {
  const vendors = listVendors();
  const warnings: string[] = [];
  // Drift check: vendor names that match a known org repo (e.g., we
  // crawl "modelcontextprotocol" and the org has a "modelcontextprotocol"
  // repo). Mostly informational — most vendors are independent companies.
  for (const org of ORGS) {
    const orgRepoNames = new Set(snapshot[org]?.repos.map((r) => r.name) ?? []);
    for (const v of vendors) {
      if (orgRepoNames.has(v)) {
        // OK — vendor name matches an org repo (informational).
        continue;
      }
    }
  }
  // Specific drift: an org repo with topic "claude-code" + "skills"
  // suggests it's a plugin marketplace; warn if .claude/plugins.json
  // doesn't list it.
  const pluginManifestPath = resolve(REPO_ROOT, ".claude", "plugins.json");
  let pluginList: string[] = [];
  if (existsSync(pluginManifestPath)) {
    try {
      const m = JSON.parse(readFileSync(pluginManifestPath, "utf8")) as {
        marketplaces?: Array<{ repo: string }>;
      };
      pluginList = m.marketplaces?.map((mp) => mp.repo) ?? [];
    } catch {
      // ignore
    }
  }
  for (const org of ORGS) {
    for (const repo of snapshot[org]?.repos ?? []) {
      const isMarketplace = repo.topics.includes("claude-code") && repo.topics.includes("skills");
      if (!isMarketplace) continue;
      const fqn = `${org}/${repo.name}`;
      if (!pluginList.includes(fqn)) {
        warnings.push(`marketplace candidate not in .claude/plugins.json: ${fqn} (★${repo.stars}, topics: ${repo.topics.join(",")})`);
      }
    }
  }
  return warnings;
}

async function main(): Promise<void> {
  const checkOnly = process.argv.includes("--check");

  // Read current snapshot for drift check (works without network).
  const cur = existsSync(SNAPSHOT)
    ? (JSON.parse(readFileSync(SNAPSHOT, "utf8")) as Record<string, unknown>)
    : null;

  if (checkOnly && cur) {
    const snap = cur as Record<string, OrgSnapshot>;
    const warnings = driftCheck(snap);
    console.log(`drift check (snapshot from ${(cur as { discovered_at?: string }).discovered_at}):`);
    if (warnings.length === 0) {
      console.log("  no drift detected");
      return;
    }
    for (const w of warnings) console.log(`  ::warning::${w}`);
    return;
  }

  // Live refresh: requires network.
  console.log(`discover:sources — ${TOKEN ? "authenticated" : "anonymous (60 req/hr)"}`);
  const snapshot: Record<string, OrgSnapshot> = {};
  for (const org of ORGS) {
    console.log(`  fetching org:${org}...`);
    snapshot[org] = await searchOrg(org);
    console.log(`    total=${snapshot[org].total_count} snapshot=${snapshot[org].snapshot_count}`);
  }

  const warnings = driftCheck(snapshot);
  const out = {
    discovered_at: new Date().toISOString(),
    discovered_via: TOKEN ? "GitHub REST + GITHUB_TOKEN" : "GitHub REST (anonymous)",
    ...snapshot,
    drift_check: {
      vendors_in_repo: listVendors(),
      warnings,
    },
  };

  writeFileSync(SNAPSHOT, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${SNAPSHOT}`);
  for (const w of warnings) console.log(`  ::warning::${w}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
