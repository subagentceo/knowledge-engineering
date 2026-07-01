/**
 * coworkers-worker/src/worker.ts
 *
 * CF Worker for coworkers.subagentknowledge.com.
 *
 * Surfaces:
 *   GET /      → coworker directory (HTML)
 *   GET /mcp   → CoworkersMcpApp (e2m coordination) McpAgent streamable-HTTP endpoint
 *   GET /sse   → CoworkersMcpApp (e2m coordination) McpAgent SSE endpoint
 *   GET *      → 404
 *
 * MCP tools exposed at /mcp and /sse (connectable from Claude) — see coworkers.app.ts:
 *   - agent_directory : the 15-agent registry (5 functions × 3 tiers) + teams
 *   - team_dispatch    : fan an Envelope to all members of a named team
 *   - mailbox_send     : send a typed Envelope to an agent's mailbox
 *   - mailbox_recv     : read an agent's envelopes
 *
 * CoworkersMcp (list_coworkers/get_coworker/get_protocol_matrix/send_to_coworker)
 * is the DO bound to MCP_OBJECT but is not served on any route — retained for the
 * pre-existing namespace_id, not reachable via HTTP.
 *
 * @cite github.com/cloudflare/agents                (McpAgent pattern — serve()/serveSSE() default binding="MCP_OBJECT")
 * @cite plugins/mcp-server-dev/references/deploy-cloudflare-workers.md
 * @cite cowork/coworkers/manifest.json              (source of truth)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { COWORKERS, PROTOCOLS, findCoworker, protocolMatrix, secure, HSTS, type Coworker, type Protocol } from "./manifest.js";
import { getQueueSnapshot, type QueueSnapshot } from "./queue-snapshot.js";
import { coworkersPage } from "./shell.js";

export { COWORKERS, PROTOCOLS, findCoworker, protocolMatrix, secure, HSTS, type Coworker, type Protocol } from "./manifest.js";
export { getQueueSnapshot, type QueueSnapshot } from "./queue-snapshot.js";
export { coworkersPage } from "./shell.js";

import { CoworkersMcpApp } from "./coworkers.app.js";
export { CoworkersMcpApp };

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_MCP_APP: DurableObjectNamespace;
  COWORK_HOST: string;
  QUEUE_SNAPSHOTS_KV: KVNamespace;
}

// ── McpAgent ──────────────────────────────────────────────────────────────────

export class CoworkersMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "coworkers", version: "0.2.0" },
    { instructions: "coworkers.subagentknowledge.com MCP surface. Use list_coworkers to discover the directory before sending messages." },
  );

  async init() {
    this.server.registerTool(
      "list_coworkers",
      {
        description: "List all 12 coworkers with domain, protocols, peers, and description.",
        inputSchema: {
          protocol: z.enum(PROTOCOLS).optional().describe("Filter by protocol support (a2a, e2m-mcp, mcp, acp)."),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ protocol }) => {
        const result = protocol
          ? COWORKERS.filter(c => c.protocols.includes(protocol))
          : COWORKERS;
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      },
    );

    this.server.registerTool(
      "get_coworker",
      {
        description: "Get full detail for one coworker by id or trigger phrase.",
        inputSchema: {
          id: z.string().describe("Coworker id (e.g. product-management-coworker) or trigger phrase (e.g. /product-management-coworker)"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ id }) => {
        const cw = COWORKERS.find(c => c.id === id || c.trigger_phrase === id);
        if (!cw) return { content: [{ type: "text", text: `Unknown coworker: ${id}` }], isError: true };
        return { content: [{ type: "text", text: JSON.stringify(cw, null, 2) }] };
      },
    );

    this.server.registerTool(
      "get_protocol_matrix",
      {
        description: "Return the full protocol support matrix: which coworkers support which protocols (a2a, e2m-mcp, mcp, acp).",
        inputSchema: {},
        annotations: { readOnlyHint: true },
      },
      async () => {
        const matrix = COWORKERS.map(cw => ({
          id: cw.id,
          domain: cw.domain,
          ...Object.fromEntries(PROTOCOLS.map(p => [p, cw.protocols.includes(p)])),
        }));
        return { content: [{ type: "text", text: JSON.stringify(matrix, null, 2) }] };
      },
    );

    this.server.registerTool(
      "send_to_coworker",
      {
        description: "Draft a DurableTask envelope to send to a coworker's e2m-mcp mailbox. Returns the envelope JSON — write it via the e2m-mcp bridge server.",
        inputSchema: {
          to:      z.string().describe("Coworker id, e.g. product-management-coworker"),
          subject: z.string().describe("Task subject line (imperative, <80 chars)"),
          ke_fit_score: z.number().int().min(1).max(5).default(3).describe("KE fit score 1-5"),
          depends_on: z.array(z.string()).optional().describe("Task IDs this depends on"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ to, subject, ke_fit_score, depends_on }) => {
        const cw = COWORKERS.find(c => c.id === to);
        if (!cw) return { content: [{ type: "text", text: `Unknown coworker: ${to}` }], isError: true };
        if (!cw.protocols.includes("e2m-mcp")) {
          return { content: [{ type: "text", text: `${to} does not support e2m-mcp. Protocols: ${cw.protocols.join(", ")}` }], isError: true };
        }
        const envelope = {
          id: crypto.randomUUID(),
          queue: cw.domain,
          subject,
          state: "pending",
          ke_fit_score,
          depends_on: depends_on ?? [],
          mailbox: `cowork/data/mailbox/${to}.jsonl`,
          created_at: new Date().toISOString(),
          instruction: `Append this JSON line to ${to}'s mailbox via: e2m-mcp mailbox_send tool`,
        };
        return { content: [{ type: "text", text: JSON.stringify(envelope, null, 2) }] };
      },
    );
  }
}

// ── Worker fetch handler ───────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // SSE transport (Claude Desktop / legacy clients)
    // binding must be explicit: McpAgent.serve() defaults to "MCP_OBJECT"
    // regardless of which class it's called on (agents/dist/mcp/index.js),
    // which would silently serve CoworkersMcp instead of CoworkersMcpApp.
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return CoworkersMcpApp.serveSSE("/sse", { binding: "COWORKERS_MCP_APP" }).fetch(request, env, ctx);
    }

    // Streamable-HTTP transport (MCP 2025-03-26+)
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CoworkersMcpApp.serve("/mcp", { binding: "COWORKERS_MCP_APP" }).fetch(request, env, ctx);
    }

    if (url.pathname === "/" || url.pathname === "") {
      const snapshot = await getQueueSnapshot(env);
      return secure(new Response(coworkersPage(env, snapshot), {
        headers: { "content-type": "text/html; charset=utf-8" },
      }));
    }

    return secure(new Response("Not found", { status: 404 }));
  },
};
