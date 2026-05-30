// src/agent/knowledge-agent/fleet.ts
//
// The claude-knowledge-agent fleet: typed, model-pinned subagents that the
// runner (agent.ts) drives via the Agent SDK's query() as headless `claude -p`
// invocations, each returning a Zod-validated structured output.
//
// These reuse corpus-viewer's SubagentSpec primitive (one schema for the whole
// chassis) but describe the KNOWLEDGE lane rather than the Swift build lane:
//
//   - knowledge-answerer : opus-4-8, high+adaptive. Synthesizes a cited answer
//                          over the vendor/ corpus + MCP sources. The hard
//                          reasoning work → strongest model, adaptive thinking.
//   - npm-researcher     : haiku, low+disabled. Pulls @anthropic-ai /
//                          @modelcontextprotocol npm metadata via the
//                          npm-registry MCP tools. Mechanical lookup → fast,
//                          cheap model, no thinking.
//   - answer-verifier    : opus-4-8, high+adaptive. Independent adversarial
//                          grade of another agent's output. Read-only tools.
//
// Sources grounding the design (operator directive):
//   - Agent SDK (claude -p subagents): github.com/anthropics/claude-agent-sdk-typescript,
//     npm @anthropic-ai/claude-agent-sdk. Mirrored: agent-sdk/subagents.md.
//   - MCP tool surface: github.com/orgs/modelcontextprotocol, npm
//     @modelcontextprotocol/sdk. Mirrored: modelcontextprotocol/.
//   - npm scopes: npmjs.com/org/anthropic-ai, npmjs.com/org/modelcontextprotocol.
//   - Coding intelligence: github.com/anthropics/claude-plugins-official,
//     knowledge-work-plugins create-cowork-plugin SKILL.md.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
//   @cite src/agent/corpus-viewer/fleet.ts
//
// Pure data + schema validation; no SDK import.

import { SubagentSpec, type BetaFeature, type SubagentSpec as Spec } from "../corpus-viewer/primitives.js";

// Last verified against the bundled SDK (@anthropic-ai/claude-agent-sdk@0.2.138)
// + the mirrored agent-sdk docs on this date. Bump when re-checking.
const VERIFIED = "2026-05-30T00:00:00.000Z";

const AGENT_SDK_BETA: BetaFeature = {
  name: "claude-agent-sdk",
  surface: "@anthropic-ai/claude-agent-sdk@0.2.138",
  rationale:
    "query() outputFormat:{type:'json_schema'} + result.structured_output is the structured-output surface that makes claude -p type-safe; minor versions move, so we pin and test.",
  citation: { source: "vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md", last_fetched: VERIFIED },
};
const ADAPTIVE_THINKING_BETA: BetaFeature = {
  name: "adaptive-thinking",
  surface: "claude-opus-4-8",
  rationale:
    "Adaptive thinking is the only thinking-on mode on Opus 4.8 — the agent decides reasoning depth per turn.",
  citation: { source: "vendor/anthropics/platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md", last_fetched: VERIFIED },
};

/**
 * The knowledge-bridge MCP tool surface this lane reads from. Trimmed to the
 * search + fetch tools (the answerer corroborates claims; it does not enumerate
 * the whole corpus ahead of time — same trimming rationale as run.ts verifier).
 */
const BRIDGE_READ_TOOLS = [
  "mcp__knowledge-bridge__engineering_search",
  "mcp__knowledge-bridge__engineering_fetch",
  "mcp__knowledge-bridge__blog_search",
  "mcp__knowledge-bridge__blog_fetch",
  "mcp__knowledge-bridge__llms_grep",
  "mcp__knowledge-bridge__llms_fetch",
  "mcp__knowledge-bridge__vendor_grep",
  "mcp__knowledge-bridge__vendor_fetch",
];

const NPM_TOOLS = [
  "mcp__npm-registry__npm_org_packages",
  "mcp__npm-registry__npm_package_metadata",
  "mcp__npm-registry__npm_downloads",
  "mcp__npm-registry__npm_search",
];

export const KNOWLEDGE_ANSWERER: Spec = SubagentSpec.parse({
  name: "knowledge-answerer",
  description:
    "Synthesizes a cited KnowledgeAnswer over the vendor/ corpus + knowledge-bridge MCP sources. Every claim carries a Citation; refuses to answer beyond what the sources support.",
  model: "claude-opus-4-8",
  effort: "high",
  thinking: "adaptive",
  budget: { maxOutputTokens: 16000, compactAtInputTokens: 120000, maxTurns: 12 },
  cache: {},
  memory: "project",
  tools: BRIDGE_READ_TOOLS,
  betas: [AGENT_SDK_BETA, ADAPTIVE_THINKING_BETA],
});

export const NPM_RESEARCHER: Spec = SubagentSpec.parse({
  name: "npm-researcher",
  description:
    "Pulls @anthropic-ai / @modelcontextprotocol npm metadata via the four npm-registry MCP tools and emits a PackageReport. Mechanical lookup; fast model, no thinking.",
  model: "claude-haiku-4-5-20251001",
  effort: "low",
  thinking: "disabled",
  budget: { maxOutputTokens: 6000, compactAtInputTokens: 40000, maxTurns: 8 },
  cache: {},
  memory: "project",
  tools: NPM_TOOLS,
  betas: [AGENT_SDK_BETA],
});

export const ANSWER_VERIFIER: Spec = SubagentSpec.parse({
  name: "answer-verifier",
  description:
    "Independent adversarial verifier. Runs in a separate context and grades another agent's structured output against a rubric, returning a VerifyVerdict. Read-only tools — never edits the work it grades.",
  model: "claude-opus-4-8",
  effort: "high",
  thinking: "adaptive",
  budget: { maxOutputTokens: 8000, compactAtInputTokens: 100000, maxTurns: 10 },
  cache: {},
  memory: "project",
  // Read + corroborate only. No npm tools (it grades claims, not raw lookups).
  tools: BRIDGE_READ_TOOLS,
  betas: [AGENT_SDK_BETA, ADAPTIVE_THINKING_BETA],
});

export const KNOWLEDGE_FLEET: readonly Spec[] = [KNOWLEDGE_ANSWERER, NPM_RESEARCHER, ANSWER_VERIFIER];

/** Which structured-output schema each agent is expected to return. */
export const AGENT_OUTPUT_SCHEMA: Record<string, string> = {
  "knowledge-answerer": "KnowledgeAnswer",
  "npm-researcher": "PackageReport",
  "answer-verifier": "VerifyVerdict",
};

/** Lookup a spec by name; throws if unknown (callers want a hard failure). */
export function knowledgeSpecFor(name: string): Spec {
  const s = KNOWLEDGE_FLEET.find((f) => f.name === name);
  if (!s) throw new Error(`[knowledge-agent] unknown agent '${name}'`);
  return s;
}
