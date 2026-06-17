/**
 * Tailscale network context + PR merge event store.
 *
 * Deterministic semvar date key: "yyyy.mm.dd" PST/PDT.
 * PDT (summer, UTC-7) window for "2026.06.16":
 *   start = 2026-06-16T07:00:00Z
 *   end   = 2026-06-17T07:00:00Z
 *
 * Write path: RedisLike (L2) → pg Pool → AlloyDB (L3).
 * Read path:  RedisLike L2 first, fall back to AlloyDB.
 *
 * @cite infra/postgres/init/04-tailscale-pr-context.sql
 * @cite infra/tailscale/README.md
 * @cite src/mcp/ext-tasks/index.ts         (pg Pool pattern)
 * @cite src/cache/lru-bm25.ts              (RedisLike + TTL_SEC + cacheKey)
 */

import { z } from "zod";
import { type RedisLike, TTL_SEC } from "../cache/lru-bm25.js";
import type { Pool as PgPool } from "pg";

// ── PST / PDT → UTC conversion ────────────────────────────────────────────────

/**
 * Convert a semvar PST date ("yyyy.mm.dd") to a UTC [start, end) window.
 * June–October: PDT = UTC-7. November–March: PST = UTC-8.
 * Default offset: -7 (PDT, covers June dates in this repo).
 */
export function toUtcBounds(
  semvarDate: string,
  utcOffsetHours = -7,
): { start: string; end: string; semvarDate: string } {
  const [ys, ms, ds] = semvarDate.split(".");
  const y = parseInt(ys ?? "0", 10);
  const m = parseInt(ms ?? "1", 10);
  const d = parseInt(ds ?? "1", 10);
  const offsetMs = -utcOffsetHours * 3_600_000;
  const startMs = Date.UTC(y, m - 1, d) + offsetMs;
  return {
    semvarDate,
    start: new Date(startMs).toISOString(),
    end:   new Date(startMs + 86_400_000).toISOString(),
  };
}

// ── Zod schemas ───────────────────────────────────────────────────────────────

export const TailscaleTagSchema = z.enum(["tag:dev", "tag:container", "tag:server"]);

export const TailscaleNodeSchema = z.object({
  hostname:   z.string(),
  tailnet:    z.string().default("ts.subagentceo.io"),
  ts_ip:      z.string().optional(),
  tag:        TailscaleTagSchema,
  os:         z.string().optional(),
  status:     z.enum(["active", "inactive", "ephemeral"]).default("active"),
  metadata:   z.record(z.string(), z.unknown()).default({}),
});
export type TailscaleNode = z.infer<typeof TailscaleNodeSchema>;

export const PrTypeSchema = z.enum(["feat", "fix", "chore", "docs", "refactor", "test", "ci"]);

export const PrMergeEventSchema = z.object({
  pr_number:       z.number().int().positive(),
  title:           z.string(),
  branch:          z.string(),
  merged_at:       z.string(),       // ISO 8601 UTC from GitHub API
  semvar_date:     z.string(),       // "yyyy.mm.dd" PST
  pr_type:         PrTypeSchema.optional(),
  scope:           z.string().optional(),
  files_changed:   z.number().int().default(0),
  initiating_node: z.string().optional(),
  initiating_tag:  TailscaleTagSchema.optional(),
  repo:            z.string().default("subagentceo/knowledge-engineering"),
});
export type PrMergeEvent = z.infer<typeof PrMergeEventSchema>;

// ── Redis key helpers ─────────────────────────────────────────────────────────
// Convention: "<namespace>:<id>" from src/cache/lru-bm25.ts

export function prMergeCacheKey(pr_number: number)      { return `pr:merge:${pr_number}`; }
export function prMergesByDateKey(semvar_date: string)  { return `pr:merged:${semvar_date}`; }
export function tailscaleNodeKey(hostname: string)      { return `ts:node:${hostname}`; }
export function tailscaleNodesByTagKey(tag: string)     { return `ts:nodes:tag:${encodeURIComponent(tag)}`; }

// ── AlloyDB SQL ───────────────────────────────────────────────────────────────

