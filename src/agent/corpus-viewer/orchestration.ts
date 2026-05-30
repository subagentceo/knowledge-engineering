// src/agent/corpus-viewer/orchestration.ts
//
// Turn / context / cache / compaction / memory management for the build.
//
// This is the runtime brain that sits between the typed boundaries
// (primitives.ts / outputs.ts) and the SDK call (run.ts). It owns:
//
//   1. TurnLedger     — per-subagent token + turn accounting against budget.
//   2. Compaction     — when a subagent nears compactAtInputTokens, summarize
//                       its transcript down to its last StructuredOutput so the
//                       next turn starts from a small, cache-friendly context.
//   3. Memory         — durable per-subagent notes (AgentDefinition.memory =
//                       'project' → .claude/agent-memory/<name>/). We model the
//                       note store here so it's testable without the filesystem.
//   4. Cache planning — split each subagent's prompt into a STABLE cached
//                       prefix (templates + tool defs) and a DYNAMIC suffix
//                       (this task), mirroring SYSTEM_PROMPT_DYNAMIC_BOUNDARY.
//
// Citations:
//   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
//   @cite seeds/prompts/orchestrator.system.md
//   @cite src/agent/run.ts  (SYSTEM_PROMPT_DYNAMIC_BOUNDARY usage)
//
// Pure logic + an injectable memory backend; no SDK import, no direct I/O.

import type { SubagentSpec, TaskEnvelope, TokenBudget } from "./primitives.js";
import type { StructuredOutput } from "./outputs.js";

// ──────────────────────────────────────────────────────────────────────
// Turn ledger — tracks spend so the orchestrator can stop or compact.

export interface TurnRecord {
  turn: number;
  outputTokens: number;
  inputTokens: number;
  cacheReadInputTokens: number;
}

export class TurnLedger {
  private records: TurnRecord[] = [];
  constructor(private readonly budget: TokenBudget) {}

  record(r: Omit<TurnRecord, "turn">): TurnRecord {
    const turn = this.records.length + 1;
    const rec = { turn, ...r };
    this.records.push(rec);
    return rec;
  }

  totalOutput(): number {
    return this.records.reduce((s, r) => s + r.outputTokens, 0);
  }
  lastInput(): number {
    return this.records.at(-1)?.inputTokens ?? 0;
  }
  turns(): number {
    return this.records.length;
  }

  /** Cache-read ratio — a health signal; low ratio means the prefix keeps busting. */
  cacheHitRatio(): number {
    const inp = this.records.reduce((s, r) => s + r.inputTokens, 0);
    if (inp === 0) return 1;
    const hit = this.records.reduce((s, r) => s + r.cacheReadInputTokens, 0);
    return hit / inp;
  }

  /** True when the next dispatch would exceed the output-token ceiling. */
  outputBudgetExhausted(): boolean {
    return this.totalOutput() >= this.budget.maxOutputTokens;
  }
  /** True when the last turn's input context crossed the compaction threshold. */
  shouldCompact(): boolean {
    return this.lastInput() >= this.budget.compactAtInputTokens;
  }
  /** True when the turn cap is reached and the task must STOP. */
  turnsExhausted(): boolean {
    return this.turns() >= this.budget.maxTurns;
  }

  /** The single STOP decision the orchestrator consults each turn. */
  stopReason(): "output-budget" | "turns" | "ok" {
    if (this.outputBudgetExhausted()) return "output-budget";
    if (this.turnsExhausted()) return "turns";
    return "ok";
  }
}

// ──────────────────────────────────────────────────────────────────────
// Compaction — summarize a transcript down to its durable result.
//
// The principle (per prompt-caching + Opus 4.8 compaction): when context
// grows, replace the bulky intermediate turns with a compact summary that
// preserves the structured result and the open next-steps, so the cache
// prefix stays intact and the model re-enters with a small, relevant context.

export interface CompactionInput {
  /** The last validated structured output (the durable fact). */
  lastOutput: StructuredOutput | null;
  /** Open items the subagent still has to do. */
  openNextSteps: string[];
  /** The bulky turns being compacted away (for the summary line only). */
  discardedTurns: number;
}

