/**
 * ext-tasks MCP server.
 *
 * Durable task queue backed by pg_durable (github.com/microsoft/pg_durable)
 * SQL functions. Cache tier (LRU + Redis) sits in front of every read.
 *
 * pg_durable is a PostgreSQL extension that exposes:
 *   pgdurable.create_task(queue, payload jsonb, ttl interval) → task_id uuid
 *   pgdurable.get_task(task_id uuid) → task record
 *   pgdurable.complete_task(task_id uuid, result jsonb)
 *   pgdurable.list_tasks(queue text, lim int) → setof task
 *
 * Task records are validated via TaskSchema (Zod) on every decode — the same
 * schema is exported so callers can derive JSON Schema for Anthropic tool use
 * without duplicating the type definition.
 *
 * @cite https://github.com/microsoft/pg_durable
 * @cite https://github.com/modelcontextprotocol/ext-tasks
 * @cite src/cache/lru-bm25.ts
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Pool } from "pg";
import { z } from "zod";
import { get, set, invalidate, cacheKey } from "../../cache/lru-bm25.js";
import { createRedisLike } from "../../lib/redis-adapter.js";

// ── Canonical task shape (single source of truth) ────────────────────────────

export const TaskSchema = z.object({
  id:         z.string().uuid(),
  queue:      z.string(),
  payload:    z.record(z.string(), z.unknown()),
  status:     z.enum(["pending", "running", "completed", "failed"]),
  created_at: z.string(),
  result:     z.record(z.string(), z.unknown()).nullable().optional(),
});
export type Task = z.infer<typeof TaskSchema>;

const TaskListSchema = z.array(TaskSchema);

// ── Infrastructure ────────────────────────────────────────────────────────────

const pool  = new Pool({ connectionString: process.env.DATABASE_URL });
const { redis } = await createRedisLike(process.env.REDIS_URL ?? "redis://localhost:6379");

// ── MCP server ────────────────────────────────────────────────────────────────

const server = new McpServer({ name: "ke-ext-tasks", version: "0.4.0" });

server.tool(
  "create_task",
  "Create a durable task via pg_durable",
  {
    queue:   z.string().describe("Task queue name"),
    payload: z.record(z.string(), z.unknown()).describe("JSON task payload"),
    ttl_s:   z.number().int().min(1).max(604_800).default(604_800)
               .describe("TTL in seconds (default 7 days)"),
  },
  async ({ queue, payload, ttl_s }) => {
    const { rows } = await pool.query<{ task_id: string }>(
      `SELECT pgdurable.create_task($1, $2::jsonb, make_interval(secs => $3)) AS task_id`,
      [queue, JSON.stringify(payload), ttl_s],
    );
    const id = rows[0]?.task_id;
    if (!id) throw new Error("pgdurable.create_task returned no row");
    const task = await fetchAndCacheTask(id, queue);
    return { content: [{ type: "text", text: JSON.stringify(task) }] };
  },
);

server.tool(
  "get_task",
  "Retrieve a task by id — L1 → L2 → pg_durable",
  { id: z.string().uuid(), queue: z.string() },
  async ({ id, queue }) => {
    const task = await fetchAndCacheTask(id, queue);
    return {
      content: [{
        type: "text",
        text: task ? JSON.stringify(task) : `task ${id} not found`,
      }],
    };
  },
);

server.tool(
  "complete_task",
  "Mark a pg_durable task as completed and evict from cache",
  {
    id:     z.string().uuid(),
    queue:  z.string(),
    result: z.record(z.string(), z.unknown()).default({}),
  },
  async ({ id, queue, result }) => {
    await pool.query(
      `SELECT pgdurable.complete_task($1, $2::jsonb)`,
      [id, JSON.stringify(result)],
    );
    await invalidate(redis, cacheKey(`task:${queue}`, id));
    return { content: [{ type: "text", text: `task ${id} completed` }] };
  },
);

server.tool(
  "list_tasks",
  "List pending tasks from a pg_durable queue",
  {
    queue: z.string(),
    limit: z.number().int().min(1).max(100).default(20),
  },
  async ({ queue, limit }) => {
    const { rows } = await pool.query(
      `SELECT * FROM pgdurable.list_tasks($1, $2)`,
      [queue, limit],
    );
    const tasks = TaskListSchema.parse(rows);
    return { content: [{ type: "text", text: JSON.stringify(tasks) }] };
  },
);

// ── Helpers ───────────────────────────────────────────────────────────────────

async function fetchAndCacheTask(id: string, queue: string): Promise<Task | undefined> {
  const ck = cacheKey(`task:${queue}`, id);

  const cached = await get(redis, ck, TaskSchema);
  if (cached) return cached;

  const { rows } = await pool.query(
    `SELECT * FROM pgdurable.get_task($1)`,
    [id],
  );
  if (!rows[0]) return undefined;

  const task = TaskSchema.parse(rows[0]);
  await set(redis, ck, task);
  return task;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
