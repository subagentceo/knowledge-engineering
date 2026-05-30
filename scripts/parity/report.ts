/**
 * scripts/parity/report.ts — render the parity table + set exit code.
 *
 * Reads the spec from docs/data/toolchain-parity.json and the probed host
 * state from $STATE (JSON injected by scripts/parity/doctor.sh), runs the
 * pure checker, prints a table, and exits 1 on any non-OPTIONAL drift.
 *
 * @cite docs/data/toolchain-parity.json
 * @cite src/lib/toolchain-parity.ts
 */

import { readFileSync } from "node:fs";
import {
  type ParityTable,
  type ProbeState,
  checkAll,
  failures,
  passes,
} from "../../src/lib/toolchain-parity.ts";

const table = JSON.parse(
  readFileSync("docs/data/toolchain-parity.json", "utf8"),
) as ParityTable;

const state = JSON.parse(process.env.STATE ?? '{"present":{},"versions":{}}') as ProbeState;
const quiet = process.env.QUIET === "--quiet";

const results = checkAll(table, state);
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";
const dim = "\x1b[2m";
const reset = "\x1b[0m";

if (!quiet) {
  for (const r of results) {
    if (r.ok && r.present) continue; // print only the noteworthy in the body
  }
  const rows = results.map((r) => {
    const mark = r.ok ? `${green}✓${reset}` : `${red}✗${reset}`;
    const ver = r.detected ? ` ${dim}(${r.detected}${r.min ? ` >= ${r.min}` : ""})${reset}` : "";
    const note = r.posture === "OPTIONAL" && !r.present ? ` ${yellow}[optional, absent]${reset}` : "";
    return `${mark} ${r.name}${ver}${note}`;
  });
  console.log(rows.join("\n"));
}

const fails = failures(results);
if (fails.length > 0) {
  console.error(
    `\n${red}✗ parity drift: ${fails.length} required tool(s) missing or below floor${reset}`,
  );
  for (const f of fails) {
    const why = !f.present ? "absent" : `version ${f.detected ?? "?"} < ${f.min}`;
    console.error(`  - ${f.name} (${f.probe}): ${why}`);
  }
  console.error(`\nRun ./setup.sh to install the missing toolchain.`);
  process.exit(1);
}

console.log(
  `\n${green}✓ cloud-sandbox parity: all ${results.length} required tools present${
    passes(results) ? "" : ""
  }${reset}`,
);
