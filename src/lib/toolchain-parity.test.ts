/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
 * @tdd green
 *
 * Spec data: docs/data/toolchain-parity.json (codified from the agent-setup
 * cloud-sandbox reference cited above).
 *
 * Parity table shape + checker behavior. The table is the codified
 * cloud-sandbox spec; the checker is what doctor.sh runs against probed
 * host state to fail fast on silent toolchain degradation.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  type ParityTable,
  type ProbeState,
  checkAll,
  checkLanguages,
  passes,
  failures,
  versionGte,
} from "./toolchain-parity.js";

const table = JSON.parse(
  readFileSync("docs/data/toolchain-parity.json", "utf8"),
) as ParityTable;

const POSTURES = new Set(["REQUIRED", "OPTIONAL", "NA"]);

test("parity table has the codified-spec shape", () => {
  assert.equal(typeof table.version, "number");
  for (const key of ["languages", "managers", "databases", "utilities"] as const) {
    assert.ok(Array.isArray(table[key]), `${key} is an array`);
    assert.ok(table[key].length > 0, `${key} non-empty`);
  }
  // Every cloud-sandbox language row from agent-setup.md must be present.
  const langs = table.languages.map((l) => l.name).sort();
  for (const required of ["python", "node", "go", "rust", "java", "ruby", "php"]) {
    assert.ok(langs.includes(required), `language ${required} codified`);
  }
});

test("every row declares a valid posture and a probe binary", () => {
  const allRows = [
    ...table.languages,
    ...table.managers,
    ...table.databases,
    ...table.utilities,
  ];
  for (const row of allRows) {
    assert.ok(POSTURES.has(row.posture), `${row.name} posture valid`);
    assert.ok(typeof row.probe === "string" && row.probe.length > 0, `${row.name} has probe`);
  }
});

test("language floors match the cloud-sandbox spec", () => {
  const min = Object.fromEntries(table.languages.map((l) => [l.name, l.min]));
  assert.equal(min.python, "3.12");
  assert.equal(min.node, "20.0");
  assert.equal(min.go, "1.22");
  assert.equal(min.rust, "1.77");
  assert.equal(min.java, "21");
  assert.equal(min.ruby, "3.3");
  assert.equal(min.php, "8.3");
});

test("versionGte compares dotted versions numerically", () => {
  assert.ok(versionGte("3.14", "3.12"));
  assert.ok(versionGte("3.12.0", "3.12"));
  assert.ok(versionGte("21", "21"));
  assert.ok(!versionGte("3.11", "3.12"));
  assert.ok(!versionGte("1.76.0", "1.77"));
  assert.ok(versionGte("1.100", "1.22"), "numeric not lexical");
});

test("a fully-present, version-passing host passes", () => {
  const present: Record<string, string | null> = {};
  const versions: Record<string, string> = {};
  for (const l of table.languages) {
    present[l.probe] = `/usr/bin/${l.probe}`;
    versions[l.probe] = l.min; // exactly at the floor → passes
  }
  for (const rows of [table.managers, table.databases, table.utilities]) {
    for (const r of rows) present[r.probe] = `/usr/bin/${r.probe}`;
  }
  const state: ProbeState = { present, versions };
  const results = checkAll(table, state);
  assert.ok(passes(results), `expected pass, failures: ${JSON.stringify(failures(results))}`);
});

test("a missing REQUIRED tool fails the run; missing OPTIONAL does not", () => {
  const present: Record<string, string | null> = {};
  for (const rows of [table.languages, table.managers, table.databases, table.utilities]) {
    for (const r of rows) present[r.probe] = `/usr/bin/${r.probe}`;
  }
  // Drop one REQUIRED utility.
  present["jq"] = null;
  const failResults = checkAll(table, { present });
  assert.ok(!passes(failResults), "missing jq fails");

  // Drop only OPTIONAL rows from a clean state → still passes.
  const clean: Record<string, string | null> = { ...present, jq: "/usr/bin/jq" };
  for (const r of [...table.managers, ...table.languages]) {
    if (r.posture === "OPTIONAL") clean[r.probe] = null;
  }
  assert.ok(passes(checkAll(table, { present: clean })), "missing OPTIONAL still passes");
});

test("a below-floor language version fails", () => {
  const present: Record<string, string | null> = {};
  const versions: Record<string, string> = {};
  for (const rows of [table.languages, table.managers, table.databases, table.utilities]) {
    for (const r of rows) present[r.probe] = `/usr/bin/${r.probe}`;
  }
  for (const l of table.languages) versions[l.probe] = l.min;
  versions["python3"] = "3.11"; // below 3.12 floor
  const results = checkLanguages(table, { present, versions });
  const py = results.find((r) => r.probe === "python3");
  assert.ok(py && !py.ok, "python 3.11 fails the 3.12 floor");
});
