// src/agent/corpus-viewer/outputs.ts
//
// Structured OUTPUT schemas — the typed STOP boundary for each build subagent.
//
// Every subagent returns one of these objects, validated before the
// orchestrator accepts the result. This is the "clear stop boundary" half of
// the START/STOP contract (TaskEnvelope.outputSchemaRef in primitives.ts
// names which schema applies). A subagent that returns prose or a malformed
// object is a failed task — the orchestrator never free-form-parses a reply.
//
// The shapes deliberately echo the existing verifier contract
// (verdict + per-item rubric + citations) so the whole chassis speaks one
// dialect of structured output.
//
// Citations:
//   @cite seeds/prompts/subagent-verifier.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//
// Pure schemas; no I/O.

import { z } from "zod";
import { Citation } from "./primitives.js";

/** Shared envelope every structured output carries. */
const Base = z.object({
  /** The subagent that produced this. */
  by: z.string().min(1),
  /** Token accounting the subagent reports so the orchestrator tracks budget. */
  usage: z
    .object({
      outputTokens: z.number().int().nonnegative(),
      cacheReadInputTokens: z.number().int().nonnegative().default(0),
      cacheCreationInputTokens: z.number().int().nonnegative().default(0),
    }),
  /** Whether the subagent hit its budget and stopped early (compaction trigger). */
  truncated: z.boolean().default(false),
});

/** Result of porting / editing Swift sources for cross-platform. */
export const PortResult = Base.extend({
  kind: z.literal("PortResult"),
  /** Files the subagent changed, with a one-line summary each. */
  changedFiles: z.array(z.object({ path: z.string().min(1), summary: z.string().min(1) })),
  /** Compile status the subagent observed (it ran `swift build`). */
  builds: z.object({ macOS: z.boolean(), iOS: z.boolean() }),
  citations: z.array(Citation).default([]),
  notes: z.string().default(""),
});
export type PortResult = z.infer<typeof PortResult>;

/** Result of bundling the curated corpus subset for iOS. */
export const BundleResult = Base.extend({
  kind: z.literal("BundleResult"),
  vendorsBundled: z.array(z.string().min(1)),
  fileCount: z.number().int().nonnegative(),
  totalBytes: z.number().int().nonnegative(),
  /** Must stay under the cap so the iOS app isn't bloated. */
  withinSizeCap: z.boolean(),
  citations: z.array(Citation).default([]),
});
export type BundleResult = z.infer<typeof BundleResult>;

/** Result of building the in-app DocumentIndex (TOC + search). */
export const IndexResult = Base.extend({
  kind: z.literal("IndexResult"),
  documentsIndexed: z.number().int().nonnegative(),
  headingsExtracted: z.number().int().nonnegative(),
  /** A few sample search queries the subagent verified return ranked hits. */
  sampleQueries: z.array(z.object({ query: z.string().min(1), topHit: z.string().min(1) })),
  citations: z.array(Citation).default([]),
});
export type IndexResult = z.infer<typeof IndexResult>;

/**
 * Verifier verdict over another subagent's output. Mirrors the existing
 * verifier seed's pass/warn/fail + per-criterion rubric, adapted to the build.
 */
export const VerifyResult = Base.extend({
  kind: z.literal("VerifyResult"),
  verdict: z.enum(["pass", "warn", "fail"]),
  rubric: z.array(
    z.object({
      criterion: z.string().min(1),
      met: z.boolean(),
      evidence: z.string().min(1),
    }),
  ),
  citations: z.array(Citation).default([]),
  notes: z.string().default(""),
});
export type VerifyResult = z.infer<typeof VerifyResult>;

/** Discriminated union of every structured output the build understands. */
export const StructuredOutput = z.discriminatedUnion("kind", [
  PortResult,
  BundleResult,
  IndexResult,
  VerifyResult,
]);
export type StructuredOutput = z.infer<typeof StructuredOutput>;

/** Registry so TaskEnvelope.outputSchemaRef can resolve to a schema. */
export const OUTPUT_SCHEMAS = {
  PortResult,
  BundleResult,
  IndexResult,
  VerifyResult,
} as const;
export type OutputSchemaName = keyof typeof OUTPUT_SCHEMAS;

/**
 * Validate a raw subagent reply against the schema named on the task.
 * Throws (failing the task) if the boundary is violated. This is the single
 * choke point where an untyped reply becomes a typed result.
 */
export function parseOutput(schemaRef: string, raw: unknown): StructuredOutput {
  const schema = OUTPUT_SCHEMAS[schemaRef as OutputSchemaName];
  if (!schema) {
    throw new Error(`[boundary] unknown outputSchemaRef '${schemaRef}' — not in OUTPUT_SCHEMAS`);
  }
  return schema.parse(raw) as StructuredOutput;
}

/**
 * The verifier gate: only a `pass` (or, for non-blocking criteria, `warn`)
 * lets a build task be marked done. Mirrors run.ts verifierGate.
 */
export function buildVerifierGate(v: VerifyResult, allowWarn = false): boolean {
  return v.verdict === "pass" || (allowWarn && v.verdict === "warn");
}
