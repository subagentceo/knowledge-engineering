// src/agent/corpus-viewer/fleet.ts
//
// The corpus-viewer BUILD fleet: four subagents, each pinned to a model,
// effort level, thinking mode, token/turn budget, cache policy, memory scope,
// and a tight tool allowlist. This is the "defined models + budgets" the
// operator asked for, expressed as validated SubagentSpecs so a test can
// assert the whole fleet is well-formed and the model routing is deliberate.
//
// Model routing rationale (cost ↔ capability, per the Opus 4.8 feature set):
//   - swift-porter : opus-4-8, high+adaptive. Cross-platform Swift reasoning
//                    (CorpusSource enum, #if gating, Layouts branching) is the
//                    hard design work — the strongest model, adaptive thinking.
//   - doc-indexer  : opus-4-8, high+adaptive. Walking swift-markdown's AST to
//                    build TOC + ranked search is also design-heavy.
//   - ios-bundler  : haiku, low+disabled. Bundling the docker/xcode subset is
//                    mechanical rsync + Package.swift edits — route to the
//                    fast, cheap model with no thinking.
//   - build-verifier: opus-4-8, high+adaptive. Independent adversarial review
//                    of the other three needs a separate, capable context.
//
// Each spec's cache policy keeps the stable Swift-template context + tool
// definitions cached across turns (tool-use-with-prompt-caching), and each
// has project-scoped memory so notes persist between turns/sessions.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
//   @cite seeds/prompts/subagent-verifier.md
//
// Pure data + schema validation; no SDK import.

import { SubagentSpec, type BetaFeature, type SubagentSpec as Spec } from "./primitives.js";

// Last verified against the bundled SDK + docs on this date. Bump when
// re-checking the beta surfaces below.
const VERIFIED = "2026-05-30T00:00:00.000Z";

// Beta / research-preview surfaces this build leans on. Listing them as
// structured BetaFeature objects means one test can assert they're declared,
// and the freshness check flags them when the previews change.
const AGENT_SDK_BETA: BetaFeature = {
  name: "claude-agent-sdk",
  surface: "@anthropic-ai/claude-agent-sdk@0.2.x",
  rationale:
    "AgentDefinition.model/effort/thinking/memory and SYSTEM_PROMPT_DYNAMIC_BOUNDARY are the SDK surface; minor versions move, so we pin and test.",
  citation: { source: "vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md", last_fetched: VERIFIED },
};
const ADAPTIVE_THINKING_BETA: BetaFeature = {
  name: "adaptive-thinking",
  surface: "claude-opus-4-8",
  rationale:
    "Adaptive thinking is the only thinking-on mode on Opus 4.8 and is the modern best practice for letting the model decide reasoning depth per turn.",
  citation: { source: "vendor/anthropics/platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md", last_fetched: VERIFIED },
};

export const SWIFT_PORTER: Spec = SubagentSpec.parse({
  name: "swift-porter",
  description:
    "Ports apps/corpus-viewer Swift sources from macOS-only to dual-platform (macOS + iOS): CorpusSource enum, #if os() gating, Mac/iPad/Phone layout branching.",
  model: "claude-opus-4-8",
  effort: "high",
  thinking: "adaptive",
  budget: { maxOutputTokens: 24000, compactAtInputTokens: 140000, maxTurns: 16 },
  cache: {},
  memory: "project",
  tools: ["Read", "Edit", "Write", "Bash", "Glob", "Grep"],
  betas: [AGENT_SDK_BETA, ADAPTIVE_THINKING_BETA],
});

export const DOC_INDEXER: Spec = SubagentSpec.parse({
  name: "doc-indexer",
  description:
    "Builds the in-app DocumentIndex: walks swift-markdown's AST to extract per-file headings (TOC) and a ranked full-text search over the bundled docker/xcode corpus.",
  model: "claude-opus-4-8",
  effort: "high",
  thinking: "adaptive",
  budget: { maxOutputTokens: 24000, compactAtInputTokens: 140000, maxTurns: 16 },
  cache: {},
  memory: "project",
  tools: ["Read", "Edit", "Write", "Bash", "Glob", "Grep"],
  betas: [AGENT_SDK_BETA, ADAPTIVE_THINKING_BETA],
});

export const IOS_BUNDLER: Spec = SubagentSpec.parse({
  name: "ios-bundler",
  description:
    "Bundles the curated docker + xcode markdown subset into Sources/CorpusViewer/BundledData and wires the Package.swift resource + project.yml. Mechanical; fast model.",
  model: "claude-haiku-4-5-20251001",
  effort: "low",
  thinking: "disabled",
  budget: { maxOutputTokens: 8000, compactAtInputTokens: 40000, maxTurns: 8 },
  cache: {},
  memory: "project",
  tools: ["Read", "Edit", "Write", "Bash"],
  betas: [AGENT_SDK_BETA],
});

export const BUILD_VERIFIER: Spec = SubagentSpec.parse({
  name: "build-verifier",
  description:
    "Independent adversarial verifier. Runs in a separate context, grades each other subagent's StructuredOutput against the RUBRIC, and confirms swift build + the iOS simulator screenshot actually pass. Emits VerifyResult.",
  model: "claude-opus-4-8",
  effort: "high",
  thinking: "adaptive",
  budget: { maxOutputTokens: 16000, compactAtInputTokens: 100000, maxTurns: 12 },
  cache: {},
  memory: "project",
  // Read-only + the eval/build commands. No Edit/Write — a verifier must not
  // fix the work it grades (mirrors the verifier seed's "only grade" rule).
  tools: ["Read", "Bash", "Glob", "Grep"],
  betas: [AGENT_SDK_BETA, ADAPTIVE_THINKING_BETA],
});

export const FLEET: readonly Spec[] = [SWIFT_PORTER, DOC_INDEXER, IOS_BUNDLER, BUILD_VERIFIER];

/** Lookup a spec by name; throws if unknown (callers want a hard failure). */
export function specFor(name: string): Spec {
  const s = FLEET.find((f) => f.name === name);
  if (!s) throw new Error(`[fleet] unknown subagent '${name}'`);
  return s;
}
