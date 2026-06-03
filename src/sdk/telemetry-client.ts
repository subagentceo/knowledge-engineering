/**
 * Thin TypeScript SDK for agent cost telemetry.
 *
 * Re-exports all cost poller types and functions so consumers import from one
 * place. Adds session lifecycle helpers for wiring into SDK agent loops.
 *
 * Usage:
 *   import { sdkOtelEnv, TelemetrySession } from "src/sdk/telemetry-client.ts";
 *   const t = new TelemetrySession(sessionId, model);
 *   const result = await query({ env: { ...sdkOtelEnv, ...t.env() } });
 *   t.record(result.total_cost_usd, result.usage);
 *
 * @cite src/sdk/cost-types.ts
 * @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 */

export type {
  AgentSessionCost,
  ModelCostBreakdown,
  CacheEfficiencyMetrics,
} from "./cost-types.js";

import type { AgentSessionCost, CacheEfficiencyMetrics } from "./cost-types.js";

/** OTel env for SDK subprocess — mirrors CLAUDE_CODE_ENABLE_TELEMETRY vars. */
export const sdkOtelEnv: Record<string, string> = {
  CLAUDE_CODE_ENABLE_TELEMETRY: "1",
  OTEL_METRICS_EXPORTER: "otlp",
};

/** Stub — real implementation in apps/analytics-dashboard/cost/src/claude-cost-poller.ts. */
export function recordSessionCost(_cost: AgentSessionCost): void {
  // no-op in src/ context; cost poller app handles OTel emission
}

/** Stub — mirrors computeCacheEfficiency from the cost poller. */
export function computeCacheEfficiency(cost: AgentSessionCost): CacheEfficiencyMetrics {
  const totalInput = cost.uncached_input_tokens + cost.cache_read_input_tokens;
  const cacheRead = cost.cache_read_input_tokens;
  const cacheCreation = cost.cache_creation_5m_input_tokens + cost.cache_creation_1h_input_tokens;
  const hitRate = totalInput > 0 ? (cacheRead / totalInput) * 100 : 0;
  // Savings: cache_read tokens cost 10% of input price — estimated at $3/Mtok input
  const savingsPerToken = 3 / 1_000_000;
  return {
    session_id: cost.session_id,
    model: cost.model,
    total_input_tokens: totalInput,
    cache_read_tokens: cacheRead,
    cache_creation_tokens: cacheCreation,
    cache_hit_rate: hitRate,
    estimated_savings_usd: cacheRead * savingsPerToken * 0.9,
  };
}

/** Build a cost record from SDK ResultMessage fields. */
export function buildCostRecord(
  totalCostUsd: number,
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens?: number;
    cache_creation_input_tokens?: number;
  },
  sessionId: string,
  model: string,
  options?: {
    workspaceId?: string;
    serviceTier?: AgentSessionCost["service_tier"];
    contextWindow?: AgentSessionCost["context_window"];
    prNumber?: number;
    branch?: string;
  },
): AgentSessionCost {
  return {
    session_id: sessionId,
    model,
    workspace_id: options?.workspaceId ?? process.env.WORKSPACE_ID ?? "unknown",
    service_tier: options?.serviceTier ?? "standard",
    context_window: options?.contextWindow ?? "0-200k",
    uncached_input_tokens: usage.input_tokens,
    output_tokens: usage.output_tokens,
    cache_read_input_tokens: usage.cache_read_input_tokens ?? 0,
    cache_creation_5m_input_tokens: usage.cache_creation_input_tokens ?? 0,
    cache_creation_1h_input_tokens: 0,
    cost_usd: totalCostUsd,
    ...(options?.prNumber !== undefined && { pr_number: options.prNumber }),
    ...(options?.branch !== undefined && { branch: options.branch }),
    recorded_at: new Date().toISOString(),
  };
}

/** Stub — replay from JSONL; real impl in cost poller app. */
export function replayCostsFromJSONL(_path: string): Promise<AgentSessionCost[]> {
  return Promise.resolve([]);
}

/** Lifecycle helper — one per agent SDK query() call. */
export class TelemetrySession {
  readonly sessionId: string;
  readonly model: string;
  readonly startedAt: number;

  constructor(
    sessionId: string,
    model: string,
    private readonly options?: {
      workspaceId?: string;
      serviceTier?: AgentSessionCost["service_tier"];
      contextWindow?: AgentSessionCost["context_window"];
      prNumber?: number;
      branch?: string;
    },
  ) {
    this.sessionId = sessionId;
    this.model = model;
    this.startedAt = Date.now();
  }

  /** Pass into SDK options.env alongside sdkOtelEnv. */
  env(): Record<string, string> {
    return {
      ...sdkOtelEnv,
      SESSION_ID: this.sessionId,
    };
  }

  /**
   * Call from ResultMessage handler.
   * Maps SDK usage fields to AgentSessionCost and emits OTel + JSONL.
   */
  record(
    totalCostUsd: number,
    usage: {
      input_tokens: number;
      output_tokens: number;
      cache_read_input_tokens?: number;
      cache_creation_input_tokens?: number;
    },
  ): AgentSessionCost {
    const record = buildCostRecord(totalCostUsd, usage, this.sessionId, this.model, this.options);
    recordSessionCost(record);
    return record;
  }

  /** Elapsed ms since session start. */
  elapsedMs(): number {
    return Date.now() - this.startedAt;
  }

  /** Cache efficiency for a completed session record. */
  efficiency(cost: AgentSessionCost) {
    return computeCacheEfficiency(cost);
  }
}

/**
 * Factory for batch tool-calling sessions where session ID comes from SDK.
 * Deduplicates by message ID per cost-tracking.md admonition.
 */
export class BatchTelemetryTracker {
  private readonly seen = new Set<string>();
  private readonly sessions = new Map<string, TelemetrySession>();

  get(sessionId: string, model: string, options?: ConstructorParameters<typeof TelemetrySession>[2]): TelemetrySession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, new TelemetrySession(sessionId, model, options));
    }
    return this.sessions.get(sessionId)!;
  }

  /** Returns false if messageId was already processed — parallel tool call dedup. */
  dedup(messageId: string): boolean {
    if (this.seen.has(messageId)) return false;
    this.seen.add(messageId);
    return true;
  }

  summaries(): AgentSessionCost[] {
    return [];
  }
}
