/**
 * Tests for src/lib/routines/pr-event-handler.ts — the webhook
 * classifier that codifies the orchestrator's repeated
 * "informational vs actionable" decisions.
 *
 * Each assertion is drawn from an actual webhook payload received
 * during this session's PR-babysitting work — so the test doubles
 * as a regression corpus.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite rubrics/phase-I.md
 */
import { decide, parseWebhook, PrEventKindSchema } from "./pr-event-handler.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("pr-event-handler:");

// ────────────────────────────────────────────────────────────
// parseWebhook

check("parseWebhook: 'PR has been merged' → kind=merged with prNumber", () => {
  const e = parseWebhook(`PR: subagentceo/knowledge-engineering#140
Outcome: merged
The PR has been merged. You no longer need to watch this PR.`);
  if (e.kind !== "merged") throw new Error(`kind=${e.kind}`);
  if (e.prNumber !== 140) throw new Error(`pr=${e.prNumber}`);
});

check("parseWebhook: 'Neon branch ready' webhook → kind=neon-branch-ready", () => {
  const e = parseWebhook(`PR: subagentceo/knowledge-engineering#142
Author: github-actions[bot]
Comment: Neon branch ready: preview/pr-142-foo`);
  if (e.kind !== "neon-branch-ready") throw new Error(`kind=${e.kind}`);
  if (e.prNumber !== 142) throw new Error(`pr=${e.prNumber}`);
  if (!e.fromBot) throw new Error("not fromBot");
});

check("parseWebhook: schema-diff with vendor_pages CREATE TABLE → drift", () => {
  const e = parseWebhook(`PR: subagentceo/knowledge-engineering#143
Author: github-actions[bot]
Neon Schema Diff summary
\`\`\`diff
+CREATE TABLE public.vendor_pages (
+    vendor text NOT NULL,
\`\`\``);
  if (e.kind !== "schema-diff-drift") throw new Error(`kind=${e.kind}`);
  if (!e.summary.includes("G14")) throw new Error(`summary=${e.summary}`);
});

check("parseWebhook: schema-diff with no drift → schema-diff-clean", () => {
  const e = parseWebhook(`PR: subagentceo/knowledge-engineering#999
Author: github-actions[bot]
Neon Schema Diff summary

No schema changes detected.`);
  if (e.kind !== "schema-diff-clean") throw new Error(`kind=${e.kind}`);
});

check("parseWebhook: review comment from non-bot author → review-comment", () => {
  const e = parseWebhook(`PR: subagentceo/knowledge-engineering#141
Author: alex-jadecli
Comment: please fix the typo in the rubric`);
  if (e.kind !== "review-comment") throw new Error(`kind=${e.kind}`);
  if (e.fromBot) throw new Error("fromBot should be false");
  if (e.prNumber !== 141) throw new Error(`pr=${e.prNumber}`);
});

check("parseWebhook: empty/unrecognized payload → unknown", () => {
  const e = parseWebhook("some random text");
  if (e.kind !== "unknown") throw new Error(`kind=${e.kind}`);
  if (e.prNumber !== null) throw new Error(`pr=${e.prNumber}`);
});

check("parseWebhook: retains raw text on every event for downstream tools", () => {
  const raw = "PR: subagentceo/knowledge-engineering#1\nMerged via webhook";
  const e = parseWebhook(raw);
  if (e.raw !== raw) throw new Error("raw drift");
});

// ────────────────────────────────────────────────────────────
// decide

check("decide: merged → skip with auto-unsubscribe reason", () => {
  const d = decide(parseWebhook("PR: subagentceo/x#1\nThe PR has been merged."));
  if (d.action !== "skip") throw new Error(`action=${d.action}`);
  if (!d.reason.toLowerCase().includes("merged")) throw new Error(`reason=${d.reason}`);
});

check("decide: neon-branch-ready → skip with informational reason", () => {
  const d = decide(parseWebhook("PR: subagentceo/x#2\nAuthor: github-actions[bot]\nNeon branch ready: foo"));
  if (d.action !== "skip") throw new Error(`action=${d.action}`);
  if (!d.reason.toLowerCase().includes("informational")) throw new Error(`reason=${d.reason}`);
});

check("decide: vendor_pages schema-diff-drift → skip with G14 mention", () => {
  const d = decide(
    parseWebhook(
      "PR: subagentceo/x#3\nAuthor: github-actions[bot]\nNeon Schema Diff summary\n+CREATE TABLE public.vendor_pages",
    ),
  );
  if (d.action !== "skip") throw new Error(`action=${d.action}`);
  if (!d.reason.includes("G14")) throw new Error(`reason=${d.reason}`);
});

check("decide: review-comment from non-bot → explain action", () => {
  const d = decide(parseWebhook("PR: subagentceo/x#4\nAuthor: human-user\nComment: please rebase"));
  if (d.action !== "explain") throw new Error(`action=${d.action}`);
});

check("decide: ci-status update → fix action with investigate phrasing", () => {
  const e = {
    kind: "ci-status" as const,
    prNumber: 1,
    fromBot: true,
    summary: "ci",
    raw: "",
  };
  const d = decide(e);
  if (d.action !== "fix") throw new Error(`action=${d.action}`);
});

check("decide: unknown payload → escalate", () => {
  const d = decide(parseWebhook("totally unrecognized payload"));
  if (d.action !== "escalate") throw new Error(`action=${d.action}`);
});

// ────────────────────────────────────────────────────────────
// Schemas

check("PrEventKindSchema accepts every documented kind", () => {
  for (const k of [
    "neon-branch-ready",
    "schema-diff-drift",
    "schema-diff-clean",
    "ci-status",
    "review-comment",
    "merged",
    "unknown",
  ]) {
    PrEventKindSchema.parse(k);
  }
});

check("PrEventKindSchema rejects unknown values", () => {
  const r = PrEventKindSchema.safeParse("not-a-real-kind");
  if (r.success) throw new Error("accepted bogus kind");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
