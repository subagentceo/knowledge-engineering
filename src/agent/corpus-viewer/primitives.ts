// src/agent/corpus-viewer/primitives.ts
//
// Zod + XML primitives for the corpus-viewer BUILD orchestrator.
//
// This is the type-safe boundary layer for a multi-subagent build that turns
// apps/corpus-viewer from a macOS-only browser into a dual-platform
// (macOS + iOS) app with in-app intelligence over the vendor/ corpus. The
// orchestration is grounded in the Claude Opus 4.8 + Agent-SDK feature set:
// per-agent pinned models, reasoning effort, adaptive thinking, prompt
// caching, agent memory, and turn/token budgets — every one of which is a
// real field on the SDK's AgentDefinition / Options (verified against the
// bundled types; see citations).
//
// Design rules (operator directive):
//   - Clear START/STOP task boundaries: every subagent task is a TaskEnvelope
//     with a typed input and a typed StructuredOutput. No free-form handoffs.
//   - Task budgets: each task carries a TokenBudget; the orchestrator refuses
//     to dispatch past the cap and compacts when a subagent approaches it.
//   - Outcome-driven citations: any field that encodes a documentation fact
//     carries a Citation (url + last_fetched). When the doc drifts, the
//     citation test (scripts/lib/citation-guard.ts) and the freshness check
//     fail loudly — the same discipline as PlanStep.source_url in planning.ts.
//   - Beta / research-preview features are flagged (BetaFeature) so a single
//     test surface catches version drift when the previews change.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
//   @cite seeds/prompts/subagent-verifier.md
//
// Pure types + schemas. No SDK import, no I/O — so the test surface stays
// fast and the runtime wiring (run.ts) is the only place that touches query().

import { z } from "zod";

// ──────────────────────────────────────────────────────────────────────
// Model + effort + thinking — pinned, per the Opus 4.8 feature set.
//
// `effort` and `thinking` are AgentDefinition/Options fields. Opus 4.8's
// only thinking-on mode is adaptive (Claude decides when/how much), so we
// model `thinking` as a closed enum that forbids the older fixed-budget mode
// for opus-4-8 agents and lets a test assert that invariant.

/** Model aliases + the two pinned full IDs this build uses. */
export const ModelChoice = z.enum([
  "opus", // alias → resolved session model (Opus 4.8 in this chassis)
  "sonnet",
  "haiku",
  "inherit", // use the orchestrator's model
  "claude-opus-4-8",
  "claude-haiku-4-5-20251001",
]);
export type ModelChoice = z.infer<typeof ModelChoice>;

/** Reasoning effort. Mirrors AgentDefinition.effort exactly. */
export const Effort = z.enum(["low", "medium", "high", "xhigh", "max"]);
export type Effort = z.infer<typeof Effort>;

/**
 * Thinking mode. Opus 4.8 supports ONLY adaptive when thinking is on; the
 * fixed `enabled` budget form is for older models. `disabled` is allowed for
 * mechanical agents that shouldn't burn thinking tokens.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md
 */
export const Thinking = z.enum(["adaptive", "disabled"]);
export type Thinking = z.infer<typeof Thinking>;

// ──────────────────────────────────────────────────────────────────────
// Budgets — turn + token caps that bound each subagent.

export const TokenBudget = z
  .object({
    /** Hard ceiling on output tokens for this task. Dispatch refuses past it. */
    maxOutputTokens: z.number().int().positive(),
    /** Compact the subagent transcript when input context exceeds this. */
    compactAtInputTokens: z.number().int().positive(),
    /** Max model turns before the task must STOP and return what it has. */
    maxTurns: z.number().int().positive().max(50),
  })
  .refine((b) => b.compactAtInputTokens > b.maxOutputTokens / 4, {
    message: "compactAtInputTokens too low relative to maxOutputTokens — compaction would thrash",
  });
export type TokenBudget = z.infer<typeof TokenBudget>;

// ──────────────────────────────────────────────────────────────────────
// Caching — what part of each subagent's context is a stable cached prefix.
//
// The orchestrator already splits its system prompt at
// SYSTEM_PROMPT_DYNAMIC_BOUNDARY (see src/agent/run.ts) so the static prefix
// is prompt-cached across turns. Each build subagent declares which of its
// inputs are STABLE (cacheable: Swift templates, doc excerpts) vs DYNAMIC
// (the per-task instruction). Tool definitions are cached too — tool-use
// with prompt caching keeps the tool schemas out of the per-turn cost.

export const CachePolicy = z.object({
  /** Cache the stable system-prompt prefix (templates, doc excerpts). */
  cacheSystemPrefix: z.boolean().default(true),
  /** Cache tool definitions (tool-use-with-prompt-caching). */
  cacheToolDefinitions: z.boolean().default(true),
  /**
   * Mid-conversation system messages (e.g. compaction boundaries) must be
   * appended in a cache-preserving way so a compaction event doesn't bust
   * the whole prefix. Opus 4.8 preserves cache across these.
   * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
   */
  preserveCacheAcrossSystemMessages: z.boolean().default(true),
});
export type CachePolicy = z.infer<typeof CachePolicy>;

// ──────────────────────────────────────────────────────────────────────
// Citations — outcome-driven, so tests fail when docs drift.

export const Citation = z.object({
  /** A vendor/ mirror path OR an upstream URL the claim is sourced from. */
  source: z.string().min(1),
  /** ISO-8601 timestamp the source was last verified. */
  last_fetched: z.string().datetime(),
});
export type Citation = z.infer<typeof Citation>;

