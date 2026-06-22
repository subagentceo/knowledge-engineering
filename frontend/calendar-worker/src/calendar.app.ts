/**
 * calendar-worker/src/calendar.app.ts
 *
 * CalendarMcp Durable Object + fetch export wiring.
 * Extracted from worker.ts to keep agent-surface code separate from
 * the HTML shell and security middleware.
 *
 * MCP surfaces:
 *   /mcp  → streamable-HTTP (CalendarMcp.serve)
 *   /sse  → SSE transport    (CalendarMcp.serveSSE)
 *
 * MCP tools exposed:
 *   list_events        — scheduled DurableTasks with due_date across domain queues
 *   check_availability — pending capacity in a domain queue for a window
 *   create_event       — draft a scheduled DurableTask with due_date
 *
 * @cite github.com/cloudflare/agents          (McpAgent pattern, serveSSE)
 * @cite vendor/cloudflare/agents/mcp.md       (McpAgent.serve / serveSSE routing)
 * @cite frontend/cowork-worker/src/worker.ts  (sibling pattern)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { QUEUE_DIR, DOMAINS, queuePath } from "./manifest.js";

export { QUEUE_DIR, DOMAINS, ACTIONS, queuePath } from "./manifest.js";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

export class CalendarMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "calendar", version: "0.1.0" },
    {
      instructions: "calendar.subagentknowledge.com — agent-native calendar over e2m. " +
        "event=scheduled DurableTask (due_date). This is the OP1 cadence surface (WBR/MBR/QBR + milestones).",
    },
  );

  async init() {
    this.server.registerTool(
      "list_events",
      {
        description: "List calendar events = scheduled DurableTasks (tasks with a due_date) across domain queues.",
        inputSchema: {
          domain: z.enum(DOMAINS).optional().describe("Filter to one domain queue"),
          from: z.string().optional().describe("ISO date — events on/after"),
          to: z.string().optional().describe("ISO date — events on/before"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ domain, from, to }) => ({
        content: [{
          type: "text",
          text: JSON.stringify({
            queues: (domain ? [domain] : [...DOMAINS]).map(d => `${QUEUE_DIR}/${d}.jsonl`),
            window: { from: from ?? null, to: to ?? null },
            read_via: "e2m-mcp envelope_read per queue; an event = a task with payload.due_date",
          }, null, 2),
        }],
      }),
    );

    this.server.registerTool(
      "check_availability",
      {
        description: "Check availability = open (pending) capacity in a domain queue for a window.",
        inputSchema: {
          domain: z.enum(DOMAINS),
          from: z.string(),
          to: z.string(),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ domain, from, to }) => ({
        content: [{
          type: "text",
          text: JSON.stringify({
            queue: `${QUEUE_DIR}/${domain}.jsonl`,
            window: { from, to },
            read_via: "e2m-mcp queue_status — pending vs in_progress; availability = slots not already in_progress",
          }, null, 2),
        }],
      }),
    );

    this.server.registerTool(
      "create_event",
      {
        description: "Create an event = a scheduled DurableTask with a due_date, dispatched to a domain queue.",
        inputSchema: {
          title: z.string().max(120).describe("Event title / subject"),
          due_date: z.string().describe("YYYY-MM-DD"),
          queue: z.enum(DOMAINS).optional().describe("Domain queue — defaults to 'operations'"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ title, due_date, queue = "operations" }) => ({
        content: [{
          type: "text",
          text: JSON.stringify({
            _type: "task",
            id: crypto.randomUUID(),
            queue,
            subject: title,
            state: "pending",
            from: "calendar",
            due_date,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            write_via: `e2m-mcp envelope_write → ${QUEUE_DIR}/${queue}.jsonl`,
          }, null, 2),
        }],
      }),
    );
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    // SSE transport (legacy MCP clients)
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return CalendarMcp.serveSSE("/sse").fetch(request, env, ctx);
    }
    // Streamable-HTTP transport (current MCP spec)
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CalendarMcp.serve("/mcp").fetch(request, env, ctx);
    }
    return new Response("Not found", { status: 404 });
  },
};
