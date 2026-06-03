/**
 * Shared cost telemetry types for the agent SDK pipeline.
 *
 * Extracted here so src/ files can import without violating rootDir.
 * The cost poller (apps/analytics-dashboard/cost/src/) imports from here.
 *
 * @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
 */

/** Canonical cost record — parity with Console /cost + /usage/cache + /usage. */
export interface AgentSessionCost {
  session_id: string;
  model: string;
  workspace_id: string;
  service_tier: "standard" | "batch" | "priority" | "flex";
  context_window: "0-200k" | "200k-1M";
  uncached_input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_5m_input_tokens: number;
  cache_creation_1h_input_tokens: number;
  cost_usd: number;
  model_usage?: Record<string, ModelCostBreakdown>;
  pr_number?: number;
  branch?: string;
  recorded_at?: string;
}

export interface ModelCostBreakdown {
  cost_usd: number;
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
}

/** Cache efficiency metrics — parity with Console /usage/cache view. */
export interface CacheEfficiencyMetrics {
  session_id: string;
  model: string;
  total_input_tokens: number;
  cache_read_tokens: number;
  cache_creation_tokens: number;
  cache_hit_rate: number;
  estimated_savings_usd: number;
}
