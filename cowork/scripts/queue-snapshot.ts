#!/usr/bin/env -S npx tsx
/**
 * queue-snapshot.ts — computes a per-domain queue-count snapshot and (optionally)
 * publishes it to the QUEUE_SNAPSHOTS_KV namespace via `wrangler kv key put`.
 *
 * Unlike cowork/scripts/morning-summary.py, this globs cowork/data/queues/*.jsonl
 * for ALL domains present on disk — not e2m-mcp's fixed 12-domain DOMAINS constant
 * (cowork/mcp/e2m-mcp/server.ts) — so legacy/ad-hoc queues (e.g. skill-grades,
 * operator, product, project) are captured too.
 *
 * Collapse algorithm ports cowork/mcp/e2m-mcp/server.ts's `queue_status` tool:
 * filter out transition rows, collapseById on the remaining task rows (last
 * task row wins per id), bucket by `.state`. This is deliberately NOT the
 * approach in cowork/scripts/morning-summary.py or nightly-review.py, both of
 * which key transition rows off a nonexistent `task_id` field (real transition
 * rows use `id`) and increment per-row instead of per-task, silently
 * overcounting. queue_status's collapseById-on-task-rows is the correct
 * last-line-wins semantics and is what this script reproduces.
 *
 * Usage:
 *   tsx cowork/scripts/queue-snapshot.ts                  # print JSON, no KV write
 *   tsx cowork/scripts/queue-snapshot.ts --publish         # also `wrangler kv key put`
 *   QUEUE_SNAPSHOT_PUBLISH=1 tsx cowork/scripts/queue-snapshot.ts
 *
 * The KV write is gated behind --publish/QUEUE_SNAPSHOT_PUBLISH because this
 * worktree has no live Cloudflare credentials — computeSnapshot() and
 * buildSnapshotDocument() are pure and fully testable standalone.
 *
 * @cite cowork/mcp/e2m-mcp/server.ts       (collapseById + queue_status collapse pattern)
 * @cite cowork/scripts/morning-summary.py  (glob + artifact placement precedent)
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { execFileSync } from "node:child_process";

export interface QueueTaskRow {
  _type?: string;
  id?: string;
  state?: string;
}

export type DomainCounts = {
  pending: number;
  in_progress: number;
  blocked: number;
  completed: number;
  failed: number;
  unknown: number;
};

export interface QueueSnapshotDocument {
  at: string;
  domains: Record<string, DomainCounts>;
}

const KNOWN_STATES = ["pending", "in_progress", "blocked", "completed", "failed"] as const;

function emptyCounts(): DomainCounts {
  return { pending: 0, in_progress: 0, blocked: 0, completed: 0, failed: 0, unknown: 0 };
}

/** @cite cowork/mcp/e2m-mcp/server.ts (readLines — per-line JSONDecodeError isolation) */
export function readLines(filePath: string): unknown[] {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, "utf8");
  const rows: unknown[] = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    try {
      rows.push(JSON.parse(line));
    } catch (err) {
      console.error(`[queue-snapshot] skipping malformed JSON at ${filePath}:${i + 1}: ${(err as Error).message}`);
    }
  }
  return rows;
}

/** @cite cowork/mcp/e2m-mcp/server.ts (collapseById — latest-line-wins per task id) */
export function collapseById(rows: QueueTaskRow[]): QueueTaskRow[] {
  const map = new Map<string, QueueTaskRow>();
  for (const row of rows) {
    if (!row.id) continue;
    map.set(row.id, row);
  }
  return [...map.values()];
}

/**
 * Ports cowork/mcp/e2m-mcp/server.ts's queue_status tool body exactly:
 * drop transition rows, collapseById the remaining task rows, bucket by state.
 */
export function countDomain(rows: unknown[]): DomainCounts {
  const taskRows = (rows as QueueTaskRow[]).filter(r => r._type !== "transition");
  const collapsed = collapseById(taskRows);
  const counts = emptyCounts();
  for (const row of collapsed) {
    const state = row.state;
    if (state && (KNOWN_STATES as readonly string[]).includes(state)) {
      counts[state as (typeof KNOWN_STATES)[number]]++;
    } else {
      counts.unknown++;
    }
  }
  return counts;
}

/** Globs cowork/data/queues/*.jsonl for ALL domains on disk (not a fixed DOMAINS constant). */
export function discoverDomains(queueDir: string): string[] {
  if (!fs.existsSync(queueDir)) return [];
  return fs.readdirSync(queueDir)
    .filter(f => f.endsWith(".jsonl"))
    .map(f => f.slice(0, -".jsonl".length))
    .sort();
}

export function computeSnapshot(queueDir: string, now: Date = new Date()): QueueSnapshotDocument {
  const domains: Record<string, DomainCounts> = {};
  for (const domain of discoverDomains(queueDir)) {
    const rows = readLines(path.join(queueDir, `${domain}.jsonl`));
    domains[domain] = countDomain(rows);
  }
  return { at: now.toISOString(), domains };
}

// ── CLI entrypoint ───────────────────────────────────────────────────────────

function isMain(): boolean {
  return import.meta.url === `file://${process.argv[1]}`;
}

if (isMain()) {
  const queueDir = process.env.E2M_QUEUE_DIR
    ?? path.join(process.cwd(), "cowork", "data", "queues");
  const snapshot = computeSnapshot(queueDir);
  const json = JSON.stringify(snapshot);
  console.log(JSON.stringify(snapshot, null, 2));

  const shouldPublish = process.argv.includes("--publish") || process.env.QUEUE_SNAPSHOT_PUBLISH === "1";
  if (shouldPublish) {
    // `wrangler kv key put --binding <name>` resolves the binding from a
    // wrangler.jsonc in the CURRENT WORKING DIRECTORY. This script runs from
    // repo root by default, where no wrangler config defines QUEUE_SNAPSHOTS_KV,
    // so --binding alone fails there — you'd need to `cd frontend/cowork-worker`
    // first. --namespace-id is cwd-independent and preferred; set
    // QUEUE_SNAPSHOT_KV_NAMESPACE_ID to the real (non-placeholder) id from
    // wrangler.jsonc once the KV namespace has been created (see KAN-31).
    const namespaceId = process.env.QUEUE_SNAPSHOT_KV_NAMESPACE_ID;
    const binding = process.env.QUEUE_SNAPSHOT_KV_BINDING ?? "QUEUE_SNAPSHOTS_KV";
    const target = namespaceId
      ? ["--namespace-id", namespaceId]
      : ["--binding", binding];
    if (!namespaceId) {
      console.error(
        `[queue-snapshot] WARNING: no QUEUE_SNAPSHOT_KV_NAMESPACE_ID set — falling back to ` +
        `--binding ${binding}, which requires running this from a worker directory ` +
        `(e.g. frontend/cowork-worker) with a wrangler.jsonc defining that binding.`,
      );
    }
    console.error(`[queue-snapshot] publishing to KV via wrangler kv key put (${target.join(" ")})...`);
    execFileSync(
      "wrangler",
      ["kv", "key", "put", ...target, "queues:latest", json, "--remote"],
      { stdio: "inherit" },
    );
  }
}
