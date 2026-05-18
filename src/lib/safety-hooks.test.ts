/**
 * Citations:
 *   @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md
 *   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/hooks.md
 *   @cite seeds/posture/session-start.xml
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { auditBashCommand, auditBashPreToolUse } from "./safety-hooks.js";

test("auditBashCommand allows normal commands", () => {
  assert.deepEqual(auditBashCommand("npm run verify"), {});
  assert.deepEqual(auditBashCommand("ls -la"), {});
  assert.deepEqual(auditBashCommand("git status"), {});
});

test("auditBashCommand blocks ANTHROPIC_API_KEY exports", () => {
  const r = auditBashCommand("export ANTHROPIC_API_KEY=sk-ant-...");
  assert.equal(r.decision, "block");
  assert.match((r as { reason: string }).reason, /OAuth-only/);
});

test("auditBashCommand blocks inline ANTHROPIC_API_KEY assignment", () => {
  const r = auditBashCommand("ANTHROPIC_API_KEY=x npm run dev");
  assert.equal(r.decision, "block");
});

test("auditBashCommand blocks rm -rf on filesystem root", () => {
  const r = auditBashCommand("rm -rf /");
  assert.equal(r.decision, "block");
  assert.match((r as { reason: string }).reason, /filesystem root/);
});

test("auditBashCommand allows rm -rf on a subpath", () => {
  assert.deepEqual(auditBashCommand("rm -rf /tmp/foo"), {});
  assert.deepEqual(auditBashCommand("rm -rf node_modules"), {});
});

test("auditBashCommand blocks force-push to main", () => {
  assert.equal(auditBashCommand("git push --force origin main").decision, "block");
  assert.equal(auditBashCommand("git push -f origin master").decision, "block");
});

test("auditBashCommand allows force-push to a feature branch", () => {
  assert.deepEqual(
    auditBashCommand("git push --force origin claude/feature-x"),
    {},
  );
});

test("auditBashCommand blocks --no-verify", () => {
  assert.equal(auditBashCommand("git commit --no-verify -m 'x'").decision, "block");
  assert.equal(auditBashCommand("git push --no-verify").decision, "block");
});

test("auditBashPreToolUse ignores non-PreToolUse events", () => {
  assert.deepEqual(
    auditBashPreToolUse({
      hook_event_name: "PostToolUse",
      tool_name: "Bash",
      tool_input: { command: "rm -rf /" },
    }),
    {},
  );
});

test("auditBashPreToolUse ignores non-Bash tools", () => {
  assert.deepEqual(
    auditBashPreToolUse({
      hook_event_name: "PreToolUse",
      tool_name: "Read",
      tool_input: { command: "rm -rf /" },
    }),
    {},
  );
});

test("auditBashPreToolUse routes Bash to auditBashCommand", () => {
  const r = auditBashPreToolUse({
    hook_event_name: "PreToolUse",
    tool_name: "Bash",
    tool_input: { command: "export ANTHROPIC_API_KEY=x" },
  });
  assert.equal(r.decision, "block");
});

test("auditBashPreToolUse handles missing command gracefully", () => {
  assert.deepEqual(
    auditBashPreToolUse({
      hook_event_name: "PreToolUse",
      tool_name: "Bash",
      tool_input: {},
    }),
    {},
  );
});
