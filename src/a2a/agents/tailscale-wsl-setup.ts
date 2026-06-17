/**
 * @cite src/a2a/server.ts
 * @cite infra/postgres/init/04-tailscale-pr-context.sql
 *
 * A2A agent for Tailscale WSL setup orchestration.
 *
 * Skills:
 *   tailscale-install  — install Tailscale on a WSL Ubuntu node
 *   docker-persist     — persist Docker state across WSL reboots
 *   redis-persist      — persist Redis data directory across WSL reboots
 *   postgres-persist   — persist AlloyDB Omni data directory across WSL reboots
 *   verify-mesh        — verify Tailscale mesh connectivity for all tagged nodes
 *
 * Each skill enqueues a pg_durable task in queue "wsl:tailscale:setup".
 * The pg_durable task runner in infra/postgres picks it up and executes.
 */

import {
  DefaultRequestHandler,
  InMemoryTaskStore,
  RequestContext,
  type AgentExecutor,
  type ExecutionEventBus,
} from "@a2a-js/sdk/server";
import type { AgentCard, AgentSkill, Message, TextPart } from "@a2a-js/sdk";
import pg from "pg";

// ── pg Pool (lazy connect) ────────────────────────────────────────────────────

const pool = new pg.Pool({
  connectionString: process.env["DATABASE_URL"] ?? "postgresql://localhost:5432/dw",
  max: 4,
});

// ── Skill definitions ─────────────────────────────────────────────────────────

const SKILLS: AgentSkill[] = [
  {
    id: "tailscale-install",
    name: "Tailscale Install",
    description: "Install Tailscale on a WSL Ubuntu node and join ts.subagentceo.io tailnet.",
    tags: ["tailscale", "wsl", "install"],
    examples: ["install tailscale on wsl2-dev"],
  },
  {
    id: "docker-persist",
    name: "Docker Persist",
    description: "Persist Docker daemon state and volumes across WSL reboots.",
    tags: ["docker", "wsl", "persistence"],
    examples: ["persist docker across wsl reboots"],
  },
  {
    id: "redis-persist",
    name: "Redis Persist",
    description: "Persist Redis data directory (/var/lib/redis) across WSL reboots via /etc/wsl.conf.",
    tags: ["redis", "wsl", "persistence"],
    examples: ["persist redis data directory"],
  },
  {
    id: "postgres-persist",
    name: "Postgres Persist",
    description: "Persist AlloyDB Omni data directory across WSL reboots.",
    tags: ["postgres", "alloydb", "wsl", "persistence"],
    examples: ["persist alloydb omni across wsl reboots"],
  },
  {
    id: "verify-mesh",
    name: "Verify Mesh",
    description: "Verify Tailscale mesh connectivity for tag:dev and tag:container nodes.",
    tags: ["tailscale", "verify", "connectivity"],
    examples: ["verify tailscale mesh", "check ts.subagentceo.io connectivity"],
  },
];

// ── Agent card ────────────────────────────────────────────────────────────────

export const card: AgentCard = {
  name: "tailscale-wsl-setup-agent",
  description: "Orchestrates Tailscale + WSL persistent service setup via pg_durable task queue.",
  version: "0.1.0",
  protocolVersion: "0.2.9",
  url: `http://localhost:${process.env["A2A_TAILSCALE_PORT"] ?? 41242}`,
  capabilities: { streaming: false, pushNotifications: false },
  defaultInputModes: ["text/plain"],
  defaultOutputModes: ["application/json"],
  skills: SKILLS,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function textMessage(taskId: string, text: string): Message {
  const part: TextPart = { kind: "text", text };
  return {
    kind: "message",
    messageId: crypto.randomUUID(),
    role: "agent",
    taskId,
    contextId: taskId,
    parts: [part],
  };
}

function resolveSkill(text: string): string {
  for (const skill of SKILLS) {
    if (text.startsWith(`${skill.id}:`)) return skill.id;
  }
  // Try prefix match for bare skill name
  for (const skill of SKILLS) {
    if (text.trim() === skill.id) return skill.id;
  }
  return SKILLS[0]?.id ?? "tailscale-install";
}

// ── Executor ──────────────────────────────────────────────────────────────────

export const executor: AgentExecutor = {
  execute: async (ctx: RequestContext, bus: ExecutionEventBus) => {
    const userPart = ctx.userMessage.parts[0];
    const text = userPart?.kind === "text" ? (userPart as TextPart).text : "";
    const skillId = resolveSkill(text);
    const payload = { skill: skillId, input: text, taskId: ctx.taskId };

    try {
      // Enqueue pg_durable task in wsl:tailscale:setup queue
      // TTL: 24h — enough for any WSL bootstrap sequence
      await pool.query(
        "SELECT pgdurable.create_task($1, $2::jsonb, $3::interval)",
        ["wsl:tailscale:setup", JSON.stringify(payload), "24 hours"],
      );
      bus.publish(
        textMessage(
          ctx.taskId,
          JSON.stringify({
            ok: true,
            skill: skillId,
            queue: "wsl:tailscale:setup",
            taskId: ctx.taskId,
          }),
        ),
      );
    } catch (err) {
      bus.publish(textMessage(ctx.taskId, `error: ${String(err)}`));
    }
    bus.finished();
  },

  cancelTask: async (_taskId: string, bus: ExecutionEventBus) => {
    bus.finished();
  },
};

// ── Export handler for composition with src/a2a/server.ts ─────────────────────

export const handler = new DefaultRequestHandler(card, new InMemoryTaskStore(), executor);
