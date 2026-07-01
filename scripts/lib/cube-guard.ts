// scripts/lib/cube-guard.ts
// @cite infra/postgres/init/01-dw-schema.sql
// @cite infra/postgres/init/04-tailscale-pr-context.sql
// @cite scripts/lib/citation-guard.ts

import { readdirSync, readFileSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const SQL_DIR = resolve(REPO_ROOT, "infra", "postgres", "init");

// Valid Cube.js measure types per the Cube.js v0.35+ docs.
const VALID_MEASURE_TYPES = new Set([
  "count",
  "sum",
  "avg",
  "min",
  "max",
  "distinct_count",
  "ratio",
  "percentile",
]);

const VERSION_RE = /\d{4}\.\d{2}\.\d{2}/;
// @cube name=... (no dot after @cube — that's the cube block header)
const CUBE_NAME_RE = /^--\s*@cube name=/;
// @cube.measure line
const CUBE_MEASURE_RE = /^--\s*@cube\.measure\b/;
// CREATE TABLE IF NOT EXISTS dw.<name>
const CREATE_DW_TABLE_RE = /^\s*CREATE TABLE IF NOT EXISTS\s+dw\./i;

export interface CubeGuardFinding {
  file: string;
  line: number;
  reason:
    | "missing-cube-block"
    | "invalid-measure-type"
    | "missing-version";
  detail: string;
}

export function checkSql(
  content: string,
  fileName: string,
): CubeGuardFinding[] {
  const lines = content.split("\n");
  const findings: CubeGuardFinding[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // --- Req 2: every CREATE TABLE IF NOT EXISTS dw.* must have
    //     a @cube name=... block in the 30 lines before it.
    if (CREATE_DW_TABLE_RE.test(line)) {
      const windowStart = Math.max(0, i - 30);
      const window = lines.slice(windowStart, i);
      const hasCubeBlock = window.some((l) => CUBE_NAME_RE.test(l));
      if (!hasCubeBlock) {
        findings.push({
          file: fileName,
          line: i + 1,
          reason: "missing-cube-block",
          detail: `CREATE TABLE at line ${i + 1} has no @cube name= block in the preceding 30 lines`,
        });
      }
    }

    // --- Req 3: every @cube.measure line must contain type:<valid-type>
    if (CUBE_MEASURE_RE.test(line)) {
      const typeMatch = line.match(/\btype:(\S+)/);
      if (!typeMatch) {
        findings.push({
          file: fileName,
          line: i + 1,
          reason: "invalid-measure-type",
          detail: `@cube.measure at line ${i + 1} is missing type: annotation`,
        });
      } else {
        const measureType = typeMatch[1].replace(/[.,)]+$/, "");
        if (!VALID_MEASURE_TYPES.has(measureType)) {
          findings.push({
            file: fileName,
            line: i + 1,
            reason: "invalid-measure-type",
            detail: `@cube.measure at line ${i + 1} has invalid type:${measureType} (valid: ${[...VALID_MEASURE_TYPES].join("|")})`,
          });
        }
      }
    }

    // --- Req 4: every @cube name= line must have version= matching \d{4}\.\d{2}\.\d{2}
    if (CUBE_NAME_RE.test(line)) {
      if (!line.includes("version=")) {
        findings.push({
          file: fileName,
          line: i + 1,
          reason: "missing-version",
          detail: `@cube name= at line ${i + 1} is missing version=`,
        });
      } else {
        const versionMatch = line.match(/version=(\S+)/);
        const version = versionMatch ? versionMatch[1].replace(/[.,)]+$/, "") : "";
        if (!VERSION_RE.test(version)) {
          findings.push({
            file: fileName,
            line: i + 1,
            reason: "missing-version",
            detail: `@cube name= at line ${i + 1} has malformed version="${version}" (expected YYYY.MM.DD)`,
          });
        }
      }
    }
  }

  return findings;
}

export function runCubeGuard(): {
  ok: boolean;
  checked: number;
  findings: CubeGuardFinding[];
} {
  let entries: import("node:fs").Dirent<string>[];
  try {
    entries = readdirSync(SQL_DIR, { withFileTypes: true, encoding: "utf8" });
  } catch {
    // Directory absent — trivially green (no SQL to check).
    return { ok: true, checked: 0, findings: [] };
  }

  const sqlFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".sql"))
    .map((e) => resolve(SQL_DIR, e.name));

  const findings: CubeGuardFinding[] = [];
  for (const filePath of sqlFiles) {
    const content = readFileSync(filePath, "utf8");
    const rel = relative(REPO_ROOT, filePath);
    findings.push(...checkSql(content, rel));
  }

  return { ok: findings.length === 0, checked: sqlFiles.length, findings };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = runCubeGuard();
  if (result.checked === 0) {
    console.log("cube-guard: no SQL files found (trivially green)");
    process.exit(0);
  }
  if (!result.ok) {
    console.error(
      `cube-guard: ${result.findings.length} issue(s) across ${result.checked} SQL file(s)`,
    );
    for (const f of result.findings) {
      console.error(`  ${f.file}:${f.line}: ${f.reason} — ${f.detail}`);
    }
    process.exit(1);
  }
  console.log(
    `cube-guard: ${result.checked} SQL file(s) checked, all @cube annotations valid`,
  );
}
