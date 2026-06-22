/**
 * T2 — BM25 + LLM rerank engine.
 *
 * Two-pass ranking:
 *   Pass 1 (deterministic): score every candidate via computeScore() from
 *                            task-state-machine.ts, rank by total descending.
 *   Pass 2 (optional LLM):  send top-20 IDs to Claude Haiku with prefill+stop
 *                            for a JSON rerank of the top-5 slots only.
 *
 * Zero external deps for pass 1. Pass 2 requires ANTHROPIC via OAuth
 * (ANTHROPIC_API_KEY is FORBIDDEN — see src/oauth/token.ts).
 *
 * @cite cowork/templates/task-state-machine.ts
 * @cite src/cache/lru-bm25.ts                   (L1 LRU + BM25 layer)
 * @cite src/course-plugins/claude-api/skills/rag/scripts/reranking_and_context.py
 * @cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md
 */

import { z } from "zod";
import {
  DurableTask,
  PriorityScore,
  computeScore,
  urgencyScore,
  stalenessScore,
} from "./task-state-machine.js";

// ── I/O contracts (Zod) ───────────────────────────────────────────────────────

export const RerankInput = z.object({
  tasks:      z.array(DurableTask),
  query:      z.string().optional(),   // free-text context for LLM pass
  top:        z.number().int().min(1).max(100).default(10),
  llm:        z.boolean().default(false),
  model:      z.string().default("claude-haiku-4-5-20251001"),
});
export type RerankInput = z.infer<typeof RerankInput>;

export const RankedTask = DurableTask.extend({
  rank:           z.number().int().min(1),
  priority_score: PriorityScore,
});
export type RankedTask = z.infer<typeof RankedTask>;

export const RerankOutput = z.object({
  ranked:      z.array(RankedTask),
  total_tasks: z.number().int(),
  reranked_by: z.enum(["score", "llm"]),
  tokens_used: z.number().int().optional(),
  elapsed_ms:  z.number().int(),
});
export type RerankOutput = z.infer<typeof RerankOutput>;

// ── Score computation ─────────────────────────────────────────────────────────

function scoreTask(task: DurableTask, allTasks: DurableTask[]): PriorityScore {
  const now = new Date();

  // impact: ke_fit_score (1-5) → 0-100, domain multiplier
  const domainMul: Record<string, number> = {
    "product-management": 1.2,
    engineering:          1.1,
    data:                 1.0,
    design:               0.9,
  };
  const fitBase = task.ke_fit_score != null ? (task.ke_fit_score / 5) * 100 : 50;
  const impact  = Math.min(100, fitBase * (domainMul[task.domain ?? ""] ?? 1.0));

  // dependency_unblock: sum urgency of tasks this one unblocks
  const downstream = allTasks.filter(t => t.depends_on.includes(task.id));
  const depScore   = downstream.length === 0
    ? 0
    : Math.min(100, downstream.reduce((acc, t) => acc + urgencyScore(t, now), 0) / downstream.length);

  // effort_efficiency: impact / estimated_hours (capped at 100)
  const effortEff = task.estimated_hours != null
    ? Math.min(100, (impact / task.estimated_hours) * 5)
    : 50;

  return computeScore({
    urgency:            urgencyScore(task, now),
    impact:             Math.round(impact),
    dependency_unblock: Math.round(depScore),
    effort_efficiency:  Math.round(effortEff),
    staleness:          stalenessScore(task, now),
  });
}

// ── Pass 1: deterministic BM25-style score rank ───────────────────────────────

function pass1(tasks: DurableTask[]): RankedTask[] {
  const eligible = tasks.filter(t => t.state === "pending" || t.state === "blocked");
  const scored   = eligible.map(t => ({
    ...t,
    priority_score: scoreTask(t, tasks),
  }));
  scored.sort((a, b) => b.priority_score.total - a.priority_score.total);
  return scored.map((t, i) => RankedTask.parse({ ...t, rank: i + 1 }));
}

// ── Pass 2: optional LLM rerank (top-5 slots only) ───────────────────────────