/** A feature that is beta / research-preview and may change without notice. */
export const BetaFeature = z.object({
  name: z.string().min(1),
  /** e.g. "agent-sdk@0.2.138", "dynamic-workflows", "managed-agents-2026-04-01". */
  surface: z.string().min(1),
  /** Why we accept the instability — the modern-best-practice rationale. */
  rationale: z.string().min(1),
  citation: Citation,
});
export type BetaFeature = z.infer<typeof BetaFeature>;

// ──────────────────────────────────────────────────────────────────────
// Subagent specification — the full pinned config for one build worker.

export const SubagentSpec = z.object({
  /** Stable id, kebab-case (e.g. "swift-porter"). */
  name: z.string().regex(/^[a-z][a-z0-9-]*$/, "name must be kebab-case"),
  /** One-line role used as the SDK AgentDefinition.description. */
  description: z.string().min(1),
  model: ModelChoice,
  effort: Effort,
  thinking: Thinking,
  budget: TokenBudget,
  cache: CachePolicy,
  /**
   * Agent memory scope (AgentDefinition.memory). 'project' persists notes
   * under .claude/agent-memory/<name>/ between turns/sessions.
   */
  memory: z.enum(["user", "project", "local", "none"]).default("project"),
  /** Allowlisted tool names — the blast radius. Empty = inherit none new. */
  tools: z.array(z.string().min(1)),
  /** Beta features this subagent relies on. */
  betas: z.array(BetaFeature).default([]),
})
  .refine((s) => !(s.model === "claude-opus-4-8" && s.thinking === "disabled" && s.effort === "max"), {
    message: "max effort with thinking disabled on opus-4-8 wastes the model — pick adaptive thinking or lower effort",
  });
export type SubagentSpec = z.infer<typeof SubagentSpec>;

// ──────────────────────────────────────────────────────────────────────
// Task envelope — the START/STOP boundary. Typed in, typed out.

export const TaskStatus = z.enum(["pending", "in_progress", "done", "failed", "compacted"]);
export type TaskStatus = z.infer<typeof TaskStatus>;

/**
 * A unit of build work dispatched to exactly one subagent. The `input` and
 * `outputSchemaRef` make the boundary explicit: the subagent receives a typed
 * input and MUST return an object validated against the named schema (see
 * outputs.ts). No prose handoff crosses the boundary.
 */
export const TaskEnvelope = z.object({
  id: z.string().min(1),
  /** Imperative form: "Port CorpusScanner to dual-platform". */
  content: z.string().min(1),
  /** Present-progressive for the spinner. */
  activeForm: z.string().min(1),
  subagent: z.string().min(1), // SubagentSpec.name
  status: TaskStatus.default("pending"),
  /** Typed task input (JSON-serializable; shape owned by the subagent). */
  input: z.record(z.string(), z.unknown()),
  /** Name of the StructuredOutput schema the result is validated against. */
  outputSchemaRef: z.string().min(1),
  /** Budget override for this task; defaults to the subagent's budget. */
  budget: TokenBudget.optional(),
  /** This task cannot start until these task ids are `done`. */
  blockedBy: z.array(z.string()).default([]),
  /** Doc citations grounding this task's acceptance criteria. */
  citations: z.array(Citation).default([]),
});
export type TaskEnvelope = z.infer<typeof TaskEnvelope>;

// ──────────────────────────────────────────────────────────────────────
// Boundary invariants — machine-checked, like enforceSinglyInProgress.

/** A subagent may only be dispatched a task whose tools it is allowed. */
export function assertToolsAllowed(spec: SubagentSpec, requiredTools: readonly string[]): void {
  const allowed = new Set(spec.tools);
  const missing = requiredTools.filter((t) => !allowed.has(t));
  if (missing.length > 0) {
    throw new Error(
      `[boundary] subagent '${spec.name}' is not allowed tools: ${missing.join(", ")}`,
    );
  }
}

/** Dispatch is refused if the task's budget exceeds the subagent's ceiling. */
export function assertWithinBudget(spec: SubagentSpec, task: TaskEnvelope): void {
  const b = task.budget ?? spec.budget;
  if (b.maxOutputTokens > spec.budget.maxOutputTokens) {
    throw new Error(
      `[boundary] task '${task.id}' requests ${b.maxOutputTokens} output tokens; subagent '${spec.name}' caps at ${spec.budget.maxOutputTokens}`,
    );
  }
  if (b.maxTurns > spec.budget.maxTurns) {
    throw new Error(
      `[boundary] task '${task.id}' requests ${b.maxTurns} turns; subagent '${spec.name}' caps at ${spec.budget.maxTurns}`,
    );
  }
}

/** A blocked task may not be in_progress/done before its deps are done. */
export function assertDependenciesSatisfied(task: TaskEnvelope, doneIds: ReadonlySet<string>): void {
  if (task.status === "pending" || task.status === "failed") return;
  const unmet = task.blockedBy.filter((id) => !doneIds.has(id));
  if (unmet.length > 0) {
    throw new Error(
      `[boundary] task '${task.id}' is ${task.status} but depends on unfinished: ${unmet.join(", ")}`,
    );
  }
}

/**
 * Singly-in-progress per subagent: a subagent runs one foreground task at a
 * time (mirrors planning.ts enforceSinglyInProgress, scoped per worker so the
 * orchestrator can still fan out across DIFFERENT subagents concurrently).
 */
export function assertSinglyInProgressPerSubagent(tasks: readonly TaskEnvelope[]): void {
  const byAgent = new Map<string, number>();
  for (const t of tasks) {
    if (t.status !== "in_progress") continue;
    const n = (byAgent.get(t.subagent) ?? 0) + 1;
    byAgent.set(t.subagent, n);
    if (n > 1) {
      throw new Error(`[boundary] subagent '${t.subagent}' has ${n} in_progress tasks; only one foreground task per subagent`);
    }
  }
}
