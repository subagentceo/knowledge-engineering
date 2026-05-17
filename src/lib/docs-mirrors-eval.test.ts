/**
 * Evaluation harness for OPR3 docs-mirrors consumption layer.
 *
 * Outcome (OPR3): the `third_party/docs-mirrors/` catalog drives a
 * deterministic, URL-shape-correct fetch step for each entry kind:
 *
 *   - kind=page-md      → URL is the page slug; fetcher MUST append `/index.md`
 *   - kind=llms-index   → URL is verbatim, ends in `/llms.txt`
 *   - kind=llms-full    → URL is verbatim, ends in `/llms-full.txt`
 *   - kind=submodule    → no URL constraint (git submodule path)
 *
 * This harness asserts that contract from two angles:
 *   (a) static: if `third_party/docs-mirrors/sources.yaml` exists, every
 *       entry's URL matches the rule for its kind.
 *   (b) dynamic: if `scripts/fetch-cloudflare-docs.sh` exists, invoke it
 *       with `MSA_DRY_RUN=1` via execFileSync (no shell, argv-only) and
 *       assert each printed curl URL matches the rule.
 *
 * If neither file exists (OPR3 hasn't merged on this branch), both groups
 * report SKIPPED and the test exits 0 — green by construction so the eval
 * lands ahead of the producing PR without coupling.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/best-practices.md
 * @cite seeds/citations/define-outcomes.md
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const SOURCES_YAML = resolve(REPO_ROOT, "third_party/docs-mirrors/sources.yaml");
const FETCH_SCRIPT = resolve(REPO_ROOT, "scripts/fetch-cloudflare-docs.sh");

let passed = 0;
let failed = 0;
let skipped = 0;
let asserted = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    asserted += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function skip(name: string, reason: string): void {
  skipped += 1;
  console.log(`  ⊘ SKIP ${name} — ${reason}`);
}

interface Entry {
  kind: string;
  url?: string;
  name?: string;
}

/**
 * Minimal regex parser for the YAML shape we expect — a top-level
 * `sources:` list of items with `name/kind/url` keys. Mirrors the
 * "tight regex, no new deps" stance from src/lib/vendor-catalog.test.ts.
 */
function parseSources(yaml: string): Entry[] {
  const entries: Entry[] = [];
  const lines = yaml.split(/\r?\n/);
  let current: Entry | null = null;
  for (const raw of lines) {
    const line = raw.replace(/\t/g, "  ");
    const itemStart = /^\s*-\s+(.*)$/.exec(line);
    if (itemStart) {
      if (current) entries.push(current);
      current = {};
      const rest = itemStart[1];
      const kv = /^(\w+)\s*:\s*"?([^"#]*?)"?\s*(#.*)?$/.exec(rest);
      if (kv) (current as Record<string, string>)[kv[1]] = kv[2].trim();
      continue;
    }
    const kv = /^\s+(\w+)\s*:\s*"?([^"#]*?)"?\s*(#.*)?$/.exec(line);
    if (kv && current) (current as Record<string, string>)[kv[1]] = kv[2].trim();
  }
  if (current) entries.push(current);
  return entries.filter((e) => e.kind);
}

// ────────────────────────────────────────────────────────────────────
// (a) Static catalog shape

if (!existsSync(SOURCES_YAML)) {
  skip("static catalog shape", `third_party/docs-mirrors/sources.yaml not present (OPR3 not merged)`);
} else {
  const yaml = readFileSync(SOURCES_YAML, "utf8");
  const entries = parseSources(yaml);
  check("sources.yaml parses to >=1 entry", () => {
    if (entries.length === 0) throw new Error("no entries parsed from sources.yaml");
  });
  for (const e of entries) {
    const tag = `${e.kind} ${e.name ?? e.url ?? "(unnamed)"}`;
    if (e.kind === "page-md") {
      check(`${tag}: url must NOT end in /index.md`, () => {
        if (!e.url) throw new Error("missing url");
        if (e.url.endsWith("/index.md")) throw new Error(`page-md url should be a slug, not '${e.url}'`);
      });
    } else if (e.kind === "llms-index") {
      check(`${tag}: url must end in /llms.txt`, () => {
        if (!e.url) throw new Error("missing url");
        if (!e.url.endsWith("/llms.txt")) throw new Error(`llms-index url must end in /llms.txt, got '${e.url}'`);
      });
    } else if (e.kind === "llms-full") {
      check(`${tag}: url must end in /llms-full.txt`, () => {
        if (!e.url) throw new Error("missing url");
        if (!e.url.endsWith("/llms-full.txt")) throw new Error(`llms-full url must end in /llms-full.txt, got '${e.url}'`);
      });
    } else if (e.kind === "submodule") {
      check(`${tag}: submodule (no URL constraint)`, () => {});
    } else {
      check(`${tag}: kind is recognized`, () => {
        throw new Error(`unknown kind '${e.kind}'`);
      });
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// (b) Dry-run fetcher output shape
//
// execFileSync with argv (no shell). MSA_DRY_RUN=1 is the contract the
// fetcher must respect: print intended curl invocations, do not perform
// network IO.

if (!existsSync(FETCH_SCRIPT)) {
  skip("dry-run fetcher shape", `scripts/fetch-cloudflare-docs.sh not present (OPR3 not merged)`);
} else {
  let stdout = "";
  let runOk = true;
  try {
    stdout = execFileSync("bash", [FETCH_SCRIPT], {
      env: { ...process.env, MSA_DRY_RUN: "1" },
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    runOk = false;
    check("dry-run fetcher exits cleanly", () => {
      throw new Error(`fetch script failed under MSA_DRY_RUN=1: ${(err as Error).message}`);
    });
  }
  if (runOk) {
    const lines = stdout.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const urlRe = /(https?:\/\/\S+)/;
    const kindRe = /\b(page-md|llms-index|llms-full|submodule)\b/;
    const dataLines = lines.filter((l) => urlRe.test(l) && kindRe.test(l));
    check("dry-run produced >=1 kind+URL data line", () => {
      if (dataLines.length === 0) throw new Error(`no kind+URL lines in stdout:\n${stdout}`);
    });
    for (const line of dataLines) {
      const kind = kindRe.exec(line)![1];
      const url = urlRe.exec(line)![1];
      if (kind === "page-md") {
        check(`dry-run page-md url ends in /index.md: ${url}`, () => {
          if (!url.endsWith("/index.md")) throw new Error(`page-md fetcher URL must end in /index.md, got '${url}'`);
        });
      } else if (kind === "llms-index") {
        check(`dry-run llms-index url verbatim ends in /llms.txt: ${url}`, () => {
          if (!url.endsWith("/llms.txt")) throw new Error(`llms-index URL must end verbatim in /llms.txt, got '${url}'`);
          if (url.endsWith("/index.md")) throw new Error(`llms-index URL must not have /index.md appended`);
        });
      } else if (kind === "llms-full") {
        check(`dry-run llms-full url verbatim ends in /llms-full.txt: ${url}`, () => {
          if (!url.endsWith("/llms-full.txt")) throw new Error(`llms-full URL must end verbatim in /llms-full.txt, got '${url}'`);
          if (url.endsWith("/index.md")) throw new Error(`llms-full URL must not have /index.md appended`);
        });
      }
    }
  }
}

console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped (asserted groups: ${asserted > 0 ? "yes" : "no"})`);
if (failed > 0) process.exit(1);
