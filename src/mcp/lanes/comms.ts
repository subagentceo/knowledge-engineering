/**
 * comms.ts — Slack communications MCP lane.
 *
 * Tools:
 *   comms_notify_outcome  — post a mailbox_outcome summary to Slack
 *   comms_notify_blocked  — post a blocked status with evidence to Slack
 *   comms_post            — generic message post to a configured channel
 *   comms_read_feedback   — read recent messages from #agent-ops
 *
 * Env: SLACK_BOT_TOKEN + SLACK_CHANNEL_ID.
 * No-op (console log) when either is absent so tools never fail in
 * unconfigured environments.
 *
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../bridge-utils.js";

const SLACK_API = "https://slack.com/api";

// ─── low-level Slack helpers ──────────────────────────────────────────────────

function slackEnv(): { token: string; channel: string } | null {
  const token = process.env["SLACK_BOT_TOKEN"];
  const channel = process.env["SLACK_CHANNEL_ID"];
  if (!token || !channel) return null;
  return { token, channel };
}

async function postMessage(text: string): Promise<{ ok: boolean; ts?: string; error?: string }> {
  const env = slackEnv();
  if (!env) {
    console.log("[comms:no-op]", text);
    return { ok: true };
  }
  const res = await fetch(`${SLACK_API}/chat.postMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel: env.channel, text }),
  });
  const body = (await res.json()) as { ok: boolean; ts?: string; error?: string };
  return body;
}

async function readHistory(limit: number): Promise<unknown[]> {
  const env = slackEnv();
  if (!env) return [];
  const url = new URL(`${SLACK_API}/conversations.history`);
  url.searchParams.set("channel", env.channel);
  url.searchParams.set("limit", String(limit));
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${env.token}` },
  });
  const body = (await res.json()) as { ok: boolean; messages?: unknown[]; error?: string };
  if (!body.ok) throw new Error(`conversations.history: ${body.error}`);
  return body.messages ?? [];
}

// ─── tool registration ─────────────────────────────────────────────────────────

export function registerComms(server: McpServer): void {
  server.tool(
    "comms_notify_outcome",
    "Post a mailbox_outcome summary (achieved or blocked) to the configured Slack channel.",
    {
      outcome_id: z.string(),
      status: z.enum(["achieved", "blocked"]),
      title: z.string(),
      branch: z.string().optional(),
      pr_number: z.number().int().optional(),
      commit_sha: z.string().optional(),
      cost_usd: z.number().optional(),
      cache_hit_rate: z.number().optional(),
      evidence: z.array(z.string()).optional(),
      blocked_reason: z.string().optional(),
    },
    async (args) => {
      let text: string;
      if (args.status === "achieved") {
        const sha8 = args.commit_sha ? args.commit_sha.slice(0, 8) : "—";
        const costStr = args.cost_usd != null ? `$${args.cost_usd.toFixed(4)}` : "—";
        const cacheStr = args.cache_hit_rate != null ? `${args.cache_hit_rate.toFixed(0)}%` : "—";
        const prStr = args.pr_number != null ? `#${args.pr_number}` : "—";
        text =
          `✓ ${args.outcome_id} merged to main\n` +
          `  ${args.title}\n` +
          `  branch: ${args.branch ?? "—"} | PR: ${prStr} | commit: ${sha8}\n` +
          `  cost: ${costStr} | cache: ${cacheStr}`;
      } else {
        const evidenceStr = (args.evidence ?? []).join(", ") || "—";
        text =
          `⚠ ${args.outcome_id} BLOCKED\n` +
          `  ${args.blocked_reason ?? "reason not provided"}\n` +
          `  evidence: ${evidenceStr}`;
      }
      const result = await postMessage(text);
      return jsonResult({ posted: result.ok, ts: result.ts, slack_error: result.error ?? null });
    }
  );

  server.tool(
    "comms_notify_blocked",
    "Post a blocked status with evidence to the configured Slack channel.",
    {
      outcome_id: z.string(),
      reason: z.string(),
      evidence: z.array(z.string()).optional(),
    },
    async (args) => {
      const evidenceStr = (args.evidence ?? []).join(", ") || "—";
      const text =
        `⚠ ${args.outcome_id} BLOCKED\n` +
        `  ${args.reason}\n` +
        `  evidence: ${evidenceStr}`;
      const result = await postMessage(text);
      return jsonResult({ posted: result.ok, ts: result.ts, slack_error: result.error ?? null });
    }
  );

  server.tool(
    "comms_post",
    "Post a generic message to the configured Slack channel.",
    {
      text: z.string(),
    },
    async (args) => {
      const result = await postMessage(args.text);
      return jsonResult({ posted: result.ok, ts: result.ts, slack_error: result.error ?? null });
    }
  );

  server.tool(
    "comms_read_feedback",
    "Read recent messages from the configured Slack channel (operator feedback injection).",
    {
      limit: z.number().int().min(1).max(100).default(20),
    },
    async (args) => {
      const messages = await readHistory(args.limit);
      return jsonResult({ messages, count: messages.length });
    }
  );
}
