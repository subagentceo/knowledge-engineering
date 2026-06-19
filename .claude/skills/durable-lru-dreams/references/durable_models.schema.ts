import { z } from "zod";

/** @cite platform.claude.com/docs/en/managed-agents/dreams + memory + define-outcomes */

// ── Memory Store (with LRU cache metadata) ──────────────

export const MemoryStoreAccess = z.enum(["read_write", "read_only"]);
export const MemoryStoreStatus = z.enum(["active", "archived", "deleted"]);

export const DurableMemoryStore = z.object({
  store_id: z.string().startsWith("memstore_"),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  access: MemoryStoreAccess.default("read_write"),
  memory_count: z.number().int().nonnegative().default(0),
  memory_limit: z.number().int().min(1).max(2000).default(2000),
  status: MemoryStoreStatus.default("active"),
  cached_at: z.string().datetime().nullable().optional(),
  cache_ttl_secs: z.number().int().min(60).default(3600),
  cache_hits: z.number().int().nonnegative().default(0),
  cache_misses: z.number().int().nonnegative().default(0),
  source_dream_id: z.string().startsWith("drm_").nullable().optional(),
  parent_store_id: z.string().startsWith("memstore_").nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type DurableMemoryStore = z.infer<typeof DurableMemoryStore>;

// ── Task FSM ────────────────────────────────────────────

export const TaskState = z.enum([
  "PENDING",
  "RUNNING",
  "COMPLETED",
  "FAILED",
  "CANCELED",
  "WAITING",
]);
export type TaskState = z.infer<typeof TaskState>;

export const DurableTask = z.object({
  task_id: z.string(),
  kind: z.string(),
  state: TaskState.default("PENDING"),
  payload: z.record(z.unknown()).default({}),
  attempts: z.number().int().nonnegative().default(0),
  max_attempts: z.number().int().min(1).default(5),
  locked_by: z.string().nullable().optional(),
  locked_until: z.string().datetime().nullable().optional(),
  memory_store_id: z.string().startsWith("memstore_").nullable().optional(),
  dream_id: z.string().startsWith("drm_").nullable().optional(),
  outcome_id: z.string().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type DurableTask = z.infer<typeof DurableTask>;

// ── Outcome ─────────────────────────────────────────────

export const OutcomeResult = z.enum(["pass", "fail", "interrupted", "pending"]);

export const DurableOutcome = z.object({
  outcome_id: z.string(),
  session_id: z.string().startsWith("sesn_"),
  rubric_file_id: z.string().nullable().optional(),
  rubric_text: z.string().nullable().optional(),
  result: OutcomeResult.default("pending"),
  explanation: z.string().nullable().optional(),
  iterations: z.number().int().nonnegative().default(0),
  task_id: z.string().nullable().optional(),
  memory_store_id: z.string().startsWith("memstore_").nullable().optional(),
  created_at: z.string().datetime(),
  evaluated_at: z.string().datetime().nullable().optional(),
});
export type DurableOutcome = z.infer<typeof DurableOutcome>;

// ── Event Log ───────────────────────────────────────────

export const EntityType = z.enum(["dream", "memory_store", "task", "outcome"]);

export const DurableEvent = z.object({
  entity_type: EntityType,
  entity_id: z.string(),
  event: z.string(),
  from_state: z.string().nullable().optional(),
  to_state: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  at: z.string().datetime(),
});
export type DurableEvent = z.infer<typeof DurableEvent>;

// ── Redis LRU Config ────────────────────────────────────

export const RedisLRUConfig = z.object({
  key_pattern: z.literal("memstore:{store_id}"),
  default_ttl_secs: z.number().int().default(3600),
  eviction_policy: z.literal("allkeys-lru"),
  write_through: z.boolean().default(true),
});
export type RedisLRUConfig = z.infer<typeof RedisLRUConfig>;
