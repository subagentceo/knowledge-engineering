/**
 * @tdd green
 *
 * Guards the OPM1 preflight against the one way it can silently betray its
 * purpose: drifting from the conventions gate it claims to mirror. If the
 * CONVENTIONAL_RE in preflight-pr.ts and conventions.test.ts ever diverge,
 * preflight would pass commits CI then rejects (or vice-versa) — the exact
 * wasted-round-trip OPM1 exists to prevent. This asserts they are byte-equal.
 *
 * Subjects under guard (listed in prose because citation-guard restricts
 * citation headers to vendor/seeds/rubrics targets): scripts/preflight-pr.ts
 * (the script under guard) and src/lib/conventions.test.ts (the canonical
 * CONVENTIONAL_RE source).
 *
 * @cite rubrics/phase-I.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 */
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

function extractConventionalRe(file: string): string {
  const src = readFileSync(resolve(repoRoot, file), "utf8");
  // Capture the single-line regex literal assigned to CONVENTIONAL_RE,
  // tolerating the `=` being on the next line (prettier wraps long consts).
  const m = src.match(/CONVENTIONAL_RE\s*=\s*(\/\^.*\$\/)\s*;/s);
  assert.ok(m, `CONVENTIONAL_RE literal not found in ${file}`);
  return m[1].replace(/\s*\n\s*/g, "");
}

test("preflight CONVENTIONAL_RE is byte-equal to conventions.test.ts", () => {
  const fromPreflight = extractConventionalRe("scripts/preflight-pr.ts");
  const fromConventions = extractConventionalRe("src/lib/conventions.test.ts");
  assert.equal(
    fromPreflight,
    fromConventions,
    "preflight's commit-convention regex has drifted from the canonical source; " +
      "re-copy CONVENTIONAL_RE from src/lib/conventions.test.ts into scripts/preflight-pr.ts.",
  );
});

test("the shared regex accepts a valid outcome-id subject and rejects a bare one", () => {
  const re = new RegExp(extractConventionalRe("scripts/preflight-pr.ts").slice(1, -1));
  assert.ok(re.test("feat(preflight): mirror ruleset gates locally (OPM1)"));
  assert.ok(!re.test("fix(test): add @tdd green tag dropped during rebase"));
});
