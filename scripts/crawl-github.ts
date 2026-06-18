#!/usr/bin/env tsx
// scripts/crawl-github.ts
//
// GitHub API-based org/repo crawler. Reads vendor/github.com/crawl.json,
// fetches markdown files from each repo via the GitHub API (no Cheerio —
// GitHub HTML is JS-rendered), and writes them to:
//
//   vendor/github.com/<org>/<repo>/<path>.md
//
// URL topology (branch segment is stripped):
//   raw.githubusercontent.com/<org>/<repo>/<branch>/<path>
//   → vendor/github.com/<org>/<repo>/<path>.md
//
// Strategies:
//   readme-only   — README.md only
//   readme+docs   — README.md + docs/**/*.md + CHANGELOG.md + CONTRIBUTING.md
//   full-tree     — all *.md + *.mdx files recursively (capped at 500 per repo)
//
// Auth: uses GITHUB_TOKEN env var or `gh auth token` CLI fallback.
// Rate limit: respects X-RateLimit-Remaining; sleeps on 429/403.
//
// @cite vendor/docs-github/crawl.json
// @cite scripts/lib/checksums.ts
// @cite scripts/lib/url-to-path.ts
// @cite vendor/github.com/crawl.json

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { loadChecksums, saveChecksums, type ChecksumMap } from "./lib/checksums.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
const GH_VENDOR = resolve(VENDOR_ROOT, "github.com");
const CRAWL_CFG = resolve(GH_VENDOR, "crawl.json");

// ── Types ─────────────────────────────────────────────────────────────────────

type Strategy = "readme-only" | "readme+docs" | "full-tree";

interface RepoSpec {
  strategy: Strategy;
}

interface OrgSpec {
  strategy_default: Strategy;
  repos: Record<string, RepoSpec>;
}

interface GithubCrawlConfig {
  orgs: Record<string, OrgSpec>;
  page_cap: number;
}

interface TreeItem {
  path: string;
  type: "blob" | "tree";
  sha: string;
  url: string;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

function getGithubToken(): string {
  if (process.env["GITHUB_TOKEN"]) return process.env["GITHUB_TOKEN"];
  try {
    return execSync("gh auth token", { encoding: "utf8" }).trim();
  } catch {
    console.warn("[github-crawl] No GITHUB_TOKEN and `gh auth token` failed — unauthenticated (60 req/h)");
    return "";
  }
}

const TOKEN = getGithubToken();

async function ghFetch(path: string): Promise<Response> {
  const url = path.startsWith("https://") ? path : `https://api.github.com${path}`;
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "knowledge-engineering-crawler/1.0",
  };
  if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

  let res = await fetch(url, { headers });

  // Respect rate limit
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("X-RateLimit-Reset");
    const waitMs = reset ? Math.max(0, parseInt(reset, 10) * 1000 - Date.now()) + 1000 : 60_000;
    console.warn(`[github-crawl] Rate limited — sleeping ${Math.ceil(waitMs / 1000)}s`);
    await new Promise((r) => setTimeout(r, waitMs));
    res = await fetch(url, { headers });
  }

  return res;
}

// ── Path helpers ──────────────────────────────────────────────────────────────

const GH_SLUG_RE = /^[a-zA-Z0-9._-]+$/;

// Topology: strip branch segment from raw.githubusercontent.com path.
// raw path: /<org>/<repo>/<branch>/<path> → <org>/<repo>/<path>.md
function repoFilePath(org: string, repo: string, filePath: string): string {
  if (!GH_SLUG_RE.test(org) || !GH_SLUG_RE.test(repo)) {
    throw new Error(`invalid org/repo slug: ${org}/${repo}`);
  }
  const clean = filePath.replace(/\.(md|mdx)$/, "") + ".md";
  const abs = resolve(GH_VENDOR, org, repo, clean);
  if (!abs.startsWith(GH_VENDOR + "/")) throw new Error(`path traversal rejected: ${filePath}`);
  return abs;
}

function isMarkdown(path: string): boolean {
  return /\.(md|mdx|markdown)$/i.test(path);
}

function isDocsPath(path: string): boolean {
  const lower = path.toLowerCase();
  return (
    lower.startsWith("docs/") ||
    lower === "changelog.md" ||
    lower === "contributing.md" ||
    lower === "readme.md" ||
    lower.startsWith("doc/") ||
    lower.startsWith("documentation/")
  );
}

// ── Per-repo crawl ────────────────────────────────────────────────────────────

