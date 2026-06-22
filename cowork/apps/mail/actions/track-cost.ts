/**
 * track-cost — cowork/apps/mail/finance action
 *
 * Appends a third-party cost row to cowork/data/queues/finance.jsonl
 * via the e2m-mcp envelope schema (domain=finance).
 *
 * Every external service used by the knowledge-engineering chassis
 * (Neon, Cloudflare, ElevenLabs, Sift, etc.) gets a cost entry here
 * before the spend is incurred.
 *
 * @cite cowork/mcp/e2m-mcp/server.ts       (envelope_write domain=finance)
 * @cite cowork/agents/skills/sales-agent/SKILL.md (finance tracking rules)
 * @cite vendor/neon/                        (Neon pricing)
 * @cite vendor/cloudflare/                  (CF pricing)
 */

import * as fs   from "node:fs";
import * as path from "node:path";
import { randomUUID } from "node:crypto";
import { z }     from "zod";

const CostEntry = z.object({
  id:          z.string().uuid().default(() => randomUUID()),
  vendor:      z.string().min(1),
  amount:      z.number().positive(),
  currency:    z.string().length(3).default("USD"),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category:    z.enum(["infrastructure", "api", "tooling", "outreach", "other"]),
  description: z.string().max(200).optional(),
  approved_by: z.string().default("operator"),
  recorded_at: z.string().default(() => new Date().toISOString()),
  // e2m-mcp compatible fields
  queue:       z.literal("finance").default("finance"),
  domain:      z.literal("finance").default("finance"),
  state:       z.literal("completed").default("completed"),
  ke_fit_score: z.number().int().min(1).max(5).default(3),
});
type CostEntry = z.infer<typeof CostEntry>;

const FINANCE_QUEUE = path.join(process.cwd(), "cowork", "data", "queues", "finance.jsonl");

function ensureDir(filePath: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function trackCost(input: Omit<CostEntry, "id" | "recorded_at" | "queue" | "domain" | "state" | "ke_fit_score">): CostEntry {
  const entry = CostEntry.parse(input);
  ensureDir(FINANCE_QUEUE);
  fs.appendFileSync(FINANCE_QUEUE, JSON.stringify(entry) + "\n", "utf8");
  return entry;
}

export function summarizeCosts(month?: string): { total: number; by_vendor: Record<string, number>; by_category: Record<string, number> } {
  if (!fs.existsSync(FINANCE_QUEUE)) return { total: 0, by_vendor: {}, by_category: {} };
  const rows = fs.readFileSync(FINANCE_QUEUE, "utf8")
    .split("\n").filter(Boolean)
    .map(l => CostEntry.parse(JSON.parse(l)))
    .filter(r => !month || r.date.startsWith(month));

  const by_vendor:   Record<string, number> = {};
  const by_category: Record<string, number> = {};
  let total = 0;

  for (const r of rows) {
    by_vendor[r.vendor]     = (by_vendor[r.vendor]     ?? 0) + r.amount;
    by_category[r.category] = (by_category[r.category] ?? 0) + r.amount;
    total += r.amount;
  }

  return { total, by_vendor, by_category };
}

// ── CLI ───────────────────────────────────────────────────────────────────────

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = Object.fromEntries(
    process.argv.slice(2).filter(a => a.startsWith("--"))
      .map(a => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=")]; })
  );

  if (args.summary) {
    console.log(JSON.stringify(summarizeCosts(args.month), null, 2));
  } else {
    const entry = trackCost({
      vendor:      args.vendor ?? "",
      amount:      parseFloat(args.amount ?? "0"),
      currency:    args.currency ?? "USD",
      date:        args.date ?? new Date().toISOString().slice(0, 10),
      category:    (args.category as CostEntry["category"]) ?? "other",
      description: args.description,
    });
    console.log(JSON.stringify({ ok: true, id: entry.id, vendor: entry.vendor, amount: entry.amount }));
  }
}
