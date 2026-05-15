/**
 * Context budget observability.
 *
 * Given a set of named seed files, produces a per-seed report of byte size,
 * estimated tokens, and percent of a configurable context window (default 1M
 * tokens — Claude Opus 4.7). The CLI at `scripts/context-budget.ts` walks the
 * orchestrator's five seed prompts and emits this table.
 *
 * Token estimation uses two paths:
 *   - cheap: `text.length / 4` rough-cut (no network, no auth).
 *   - precise: `countTokens()` from `./token-counting.ts` (OAuth + network).
 *
 * The cheap path is used by tests; the precise path is used by the CLI when
 * `OAuth` is available. Returns the same shape either way.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/context-windows.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/token-counting.md
 */

export interface SeedInput {
  name: string;
  content: string;
}

export interface SeedReportRow {
  name: string;
  bytes: number;
  tokens: number;
  percentOfBudget: number;
}

export interface SeedReport {
  rows: SeedReportRow[];
  totalBytes: number;
  totalTokens: number;
  totalPercent: number;
  budget: number;
}

export const DEFAULT_BUDGET_TOKENS = 1_000_000;

export function estimateTokensCheap(text: string): number {
  return Math.ceil(text.length / 4);
}

export function buildReport(
  seeds: SeedInput[],
  budget: number = DEFAULT_BUDGET_TOKENS,
  tokenFn: (text: string) => number = estimateTokensCheap,
): SeedReport {
  const rows: SeedReportRow[] = seeds.map((s) => {
    const bytes = Buffer.byteLength(s.content, "utf8");
    const tokens = tokenFn(s.content);
    return {
      name: s.name,
      bytes,
      tokens,
      percentOfBudget: budget > 0 ? (tokens / budget) * 100 : 0,
    };
  });
  const totalBytes = rows.reduce((a, r) => a + r.bytes, 0);
  const totalTokens = rows.reduce((a, r) => a + r.tokens, 0);
  return {
    rows,
    totalBytes,
    totalTokens,
    totalPercent: budget > 0 ? (totalTokens / budget) * 100 : 0,
    budget,
  };
}

export function formatReport(report: SeedReport): string {
  const lines: string[] = [];
  const pad = (s: string | number, w: number) => String(s).padStart(w);
  lines.push(
    `${pad("seed", 32)}  ${pad("bytes", 8)}  ${pad("tokens", 8)}  ${pad("% of budget", 12)}`,
  );
  lines.push("-".repeat(32 + 2 + 8 + 2 + 8 + 2 + 12));
  for (const r of report.rows) {
    lines.push(
      `${r.name.padStart(32)}  ${pad(r.bytes, 8)}  ${pad(r.tokens, 8)}  ${pad(r.percentOfBudget.toFixed(3) + "%", 12)}`,
    );
  }
  lines.push("-".repeat(32 + 2 + 8 + 2 + 8 + 2 + 12));
  lines.push(
    `${pad("TOTAL", 32)}  ${pad(report.totalBytes, 8)}  ${pad(report.totalTokens, 8)}  ${pad(report.totalPercent.toFixed(3) + "%", 12)}`,
  );
  lines.push(`budget: ${report.budget.toLocaleString()} tokens`);
  return lines.join("\n");
}
