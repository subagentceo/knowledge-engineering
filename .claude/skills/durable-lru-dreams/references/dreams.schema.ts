import { z } from "zod";

/** @cite platform.claude.com/docs/en/managed-agents/dreams */

export const DreamStatus = z.enum([
  "pending",
  "running",
  "completed",
  "failed",
  "canceled",
]);
export type DreamStatus = z.infer<typeof DreamStatus>;

export const DreamModel = z.enum([
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-sonnet-4-6",
]);
export type DreamModel = z.infer<typeof DreamModel>;

export const DreamErrorType = z.enum([
  "timeout",
  "internal_error",
  "memory_store_org_limit_exceeded",
  "input_memory_store_too_large",
  "input_memory_store_unavailable",
  "input_session_unavailable",
]);

export const MemoryStoreInput = z.object({
  type: z.literal("memory_store"),
  memory_store_id: z.string().startsWith("memstore_"),
});

export const SessionsInput = z.object({
  type: z.literal("sessions"),
  session_ids: z.array(z.string().startsWith("sesn_")).min(1).max(100),
});

export const DreamInput = z.discriminatedUnion("type", [
  MemoryStoreInput,
  SessionsInput,
]);
export type DreamInput = z.infer<typeof DreamInput>;

export const MemoryStoreOutput = z.object({
  type: z.literal("memory_store"),
  memory_store_id: z.string().startsWith("memstore_"),
});

export const DreamUsage = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  cache_creation_input_tokens: z.number().int().nonnegative(),
  cache_read_input_tokens: z.number().int().nonnegative(),
});

export const DreamError = z
  .object({
    type: DreamErrorType,
    message: z.string(),
  })
  .nullable();

export const Dream = z.object({
  type: z.literal("dream"),
  id: z.string().startsWith("drm_"),
  status: DreamStatus,
  inputs: z.array(DreamInput),
  outputs: z.array(MemoryStoreOutput),
  model: z.object({ id: DreamModel }),
  instructions: z.string().max(4096).nullable().optional(),
  session_id: z.string().startsWith("sesn_").nullable(),
  created_at: z.string().datetime(),
  ended_at: z.string().datetime().nullable(),
  archived_at: z.string().datetime().nullable(),
  usage: DreamUsage,
  error: DreamError,
});
export type Dream = z.infer<typeof Dream>;

export const CreateDreamRequest = z.object({
  inputs: z
    .array(DreamInput)
    .min(1)
    .refine(
      (inputs) => inputs.some((i) => i.type === "memory_store"),
      "At least one memory_store input is required"
    ),
  model: DreamModel,
  instructions: z.string().max(4096).optional(),
});
export type CreateDreamRequest = z.infer<typeof CreateDreamRequest>;

export const ListDreamsParams = z.object({
  limit: z.number().int().min(1).max(100).default(20).optional(),
  page: z.string().optional(),
  include_archived: z.boolean().default(false).optional(),
});

export const BETA_HEADERS = {
  "anthropic-beta": "managed-agents-2026-04-01,dreaming-2026-04-21",
} as const;