export interface CompactionResult {
  /** A small system message appended at the compaction boundary. */
  summarySystemMessage: string;
  /** Whether the cache prefix is preserved across this boundary. */
  cachePreserved: boolean;
}

export function compact(input: CompactionInput, spec: SubagentSpec): CompactionResult {
  const resultLine = input.lastOutput
    ? `last result: ${input.lastOutput.kind} (truncated=${input.lastOutput.truncated})`
    : "no structured result yet";
  const steps = input.openNextSteps.length
    ? `open: ${input.openNextSteps.join("; ")}`
    : "open: none";
  return {
    summarySystemMessage:
      `[compaction] discarded ${input.discardedTurns} intermediate turn(s). ` +
      `${resultLine}. ${steps}.`,
    // Per the cache policy, mid-conversation system messages are appended in a
    // cache-preserving way; Opus 4.8 keeps the cached prefix across them.
    cachePreserved: spec.cache.preserveCacheAcrossSystemMessages,
  };
}

// ──────────────────────────────────────────────────────────────────────
// Memory — durable per-subagent notes between turns/sessions.
//
// Backed by AgentDefinition.memory='project' at runtime
// (.claude/agent-memory/<name>/). Here it's an injectable interface so tests
// use an in-memory map and the runtime uses the filesystem.

export interface MemoryBackend {
  read(agent: string): Promise<string | null>;
  write(agent: string, note: string): Promise<void>;
}

export class InMemoryMemory implements MemoryBackend {
  private store = new Map<string, string>();
  async read(agent: string): Promise<string | null> {
    return this.store.get(agent) ?? null;
  }
  async write(agent: string, note: string): Promise<void> {
    this.store.set(agent, note);
  }
}

/**
 * Append a durable note for a subagent, capped so memory itself can't grow
 * unbounded (keep only the most recent ~2KB — recent decisions matter most).
 */
export async function rememberDecision(
  backend: MemoryBackend,
  agent: string,
  decision: string,
  capBytes = 2048,
): Promise<string> {
  const prev = (await backend.read(agent)) ?? "";
  const merged = `${prev}\n- ${decision}`.trimStart();
  const capped = merged.length > capBytes ? merged.slice(merged.length - capBytes) : merged;
  await backend.write(agent, capped);
  return capped;
}

// ──────────────────────────────────────────────────────────────────────
// Cache planning — STABLE prefix vs DYNAMIC suffix per dispatch.

export interface CachePlan {
  /** Concatenated stable text that becomes the cached system prefix. */
  stablePrefix: string;
  /** The marker after which dynamic per-task context begins (SDK boundary). */
  boundaryMarker: string;
  /** The per-task dynamic instruction (not cached). */
  dynamicSuffix: string;
  /** Whether tool definitions are included in the cached prefix. */
  toolDefinitionsCached: boolean;
}

/** The literal marker the SDK splits on; re-exported so callers stay in sync. */
export const DYNAMIC_BOUNDARY = "<<<DYNAMIC_BOUNDARY>>>";

/**
 * Build the cache plan for one dispatch. The stable prefix (subagent system
 * prompt + shared templates) is identical across tasks for a given subagent,
 * so the Anthropic prompt cache reuses it; only the dynamic suffix (this
 * task's input) changes per call.
 */
export function planCache(spec: SubagentSpec, systemPrompt: string, sharedTemplates: string, task: TaskEnvelope): CachePlan {
  const stablePieces = [systemPrompt];
  if (spec.cache.cacheSystemPrefix) stablePieces.push(sharedTemplates);
  return {
    stablePrefix: stablePieces.join("\n\n"),
    boundaryMarker: DYNAMIC_BOUNDARY,
    dynamicSuffix: `Task ${task.id}: ${task.content}\nInput: ${JSON.stringify(task.input)}`,
    toolDefinitionsCached: spec.cache.cacheToolDefinitions,
  };
}
