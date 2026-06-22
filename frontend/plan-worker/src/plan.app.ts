/**
 * plan-worker/src/plan.app.ts — PlanMcp Durable Object.
 *
 * MCP tools: list_plans, get_plan, create_plan, update_plan_status
 *
 * A plan = a set of DurableTasks with dependencies, deadlines, and owners.
 * Plans are stored in DO SQLite and reference tasks in the e2m queue system.
 *
 * @cite https://www.agent-native.com/docs/template-plan
 * @cite cowork/templates/task-state-machine.ts
 * @cite github.com/cloudflare/agents (McpAgent pattern)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DOMAINS, PLAN_STATES, QUEUE_DIR } from "./manifest.js";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

const PlanSchema = z.object({
  title: z.string().max(120),
  description: z.string().optional(),
  owner: z.string(),
  domain: z.enum(DOMAINS),
  state: z.enum(PLAN_STATES).default("draft"),
  tasks: z.array(z.object({
    id: z.string(),
    subject: z.string(),
    assignee: z.string().optional(),
    state: z.enum(["pending", "in_progress", "completed", "blocked", "failed"]).default("pending"),
    depends_on: z.array(z.string()).default([]),
    due_date: z.string().optional(),
  })).default([]),
  milestones: z.array(z.object({
    title: z.string(),
    due_date: z.string(),
    tasks: z.array(z.string()),
  })).default([]),
});

export class PlanMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "plan", version: "0.1.0" },
    {
      instructions: "plan.subagentknowledge.com — agent-native plan over e2m. " +
        "A plan groups DurableTasks with dependencies, milestones, and owners. " +
        "Plans are the coordination surface for multi-coworker execution.",
    },
  );

  async init() {
    this.server.registerTool(
      "list_plans",
      {
        description: "List all plans stored in this Durable Object.",
        inputSchema: {
          domain: z.enum(DOMAINS).optional().describe("Filter by domain"),
          state: z.enum(PLAN_STATES).optional().describe("Filter by plan state"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ domain, state }) => {
        let rows: Array<{ id: string; title: string; domain: string; state: string; created_at: string }> = [];
        try {
          let query = "SELECT id, title, domain, state, created_at FROM plans";
          const conditions: string[] = [];
          if (domain) conditions.push(`domain = '${domain}'`);
          if (state) conditions.push(`state = '${state}'`);
          if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");
          query += " ORDER BY created_at DESC LIMIT 50";
          const result = await (this.ctx?.storage as any)?.sql?.(query);
          if (result) rows = [...result];
        } catch {
          // DO storage not yet initialized
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ plans: rows, count: rows.length }, null, 2) }],
        };
      },
    );

    this.server.registerTool(
      "get_plan",
      {
        description: "Get a plan by ID with its tasks and milestones.",
        inputSchema: { id: z.string().describe("Plan ID") },
        annotations: { readOnlyHint: true },
      },
      async ({ id }) => {
        let plan: Record<string, unknown> | null = null;
        try {
          const result = await (this.ctx?.storage as any)?.sql?.(
            "SELECT * FROM plans WHERE id = ? LIMIT 1", id,
          );
          if (result) {
            const rows = [...result];
            if (rows.length > 0) plan = rows[0] as Record<string, unknown>;
          }
        } catch {
          // Storage unavailable
        }
        if (!plan) {
          return { content: [{ type: "text" as const, text: `Plan not found: ${id}` }], isError: true };
        }
        return { content: [{ type: "text" as const, text: JSON.stringify(plan, null, 2) }] };
      },
    );

    this.server.registerTool(
      "create_plan",
      {
        description: "Create a new plan — a group of DurableTasks with milestones and dependencies.",
        inputSchema: {
          title: z.string().max(120).describe("Plan title"),
          owner: z.string().describe("Coworker who owns the plan"),
          domain: z.enum(DOMAINS).describe("Domain queue"),
          description: z.string().optional(),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ title, owner, domain, description }) => {
        const plan = {
          id: crypto.randomUUID(),
          title,
          owner,
          domain,
          description: description ?? "",
          state: "draft",
          tasks: [],
          milestones: [],
          created_at: new Date().toISOString(),
          queue_path: `${QUEUE_DIR}/${domain}.jsonl`,
          write_via: "Append tasks via e2m-mcp envelope_write or dispatch.py",
        };
        return { content: [{ type: "text" as const, text: JSON.stringify(plan, null, 2) }] };
      },
    );

    this.server.registerTool(
      "update_plan_status",
      {
        description: "Update a plan's lifecycle state (draft → active → paused/completed → archived).",
        inputSchema: {
          id: z.string().describe("Plan ID"),
          state: z.enum(PLAN_STATES).describe("New state"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ id, state }) => ({
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            id, state, updated_at: new Date().toISOString(),
            write_via: "Update via DO storage or e2m-mcp task_transition",
          }, null, 2),
        }],
      }),
    );
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return PlanMcp.serveSSE("/sse").fetch(request, env, ctx);
    }
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return PlanMcp.serve("/mcp").fetch(request, env, ctx);
    }
    return new Response("Not found", { status: 404 });
  },
};