const UPSERT_NODE_SQL = `
  INSERT INTO dw.dim_tailscale_node
    (hostname, tailnet, ts_ip, tag, os, status, metadata)
  VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb)
  ON CONFLICT (hostname) DO UPDATE
    SET tailnet = EXCLUDED.tailnet, ts_ip = EXCLUDED.ts_ip,
        tag = EXCLUDED.tag, os = EXCLUDED.os,
        status = EXCLUDED.status, metadata = EXCLUDED.metadata,
        updated_at = NOW()
`.trim();

const INSERT_PR_MERGE_SQL = `
  INSERT INTO dw.events_pr_merge
    (pr_number, title, branch, merged_at, semvar_date,
     utc_window_start, utc_window_end,
     pr_type, scope, files_changed,
     initiating_node, initiating_tag, repo, payload)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb)
  ON CONFLICT (pr_number, repo) DO NOTHING
`.trim();

// ── Writer types ──────────────────────────────────────────────────────────────

export interface StoreOpts {
  redis: RedisLike;
  pg:    PgPool;
}

// ── Helpers for JSON array keys in Redis ──────────────────────────────────────
// RedisLike only exposes getBuffer/set/del/expire; we use JSON arrays at a
// single key rather than LPUSH/LRANGE to stay within the interface contract.

async function redisGetJson<T>(redis: RedisLike, key: string): Promise<T | null> {
  const buf = await redis.getBuffer(key);
  if (!buf) return null;
  return JSON.parse(buf.toString()) as T;
}

async function redisSetJson(redis: RedisLike, key: string, value: unknown): Promise<void> {
  await redis.set(key, JSON.stringify(value), { EX: TTL_SEC });
}

// ── Writers ───────────────────────────────────────────────────────────────────

export async function recordTailscaleNode(
  raw: unknown,
  { redis, pg }: StoreOpts,
): Promise<void> {
  const node = TailscaleNodeSchema.parse(raw);

  await pg.query(UPSERT_NODE_SQL, [
    node.hostname, node.tailnet, node.ts_ip ?? null,
    node.tag, node.os ?? null, node.status,
    JSON.stringify(node.metadata),
  ]);

  // L2: single-key node lookup + tag membership array
  await redisSetJson(redis, tailscaleNodeKey(node.hostname), node);

  const tagKey = tailscaleNodesByTagKey(node.tag);
  const existing = await redisGetJson<string[]>(redis, tagKey) ?? [];
  if (!existing.includes(node.hostname)) {
    await redisSetJson(redis, tagKey, [...existing, node.hostname]);
  }
}

export async function recordPrMerge(
  raw: unknown,
  { redis, pg }: StoreOpts,
): Promise<void> {
  const ev = PrMergeEventSchema.parse(raw);
  const bounds = toUtcBounds(ev.semvar_date);

  await pg.query(INSERT_PR_MERGE_SQL, [
    ev.pr_number, ev.title, ev.branch, ev.merged_at, ev.semvar_date,
    bounds.start, bounds.end,
    ev.pr_type ?? null, ev.scope ?? null, ev.files_changed,
    ev.initiating_node ?? null, ev.initiating_tag ?? null, ev.repo,
    JSON.stringify({ title: ev.title }),
  ]);

  // L2: per-PR lookup + dated list (most recent first)
  await redisSetJson(redis, prMergeCacheKey(ev.pr_number), ev);

  const listKey = prMergesByDateKey(ev.semvar_date);
  const existing = await redisGetJson<PrMergeEvent[]>(redis, listKey) ?? [];
  const deduped = existing.filter((e) => e.pr_number !== ev.pr_number);
  await redisSetJson(redis, listKey, [ev, ...deduped]);
}

// ── Batch reader ──────────────────────────────────────────────────────────────

