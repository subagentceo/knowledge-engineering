// src/agent/knowledge-agent/schemas.ts
//
// Zod structured-output schemas for the claude-knowledge-agent.
//
// These are the typed STOP boundary for every knowledge-agent task. The agent
// runner (agent.ts) converts each schema to JSON Schema via zod's native
// `z.toJSONSchema()` and passes it as the SDK `outputFormat` so claude -p is
// FORCED to return data matching the shape; the runner then re-validates the
// returned `structured_output` back through the same Zod schema. A reply that
// doesn't validate is a failed task — the runner never free-form-parses prose.
//
// This is the "TypeScript zod type-safe operations" the operator asked for: the
// schema is the single source of truth for both the model contract (JSON
// Schema) and the static TS type (z.infer), so the two can never drift.
//
// Design echoes src/agent/corpus-viewer/outputs.ts (same Citation + usage
// envelope dialect) so the whole chassis speaks one structured-output dialect.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite src/agent/corpus-viewer/outputs.ts
//
// Pure schemas; no SDK import, no I/O.

import { z } from "zod";

/**
 * A documentation citation. Mirrors corpus-viewer's Citation so the knowledge
 * agent's outputs carry the same outcome-driven provenance the verify chain
 * already enforces elsewhere.
 */
export const Citation = z.object({
  /** A vendor/ mirror path OR an upstream URL the claim is sourced from. */
  source: z.string().min(1),
  /** ISO-8601 timestamp the source was last verified. */
  last_fetched: z.string().min(1),
});
export type Citation = z.infer<typeof Citation>;

/**
 * Token accounting the runner fills in from the SDK result message's `usage`
 * (the model does not report its own usage; the runner does). Kept on the
 * output so a caller gets cost/cache signal alongside the typed result.
 */
export const Usage = z.object({
  outputTokens: z.number().int().nonnegative().default(0),
  inputTokens: z.number().int().nonnegative().default(0),
  cacheReadInputTokens: z.number().int().nonnegative().default(0),
  cacheCreationInputTokens: z.number().int().nonnegative().default(0),
  costUsd: z.number().nonnegative().default(0),
});
export type Usage = z.infer<typeof Usage>;

/**
 * Knowledge answer: the default structured output. The agent answers a
 * question grounded in the vendor/ corpus + MCP sources and MUST cite each
 * claim. `confidence` lets the orchestrator gate on certainty.
 *
 * The model fills `answer`, `claims`, `confidence`. The runner fills `usage`.
 */
export const KnowledgeAnswer = z.object({
  kind: z.literal("KnowledgeAnswer"),
  /** One-paragraph synthesized answer. */
  answer: z.string().min(1),
  /** Each load-bearing claim, with the citation that grounds it. */
  claims: z
    .array(
      z.object({
        statement: z.string().min(1),
        citation: Citation,
      }),
    )
    .min(1),
  confidence: z.enum(["low", "medium", "high"]),
  /** Open follow-ups the agent could not resolve from available sources. */
  openQuestions: z.array(z.string()).default([]),
});
export type KnowledgeAnswer = z.infer<typeof KnowledgeAnswer>;

/**
 * Package research: the npm-research lane's typed output. Built for the
 * @anthropic-ai / @modelcontextprotocol npm scopes the operator named.
 */
export const PackageReport = z.object({
  kind: z.literal("PackageReport"),
  packageName: z.string().min(1),
  latestVersion: z.string().min(1),
  /** Whether this is the package the orchestrator should depend on, with why. */
  recommendation: z.object({
    useIt: z.boolean(),
    rationale: z.string().min(1),
  }),
  /** Notable recent versions the agent inspected. */
  recentVersions: z.array(z.string()).default([]),
  citations: z.array(Citation).min(1),
});
export type PackageReport = z.infer<typeof PackageReport>;

/**
 * Verifier verdict: an independent agent grades another agent's output against
 * a rubric. Mirrors the corpus-viewer VerifyResult so the verifier gate is
 * identical across the chassis.
 */
export const VerifyVerdict = z.object({
  kind: z.literal("VerifyVerdict"),
  verdict: z.enum(["pass", "warn", "fail"]),
  rubric: z
    .array(
      z.object({
        criterion: z.string().min(1),
        met: z.boolean(),
        evidence: z.string().min(1),
      }),
    )
    .min(1),
  citations: z.array(Citation).default([]),
});
export type VerifyVerdict = z.infer<typeof VerifyVerdict>;

/** Discriminated union of every structured output the knowledge agent emits. */
export const KnowledgeOutput = z.discriminatedUnion("kind", [
  KnowledgeAnswer,
  PackageReport,
  VerifyVerdict,
]);
export type KnowledgeOutput = z.infer<typeof KnowledgeOutput>;

/** Registry so a task can name its expected schema by string. */
export const KNOWLEDGE_SCHEMAS = {
  KnowledgeAnswer,
  PackageReport,
  VerifyVerdict,
} as const;
export type KnowledgeSchemaName = keyof typeof KNOWLEDGE_SCHEMAS;

/**
 * Resolve a schema by name. Throws on an unknown ref so a typo in a task
 * fails loudly rather than silently skipping validation.
 */
export function schemaFor(name: string): z.ZodType {
  const s = KNOWLEDGE_SCHEMAS[name as KnowledgeSchemaName];
  if (!s) {
    throw new Error(`[knowledge-agent] unknown schema '${name}' — not in KNOWLEDGE_SCHEMAS`);
  }
  return s;
}

/**
 * The one place a Zod schema becomes the SDK's JSON-Schema `outputFormat`.
 * Uses zod v4's native `z.toJSONSchema`. The `target` is the 2020-12 draft the
 * SDK forwards to the model. Kept here (not in agent.ts) so the schema→JSON
 * mapping is unit-testable without the SDK.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
 */
export function toOutputFormat(schema: z.ZodType): { type: "json_schema"; schema: Record<string, unknown> } {
  return { type: "json_schema", schema: z.toJSONSchema(schema) as Record<string, unknown> };
}