async function crawlRepo(
  org: string,
  repo: string,
  strategy: Strategy,
  checksums: ChecksumMap,
): Promise<number> {
  const label = `${org}/${repo}`;
  console.log(`[${label}] strategy=${strategy}`);

  // 1. Fetch repo metadata for default branch
  const metaRes = await ghFetch(`/repos/${org}/${repo}`);
  if (!metaRes.ok) {
    console.warn(`[${label}] meta fetch failed: ${metaRes.status}`);
    return 0;
  }
  const meta = (await metaRes.json()) as { default_branch: string };
  const branch = meta.default_branch;

  // 2. Determine which files to fetch
  let targetPaths: string[] = [];

  if (strategy === "readme-only") {
    targetPaths = ["README.md"];
  } else if (strategy === "readme+docs") {
    // Use tree to find docs/**/*.md + CHANGELOG + CONTRIBUTING + README
    const treeRes = await ghFetch(`/repos/${org}/${repo}/git/trees/${branch}?recursive=1`);
    if (treeRes.ok) {
      const treeData = (await treeRes.json()) as { tree: TreeItem[]; truncated: boolean };
      if (treeData.truncated) {
        console.warn(`[${label}] tree truncated — falling back to readme-only`);
        targetPaths = ["README.md"];
      } else {
        targetPaths = treeData.tree
          .filter((t) => t.type === "blob" && isMarkdown(t.path) && isDocsPath(t.path))
          .map((t) => t.path);
        if (targetPaths.length === 0) targetPaths = ["README.md"];
      }
    } else {
      targetPaths = ["README.md"];
    }
  } else {
    // full-tree: all markdown files (cap 500)
    const treeRes = await ghFetch(`/repos/${org}/${repo}/git/trees/${branch}?recursive=1`);
    if (treeRes.ok) {
      const treeData = (await treeRes.json()) as { tree: TreeItem[]; truncated: boolean };
      if (treeData.truncated) {
        console.warn(`[${label}] tree truncated — fetching README only`);
        targetPaths = ["README.md"];
      } else {
        targetPaths = treeData.tree
          .filter((t) => t.type === "blob" && isMarkdown(t.path))
          .map((t) => t.path)
          .slice(0, 500);
      }
    } else {
      targetPaths = ["README.md"];
    }
  }

  // 3. Fetch and write each file
  let written = 0;
  for (const filePath of targetPaths) {
    const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${filePath}`;
    const cacheKey = `${org}/${repo}/${filePath}`;
    const existing = checksums[cacheKey];

    const headers: Record<string, string> = { "User-Agent": "knowledge-engineering-crawler/1.0" };
    if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;
    if (existing?.etag) headers["If-None-Match"] = existing.etag;

    const res = await fetch(rawUrl, { headers });

    if (res.status === 304) continue; // unchanged
    if (!res.ok) {
      if (res.status !== 404) console.warn(`[${label}] ${filePath}: ${res.status}`);
      continue;
    }

    const body = await res.text();
    const sha256 = createHash("sha256").update(body).digest("hex");

    // Skip if content unchanged (etag-less fallback)
    if (existing?.sha256 === sha256) {
      checksums[cacheKey] = { ...existing, lastStatus: 304 };
      continue;
    }

    const outPath = repoFilePath(org, repo, filePath);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, body, "utf8");

    checksums[cacheKey] = {
      sha256,
      etag: res.headers.get("etag") ?? undefined,
      lastModified: res.headers.get("last-modified") ?? undefined,
      lastStatus: 200,
    };
    written++;
  }

  console.log(`[${label}] ${written}/${targetPaths.length} files written`);
  return written;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const cfg = JSON.parse(readFileSync(CRAWL_CFG, "utf8")) as GithubCrawlConfig;
  const checksums = loadChecksums(VENDOR_ROOT, "github.com");

  // CLI: --org anthropics --repo claude-code (optional filter)
  const args = process.argv.slice(2);
  const orgFilter = args.includes("--org") ? args[args.indexOf("--org") + 1] : null;
  const repoFilter = args.includes("--repo") ? args[args.indexOf("--repo") + 1] : null;

  let totalWritten = 0;

  for (const [org, orgSpec] of Object.entries(cfg.orgs)) {
    if (orgFilter && org !== orgFilter) continue;

    for (const [repo, repoSpec] of Object.entries(orgSpec.repos)) {
      if (repoFilter && repo !== repoFilter) continue;

      const strategy = repoSpec.strategy ?? orgSpec.strategy_default ?? "readme-only";
      try {
        totalWritten += await crawlRepo(org, repo, strategy, checksums);
      } catch (err) {
        console.error(`[${org}/${repo}] error:`, err);
      }

      // Small delay between repos to be a polite crawler
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  saveChecksums(VENDOR_ROOT, "github.com", checksums);
  console.log(`\n[github-crawl] done — ${totalWritten} files written total`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