export async function getPrMergesByDate(
  semvar_date: string,
  { redis, pg }: StoreOpts,
): Promise<PrMergeEvent[]> {
  // L2: Redis
  const cached = await redisGetJson<PrMergeEvent[]>(redis, prMergesByDateKey(semvar_date));
  if (cached && cached.length > 0) return cached.map((r) => PrMergeEventSchema.parse(r));

  // L3: AlloyDB
  const { rows } = await pg.query<{
    pr_number: number; title: string; branch: string; merged_at: string;
    semvar_date: string; pr_type: string | null; scope: string | null;
    files_changed: number; initiating_node: string | null; initiating_tag: string | null; repo: string;
  }>(
    `SELECT pr_number, title, branch, merged_at::text AS merged_at,
            semvar_date, pr_type, scope, files_changed,
            initiating_node, initiating_tag, repo
     FROM dw.events_pr_merge
     WHERE semvar_date = $1
     ORDER BY merged_at DESC`,
    [semvar_date],
  );
  const events = rows.map((r) => PrMergeEventSchema.parse(r));
  if (events.length > 0) await redisSetJson(redis, prMergesByDateKey(semvar_date), events);
  return events;
}

// ── Seed data: PRs merged 2026-06-16 PST ─────────────────────────────────────
// Sourced from: gh pr list --state merged (confirmed 2026-06-17)
// UTC window: 2026-06-16T07:00:00Z → 2026-06-17T07:00:00Z  (PDT = UTC-7)

export const MERGED_2026_06_16_PST: PrMergeEvent[] = [
  {
    pr_number:       499,
    title:           "feat(coding-plugins): knowledge-coding marketplace + anduril-crawl-plugin (O1)",
    branch:          "claude/coding-plugins",
    merged_at:       "2026-06-17T03:30:22Z",
    semvar_date:     "2026.06.16",
    pr_type:         "feat",
    scope:           "coding-plugins",
    files_changed:   10,
    initiating_node: "macbook-m5",
    initiating_tag:  "tag:dev",
    repo:            "subagentceo/knowledge-engineering",
  },
  {
    pr_number:       498,
    title:           "docs(container): setup.sh, doctor.sh, and web/mobile VM references (O1)",
    branch:          "claude/container-docs",
    merged_at:       "2026-06-17T03:10:11Z",
    semvar_date:     "2026.06.16",
    pr_type:         "docs",
    scope:           "container",
    files_changed:   4,
    initiating_node: "macbook-m5",
    initiating_tag:  "tag:dev",
    repo:            "subagentceo/knowledge-engineering",
  },
  {
    pr_number:       496,
    title:           "feat(anduril): mirror developer.anduril.com Lattice SDK docs (O1)",
    branch:          "claude/session-20260617-0217",
    merged_at:       "2026-06-17T02:39:31Z",
    semvar_date:     "2026.06.16",
    pr_type:         "feat",
    scope:           "anduril",
    files_changed:   67,
    initiating_node: "macbook-m5",
    initiating_tag:  "tag:dev",
    repo:            "subagentceo/knowledge-engineering",
  },
];

// ── Seed runner (call from scripts/ or SessionStart hook) ─────────────────────

export async function seedYesterday(opts: StoreOpts): Promise<void> {
  const nodes: TailscaleNode[] = [
    { hostname: "wsl2-dev",       tag: "tag:dev",       os: "ubuntu-24.04", tailnet: "ts.subagentceo.io", status: "active", metadata: { claude_code_ports: "5000-5100" } },
    { hostname: "macbook-m5",     tag: "tag:dev",       os: "macos-arm64",  tailnet: "ts.subagentceo.io", status: "active", metadata: { claude_code_ports: "5000-5100" } },
    { hostname: "ke-alloydb",     tag: "tag:container", os: "docker",       tailnet: "ts.subagentceo.io", status: "active", metadata: { port: 5432 } },
    { hostname: "ke-redis",       tag: "tag:container", os: "docker",       tailnet: "ts.subagentceo.io", status: "active", metadata: { port: 6379 } },
    { hostname: "ke-cloud-agent", tag: "tag:container", os: "docker",       tailnet: "ts.subagentceo.io", status: "active", metadata: {} },
  ];
  for (const node of nodes) await recordTailscaleNode(node, opts);
  for (const pr of MERGED_2026_06_16_PST) await recordPrMerge(pr, opts);
}
