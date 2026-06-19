/**
 * infra/openfeature/flags.ts
 * OpenFeature feature flags for e2m — model routing, memory store selection,
 * envelope payload variants, AlloyDB vs Redis routing decisions
 *
 * Packages: @openfeature/server-sdk@1, @openfeature/flagd-provider@0.16
 *
 * Auth: egress proxy session context — no API key.
 * Flag evaluation is local (InMemoryProvider) or via flagd sidecar.
 */

import {
  OpenFeature,
  InMemoryProvider,
  ProviderEvents,
  type Client,
  type EvaluationContext,
} from "@openfeature/server-sdk";

// ── E2M Feature Flag Definitions ─────────────────────────────────────────────

/**
 * All e2m feature flags with their default values and variants.
 * These drive runtime routing decisions without code changes.
 */
export const E2M_FLAGS = {
  // Model routing
  "e2m.model.coordinator": {
    defaultVariant: "sonnet",
    variants: {
      sonnet: "claude-sonnet-4-20250514",
      haiku:  "claude-haiku-4-5-20251001",
      opus:   "claude-opus-4-5-20251101",
    },
    description: "Which Anthropic model the coordinator agent uses",
  },

  // Memory store strategy
  "e2m.memory.cache-enabled": {
    defaultVariant: "on",
    variants: { on: true, off: false },
    description: "Enable Redis cache for memory store reads",
  },
  "e2m.memory.cache-ttl-ms": {
    defaultVariant: "default",
    variants: { default: 300_000, short: 60_000, long: 900_000 },
    description: "Redis cache TTL for memory store entries",
  },

  // Envelope routing
  "e2m.envelope.bloom-dedup": {
    defaultVariant: "on",
    variants: { on: true, off: false },
    description: "Enable Bloom filter deduplication for incoming envelopes",
  },
  "e2m.envelope.max-ttl-ms": {
    defaultVariant: "default",
    variants: { default: 3_600_000, short: 600_000, extended: 86_400_000 },
    description: "Default envelope TTL when not specified by sender",
  },

  // Database routing
  "e2m.db.backend": {
    defaultVariant: "alloydb",
    variants: { alloydb: "alloydb", redis: "redis", dual: "dual" },
    description: "Primary data backend for task and envelope persistence",
  },

  // Observability
  "e2m.otel.sampling-rate": {
    defaultVariant: "full",
    variants: { full: 1.0, half: 0.5, tenth: 0.1, off: 0.0 },
    description: "OTel trace sampling rate",
  },

  // Worker authentication model
  "e2m.auth.model": {
    defaultVariant: "egress-proxy",
    variants: {
      "egress-proxy": "egress-proxy",   // Session context — no key needed
      "environment-key": "environment-key", // Self-hosted worker
    },
    description: "Auth model in use. egress-proxy = session context (Artifact/Claude Code/Cowork). environment-key = self-hosted ant worker.",
  },
} as const;

export type E2MFlagKey = keyof typeof E2M_FLAGS;

// ── Provider setup ────────────────────────────────────────────────────────────

let _client: Client | null = null;

/**
 * Initialize OpenFeature with InMemoryProvider (dev/test).
 * For production, swap to FlagdProvider pointing at your flagd sidecar.
 */
export function initOpenFeature(providerType: "in-memory" | "flagd" = "in-memory"): void {
  if (providerType === "in-memory") {
    // Build InMemoryProvider flags map from E2M_FLAGS
    const flagsMap: Record<string, {
      defaultVariant: string;
      variants: Record<string, unknown>;
    }> = {};

    for (const [key, def] of Object.entries(E2M_FLAGS)) {
      flagsMap[key] = {
        defaultVariant: def.defaultVariant,
        variants: def.variants as Record<string, unknown>,
      };
    }

    OpenFeature.setProvider(new InMemoryProvider(flagsMap));
    console.log("[openfeature] InMemoryProvider initialized with e2m flags");
  } else {
    // flagd sidecar — requires flagd running (e.g. in docker-compose)
    // import { FlagdProvider } from "@openfeature/flagd-provider";
    // OpenFeature.setProvider(new FlagdProvider({ host: "flagd", port: 8013 }));
    throw new Error("flagd provider: import FlagdProvider and configure flagd sidecar");
  }
}

export function getOpenFeatureClient(domain?: string): Client {
  if (!_client) {
    _client = OpenFeature.getClient(domain ?? "e2m");
  }
  return _client;
}

// ── Typed flag evaluators ─────────────────────────────────────────────────────

export async function getModelFlag(
  context?: EvaluationContext
): Promise<string> {
  const client = getOpenFeatureClient();
  const result = await client.getStringValue(
    "e2m.model.coordinator",
    E2M_FLAGS["e2m.model.coordinator"].variants.sonnet,
    context
  );
  return result;
}

export async function isMemoryCacheEnabled(
  context?: EvaluationContext
): Promise<boolean> {
  const client = getOpenFeatureClient();
  return client.getBooleanValue("e2m.memory.cache-enabled", true, context);
}

export async function getMemoryCacheTtl(
  context?: EvaluationContext
): Promise<number> {
  const client = getOpenFeatureClient();
  return client.getNumberValue("e2m.memory.cache-ttl-ms", 300_000, context);
}

export async function isBloomDedupEnabled(
  context?: EvaluationContext
): Promise<boolean> {
  const client = getOpenFeatureClient();
  return client.getBooleanValue("e2m.envelope.bloom-dedup", true, context);
}

export async function getDbBackend(
  context?: EvaluationContext
): Promise<"alloydb" | "redis" | "dual"> {
  const client = getOpenFeatureClient();
  const val = await client.getStringValue("e2m.db.backend", "alloydb", context);
  return val as "alloydb" | "redis" | "dual";
}

export async function getAuthModel(
  context?: EvaluationContext
): Promise<"egress-proxy" | "environment-key"> {
  const client = getOpenFeatureClient();
  const val = await client.getStringValue(
    "e2m.auth.model",
    "egress-proxy",
    context
  );
  return val as "egress-proxy" | "environment-key";
}

export async function getOtelSamplingRate(
  context?: EvaluationContext
): Promise<number> {
  const client = getOpenFeatureClient();
  return client.getNumberValue("e2m.otel.sampling-rate", 1.0, context);
}

// ── Session-context evaluation ────────────────────────────────────────────────
// Provides targeting context from e2m envelope metadata

export function makeEnvelopeContext(envelope: {
  header: { from: { host: string }; payloadKind: string };
}): EvaluationContext {
  return {
    targetingKey: envelope.header.from.host,
    payloadKind: envelope.header.payloadKind,
  };
}
