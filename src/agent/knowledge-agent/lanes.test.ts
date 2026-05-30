// src/agent/knowledge-agent/lanes.test.ts
// @tdd green
//
// Pins the knowledge-work Lane abstraction: every lane is grounded in the real
// knowledge-work-plugins clone (its skills exist on disk), the engineering lane's
// verifier is the real code-review skill, and a Lane's resolvers actually drive
// steerKnowledgeLoop (proving the loop is lane-agnostic).
//
// Ground truth: third_party/anthropics-knowledge-work-plugins/ (gitignored). The
// disk checks SKIP when the clone is absent (CI without third_party), like the
// vendor-cleanliness skip pattern — so the suite stays green either way.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/plugins.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md

import { strict as assert } from "node:assert";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  LANES,
  ENGINEERING_LANE,
  DATA_LANE,
  laneFor,
  laneResolvers,
  type Lane,
} from "./lanes.js";
import { SubagentSpec } from "../corpus-viewer/primitives.js";
import { steerKnowledgeLoop, type VerifiedTask } from "./steer.js";
import type { QueryFn, SdkMessage } from "./agent.js";
import type { TaskEnvelope } from "../corpus-viewer/primitives.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const KWP_ROOT = resolve(REPO_ROOT, "third_party/anthropics-knowledge-work-plugins");
const cloneAvailable = existsSync(KWP_ROOT);

test("every lane's fleet members are valid SubagentSpecs", () => {
  for (const lane of LANES) {
    assert.ok(lane.fleet.length > 0, `${lane.name} has no fleet`);
    for (const spec of lane.fleet) {
      // Re-parse to assert each is a well-formed spec (throws on drift).
      SubagentSpec.parse(spec);
    }
  }
});

test("every lane's verifierSkill is one of its declared skills", () => {
  for (const lane of LANES) {
    assert.ok(
      lane.skills.includes(lane.verifierSkill),
      `${lane.name}: verifierSkill '${lane.verifierSkill}' not in skills`,
    );
  }
});

test("the engineering lane's verifier is the real code-review skill", () => {
  assert.equal(ENGINEERING_LANE.verifierSkill, "code-review");
  assert.ok(ENGINEERING_LANE.skills.includes("code-review"));
});

test("the data lane carries the real skill-script (skills-carry-scripts)", () => {
  const pkg = DATA_LANE.scripts.find((s) => s.name === "package-data-skill");
  assert.ok(pkg, "data lane should carry the package-data-skill script");
  assert.ok(pkg!.path.includes("data-context-extractor/scripts/package_data_skill.py"));
});

test("every lane's skills exist on disk in the knowledge-work-plugins clone", { skip: !cloneAvailable }, () => {
  for (const lane of LANES) {
    for (const skill of lane.skills) {
      // dashboard.html is a file, not a skill dir — skip the one non-dir entry.
      if (skill.endsWith(".html")) continue;
      const skillDir = resolve(KWP_ROOT, lane.name, "skills", skill);
      assert.ok(existsSync(skillDir), `${lane.name}/skills/${skill} missing on disk`);
    }
  }
});

test("laneFor resolves and throws on unknown", () => {
  assert.equal(laneFor("engineering"), ENGINEERING_LANE);
  assert.throws(() => laneFor("nope"), /unknown lane/);
});

// ── the proof: a Lane's resolvers drive steerKnowledgeLoop ─────────────────

function scriptedQuery(queue: SdkMessage[]): QueryFn {
  return () => {
    const msg = queue.shift();
    if (!msg) throw new Error("scriptedQuery exhausted");
    return (async function* () {
      yield msg;
    })();
  };
}
const ok = (structured: unknown): SdkMessage => ({
  type: "result",
  subtype: "success",
  structured_output: structured,
  total_cost_usd: 0.01,
  usage: { output_tokens: 50 },
});

function engineeringTask(): VerifiedTask {
  const produce: TaskEnvelope = {
    id: "review-1",
    content: "Review the steer.ts change",
    activeForm: "reviewing",
    subagent: "knowledge-answerer",
    status: "pending",
    input: {},
    outputSchemaRef: "KnowledgeAnswer",
    blockedBy: [],
    citations: [],
  };
  const verify: TaskEnvelope = {
    id: "review-1-verify",
    content: "Grade the review",
    activeForm: "grading",
    subagent: "answer-verifier",
    status: "pending",
    input: {},
    outputSchemaRef: "VerifyVerdict",
    blockedBy: [],
    citations: [],
  };
  return { produce, verify };
}

test("steerKnowledgeLoop runs a DAG using a Lane's resolvers (loop is lane-agnostic)", async () => {
  const { specFor, seedFor } = laneResolvers(ENGINEERING_LANE);
  const fn = scriptedQuery([
    ok({
      kind: "KnowledgeAnswer",
      answer: "The change is sound.",
      claims: [{ statement: "tests pass", citation: { source: "vendor/x.md", last_fetched: "2026-05-30" } }],
      confidence: "high",
    }),
    ok({ kind: "VerifyVerdict", verdict: "pass", rubric: [{ criterion: "cited", met: true, evidence: "ok" }] }),
  ]);

  const res = await steerKnowledgeLoop({
    runQuery: fn,
    tasks: [engineeringTask()],
    specFor,
    seedFor,
    maxBudgetUsd: 10,
  });

  assert.equal(res.stopReason, "all-done");
  assert.equal(res.completed.length, 1);
  // The seed carried the lane's identity into the dispatch.
  assert.ok(seedFor("knowledge-answerer").includes("engineering"));
});
