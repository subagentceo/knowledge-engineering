/**
 * coworkers.app.ts — e2m coordination MCP surface (CoworkersMcpApp DO)
 *
 * Exposes the 15-agent registry + e2m envelope/mailbox/team tools as an MCP
 * surface via McpAgent (agents/mcp). Separate from CoworkersMcp (the directory
 * surface in worker.ts) so each DO class has a single responsibility.
 *
 * Tools:
 *   agent_directory   — the 15-agent registry (5 functions × 3 tiers) + teams
 *   team_dispatch     — fan an Envelope to all members of a named team
 *   mailbox_send      — send a typed Envelope to an agent's mailbox
 *   mailbox_recv      — read an agent's envelopes
 *
 * Routes (handled in worker.ts fetch):
 *   /sse  → CoworkersMcpApp.serveSSE("/sse")
 *   /mcp  → CoworkersMcpApp.serve("/mcp")   (replaces CoworkersMcp.serve)
 *
 * @cite github.com/cloudflare/agents                (McpAgent pattern)
 * @cite coworkers/projects/2026/operational-plan/mcpb/e2m/server/index.mjs
 * @cite cowork/schemas/envelope.ts
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface Env {
  COWORKERS_MCP_APP: DurableObjectNamespace;
  COWORK_HOST: string;
  SITE_NAME: string;
}

// ── 15-agent registry (5 functions × 3 tiers) ───────────────────────────────

const FNS   = ["operator", "product", "project", "finance", "legal"] as const;
const TIERS = ["manager", "coworker", "subagent"] as const;

const AGENTS = FNS.flatMap((fn) =>
  TIERS.map((tier) => ({
    id:    `${fn}-${tier}`,
    fn,
    tier,
    email: `${fn}-${tier}@subagentknowledge.com`,
  })),
);

const TEAMS: Record<string, string[]> = {
  "operational-plan": [
    "operator-manager",
    "product-manager",
    "project-manager",
    "finance-manager",
    "legal-manager",
  ],
  "coworkers": [
    "product-coworker",
    "project-coworker",
    "finance-coworker",
    "legal-coworker",
  ],
};

// ── Envelope schema (mirrors cowork/schemas/envelope.ts) ─────────────────────

const EnvelopeSchema = z.object({
  _type:            z.literal("envelope").default("envelope"),
  id:               z.string().default(() => crypto.randomUUID()),
  envelope_type:    z.enum(["task", "ack", "result", "escalate", "notify", "summary", "operator"]),
  from:             z.string(),
  to:               z.string(),
  subject:          z.string(),
  at:               z.string().default(() => new Date().toISOString()),
  state:            z.enum(["pending", "read", "actioned", "archived"]).default("pending"),
  priority:         z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  thread_id:        z.string().optional(),
  reply_to:         z.string().optional(),
  payload:          z.record(z.string(), z.unknown()).optional(),
  requires_decision: z.boolean().optional(),
  decision_options:  z.array(z.string()).optional(),
});

// ── KV-backed mailbox (DO SQL storage, v1 migration below) ──────────────────

type EnvelopeRow = {
  id: string;
  agent: string;
  envelope: string; // JSON-serialised Envelope
  state: string;
  at: string;
};

// ── McpAgent ─────────────────────────────────────────────────────────────────

export class CoworkersMcpApp extends McpAgent<Env> {
  server = new McpServer(
    { name: "coworkers", version: "0.1.0" },
    { instructions: "e2m coordination surface. agent_directory → team_dispatch / mailbox_send → mailbox_recv." },
  );

  async init() {
    // ── agent_directory ──────────────────────────────────────────────────────
    this.server.registerTool(
      "agent_directory",
      {
        description: "The 15-agent registry (5 functions × 3 tiers) plus named teams.",
        inputSchema: {},
        annotations: { readOnlyHint: true },
      },
      async () => ({
        content: [{ type: "text", text: JSON.stringify({ agents: AGENTS, teams: TEAMS }) }],
      }),
    );

    // ── team_dispatch ────────────────────────────────────────────────────────
    this.server.registerTool(
      "team_dispatch",
      {
        description: "Fan one Envelope to every member of a named team.",
        inputSchema: {
          team:     z.string().describe("Team name, e.g. operational-plan"),
          envelope: z.record(z.string(), z.unknown()).describe("Partial Envelope — to is overridden per member"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ team, envelope }) => {
        const members = TEAMS[team];
        if (!members) {
          return {
            content: [{ type: "text", text: JSON.stringify({ error: `unknown team: ${team}`, known: Object.keys(TEAMS) }) }],
            isError: true,
          };
        }
        const sent: { to: string; id: string }[] = [];
        for (const member of members) {
          const parsed = EnvelopeSchema.parse({ ...envelope, to: member, id: crypto.randomUUID() });
          await this.ctx.storage.put(`mbox:${member}:${parsed.id}`, JSON.stringify(parsed));
          sent.push({ to: member, id: parsed.id });
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ ok: true, team, sent }) }],
        };
      },
    );

    // ── mailbox_send ─────────────────────────────────────────────────────────
    this.server.registerTool(
      "mailbox_send",
      {
        description: "Send a typed Envelope to an agent's mailbox.",
        inputSchema: {
          envelope: z.record(z.string(), z.unknown()).describe("Typed Envelope (see cowork/schemas/envelope.ts)"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ envelope }) => {
        const parsed = EnvelopeSchema.parse(envelope);
        await this.ctx.storage.put(`mbox:${parsed.to}:${parsed.id}`, JSON.stringify(parsed));
        return {
          content: [{ type: "text", text: JSON.stringify({ ok: true, id: parsed.id, to: parsed.to }) }],
        };
      },
    );

    // ── mailbox_recv ─────────────────────────────────────────────────────────
    this.server.registerTool(
      "mailbox_recv",
      {
        description: "Read an agent's envelopes from their mailbox.",
        inputSchema: {
          agent:        z.string().describe("Agent id, e.g. product-manager"),
          pending_only: z.boolean().optional().describe("If true, return only state=pending envelopes"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ agent, pending_only }) => {
        const prefix = `mbox:${agent}:`;
        const map = await this.ctx.storage.list<string>({ prefix });
        const rows: unknown[] = [];
        for (const raw of map.values()) {
          const env = JSON.parse(raw);
          if (pending_only && env.state !== "pending") continue;
          rows.push(env);
        }
        return {
          content: [{ type: "text", text: JSON.stringify(rows) }],
        };
      },
    );
  }
}
