/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { TaskEnvelope, TaskResult, parseTaskResult } from "./agent-envelope.js";

const envelope = TaskEnvelope.parse({
  envelope: "task/v1",
  batch_id: "B23",
  jira_key: "KAN-15",
  title: "econ fast path",
  worktree: true,
  instructions: "team chips above citations table",
  acceptance: ["steps_to_citation <= 3 taps for economic-research"],
  report_to: { mail_agent: "claude/adoring-maxwell-x6tjcl", thread_id: "batch3-B23" },
});
assert.equal(envelope.batch_id, "B23");

const report = [
  "done, details below",
  "```task-result",
  JSON.stringify({
    envelope: "task-result/v1",
    batch_id: "B23",
    status: "done",
    branch: "claude/frontend-b23",
    commit: "abc1234",
    acceptance_evidence: ["frontend 30/30 pass", "chip row renders economic-research first"],
  }),
  "```",
].join("\n");
const result = parseTaskResult(report);
assert.equal(result.status, "done");
assert.equal(result.commit, "abc1234");

// fail closed: no fence, bad batch id, bad status
assert.throws(() => parseTaskResult("no fence here"));
assert.throws(() => TaskEnvelope.parse({ ...envelope, batch_id: "X1" }));
assert.throws(() =>
  parseTaskResult(report.replace('"done"', '"maybe"')),
);

console.log("agent-envelope.test.ts OK");
