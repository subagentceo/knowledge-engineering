/**
 * @cite seeds/citations/multi-agent.md
 */
/**
 * A2A server for the knowledge-engineering chassis.
 *
 * Uses @a2a-js/sdk's DefaultRequestHandler pattern:
 *   AgentExecutor.execute() → publish Message/Task events → bus.finished()
 *   DefaultRequestHandler(card, taskStore, executor) wires protocol
 *   jsonRpcHandler + agentCardHandler mount on Express
 *
 * Skills:
 *   model-search — BM25-ranked search over the model registry (cached)
 *   model-get    — retrieve a single model entry by api_model_id (cached)
 *   model-infer  — type-safe LLM inference constrained by ModelEntrySchema
 *
 * @cite https://github.com/a2aproject/a2a-js
 * @cite src/cache/lru-bm25.ts
 * @cite src/cache/typed-inference.ts
 */

import express from "express";
import {
  DefaultRequestHandler,
  InMemoryTaskStore,
  RequestContext,
  type AgentExecutor,
  type ExecutionEventBus,
} from "@a2a-js/sdk/server";
import {
  jsonRpcHandler,
  agentCardHandler,
  UserBuilder,
} from "@a2a-js/sdk/server/express";
import type { AgentCard, AgentSkill, Message, TextPart } from "@a2a-js/sdk";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { get, set, cacheKey, indexDoc, search, type RedisLike } from "../cache/lru-bm25.js";
import { createRedisLike } from "../lib/redis-adapter.js";
import { cachedInference } from "../cache/typed-inference.js";

// ── Model registry Zod schema (single source of truth) ───────────────────────
// Same schema drives: cache validation, Anthropic tool input_schema, TypeScript type.

export const ModelEntrySchema = z.object({
  api_model_id:       z.string(),
  display_name:       z.string(),
  family:             z.string(),
  tier:               z.enum(["flagship", "mid", "haiku", "preview", "limited", "deprecated"]),
  context_window_k:   z.number().int(),
  max_output_k:       z.number().int(),
  price_input_mtok:   z.number(),
  price_output_mtok:  z.number(),
  thinking_mode:      z.string().nullable().optional(),
  safety_classifiers: z.boolean(),
  glasswing_only:     z.boolean(),
  successor_to:       z.string().nullable().optional(),
  platforms:          z.array(z.string()),
  features:           z.array(z.string()),
  ga_date:            z.string(),
});
export type ModelEntry = z.infer<typeof ModelEntrySchema>;

// ── Infrastructure ────────────────────────────────────────────────────────────

const { redis } = await createRedisLike(process.env.REDIS_URL ?? "redis://localhost:6379");
const client = new Anthropic();

// ── Agent card ────────────────────────────────────────────────────────────────

const skills: AgentSkill[] = [
  {
    id:          "model-search",
    name:        "Model Registry Search",
    description: "BM25-ranked search over the Anthropic model registry.",
    tags:        ["search", "bm25", "model-registry"],
    examples:    ["find flagship models", "search claude fable"],
  },
  {
    id:          "model-get",
    name:        "Get Model",
    description: "Retrieve a model entry by api_model_id.",
    tags:        ["retrieval", "model-registry"],
    examples:    ["get claude-fable-5"],
  },
  {
    id:          "model-infer",
    name:        "Infer Model Metadata",
    description: "Type-safe LLM inference constrained to ModelEntrySchema.",
    tags:        ["inference", "structured-output"],
    examples:    ["describe claude-fable-5 in structured form"],
  },
];

const port = Number(process.env.A2A_PORT ?? 41241);

const card: AgentCard = {
  name:               "knowledge-engineering-agent",
  description:        "Model registry search, retrieval, and type-safe LLM inference.",
  version:            "0.4.0",
  protocolVersion:    "0.2.9",
  url:                `http://localhost:${port}`,
  capabilities:       { streaming: true, pushNotifications: false },
  defaultInputModes:  ["text/plain"],
  defaultOutputModes: ["text/plain", "application/json"],
  skills,
};

// ── Agent executor ────────────────────────────────────────────────────────────

function textMessage(taskId: string, text: string): Message {
  const part: TextPart = { kind: "text", text };
  return {
    kind:      "message",
    messageId: crypto.randomUUID(),
    role:      "agent",
    taskId,
    contextId: taskId,
    parts:     [part],
  };
}

const executor: AgentExecutor = {
  execute: async (ctx: RequestContext, bus: ExecutionEventBus) => {
    const userPart = ctx.userMessage.parts[0];
    const text = userPart?.kind === "text" ? (userPart as TextPart).text : "";
    // Route by skill tag embedded in context (convention: first word of text is skill id)
    const skill = text.startsWith("model-get:")   ? "model-get"
                : text.startsWith("model-infer:") ? "model-infer"
                : "model-search";
    const query = skill === "model-search" ? text : text.replace(/^[^:]+:/, "").trim();

    try {
      if (skill === "model-get") {
        const entry = await get(redis, cacheKey("model", query), ModelEntrySchema);
        bus.publish(textMessage(ctx.taskId, entry ? JSON.stringify(entry) : `model ${query} not found`));
        bus.finished();
        return;
      }

      if (skill === "model-infer") {
        const result = await cachedInference(
          client, redis,
          [{ role: "user", content: query }],
          ModelEntrySchema, "ModelEntry",
          { systemPrompt: "Return the Anthropic model metadata matching the user query." },
        );
        indexDoc({ id: result.api_model_id, title: result.display_name, body: result.family });
        await set(redis, cacheKey("model", result.api_model_id), result);
        bus.publish(textMessage(ctx.taskId, JSON.stringify(result)));
        bus.finished();
        return;
      }

      // model-search: BM25 ranked, results hydrated with schema validation
      const ids = search(query, 5);
      const results = await Promise.all(
        ids.map((id) => get(redis, cacheKey("model", id), ModelEntrySchema)),
      );
      bus.publish(textMessage(ctx.taskId, JSON.stringify(results.filter(Boolean))));
      bus.finished();
    } catch (err) {
      bus.publish(textMessage(ctx.taskId, `error: ${String(err)}`));
      bus.finished();
    }
  },

  cancelTask: async (_taskId: string, bus: ExecutionEventBus) => { bus.finished(); },
};

// ── Express server ────────────────────────────────────────────────────────────

const handler  = new DefaultRequestHandler(card, new InMemoryTaskStore(), executor);
const app      = express();

app.use(express.json());
app.use("/", jsonRpcHandler({ requestHandler: handler, userBuilder: UserBuilder.noAuthentication }));
app.use("/.well-known/agent-card.json", agentCardHandler({ agentCardProvider: handler }));

app.listen(port, () => console.log(`A2A server :${port}`));
