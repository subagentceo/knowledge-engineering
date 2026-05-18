#!/usr/bin/env tsx
/**
 * branch-protection-crud UPDATE (OIT2) — idempotent edit to the
 * required_status_checks array on the chassis ruleset.
 *
 * @cite plugins/github-it-admin/skills/branch-protection-crud/SKILL.md
 * @cite scripts/setup-branch-protection.ts
 */
import { execFileSync } from "node:child_process";
import { parseArgs } from "node:util";

const RULESET_ID = "16440994";

interface Rule {
  type: string;
  parameters?: {
    required_status_checks?: Array<{ context: string }>;
  };
}
interface Ruleset {
  rules: Rule[];
}

function fail(msg: string): never {
  console.error(`[OIT2-bp] ${msg}`);
  process.exit(1);
}

function ghJson<T>(args: string[]): T {
  try {
    const out = execFileSync("gh", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "inherit"],
    });
    return JSON.parse(out) as T;
  } catch (e) {
    fail(`gh failed: ${String(e)}`);
  }
}

function main(): void {
  const { values } = parseArgs({
    options: {
      org: { type: "string" },
      repo: { type: "string" },
      add: { type: "string", multiple: true },
      remove: { type: "string", multiple: true },
      "dry-run": { type: "boolean", default: false },
    },
  });

  const org =
    values.org ?? process.env.CLAUDE_PLUGIN_OPTION_GH_ORG ?? "subagentceo";
  const repo =
    values.repo ??
    process.env.CLAUDE_PLUGIN_OPTION_GH_REPO ??
    "knowledge-engineering";
  const adds = values.add ?? [];
  const removes = values.remove ?? [];

  if (adds.length === 0 && removes.length === 0) {
    fail("usage: --add <ctx> [--add <ctx>...] [--remove <ctx>...] [--dry-run]");
  }

  const path = `repos/${org}/${repo}/rulesets/${RULESET_ID}`;
  const ruleset = ghJson<Ruleset>(["api", path]);

  const rule = ruleset.rules.find((r) => r.type === "required_status_checks");
  if (!rule || !rule.parameters?.required_status_checks) {
    fail("no required_status_checks rule found");
  }

  const current = rule.parameters.required_status_checks.map((c) => c.context);
  const next = [...new Set([...current.filter((c) => !removes.includes(c)), ...adds])];

  if (JSON.stringify(current) === JSON.stringify(next)) {
    console.error(`[OIT2-bp] no-op (current array matches target)`);
    return;
  }

  console.error(`[OIT2-bp] current: ${JSON.stringify(current)}`);
  console.error(`[OIT2-bp] next:    ${JSON.stringify(next)}`);

  if (values["dry-run"]) {
    console.error(`[OIT2-bp] dry-run — not applying`);
    return;
  }

  rule.parameters.required_status_checks = next.map((context) => ({ context }));
  const body = JSON.stringify(ruleset);

  execFileSync("gh", ["api", "-X", "PUT", path, "--input", "-"], {
    input: body,
    stdio: ["pipe", "inherit", "inherit"],
  });
  console.error(`[OIT2-bp] PUT OK`);

  // Read-after-write verify
  const verify = ghJson<Ruleset>(["api", path]);
  const verifyRule = verify.rules.find((r) => r.type === "required_status_checks");
  const verifyArr = verifyRule?.parameters?.required_status_checks?.map(
    (c) => c.context,
  );
  if (JSON.stringify(verifyArr) !== JSON.stringify(next)) {
    fail(`WRITE VERIFY FAILED: got ${JSON.stringify(verifyArr)}, expected ${JSON.stringify(next)}`);
  }
  console.error(`[OIT2-bp] verify OK`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
