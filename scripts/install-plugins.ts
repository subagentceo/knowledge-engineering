// scripts/install-plugins.ts
//
// Phase 7.B (issue #41) — real materializer. Shallow-clones marketplace
// plugin subtrees into `.claude/plugins/<slug>/` and reports state.
//
// Citations:
//   @cite vendor/anthropics/claude.com/docs/cowork/guide/plugins.md
//   @cite rubrics/phase-7.md
//
// Behavior:
//   - Reads `.claude/plugins.json`.
//   - Reports manifest summary (existing reporter behavior preserved).
//   - For any entry with both `marketplace` AND `plugin` fields:
//       1. Resolve marketplace's repo URL + ref.
//       2. `git clone --depth 1 --filter=blob:none --sparse <repo-url>` → tmp dir.
//       3. `git sparse-checkout set <plugin>` to limit fetch.
//       4. Copy `<tmp>/<plugin>/` → `.claude/plugins/<slug>/`.
//       5. Record resolved SHA in `.claude/plugins/<slug>/.sha`.
//       6. If `.sha` already matches → skip (idempotent).
//   - Existing event-listener / language-server / skill / mcp-server kinds
//     are not marketplace plugins; they're reported but never materialized.
//
// Wired as `npm run install:plugins`. Re-running is idempotent.

import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = resolve(REPO_ROOT, ".claude", "plugins.json");
const PLUGINS_DIR = resolve(REPO_ROOT, ".claude", "plugins");

export interface Marketplace {
  name: string;
  repo: string;
  ref: string;
  comment?: string;
}

export interface InstallEntry {
  kind: "event-listener" | "language-server" | "skill" | "mcp-server" | "marketplace-plugin";
  name: string;
  implementation?: string;
  package?: string;
  /** Name of a marketplace in {@link Manifest.marketplaces}. */
  marketplace?: string;
  /** Slug of the plugin within the marketplace repo (subdirectory name). */
  plugin?: string;
  stage?: "planned" | "installed";
  comment?: string;
}

export interface Manifest {
  marketplaces: Marketplace[];
  install: InstallEntry[];
}

export function load(): Manifest {
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
}

function findMarketplace(manifest: Manifest, name: string): Marketplace | null {
  return manifest.marketplaces.find((m) => m.name === name) ?? null;
}

/**
 * Resolves the SHA currently materialized for a plugin, or null if not
 * installed. Stored at `.claude/plugins/<slug>/.sha`.
 */
function readInstalledSha(slug: string): string | null {
  const shaPath = resolve(PLUGINS_DIR, slug, ".sha");
  if (!existsSync(shaPath)) return null;
  return readFileSync(shaPath, "utf8").trim();
}

/**
 * Shallow-clone a marketplace and sparse-checkout a single plugin
 * subtree, then copy into `.claude/plugins/<slug>/`. Returns the SHA of
 * the cloned tree.
 *
 * Uses git's blobless + sparse pattern to minimize bandwidth — only the
 * commit graph and the requested subtree are fetched.
 *
 * Returns null if the materialization is a no-op (already at target SHA).
 */
