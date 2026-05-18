#!/usr/bin/env tsx
/**
 * claude-action-lint (OIT2) — security linter for Claude Code Action workflows.
 *
 * Rules derived from:
 *   - https://github.com/anthropics/claude-code-action/blob/main/docs/security.md
 *   - src/lib/claude-action-workflows.test.ts (OAUTO13)
 *
 * Exit code 1 if any ERROR finding; 0 otherwise (WARNINGs + INFO ok).
 */

import { readFileSync } from "node:fs";

export type Severity = "ERROR" | "WARNING" | "INFO";
export interface Finding {
  severity: Severity;
  rule: string;
  line: number;
  message: string;
}

function lineOf(body: string, idx: number): number {
  return body.slice(0, idx).split("\n").length;
}

export function lint(path: string, body: string): Finding[] {
  // Only lint files that actually use the action; otherwise this isn't the right linter.
  if (!/anthropics\/claude-code-action@/.test(body)) {
    return [];
  }

  const findings: Finding[] = [];

  // ERROR: ANTHROPIC_API_KEY anywhere (OSEC1 invariant)
  const apiKey = body.match(/anthropic_api_key\s*:/i);
  if (apiKey) {
    findings.push({
      severity: "ERROR",
      rule: "no-anthropic-api-key",
      line: lineOf(body, apiKey.index!),
      message:
        "anthropic_api_key is forbidden — use claude_code_oauth_token per OSEC1 (OAuth-only invariant)",
    });
  }

  // ERROR: wildcard allowed_bots or allowed_non_write_users
  for (const m of body.matchAll(/(allowed_bots|allowed_non_write_users)\s*:\s*['"]\*['"]/g)) {
    findings.push({
      severity: "ERROR",
      rule: "no-wildcard-bots",
      line: lineOf(body, m.index!),
      message: `${m[1]}: '*' is a public-repo invocation risk per docs/security.md — use an explicit list`,
    });
  }

  // ERROR: @ref pinning — must be @v1, not @main/@beta/@v0
  for (const m of body.matchAll(/anthropics\/claude-code-action@(\w+)/g)) {
    const ref = m[1];
    if (ref !== "v1") {
      findings.push({
        severity: "ERROR",
        rule: "pin-v1",
        line: lineOf(body, m.index!),
        message: `action must be pinned to @v1 (GA), not @${ref}`,
      });
    }
  }

  // ERROR: pull_request_target + write perms (pwn-request)
  if (/^\s*pull_request_target\s*:/m.test(body)) {
    const writeMatch = body.match(/(contents|pull-requests|issues)\s*:\s*write/);
    if (writeMatch) {
      findings.push({
        severity: "ERROR",
        rule: "no-pull-request-target-with-write",
        line: lineOf(body, writeMatch.index!),
        message:
          "pull_request_target + write permissions is a pwn-request pattern (docs/security.md)",
      });
    }
  }

  // ERROR: workflow_run + checkout of head_sha at workspace root
  if (/^\s*workflow_run\s*:/m.test(body)) {
    if (/ref:\s*\$\{\{\s*github\.event\.workflow_run\.head_sha\s*\}\}/.test(body) &&
        !/path:/.test(body)) {
      const m = body.match(/ref:\s*\$\{\{\s*github\.event\.workflow_run\.head_sha\s*\}\}/)!;
      findings.push({
        severity: "ERROR",
        rule: "workflow-run-no-root-checkout-of-untrusted-ref",
        line: lineOf(body, m.index!),
        message:
          "workflow_run + checkout of head_sha at workspace root runs untrusted code with base secrets (docs/security.md)",
      });
    }
  }

  // Distinguish workflow shape:
  //   - has `plugins: 'code-review` → PR-event reviewer (claude-code-review.yml shape)
  //   - has `@claude` trigger filter → interactive (claude.yml shape)
  const isReviewer = /plugins:\s*['"]code-review/.test(body);
  const isInteractive = /contains\([^)]+,\s*['"]@claude['"]/.test(body);

  if (isReviewer && !isInteractive) {
    const m = body.match(/contents\s*:\s*write/);
    if (m) {
      findings.push({
        severity: "WARNING",
        rule: "reviewer-no-contents-write",
        line: lineOf(body, m.index!),
        message:
          "claude-code-review-shape workflow should NOT have contents:write — PR-event write-perm escalation surface",
      });
    }
  } else if (isInteractive && !isReviewer) {
    const m = body.match(/contents\s*:\s*read/);
    if (m) {
      findings.push({
        severity: "WARNING",
        rule: "interactive-needs-contents-write",
        line: lineOf(body, m.index!),
        message:
          "claude.yml-shape interactive workflow needs contents:write (per docs/configuration.md). Currently has contents:read which causes opaque mid-flow failures.",
      });
    }
  }

  // WARNING: --comment flag on code-review plugin invocation (no-op in v1)
  for (const m of body.matchAll(/\/code-review:code-review[^\n]*--comment/g)) {
    findings.push({
      severity: "WARNING",
      rule: "no-comment-flag-on-code-review",
      line: lineOf(body, m.index!),
      message:
        "--comment is a local-CLI flag; the action posts comments natively in v1. Remove.",
    });
  }

  // INFO: continue-on-error without explanatory comment within ~3 lines above
  for (const m of body.matchAll(/continue-on-error\s*:\s*true/g)) {
    const lineNum = lineOf(body, m.index!);
    const above = body.split("\n").slice(Math.max(0, lineNum - 4), lineNum).join("\n");
    if (!/#.*(OAUTO|OSEC|tolerate|TODO|known|TEMP)/i.test(above)) {
      findings.push({
        severity: "INFO",
        rule: "continue-on-error-must-be-documented",
        line: lineNum,
        message:
          "continue-on-error: true needs a # OAUTO* / TEMP comment within 3 lines above explaining why",
      });
    }
  }

  return findings;
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("usage: lint.ts <workflow.yml> [more.yml...]");
    process.exit(2);
  }
  let hadError = false;
  for (const path of args) {
    const body = readFileSync(path, "utf8");
    const findings = lint(path, body);
    if (findings.length === 0) {
      console.error(`[OIT2-lint] ${path}: OK`);
      continue;
    }
    for (const f of findings) {
      console.log(`${path}:${f.line}: ${f.severity} ${f.rule}: ${f.message}`);
      if (f.severity === "ERROR") hadError = true;
    }
  }
  process.exit(hadError ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
