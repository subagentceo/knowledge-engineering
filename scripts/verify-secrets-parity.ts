#!/usr/bin/env tsx
/**
 * verify-secrets-parity CLI (OSEC1)
 *
 * Loud parity check across local / gh_repo / gh_org planes. Uses
 * execFileSync (no shell) to avoid command injection per repo security
 * guidance. The cloud_env plane has no API and is audited via the
 * cloud-env-audit skill (Claude in Chrome).
 *
 * @cite docs/decisions/2026-05-17-secrets-parity.md
 * @cite docs/data/secrets-parity.json
 */

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { check, type Table } from "../src/lib/secrets-parity.ts";

const SKIP_GH = process.env.SKIP_GH === "1";

function ghSecrets(args: string[]): Set<string> {
  if (SKIP_GH) return new Set();
  try {
    const out = execFileSync("gh", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return new Set(out.split("\n").filter(Boolean));
  } catch {
    return new Set();
  }
}

function main(): void {
  const table = JSON.parse(
    readFileSync("docs/data/secrets-parity.json", "utf8"),
  ) as Table;

  const local = new Set(Object.keys(process.env));
  const repo = ghSecrets(["secret", "list", "--json", "name", "-q", ".[].name"]);
  const org = ghSecrets([
    "secret",
    "list",
    "--org",
    "subagentceo",
    "--json",
    "name",
    "-q",
    ".[].name",
  ]);

  const violations = check(table, local, repo, org);

  if (violations.length === 0) {
    console.log(
      `[OSEC1] parity OK across ${table.secrets.length} secrets × 3 planes`,
    );
    return;
  }

  console.error(`[OSEC1] ${violations.length} parity violation(s):`);
  for (const v of violations) {
    const verb =
      v.posture === "REQUIRED"
        ? `missing (required on ${v.plane})`
        : `present (forbidden on ${v.plane})`;
    console.error(`  - ${v.secret}: ${verb}`);
  }
  console.error(
    "[OSEC1] see docs/decisions/2026-05-17-secrets-parity.md for remediation.",
  );
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
