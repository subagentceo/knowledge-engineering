/**
 * infra/otel/tracing.ts
 * OpenTelemetry tracing for e2m — envelope routing, memory ops, redis, alloydb
 *
 * Packages: @opentelemetry/api, @opentelemetry/sdk-node, @opentelemetry/sdk-trace-node
 *           @opentelemetry/redis-common, @opentelemetry/exporter-trace-otlp-http
 *
 * Auth model: egress proxy session context — no API key in this file.
 * OTel collector endpoint is a separate concern (OTEL_EXPORTER_OTLP_ENDPOINT env var).
 */

import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import {
  trace,
  context,
  SpanStatusCode,
  type Span,
  type Tracer,
} from "@opentelemetry/api";
import { DbStatementSerializer, defaultDbStatementSerializer } from "@opentelemetry/redis-common";

// ── SDK Bootstrap ─────────────────────────────────────────────────────────────

let sdk: NodeSDK | null = null;

export function initTracing(config: {
  serviceName?: string;
  serviceVersion?: string;
  collectorUrl?: string;
}): void {
  const collectorUrl =
    config.collectorUrl ??
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
    "http://localhost:4318/v1/traces";

  sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: config.serviceName ?? "e2m",
      [SEMRESATTRS_SERVICE_VERSION]: config.serviceVersion ?? "draft",
    }),
    traceExporter: new OTLPTraceExporter({ url: collectorUrl }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
  console.log(`[otel] Tracing initialized → ${collectorUrl}`);
}

export async function shutdownTracing(): Promise<void> {
  await sdk?.shutdown();
}

// ── Tracer accessor ───────────────────────────────────────────────────────────

export function getTracer(name = "e2m"): Tracer {
  return trace.getTracer(name);
}

// ── Span helpers ──────────────────────────────────────────────────────────────

/**
 * Wrap an async fn in a span. Sets OK/ERROR status automatically.
 */
export async function withSpan<T>(
  tracer: Tracer,
  spanName: string,
  attributes: Record<string, string | number | boolean>,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  return tracer.startActiveSpan(spanName, { attributes }, async (span) => {
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err instanceof Error ? err.message : String(err),
      });
      span.recordException(err as Error);
      throw err;
    } finally {
      span.end();
    }
  });
}

// ── E2M Semantic Attributes ───────────────────────────────────────────────────

export const E2M_ATTRS = {
  // Envelope
  ENVELOPE_ID:      "e2m.envelope.id",
  ENVELOPE_KIND:    "e2m.envelope.payload_kind",
  ENVELOPE_STATUS:  "e2m.envelope.status",
  FROM_HOST:        "e2m.from.host",
  FROM_MAILBOX:     "e2m.from.name",
  TO_HOST:          "e2m.to.host",
  TO_MAILBOX:       "e2m.to.name",
  CORRELATION_ID:   "e2m.correlation_id",
  // Task
  TASK_ID:          "e2m.task.id",
  TASK_STATUS:      "e2m.task.status",
  TASK_MODEL:       "e2m.task.model",
  // Memory
  STORE_ID:         "e2m.memory.store_id",
  MEMORY_ID:        "e2m.memory.id",
  MEMORY_PATH:      "e2m.memory.path",
  MEMORY_OP:        "e2m.memory.operation",
  // Redis
  REDIS_CMD:        "db.redis.command",
  REDIS_KEY:        "db.redis.key",
  // Feature flags
  FLAG_KEY:         "feature_flag.key",
  FLAG_VALUE:       "feature_flag.evaluated_value",
  FLAG_PROVIDER:    "feature_flag.provider_name",
  // AlloyDB
  ALLOYDB_CLUSTER:  "db.alloydb.cluster",
  ALLOYDB_INSTANCE: "db.alloydb.instance",
  DB_STATEMENT:     "db.statement",
} as const;

// ── Envelope tracing helpers ──────────────────────────────────────────────────

export function traceEnvelopeRoute(
  tracer: Tracer,
  envelope: {
    header: {
      envelopeId: string;
      payloadKind: string;
      from: { host: string; name: string };
      to: { host: string; name: string };
      correlationId?: string;
    };
    status: string;
  }
) {
  return withSpan(
    tracer,
    "e2m.envelope.route",
    {
      [E2M_ATTRS.ENVELOPE_ID]:    envelope.header.envelopeId,
      [E2M_ATTRS.ENVELOPE_KIND]:  envelope.header.payloadKind,
      [E2M_ATTRS.ENVELOPE_STATUS]:envelope.status,
      [E2M_ATTRS.FROM_HOST]:      envelope.header.from.host,
      [E2M_ATTRS.FROM_MAILBOX]:   envelope.header.from.name,
      [E2M_ATTRS.TO_HOST]:        envelope.header.to.host,
      [E2M_ATTRS.TO_MAILBOX]:     envelope.header.to.name,
      ...(envelope.header.correlationId
        ? { [E2M_ATTRS.CORRELATION_ID]: envelope.header.correlationId }
        : {}),
    },
    async (span) => span // caller provides the actual fn
  );
}

// ── Redis OTel serializer (re-export from @opentelemetry/redis-common) ────────

export { defaultDbStatementSerializer };

export function redisSpanAttrs(cmd: string, key: string, args?: unknown[]) {
  return {
    [E2M_ATTRS.REDIS_CMD]: cmd,
    [E2M_ATTRS.REDIS_KEY]: key,
    [E2M_ATTRS.DB_STATEMENT]: defaultDbStatementSerializer(cmd, [key, ...(args ?? [])] as string[]),
  };
}

// ── Memory store tracing helper ───────────────────────────────────────────────

export function traceMemoryOp<T>(
  tracer: Tracer,
  op: "create" | "read" | "update" | "delete" | "list",
  storeId: string,
  memPath: string,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  return withSpan(tracer, `e2m.memory.${op}`, {
    [E2M_ATTRS.STORE_ID]:    storeId,
    [E2M_ATTRS.MEMORY_PATH]: memPath,
    [E2M_ATTRS.MEMORY_OP]:   op,
  }, fn);
}
