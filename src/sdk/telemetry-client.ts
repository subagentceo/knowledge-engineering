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
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 */

export type {
  AgentSessionCost,
  ModelCostBreakdown,
  CacheEfficiencyMetrics,
} from "./cost-types.js";

export {
  sdkOtelEnv,
  recordSessionCost,
  computeCacheEfficiency,
  buildCostRecord,
  replayCostsFromJSONL,
} from "./cost-types.js";

import {
  type AgentSessionCost,
  sdkOtelEnv,
  buildCostRecord,
  recordSessionCost,
  computeCacheEfficiency,
} from "./cost-types.js";

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