async function pass2(
  ranked:   RankedTask[],
  query:    string,
  model:    string,
  top:      number,
): Promise<{ ranked: RankedTask[]; tokens: number }> {
  // Dynamic import so pass-1-only callers incur zero overhead
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic(); // OAuth token injected by env; API key forbidden

  const candidates = ranked.slice(0, Math.min(20, ranked.length));
  const listing    = candidates
    .map(t => `${t.id}: [score=${t.priority_score.total}] ${t.subject}`)
    .join("\n");

  const resp = await client.messages.create({
    model,
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: [
          `Context: ${query || "knowledge-engineering cowork/ prioritization"}`,
          `\nTasks (id: subject):\n${listing}`,
          `\nReturn the ${Math.min(5, top)} highest-priority task IDs in order.`,
        ].join(""),
      },
      { role: "assistant", content: '["' }, // prefill for JSON array
    ],
    stop_sequences: ['"]'],
  });

  const raw   = '["' + (resp.content[0] as { text: string }).text + '"]';
  const ids   = JSON.parse(raw) as string[];
  const byId  = new Map(candidates.map(t => [t.id, t]));

  const llmTop: RankedTask[] = ids
    .slice(0, Math.min(5, top))
    .flatMap(id => { const t = byId.get(id); return t ? [t] : []; });

  const llmIds  = new Set(llmTop.map(t => t.id));
  const rest    = ranked.filter(t => !llmIds.has(t.id));
  const reranked = [...llmTop, ...rest].map((t, i) => ({ ...t, rank: i + 1 }));

  return {
    ranked: reranked as RankedTask[],
    tokens: resp.usage.input_tokens + resp.usage.output_tokens,
  };
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function rerank(input: RerankInput): Promise<RerankOutput> {
  const { tasks, query, top, llm, model } = RerankInput.parse(input);
  const t0 = Date.now();

  let ranked    = pass1(tasks).slice(0, top);
  let rerankedBy: "score" | "llm" = "score";
  let tokensUsed: number | undefined;

  if (llm && ranked.length > 0) {
    const { ranked: llmRanked, tokens } = await pass2(ranked, query ?? "", model, top);
    ranked     = llmRanked.slice(0, top);
    rerankedBy = "llm";
    tokensUsed = tokens;
  }

  return RerankOutput.parse({
    ranked,
    total_tasks: tasks.length,
    reranked_by: rerankedBy,
    tokens_used: tokensUsed,
    elapsed_ms:  Date.now() - t0,
  });
}

// ── CLI entry (tsx cowork/templates/rerank-engine.ts) ─────────────────────────

if (import.meta.url === `file://${process.argv[1]}`) {
  const args  = process.argv.slice(2);
  const top   = parseInt(args[args.indexOf("--top") + 1] ?? "10", 10);
  const llm   = args.includes("--llm");

  // Sample tasks for smoke test
  const now   = new Date().toISOString();
  const sample: DurableTask[] = [
    { id: "11111111-0000-0000-0000-000000000001", queue: "cowork", subject: "Install analytics template", state: "pending", depends_on: [], blocks: [], domain: "data", ke_fit_score: 5, estimated_hours: 2, created_at: now, updated_at: now },
    { id: "11111111-0000-0000-0000-000000000002", queue: "cowork", subject: "Schedule Wednesday metrics-review task", state: "pending", depends_on: [], blocks: ["11111111-0000-0000-0000-000000000003"], domain: "product-management", ke_fit_score: 5, estimated_hours: 0.5, due_date: "2026-06-25", created_at: now, updated_at: now },
    { id: "11111111-0000-0000-0000-000000000003", queue: "cowork", subject: "Run first metrics review", state: "blocked", depends_on: ["11111111-0000-0000-0000-000000000002"], blocks: [], domain: "product-management", ke_fit_score: 4, estimated_hours: 1, created_at: now, updated_at: now },
    { id: "11111111-0000-0000-0000-000000000004", queue: "cowork", subject: "Add vendor count to CLAUDE.md", state: "pending", depends_on: [], blocks: [], domain: "engineering", ke_fit_score: 2, estimated_hours: 0.25, created_at: now, updated_at: now },
    { id: "11111111-0000-0000-0000-000000000005", queue: "cowork", subject: "Customize data:build-dashboard skill", state: "pending", depends_on: [], blocks: [], domain: "data", ke_fit_score: 3, estimated_hours: 3, created_at: now, updated_at: now },
  ].map(t => DurableTask.parse(t));

  const out = await rerank({ tasks: sample, top, llm });
  console.log("\n── Priority Rerank ──────────────────────────────────────────");
  console.log(`total: ${out.total_tasks} tasks · method: ${out.reranked_by} · ${out.elapsed_ms}ms`);
  if (out.tokens_used) console.log(`llm tokens: ${out.tokens_used}`);
  console.log("");
  for (const t of out.ranked) {
    const s = t.priority_score;
    console.log(`#${t.rank.toString().padStart(2)} [${s.total.toFixed(1)}] ${t.subject}`);
    console.log(`     u=${s.urgency} i=${s.impact} d=${s.dependency_unblock} e=${s.effort_efficiency} s=${s.staleness}`);
  }
}
