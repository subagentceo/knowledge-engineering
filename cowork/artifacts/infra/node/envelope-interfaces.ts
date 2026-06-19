// Clean interface file for ts-to-zod — no zod imports, pure TypeScript

export type EnvelopeId = string;  // UUID format

export type MailboxProtocol = "e2m" | "mcp" | "a2a" | "acp";

export interface MailboxAddress {
  protocol: MailboxProtocol;
  host: string;
  name: string;
  version?: string;
}

export type EnvelopeStatus =
  | "pending"
  | "delivered"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled"
  | "expired";

export type PayloadKind =
  | "task"
  | "oauth"
  | "event"
  | "query"
  | "reply"
  | "error";

export interface EnvelopeHeader {
  envelopeId: EnvelopeId;
  protocol: "io.e2m/envelope";
  version: "draft";
  sentAt: string;       // ISO 8601
  from: MailboxAddress;
  to: MailboxAddress;
  replyTo?: MailboxAddress;
  correlationId?: EnvelopeId;
  payloadKind: PayloadKind;
  ttlMs?: number | null;
  traceId?: string;
}

export interface EnvelopeError {
  code: number;
  message: string;
  data?: Record<string, unknown> | null;
}

export interface Envelope {
  header: EnvelopeHeader;
  status: EnvelopeStatus;
  payload: Record<string, unknown>;
  error?: EnvelopeError | null;
  meta?: Record<string, unknown>;
}

// Task payload interfaces
export type TaskStatus =
  | "pending" | "working" | "input_required"
  | "delegated" | "completed" | "failed" | "cancelled";

export type TaskPriority = "low" | "normal" | "high" | "critical";

export interface AnthropicModelTarget {
  provider: "anthropic";
  model: string;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface ExternalAgentTarget {
  protocol: "mcp" | "a2a" | "acp" | "e2m";
  address: string;
}

export type TaskTarget = AnthropicModelTarget | ExternalAgentTarget;

export interface Task {
  taskId: string;
  status: TaskStatus;
  priority?: TaskPriority;
  statusMessage?: string | null;
  createdAt: string;
  lastUpdatedAt: string;
  ttlMs?: number | null;
  pollIntervalMs?: number;
  target?: TaskTarget;
  parentTaskId?: string | null;
  delegatedTo?: string | null;
}

// Memory store interfaces (for ts-to-zod)
export type MemoryAccess = "read_write" | "read_only";
export type MemoryOperation = "create" | "update" | "delete" | "redact";
export type MemoryStoreStatus = "active" | "archived";

export interface MemoryStore {
  id: string;
  name: string;
  description: string;
  status: MemoryStoreStatus;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Memory {
  id: string;
  memory_store_id: string;
  path: string;
  content?: string | null;
  content_sha256: string;
  created_at: string;
  updated_at: string;
}

export interface ContentSha256Precondition {
  type: "content_sha256";
  content_sha256: string;
}

export interface MemoryStoreResource {
  type: "memory_store";
  memory_store_id: string;
  access: MemoryAccess;
  instructions?: string;
}

export interface CreateMemoryParams {
  path: string;
  content?: string;
}

export interface UpdateMemoryParams {
  path?: string;
  content?: string;
  precondition?: ContentSha256Precondition;
}
