/**
 * @cite src/agent/team/subagent-schema.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
 * @tdd green
 *
 * Cross-language contract: this zod model is the source of truth that
 * src/agent/cowork/team_models.py (pydantic) and the SwiftUI agent-view mirror
 * field-for-field. These tests pin the enum membership, required fields,
 * defaults, and regex constraints so drift in any mirror is caught here first.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SubagentModelAlias,
  PermissionMode,
  MemoryScope,
  Effort,
  SubagentColor,
  Isolation,
  SubagentScope,
  SubagentDefinition,
  TeamTaskState,
  TeamMember,
  TeamTask,
  TeamConfig,
  SessionState,
  WorkflowRun,
  OrchestratorView,
} from "./subagent-schema.ts";

test("enum memberships match sub-agents.md verbatim", () => {
  assert.deepEqual(SubagentModelAlias.options, ["sonnet", "opus", "haiku", "inherit"]);
  assert.deepEqual(PermissionMode.options, [
    "default", "acceptEdits", "auto", "dontAsk", "bypassPermissions", "plan",
  ]);
  assert.deepEqual(MemoryScope.options, ["user", "project", "local"]);
  assert.deepEqual(Effort.options, ["low", "medium", "high", "xhigh", "max"]);
  assert.deepEqual(Isolation.options, ["worktree"]);
  assert.deepEqual(SubagentScope.options, ["managed", "cli", "project", "user", "plugin"]);
  assert.equal(SubagentColor.options.length, 8);
});

test("SubagentDefinition requires only name + description", () => {
  const minimal = SubagentDefinition.parse({ name: "npm-research", description: "x" });
  assert.equal(minimal.name, "npm-research");
  // optional fields stay undefined (no spurious defaults)
  assert.equal(minimal.tools, undefined);
  assert.equal(minimal.model, undefined);
});

test("SubagentDefinition rejects a non-conforming name", () => {
  assert.throws(() => SubagentDefinition.parse({ name: "NPM_Research", description: "x" }));
  assert.throws(() => SubagentDefinition.parse({ name: "1bad", description: "x" }));
  assert.throws(() => SubagentDefinition.parse({ name: "ok-name", description: "" }));
});

test("SubagentDefinition accepts a full model id as well as an alias", () => {
  assert.equal(
    SubagentDefinition.parse({ name: "a", description: "d", model: "claude-opus-4-8" }).model,
    "claude-opus-4-8",
  );
  assert.equal(
    SubagentDefinition.parse({ name: "a", description: "d", model: "opus" }).model,
    "opus",
  );
});

test("SubagentDefinition rejects an out-of-set permissionMode", () => {
  assert.throws(() =>
    SubagentDefinition.parse({ name: "a", description: "d", permissionMode: "yolo" }),
  );
});

test("TeamTaskState is snake_case in_progress (not the doc's display 'in progress')", () => {
  assert.deepEqual(TeamTaskState.options, ["pending", "in_progress", "completed"]);
});

test("TeamMember defaults role to teammate", () => {
  const m = TeamMember.parse({ name: "n", agentId: "id", agentType: "claude" });
  assert.equal(m.role, "teammate");
});

test("TeamTask defaults state=pending and dependsOn=[]", () => {
  const t = TeamTask.parse({ id: "t1", subject: "do x" });
  assert.equal(t.state, "pending");
  assert.deepEqual(t.dependsOn, []);
});

test("TeamTask.jiraKey enforces the PROJECT-N shape", () => {
  assert.equal(TeamTask.parse({ id: "t", subject: "s", jiraKey: "KENG-1043" }).jiraKey, "KENG-1043");
  assert.throws(() => TeamTask.parse({ id: "t", subject: "s", jiraKey: "keng-1" }));
});

test("TeamConfig defaults teammateMode to auto", () => {
  const c = TeamConfig.parse({ name: "team", members: [] });
  assert.equal(c.teammateMode, "auto");
});

test("SessionState covers the six agent-view states", () => {
  assert.deepEqual(SessionState.options, [
    "working", "needs_input", "idle", "completed", "failed", "stopped",
  ]);
});

test("WorkflowRun.runId enforces the wf_ prefix", () => {
  const ok = WorkflowRun.parse({ runId: "wf_abc123", meta: { name: "n", description: "d" } });
  assert.equal(ok.state, "running");
  assert.deepEqual(ok.phases, []);
  assert.throws(() => WorkflowRun.parse({ runId: "run-1", meta: { name: "n", description: "d" } }));
});

test("OrchestratorView is the full SwiftUI render envelope with workflows defaulting to []", () => {
  const v = OrchestratorView.parse({
    team: { name: "t", members: [] },
    tasks: [],
    sessions: [],
    generatedAt: "2026-05-31T00:00:00Z",
  });
  assert.deepEqual(v.workflows, []);
  assert.equal(v.team.teammateMode, "auto");
});
