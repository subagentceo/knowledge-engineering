// src/agent/corpus-viewer/runner.ts
//
// The bridge from validated SubagentSpec → the Agent SDK's AgentDefinition.
//
// This is the ONE place that translates the typed build config into the
// shape `query({ options: { agents } })` expects. Keeping the mapping here
// (and pure) means the whole fleet can be type-checked and unit-tested
// without standing up the SDK, while run.ts just spreads the result.
//
// Every field set here is a real AgentDefinition field in the bundled SDK
// types (model, description, prompt, tools, effort, memory). The model alias
// 'claude-opus-4-8' / 'claude-haiku-4-5-20251001' and the effort levels are
// passed straight through — the SDK resolves aliases and silently downgrades
// effort for models that don't support a level.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite src/agent/run.ts  (query() agents:{} wiring this mirrors)
//
// Pure mapping; no SDK import (we describe the shape structurally so this
// file has zero runtime deps and the test can assert the mapping exactly).

import type { SubagentSpec } from "./primitives.js";

/**
 * Structural subset of the SDK's AgentDefinition we populate. Declared
 * locally (not imported) so primitives stay dependency-free; run.ts passes
 * these objects to `query()` where the full type is enforced.
 *
 * Fields mirror @anthropic-ai/claude-agent-sdk AgentDefinition:
 *   model?, description, prompt, tools?, maxTurns?, memory?, effort?
 */
export interface AgentDefinitionShape {
  description: string;
  prompt: string;
  model?: string;
  tools?: string[];
  maxTurns?: number;
  memory?: "user" | "project" | "local";
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
}

/**
 * Map one SubagentSpec to an AgentDefinition. `prompt` is the subagent's seed
 * body (its XML directive); the caller supplies it since seeds live on disk.
 */
export function toAgentDefinition(spec: SubagentSpec, prompt: string): AgentDefinitionShape {
  const def: AgentDefinitionShape = {
    description: spec.description,
    prompt,
    tools: spec.tools,
    maxTurns: spec.budget.maxTurns,
    effort: spec.effort,
  };
  // 'inherit' means "use the parent model" — omit the field so the SDK does that.
  if (spec.model !== "inherit") def.model = spec.model;
  // 'none' means no auto-loaded memory — omit so the SDK skips it.
  if (spec.memory !== "none") def.memory = spec.memory;
  return def;
}

/**
 * Build the full `agents` record for query({ options: { agents } }) from a
 * fleet + a seed lookup. Throws if any subagent lacks a seed (a build that
 * references a missing directive must fail loudly, not silently degrade).
 */
export function toAgentsRecord(
  fleet: readonly SubagentSpec[],
  seedFor: (name: string) => string,
): Record<string, AgentDefinitionShape> {
  const out: Record<string, AgentDefinitionShape> = {};
  for (const spec of fleet) {
    const prompt = seedFor(spec.name);
    if (!prompt || prompt.trim().length === 0) {
      throw new Error(`[runner] subagent '${spec.name}' has no seed prompt`);
    }
    out[spec.name] = toAgentDefinition(spec, prompt);
  }
  return out;
}

/**
 * The thinking config for query()'s top-level `thinking` option. Opus 4.8
 * supports only adaptive; we emit the SDK's adaptive shape, or disabled.
 * (Per-agent thinking isn't an AgentDefinition field in 0.2.x, so the build
 * sets thinking at the query level for the design subagents and the
 * mechanical bundler runs in its own query with thinking disabled.)
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md
 */
export function toThinkingConfig(thinking: "adaptive" | "disabled"):
  | { type: "adaptive" }
  | { type: "disabled" } {
  return thinking === "adaptive" ? { type: "adaptive" } : { type: "disabled" };
}