export function materializePlugin(
  manifest: Manifest,
  entry: InstallEntry,
  opts: { runGit?: (cmd: string, cwd?: string) => string; runCopy?: (from: string, to: string) => void } = {},
): { slug: string; sha: string; status: "installed" | "unchanged" } | null {
  if (!entry.marketplace || !entry.plugin) {
    return null; // not a marketplace plugin
  }

  const slug = entry.plugin;
  const market = findMarketplace(manifest, entry.marketplace);
  if (!market) {
    throw new Error(`unknown marketplace: ${entry.marketplace}`);
  }

  const runGit = opts.runGit ?? ((cmd: string, cwd?: string): string =>
    execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).toString().trim());
  const runCopy = opts.runCopy ?? ((from: string, to: string): void => {
    if (existsSync(to)) rmSync(to, { recursive: true, force: true });
    cpSync(from, to, { recursive: true });
  });

  const repoUrl = `https://github.com/${market.repo}.git`;
  const tmpRoot = mkdtempSync(join(tmpdir(), `plugins-${slug}-`));

  try {
    // 1. Resolve the ref → SHA without a full clone.
    const lsRemoteOut = runGit(`git ls-remote ${repoUrl} ${market.ref}`);
    const sha = lsRemoteOut.split(/\s+/)[0];
    if (!sha || sha.length < 40) {
      throw new Error(`failed to resolve SHA for ${market.repo}@${market.ref} (got: ${lsRemoteOut})`);
    }

    // 2. Idempotency: skip if already at this SHA.
    const installed = readInstalledSha(slug);
    if (installed === sha) {
      return { slug, sha, status: "unchanged" };
    }

    // 3. Shallow-clone with blob filter + sparse checkout.
    runGit(`git clone --depth 1 --filter=blob:none --sparse --branch ${market.ref} ${repoUrl} ${tmpRoot}/clone`);
    runGit(`git sparse-checkout set ${slug}`, `${tmpRoot}/clone`);

    const srcPath = resolve(tmpRoot, "clone", slug);
    if (!existsSync(srcPath)) {
      throw new Error(`plugin ${slug} not found in marketplace ${market.repo}`);
    }

    const destPath = resolve(PLUGINS_DIR, slug);
    mkdirSync(dirname(destPath), { recursive: true });
    runCopy(srcPath, destPath);
    writeFileSync(resolve(destPath, ".sha"), `${sha}\n`);

    return { slug, sha, status: "installed" };
  } finally {
    if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  }
}

export function reportInstallState(): { ok: boolean; manifest: Manifest } {
  const manifest = load();
  console.log("plugins manifest:");
  console.log("  marketplaces:");
  for (const m of manifest.marketplaces) {
    console.log(`    ${m.name.padEnd(16)} → ${m.repo}@${m.ref}`);
  }
  console.log("  install:");
  const byStage = { planned: 0, installed: 0 };
  for (const i of manifest.install) {
    const stage = i.stage ?? (i.implementation ? "installed" : "planned");
    byStage[stage] = (byStage[stage] ?? 0) + 1;
    const target = i.package ?? i.implementation ?? `${i.marketplace}/${i.plugin ?? i.name}`;
    console.log(`    [${stage.padEnd(9)}] ${i.kind.padEnd(20)} ${i.name.padEnd(20)} ← ${target}`);
  }
  console.log(`\nsummary: ${byStage.installed} installed, ${byStage.planned} planned`);
  return { ok: true, manifest };
}

/**
 * Walks the manifest's install array, materializes any marketplace-plugin
 * entry into `.claude/plugins/<slug>/`. Idempotent. Non-marketplace entries
 * are reported, not fetched.
 */
export function installAll(): { materialized: number; unchanged: number; skipped: number } {
  const manifest = load();
  let materialized = 0;
  let unchanged = 0;
  let skipped = 0;

  for (const entry of manifest.install) {
    if (entry.kind !== "marketplace-plugin" || !entry.plugin || !entry.marketplace) {
      skipped += 1;
      continue;
    }
    const result = materializePlugin(manifest, entry);
    if (!result) {
      skipped += 1;
    } else if (result.status === "installed") {
      console.log(`  ✓ installed ${result.slug} @ ${result.sha.slice(0, 7)}`);
      materialized += 1;
    } else {
      console.log(`  · unchanged ${result.slug} @ ${result.sha.slice(0, 7)}`);
      unchanged += 1;
    }
  }

  console.log(
    `\ninstall:plugins: ${materialized} installed, ${unchanged} unchanged, ${skipped} skipped (non-marketplace)`,
  );
  return { materialized, unchanged, skipped };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  reportInstallState();
  console.log("");
  installAll();
}
