/**
 * a2a standardization hook — the single chokepoint every message passes through.
 *
 * parseIn (inbound) and emit (outbound) both run through EnvelopeSchema + the
 * per-schemaRef payload validator, so an agent can never emit anything it could
 * not also accept. render adapts one validated envelope to two audiences.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/structured-outputs.md
 */
import { randomUUID } from "node:crypto";
import type { z } from "zod";
import { EnvelopeSchema, type Envelope } from "./envelope.js";

/** Payload schemas keyed by schemaRef (e.g. "cf.nav.v1"). */
export type PayloadRegistry = Record<string, z.ZodTypeAny>;

export interface A2AHookConfig {
  payloads: PayloadRegistry;
  now?: () => string;
  newId?: () => string;
}

export class A2AError extends Error {
  constructor(
    public code: string,
    message: string,
    public issues?: unknown,
  ) {
    super(message);
    this.name = "A2AError";
  }
}

export interface EmitInput {
  channel: Envelope["channel"];
  role: Envelope["role"];
  from: Envelope["from"];
  to: Envelope["to"];
  intent: string;
  payload: Envelope["payload"];
  correlationId?: string;
  provenance?: Envelope["provenance"];
  render?: Envelope["render"];
  status?: Envelope["status"];
}

function defaultId(): string {
  return `msg_${randomUUID().replace(/-/g, "")}`;
}

export function createA2AHook(cfg: A2AHookConfig) {
  const now = cfg.now ?? (() => new Date().toISOString());
  const newId = cfg.newId ?? defaultId;

  /** Validate envelope, then validate payload.data against its schemaRef. */
  function parseIn(raw: unknown): Envelope {
    const env = EnvelopeSchema.safeParse(raw);
    if (!env.success) throw new A2AError("ENVELOPE_INVALID", "bad envelope", env.error.issues);

    const ref = env.data.payload.schemaRef;
    const schema = cfg.payloads[ref];
    if (!schema) throw new A2AError("SCHEMA_UNKNOWN", `no schema for ${ref}`);

    const data = schema.safeParse(env.data.payload.data);
    if (!data.success) throw new A2AError("PAYLOAD_INVALID", `payload does not match ${ref}`, data.error.issues);

    return { ...env.data, payload: { ...env.data.payload, data: data.data } } as Envelope;
  }

  /** Stamp protocol/version/id/ts/status, then validate before emit. */
  function emit(input: EmitInput): Envelope {
    const candidate: Record<string, unknown> = {
      protocol: "a2a",
      v: 1,
      id: newId(),
      ts: now(),
      status: input.status ?? (input.payload.mode === "error" ? "error" : "ok"),
      channel: input.channel,
      role: input.role,
      from: input.from,
      to: input.to,
      intent: input.intent,
      payload: input.payload,
    };
    if (input.correlationId !== undefined) candidate.correlationId = input.correlationId;
    if (input.provenance !== undefined) candidate.provenance = input.provenance;
    if (input.render !== undefined) candidate.render = input.render;
    return parseIn(candidate);
  }

  /** Same validated envelope, two audiences. */
  function render(env: Envelope): string {
    if (env.channel === "operator") {
      return [
        `**${env.intent}** — ${env.status}`,
        `from \`${env.from.id}\` -> \`${env.to.id}\``,
        "```json",
        JSON.stringify(env.payload, null, 2),
        "```",
      ].join("\n");
    }
    return JSON.stringify(env);
  }

  return { parseIn, emit, render };
}
