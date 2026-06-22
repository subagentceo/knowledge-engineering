/**
 * Managed Agents Memory API — TypeScript + Zod Bindings
 * Source: https://platform.claude.com/docs/en/managed-agents/memory
 * Beta: managed-agents-2026-04-01
 *
 * Type-safety cascade: YAML → THIS FILE → Rust/serde → Python/Pydantic
 *
 * Usage:
 *   import { MemoryStore, CreateMemoryStoreParamsSchema } from "./memory";
 *   const params = CreateMemoryStoreParamsSchema.parse({ name: "...", description: "..." });
 */

import { z } from "zod";

// ── Identifier Schemas ────────────────────────────────────────────────────────

export const MemoryStoreIdSchema = z
  .string()
  .regex(/^memstore_/, "Must start with memstore_");
export type MemoryStoreId = z.infer<typeof MemoryStoreIdSchema>;

export const MemoryIdSchema = z
  .string()
  .regex(/^mem_/, "Must start with mem_");
export type MemoryId = z.infer<typeof MemoryIdSchema>;

export const MemoryVersionIdSchema = z
  .string()
  .regex(/^memver_/, "Must start with memver_");
export type MemoryVersionId = z.infer<typeof MemoryVersionIdSchema>;

// ── Enums ─────────────────────────────────────────────────────────────────────

export const MemoryAccessSchema = z.enum(["read_write", "read_only"]);
export type MemoryAccess = z.infer<typeof MemoryAccessSchema>;

export const MemoryOperationSchema = z.enum(["create", "update", "delete", "redact"]);
export type MemoryOperation = z.infer<typeof MemoryOperationSchema>;

export const MemoryStoreStatusSchema = z.enum(["active", "archived"]);
export type MemoryStoreStatus = z.infer<typeof MemoryStoreStatusSchema>;

export const MemoryItemTypeSchema = z.enum(["memory", "memory_prefix"]);
export type MemoryItemType = z.infer<typeof MemoryItemTypeSchema>;

// ── Memory Store ──────────────────────────────────────────────────────────────

export const MemoryStoreSchema = z.object({
  id: MemoryStoreIdSchema,
  name: z.string().max(256),
  description: z.string().max(4096),
  status: MemoryStoreStatusSchema,
  archived_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type MemoryStore = z.infer<typeof MemoryStoreSchema>;

export const CreateMemoryStoreParamsSchema = z.object({
  name: z.string().max(256),
  description: z.string().max(4096),
});
export type CreateMemoryStoreParams = z.infer<typeof CreateMemoryStoreParamsSchema>;

export const UpdateMemoryStoreParamsSchema = z
  .object({
    name: z.string().max(256).optional(),
    description: z.string().max(4096).optional(),
  })
  .refine((d) => Object.keys(d).length > 0, "At least one field required");
export type UpdateMemoryStoreParams = z.infer<typeof UpdateMemoryStoreParamsSchema>;

export const ListMemoryStoresParamsSchema = z.object({
  include_archived: z.boolean().default(false),
});
export type ListMemoryStoresParams = z.infer<typeof ListMemoryStoresParamsSchema>;

// ── Memory ────────────────────────────────────────────────────────────────────

export const MemorySchema = z.object({
  id: MemoryIdSchema,
  memory_store_id: MemoryStoreIdSchema,
  path: z.string().startsWith("/"),
  /** Full text content. Present on retrieve, absent in list results. Max 100 kB. */
  content: z.string().max(102_400).nullable().optional(),
  /** SHA-256 hex digest. Use as precondition for safe concurrent updates. */
  content_sha256: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Memory = z.infer<typeof MemorySchema>;

export const MemoryListItemSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("memory"),
    path: z.string(),
    id: MemoryIdSchema,
  }),
  z.object({
    type: z.literal("memory_prefix"),
    path: z.string(),
  }),
]);
export type MemoryListItem = z.infer<typeof MemoryListItemSchema>;

export const ContentSha256PreconditionSchema = z.object({
  type: z.literal("content_sha256"),
  content_sha256: z.string(),
});
export type ContentSha256Precondition = z.infer<typeof ContentSha256PreconditionSchema>;

export const CreateMemoryParamsSchema = z.object({
  path: z.string().startsWith("/"),
  content: z.string().max(102_400).optional(),
});
export type CreateMemoryParams = z.infer<typeof CreateMemoryParamsSchema>;

