// src/agent/knowledge-agent/agent.ts
//
// The claude-knowledge-agent runner: a Zod-type-safe wrapper over a headless
// `claude -p` invocation through the Agent SDK's query().
//
// What this adds over corpus-viewer (which is a pure planning chassis): this
// file actually RUNS a subagent and gives the caller a statically-typed,
// runtime-validated result. The contract:
//
//   1. Take a SubagentSpec + a Zod output schema + a prompt.
//   2. Convert the spec → AgentDefinition (reusing corpus-viewer's mapper) and
//      the schema → SDK outputFormat (zod's native toJSONSchema).
//   3. query({ prompt, options: { agents, outputFormat, ... } }) — OAuth-only.
//   4. On the SDK `result` message, validate `structured_output` THROUGH the
//      same Zod schema. The returned value is `z.infer<typeof Schema>` — fully
//      typed, fully validated. A non-conforming reply throws.
//
// This is the type-safe boundary the operator asked for: one schema is both the
// model contract (JSON Schema sent to claude -p) and the TS type, so they can't
// drift, and the validation is enforced at runtime, not assumed.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode.md
//   @cite src/agent/corpus-viewer/runner.ts
//   @cite src/oauth/token.ts

import type { z } from "zod";
import type { SubagentSpec } from "../corpus-viewer/primitives.js";
import { toAgentDefinition, type AgentDefinitionShape } from "../corpus-viewer/runner.js";
import { toOutputFormat } from "./schemas.js";
import { Usage } from "./schemas.js";

/**
 * The SDK surface this runner needs, declared structurally so this module is
 * unit-testable with a fake query() (no live API). At runtime, run.ts injects
 * the real `query` from @anthropic-ai/claude-agent-sdk. Every field used here
 * is a real field on the bundled SDK's Options / SDKResultMessage (verified
 * against node_modules/@anthropic-ai/claude-agent-sdk/sdk.d.ts @ 0.3.178):
 *   Options.outputFormat, Options.agents, Options.mcpServers, Options.systemPrompt
 *   SDKResultMessage.subtype 'success', .structured_output, .usage, .total_cost_usd
 */
export interface SdkResultMessage {
  type: "result";
  subtype: string;
  structured_output?: unknown;
  total_cost_usd?: number;
  usage?: {
    output_tokens?: number;
    input_tokens?: number;
    cache_read_input_tokens?: number;
    cache_creation_input_tokens?: number;
  };
}
export type SdkMessage = SdkResultMessage | { type: string; [k: string]: unknown };

export interface QueryOptions {
  systemPrompt?: string | string[];
  agents?: Record<string, AgentDefinitionShape>;
  outputFormat?: { type: "json_schema"; schema: Record<string, unknown> };
  mcpServers?: Record<string, unknown>;
  settingSources?: string[];
  maxTurns?: number;
  effort?: AgentDefinitionShape["effort"];
  model?: string;
}

/** The exact callable shape of the SDK's `query`, narrowed to what we pass. */
export type QueryFn = (params: { prompt: string; options: QueryOptions }) => AsyncIterable<SdkMessage>;

/** A successful run: the validated typed result plus the runner-filled usage. */
export interface KnowledgeRun<T> {
  result: T;
  usage: z.infer<typeof Usage>;
}

/**
 * Run one knowledge-agent task and return a Zod-validated, statically-typed
 * result.
 *
 * Generic `<S extends z.ZodType>` ties the return type to the schema: pass
 * `KnowledgeAnswer`, get back `KnowledgeAnswer`. The validation is real —
 * `schema.parse` throws on any drift between what claude -p returned and the
 * schema, so a caller can trust the type.
 *
 * `runQuery` is injected so the function is testable without the SDK; run.ts
 * passes the real `query`.
 */
export async function runKnowledgeTask<S extends z.ZodType>(args: {
  runQuery: QueryFn;
  spec: SubagentSpec;
  schema: S;
  /** The agent's system prompt (its seed/directive body). */
  prompt: string;
  /** The user task this invocation answers. */
  task: string;
  /** MCP servers to mount for this run (stdio specs). */
  mcpServers?: Record<string, unknown>;
  /** Extra static system-prompt prefix (cacheable). */
  systemPrefix?: string;
}): Promise<KnowledgeRun<z.infer<S>>> {
  const def = toAgentDefinition(args.spec, args.prompt);

  // The agent is registered under its own name AND its def carries the model /
  // effort / tools / memory the spec pins. We also surface model+effort at the
  // top level so a single-agent run pins the main thread too.
  const options: QueryOptions = {
    systemPrompt: args.systemPrefix ? [args.systemPrefix, args.prompt] : args.prompt,
    agents: { [args.spec.name]: def },
    outputFormat: toOutputFormat(args.schema),
    settingSources: ["project"],
    // Spread the optionals conditionally so `undefined` never lands on the
    // object — exactOptionalPropertyTypes treats `{maxTurns: undefined}` as a
    // type error, not the same as omitting the key.
    ...(def.maxTurns !== undefined ? { maxTurns: def.maxTurns } : {}),
    ...(def.effort !== undefined ? { effort: def.effort } : {}),
    ...(def.model ? { model: def.model } : {}),
    ...(args.mcpServers ? { mcpServers: args.mcpServers } : {}),
  };

  let resultMsg: SdkResultMessage | null = null;
  for await (const msg of args.runQuery({ prompt: args.task, options })) {
    if (msg.type === "result") resultMsg = msg as SdkResultMessage;
  }

  if (!resultMsg) {
    throw new Error(`[knowledge-agent] '${args.spec.name}' produced no result message`);
  }
  if (resultMsg.subtype !== "success") {
    throw new Error(
      `[knowledge-agent] '${args.spec.name}' failed: ${resultMsg.subtype}` +
        (resultMsg.subtype === "error_max_structured_output_retries"
          ? " — model could not produce output matching the schema after retries"
          : ""),
    );
  }
  if (resultMsg.structured_output === undefined || resultMsg.structured_output === null) {
    throw new Error(
      `[knowledge-agent] '${args.spec.name}' returned no structured_output — outputFormat was ignored`,
    );
  }

  // The single choke point: an untyped SDK reply becomes a typed, validated
  // result. Throws on any schema drift.
  const result = args.schema.parse(resultMsg.structured_output) as z.infer<S>;

  const usage = Usage.parse({
    outputTokens: resultMsg.usage?.output_tokens ?? 0,
    inputTokens: resultMsg.usage?.input_tokens ?? 0,
    cacheReadInputTokens: resultMsg.usage?.cache_read_input_tokens ?? 0,
    cacheCreationInputTokens: resultMsg.usage?.cache_creation_input_tokens ?? 0,
    costUsd: resultMsg.total_cost_usd ?? 0,
  });

  return { result, usage };
}
