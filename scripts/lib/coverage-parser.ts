/**
 * lcov.info parser for the Phase B coverage threshold gate.
 *
 * Per founder primitive P4 (harness-thins) + D4 (≤300 LOC orchestration):
 * pure functions, no disk I/O at the boundary, no parsing dep. lcov is a
 * line-oriented format with a tiny grammar (TN/SF/LF/LH/end_of_record);
 * a 20-line regex-free reader is sufficient.
 *
 * Phase B / O-B3 — paired with scripts/lib/coverage-parser.test.ts
 * (TDD red+green).
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */

export interface FileCoverage {
  readonly path: string;
  readonly lines: number;
  readonly hits: number;
  readonly percent: number;
}

export function parseLcov(body: string): ReadonlyArray<FileCoverage> {
  const out: FileCoverage[] = [];
  let path = "";
  let lines = 0;
  let hits = 0;
  let inRecord = false;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line === "" || line === "TN:") continue;
    if (line === "end_of_record") {
      if (inRecord) {
        const percent = lines === 0 ? 100 : Math.round((hits / lines) * 100);
        out.push({ path, lines, hits, percent });
      }
      path = "";
      lines = 0;
      hits = 0;
      inRecord = false;
      continue;
    }
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const tag = line.slice(0, colon);
    const value = line.slice(colon + 1);
    if (tag === "SF") {
      path = value;
      inRecord = true;
    } else if (tag === "LF") {
      lines = Number(value) || 0;
    } else if (tag === "LH") {
      hits = Number(value) || 0;
    }
  }
  return out;
}

export function filesBelowThreshold(
  files: ReadonlyArray<FileCoverage>,
  threshold: number,
): ReadonlyArray<FileCoverage> {
  return files.filter((f) => f.percent < threshold);
}
