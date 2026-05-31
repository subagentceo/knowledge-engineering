/**
 * @cite docs/reference/rovo-api-and-orchestrator-blueprint.md
 * @cite vendor/anthropics/code.claude.com/docs/en/settings.md
 *
 * Atlassian Rovo tool catalog — zod schemas + pure query functions.
 *
 * The zod schema is the contract. The pydantic mirror (src/agent/cowork/
 * rovo_catalog.py) and the FastAPI service stay structurally identical to
 * these shapes. Pure functions only — no I/O, no server — so the TS client,
 * the FastAPI handlers, and the verify test all drive the SAME logic.
 *
 * Claude-API-style list envelope: { data, has_more, first_id, last_id }.
 * OAuth-only invariant: there is NO x-api-key / anthropic-version auth here.
 * The blueprint's auth middleware is deliberately omitted — Claude auth is
 * CLAUDE_CODE_OAUTH_TOKEN, never an API key (src/oauth/token.ts).
 *
 * `checkAccess` mirrors the .claude/settings.json permissions tiers: it is a
 * VALIDATOR ("is this tool allowed under the granted permission set?"), not a
 * served public endpoint.
 */

import { z } from "zod";

// Style matches src/agent/team/subagent-schema.ts: z.enum, not z.nativeEnum.
export const Permission = z.enum(["interactive", "read_only", "write_delete"]);
export type Permission = z.infer<typeof Permission>;

export const ToolId = z.enum([
  "create_issue",
  "update_issue",
  "get_issue",
  "search_with_jql",
  "transition_issue",
  "get_current_user_info",
  "fetch_content_with_ari",
  "list_accessible_resources",
  "get_issue_link_types",
  "get_remote_links",
  "get_field_metadata",
  "get_issue_types",
  "get_transitions",
  "get_projects",
  "lookup_users",
  "rovo_search",
  "add_comment",
  "add_or_update_worklog",
  "create_issue_link",
]);
export type ToolId = z.infer<typeof ToolId>;

export const Tool = z.object({
  id: ToolId,
  label: z.string(),
  permission: Permission,
  type: z.literal("tool").default("tool"),
});
export type Tool = z.infer<typeof Tool>;

export const ToolList = z.object({
  data: z.array(Tool),
  has_more: z.boolean(),
  first_id: ToolId.nullable().default(null),
  last_id: ToolId.nullable().default(null),
});
export type ToolList = z.infer<typeof ToolList>;

export const CheckAccessRequest = z.object({
  tool_id: ToolId,
  allowed: z.array(Permission).default([]),
});
export type CheckAccessRequest = z.infer<typeof CheckAccessRequest>;

export const CheckAccessResponse = z.object({
  tool_id: ToolId,
  permission: Permission,
  allowed: z.boolean(),
});
export type CheckAccessResponse = z.infer<typeof CheckAccessResponse>;

/**
 * The 19 Rovo tools across the three permission tiers, mirroring the live
 * Atlassian Rovo MCP server's tool list + permission grouping.
 */
export const CATALOG: readonly Tool[] = [
  { id: "create_issue", label: "Create issue", permission: "interactive", type: "tool" },
  { id: "update_issue", label: "Update issue", permission: "interactive", type: "tool" },
  { id: "get_issue", label: "Get issue", permission: "interactive", type: "tool" },
  { id: "search_with_jql", label: "Search with JQL", permission: "interactive", type: "tool" },
  { id: "transition_issue", label: "Transition issue", permission: "interactive", type: "tool" },
  { id: "get_current_user_info", label: "Get current user info", permission: "read_only", type: "tool" },
  { id: "fetch_content_with_ari", label: "Fetch content with ARI (beta)", permission: "read_only", type: "tool" },
  { id: "list_accessible_resources", label: "List accessible resources", permission: "read_only", type: "tool" },
  { id: "get_issue_link_types", label: "Get issue link types", permission: "read_only", type: "tool" },
  { id: "get_remote_links", label: "Get remote links", permission: "read_only", type: "tool" },
  { id: "get_field_metadata", label: "Get field metadata", permission: "read_only", type: "tool" },
  { id: "get_issue_types", label: "Get issue types", permission: "read_only", type: "tool" },
  { id: "get_transitions", label: "Get transitions", permission: "read_only", type: "tool" },
  { id: "get_projects", label: "Get projects", permission: "read_only", type: "tool" },
  { id: "lookup_users", label: "Lookup users", permission: "read_only", type: "tool" },
  { id: "rovo_search", label: "Rovo Search Jira and Confluence", permission: "read_only", type: "tool" },
  { id: "add_comment", label: "Add comment", permission: "write_delete", type: "tool" },
  { id: "add_or_update_worklog", label: "Add or update worklog", permission: "write_delete", type: "tool" },
  { id: "create_issue_link", label: "Create issue link", permission: "write_delete", type: "tool" },
];

const BY_ID = new Map<ToolId, Tool>(CATALOG.map((t) => [t.id, t]));

export interface ListQuery {
  permission?: Permission;
  limit?: number;
  after_id?: ToolId;
}

/** Pure cursor-paginated list, returning the Claude-API list envelope. */
export function listTools(query: ListQuery = {}): ToolList {
  const limit = Math.min(Math.max(query.limit ?? 100, 1), 100);
  let items = CATALOG.filter((t) => !query.permission || t.permission === query.permission);
  if (query.after_id !== undefined) {
    const ids = items.map((t) => t.id);
    const idx = ids.indexOf(query.after_id);
    if (idx < 0) throw new Error(`invalid after_id: ${query.after_id}`);
    items = items.slice(idx + 1);
  }
  const page = items.slice(0, limit);
  return {
    data: page.map((t) => ({ ...t })),
    has_more: items.length > limit,
    first_id: page.length ? page[0]!.id : null,
    last_id: page.length ? page[page.length - 1]!.id : null,
  };
}

/** Retrieve one tool by id, or null if unknown. */
export function getTool(id: ToolId): Tool | null {
  const t = BY_ID.get(id);
  return t ? { ...t } : null;
}

/** Is the tool's required permission within the granted set? */
export function checkAccess(req: CheckAccessRequest): CheckAccessResponse {
  const tool = BY_ID.get(req.tool_id);
  if (!tool) throw new Error(`not_found_error: ${req.tool_id}`);
  return {
    tool_id: tool.id,
    permission: tool.permission,
    allowed: req.allowed.includes(tool.permission),
  };
}
