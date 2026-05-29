/**
 * osv-autofix — turn a red OSV-Scanner result into a minimal dependency bump,
 * the same move made by hand for #285 on the 2026-05-29 train (OPM2). Keeps
 * `main` continuously OSV-clean so an advisory never silently blocks the
 * whole PR queue.
 *
 * Strategy, per affected lockfile:
 *   1. `npm update <pkg> --package-lock-only` — moves the dep within its
 *      existing semver range (fixes the common case).
 *   2. If the parent hard-pins it below the patched version, add an
 *      `overrides` entry (`>=<fixed>`) and relock. This is exactly why
 *      `ws` needed an override under miniflare on #285.
 *
 * Input: the OSV-Scanner table on stdin (or a --vuln flag). Each row names
 * pkg / fixed-version / lockfile. This script does NOT call the network for
 * advisories; it acts on what the scanner already reported, so CI's
 * `OSV-Scanner (PR)` remains the source of truth.
 *
 * Usage:
 *   osv-scanner --format json ... | npm run -s osv:autofix
 *   npm run -s osv:autofix -- --pkg ws --fixed 8.20.1 --lockfile frontend/package-lock.json
 *
 * @cite vendor/osv-scanner/google.github.io/osv-scanner/configuration/index.md
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

interface Fix {
  pkg: string;
  fixed: string;
  lockfile: string;
}

function parseArgs(argv: string[]): Fix | null {
  const get = (flag: string) => {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const pkg = get("--pkg");
  const fixed = get("--fixed");
  const lockfile = get("--lockfile");
  if (pkg && fixed && lockfile) return { pkg, fixed, lockfile };
  return null;
}

/** Parse the OSV-Scanner text table piped on stdin into Fix rows. */
function parseOsvTable(text: string): Fix[] {
  const fixes: Fix[] = [];
  for (const line of text.split("\n")) {
    // | https://osv.dev/GHSA-... | 4.4 | npm | ws (dev) | 8.18.0 | 8.20.1 | frontend/package-lock.json |
    if (!line.includes("osv.dev") || !line.includes("npm")) continue;
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length < 7) continue;
    const pkg = cells[3].replace(/\s*\(dev\)\s*$/, "").trim();
    const fixed = cells[5].trim();
    const lockfile = cells[6].trim();
    if (pkg && fixed && fixed !== "-" && lockfile.endsWith("package-lock.json")) {
      fixes.push({ pkg, fixed, lockfile });
    }
  }
  return fixes;
}

function workspaceDirFor(lockfile: string): string {
  return dirname(resolve(REPO_ROOT, lockfile));
}

function lockedVersion(lockfile: string, pkg: string): string | null {
  const lock = JSON.parse(readFileSync(resolve(REPO_ROOT, lockfile), "utf8")) as {
    packages?: Record<string, { version?: string }>;
  };
  return lock.packages?.[`node_modules/${pkg}`]?.version ?? null;
}

function gte(a: string, b: string): boolean {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return true;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return false;
  }
  return true;
}

function applyFix(fix: Fix): void {
  const dir = workspaceDirFor(fix.lockfile);
  process.stdout.write(`→ ${fix.pkg} → >=${fix.fixed} in ${fix.lockfile}\n`);
  execSync(`npm update ${fix.pkg} --package-lock-only`, { cwd: dir, stdio: "pipe" });
  const after = lockedVersion(fix.lockfile, fix.pkg);
  if (after && gte(after, fix.fixed)) {
    process.stdout.write(`  ✓ npm update reached ${after}\n`);
    return;
  }
  // Parent hard-pins below the fix → add an overrides entry.
  const pkgJsonPath = resolve(dir, "package.json");
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8")) as {
    overrides?: Record<string, string>;
  };
  pkgJson.overrides = pkgJson.overrides ?? {};
  pkgJson.overrides[fix.pkg] = `>=${fix.fixed}`;
  writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
  execSync("npm install --package-lock-only", { cwd: dir, stdio: "pipe" });
  const after2 = lockedVersion(fix.lockfile, fix.pkg);
  process.stdout.write(`  ✓ added overrides["${fix.pkg}"]=">=${fix.fixed}", now ${after2}\n`);
}

const single = parseArgs(process.argv.slice(2));
let fixes: Fix[];
if (single) {
  fixes = [single];
} else {
  const stdin = existsSync("/dev/stdin") ? readFileSync(0, "utf8") : "";
  fixes = parseOsvTable(stdin);
}

if (fixes.length === 0) {
  process.stdout.write("osv-autofix: no actionable npm advisories found (clean, or no fixed version available).\n");
  process.exit(0);
}

for (const fix of fixes) applyFix(fix);
process.stdout.write(
  `\nosv-autofix: applied ${fixes.length} bump(s). Review the lockfile diff, then commit as ` +
    `\`fix(deps): bump <pkgs> to clear OSV advisories (OPM2)\` and open a PR.\n`,
);
