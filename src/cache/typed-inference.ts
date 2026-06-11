/**
 * Type-safe LLM inference with prompt-hash caching.
 *
 * The model is constrained via Anthropic tool_use with input_schema derived
 * from a Zod type — it cannot produce an unexpected shape. The response is
 * validated by the same schema before being cached. Callers receive T, not
 * unknown, with no "as T" cast anywhere in the chain.
 *
 * Cache key: sha256(model + systemPrompt + serialised messages + schemaName)
 * TTL: 7 days (TTL_SEC from lru-bm25.ts) — aligned with Redis allkeys-lru.
 *
 * @cite src/cache/lru-bm25.ts
 * @cite https://github.com/StefanTerdell/zod-to-json-schema
 * @cite vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/overview.md
 */

import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages.js";
import { createHash } from "node:crypto";
import { z } from "zod";
import type { Redis } from "ioredis";
import { get, set, cacheKey, TTL_SEC } from "./lru-bm25.js";

export interface InferenceOpts {
  model?:        string;
  maxTokens?:    number;
  systemPrompt?: string;
  ttlSec?:       number;
}

const DEFAULT_MODEL = "claude-sonnet-4-6";

/**
 * cachedInference<T>
 *
 * 1. Hash (model + system + messages + schemaName) → Redis key
 * 2. Cache hit: validate via schema.safeParse → return T
 * 3. Cache miss: call Anthropic tool_use with input_schema = zodToJsonSchema(schema)
 *    → model is forced to call the tool with the exact shape
 *    → validate tool input via schema.parse → cache → return T
 */
export async function cachedInference<T>(
  client:     Anthropic,
  redis:      Redis,
  messages:   MessageParam[],
  schema:     z.ZodType<T>,
  schemaName: string,
  opts:       InferenceOpts = {},
): Promise<T> {
  const model      = opts.model        ?? DEFAULT_MODEL;
  const maxTokens  = opts.maxTokens    ?? 1_024;
  const ttlSec     = opts.ttlSec       ?? TTL_SEC;
  const system     = opts.systemPrompt ?? "";

  const promptHash = sha256(JSON.stringify({ model, system, messages, schemaName }));
  const ck = cacheKey("inference", promptHash);

  const cached = await get(redis, ck, schema);
  if (cached !== undefined) return cached;

  // z.toJSONSchema is native in Zod v4 — no external dep needed
  const inputSchema = z.toJSONSchema(schema);

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    ...(system ? { system } : {}),
    tools: [{
      name: schemaName,
      description: `Return structured data matching the ${schemaName} schema.`,
      input_schema: inputSchema as Anthropic.Tool["input_schema"],
    }],
    tool_choice: { type: "tool", name: schemaName },
    messages,
  });

  const toolBlock = response.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
  );
  if (!toolBlock) throw new Error(`cachedInference: no tool_use block in response`);

  // schema.parse throws on invalid shape — propagates to caller
  const validated = schema.parse(toolBlock.input);

  // Only cache 200-OK (stop_reason = "tool_use" or "end_turn")
  if (response.stop_reason === "tool_use" || response.stop_reason === "end_turn") {
    await set(redis, ck, validated);
    // Override TTL if caller wants shorter than 7d
    if (ttlSec !== TTL_SEC) await redis.expire(ck, ttlSec);
  }

  return validated;
}

function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}