export const UpdateMemoryParamsSchema = z
  .object({
    path: z.string().startsWith("/").optional(),
    content: z.string().max(102_400).optional(),
    precondition: ContentSha256PreconditionSchema.optional(),
  })
  .refine(
    (d) => d.path !== undefined || d.content !== undefined,
    "At least one of path or content required"
  );
export type UpdateMemoryParams = z.infer<typeof UpdateMemoryParamsSchema>;

export const ListMemoriesParamsSchema = z.object({
  path_prefix: z.string().optional(),
  order_by: z.enum(["path", "created_at", "updated_at"]).default("created_at"),
  depth: z.number().int().positive().optional(),
});
export type ListMemoriesParams = z.infer<typeof ListMemoriesParamsSchema>;

// ── Memory Version ────────────────────────────────────────────────────────────

export const MemoryVersionSchema = z.object({
  id: MemoryVersionIdSchema,
  memory_store_id: MemoryStoreIdSchema,
  memory_id: MemoryIdSchema,
  operation: MemoryOperationSchema,
  /** Full content at this version. Null when redacted. Present on retrieve only. */
  content: z.string().nullable().optional(),
  /** Null when redacted. */
  content_sha256: z.string().nullable().optional(),
  session_id: z.string().nullable().optional(),
  created_at: z.string().datetime(),
});
export type MemoryVersion = z.infer<typeof MemoryVersionSchema>;

export const ListMemoryVersionsParamsSchema = z.object({
  memory_id: MemoryIdSchema.optional(),
});
export type ListMemoryVersionsParams = z.infer<typeof ListMemoryVersionsParamsSchema>;

// ── Session Resource Attachment ───────────────────────────────────────────────

/**
 * Attach a MemoryStore to a session.
 * Maximum 8 stores per session.
 * Must be specified at session creation — cannot be added to a running session.
 */
export const MemoryStoreResourceSchema = z.object({
  type: z.literal("memory_store"),
  memory_store_id: MemoryStoreIdSchema,
  access: MemoryAccessSchema.default("read_write"),
  /** Session-level instructions shown to the agent. Max 4096 chars. */
  instructions: z.string().max(4096).optional(),
});
export type MemoryStoreResource = z.infer<typeof MemoryStoreResourceSchema>;

// ── Paginated List Response wrapper ──────────────────────────────────────────

export function PaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    has_more: z.boolean(),
    first_id: z.string().nullable().optional(),
    last_id: z.string().nullable().optional(),
  });
}

export const MemoryStoreListSchema = PaginatedSchema(MemoryStoreSchema);
export const MemoryListSchema = PaginatedSchema(MemoryListItemSchema);
export const MemoryVersionListSchema = PaginatedSchema(MemoryVersionSchema);

export type MemoryStoreList = z.infer<typeof MemoryStoreListSchema>;
export type MemoryList = z.infer<typeof MemoryListSchema>;
export type MemoryVersionList = z.infer<typeof MemoryVersionListSchema>;

// ── API client helper types ───────────────────────────────────────────────────

export const API_BASE = "https://api.anthropic.com";
export const API_VERSION = "2023-06-01";
export const BETA_HEADER = "managed-agents-2026-04-01";

export interface ApiHeaders {
  "x-api-key": string;
  "anthropic-version": typeof API_VERSION;
  "anthropic-beta": typeof BETA_HEADER;
  "content-type": "application/json";
}

export function makeHeaders(apiKey: string): ApiHeaders {
  return {
    "x-api-key": apiKey,
    "anthropic-version": API_VERSION,
    "anthropic-beta": BETA_HEADER,
    "content-type": "application/json",
  };
}

// ── Limits constants ──────────────────────────────────────────────────────────

export const LIMITS = {
  MEMORY_MAX_BYTES: 102_400,        // 100 kB per memory
  MEMORIES_PER_STORE: 2_000,        // max memories per store
  STORES_PER_SESSION: 8,            // max stores per session
  INSTRUCTIONS_MAX_CHARS: 4_096,    // session-level instructions
  VERSION_RETENTION_DAYS: 30,       // versions retained (recent always kept)
  RATE_CREATE_RPM: 300,             // create endpoints per org per minute
  RATE_READ_RPM: 600,               // read endpoints per org per minute
} as const;
