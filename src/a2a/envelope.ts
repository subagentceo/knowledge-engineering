/**
 * a2a (agent-to-agent / agent-to-operator) message envelope.
 *
 * The single wire format for messages in and out of an agent. `channel` is the
 * audience switch (agent | operator); `render` lets the same validated object
 * serialize two ways. superRefine encodes the automation invariants:
 *   - status:error iff payload.mode:error
 *   - a producer result must carry a correlationId
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/structured-outputs.md
 */
import { z } from "zod";

// ISO-8601 UTC with offset. Version-proof regex (avoids zod date-format drift).
const IsoDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, "ISO-8601 UTC");

export const MsgId = z.string().regex(/^msg_[0-9A-Za-z]{6,}$/, "msg_-prefixed id");

export const PartyKind = z.enum(["agent", "operator", "tool", "system"]);
export const PartyRef = z.object({ kind: PartyKind, id: z.string().min(1) }).strict();
export type PartyRef = z.infer<typeof PartyRef>;

export const Channel = z.enum(["agent", "operator"]);
export type Channel = z.infer<typeof Channel>;
export const Role = z.enum(["producer", "consumer", "orchestrator"]);
export type Role = z.infer<typeof Role>;
export const Status = z.enum(["ok", "partial", "error"]);
export type Status = z.infer<typeof Status>;
export const PayloadMode = z.enum(["request", "result", "error", "event"]);

export const SourceKind = z.enum(["dom", "mdx", "api", "user", "tool"]);
export const Provenance = z
  .object({
    source: SourceKind,
    uri: z.string().url(),
    extractedAt: IsoDateTime.optional(),
  })
  .strict();

const PayloadBase = z.object({ schemaRef: z.string().min(1) });

export const Payload = z.discriminatedUnion("mode", [
  PayloadBase.extend({ mode: z.literal("request"), data: z.unknown() }).strict(),
  PayloadBase.extend({ mode: z.literal("result"), data: z.unknown() }).strict(),
  PayloadBase.extend({ mode: z.literal("event"), data: z.unknown() }).strict(),
  PayloadBase.extend({
    mode: z.literal("error"),
    data: z
      .object({
        code: z.string().min(1),
        message: z.string().min(1),
        retryable: z.boolean().default(false),
      })
      .strict(),
  }).strict(),
]);
export type Payload = z.infer<typeof Payload>;

export const RenderHints = z
  .object({
    operator: z.enum(["markdown", "text", "table"]).default("markdown"),
    agent: z.enum(["json", "yaml"]).default("json"),
  })
  .strict();

export const EnvelopeSchema = z
  .object({
    protocol: z.literal("a2a"),
    v: z.literal(1),
    id: MsgId,
    ts: IsoDateTime,
    channel: Channel,
    role: Role,
    from: PartyRef,
    to: PartyRef,
    intent: z.string().regex(/^[a-z]+(\.[a-z-]+)+$/, "dotted verb.noun"),
    status: Status,
    correlationId: MsgId.optional(),
    payload: Payload,
    provenance: z.array(Provenance).default([]),
    render: RenderHints.default({ operator: "markdown", agent: "json" }),
  })
  .strict()
  .superRefine((e, ctx) => {
    if ((e.status === "error") !== (e.payload.mode === "error")) {
      ctx.addIssue({ code: "custom", message: "status:error must pair with payload.mode:error" });
    }
    if (e.role === "producer" && e.payload.mode === "result" && !e.correlationId) {
      ctx.addIssue({ code: "custom", message: "result requires correlationId" });
    }
  });
export type Envelope = z.infer<typeof EnvelopeSchema>;
