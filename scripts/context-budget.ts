/**
 * CLI: report the orchestrator's per-seed context footprint.
 *
 * Walks the five seed files concatenated into the orchestrator's system
 * prompt (per src/agent/run.ts) plus the three sub-agent prompts, computes
 * byte size and an estimated token count per seed, and prints the result as
 * a table with a TOTAL row and the configured budget.
 *
 * Token estimation:
 *   - default: cheap (text.length / 4). No network, no auth.
 *   - --live: precise via `client.messages.countTokens()` (OAuth-only).
 *
 * Budget:
 *   - default: 1,000,000 tokens (Opus 4.7 1M context).
 *   - override via `--budget <N>`.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/context-windows.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/token-counting.md
 * @cite seeds/posture/session-start.xml
 */
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_BUDGET_TOKENS,
  buildReport,
  formatReport,
  type SeedInput,
} from "../src/lib/context-budget.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Mirror the seed list loaded by src/agent/run.ts at module-load time so the
// CLI's view of context tracks the runtime view 1:1.
const ORCHESTRATOR_SEEDS = [
  "system-orchestrator",
  "orchestrator.system",
  "subagent-npm-research",
  "subagent-verifier",
  "subagent-crawl-curator",
];

async function loadSeeds(): Promise<SeedInput[]> {
  const out: SeedInput[] = [];
  for (const name of ORCHESTRATOR_SEEDS) {
    const path = resolve(root, "seeds/prompts", `${name}.md`);
    const content = await readFile(path, "utf8");
    out.push({ name, content });
  }
  return out;
}

function parseFlag(flag: string, fallback: number): number {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  const v = Number(process.argv[idx + 1]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

async function liveTokenFn(): Promise<(text: string) => Promise<number>> {
  const { countTokens } = await import("../src/lib/token-counting.js");
  return async (text: string) => {
    const r = await countTokens({
      system: text,
      messages: [{ role: "user", content: "." }],
    });
    return r.input_tokens;
  };
}

async function main(): Promise<void> {
  const seeds = await loadSeeds();
  const budget = parseFlag("--budget", DEFAULT_BUDGET_TOKENS);
  const live = process.argv.includes("--live");

  if (!live) {
    const report = buildReport(seeds, budget);
    process.stdout.write(formatReport(report) + "\n");
    return;
  }

  const tokFn = await liveTokenFn();
  const liveTokens = await Promise.all(seeds.map((s) => tokFn(s.content)));
  const rows = seeds.map((s, i) => ({ name: s.name, content: s.content, override: liveTokens[i] }));
  const report = buildReport(
    rows.map((r) => ({ name: r.name, content: r.content })),
    budget,
    (text) => {
      const row = rows.find((r) => r.content === text);
      return row ? row.override : 0;
    },
  );
  process.stdout.write(formatReport(report) + "\n");
}

main().catch((err) => {
  process.stderr.write(`[context-budget] ${(err as Error).message}\n`);
  process.exit(1);
});
