/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/overview.md
 */
/**
 * Programmatic tool catalog — Phase J outcome O-J1.
 *
 * Anthropic Messages API surfaces a fixed set of server-tool + client-
 * tool types (each with a date-suffixed version literal). The Agent
 * SDK does NOT provide a runtime `listTools()` method (per pre-flight
 * research turn this session — sub-agent confirmed `Query.mcpServer
 * Status()` returns server metadata only, not the tool surface).
 *
 * This module is the static-data complement: a zod-validated catalog
 * of every tool type, its current GA/beta status, and the API beta
 * header it requires. Consumers (e.g. a future MCP tool exposing
 * `messages_api_tools` to the model, the chassis posture XML, the
 * orchestrator's tool-discovery helpers) read from one place instead
 * of re-extracting the strings from vendor markdown.
 *
 * Sourced from:
 *   vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference.md
 *   vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md
 *   vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/mcp-connector.md
 *
 * Pure data + zod schemas; no I/O.
 */
import { z } from "zod";

export const ToolStatusSchema = z.enum(["ga", "beta"]);
export type ToolStatus = z.infer<typeof ToolStatusSchema>;

export const ToolExecutionSchema = z.enum(["server", "client"]);
export type ToolExecution = z.infer<typeof ToolExecutionSchema>;

export const AllowedCallerSchema = z.enum(["direct", "code_execution_20260120"]);
export type AllowedCaller = z.infer<typeof AllowedCallerSchema>;

export const ToolCatalogEntrySchema = z.object({
  /** The `type` literal supplied in the `tools[]` API parameter. */
  type: z.string(),
  /** Operator-facing tool family (e.g. "web_search", "memory"). */
  family: z.string(),
  /** Server-executed (Anthropic-side) or client-executed (in the SDK process). */
  execution: ToolExecutionSchema,
  /** GA vs Beta. Beta types require the corresponding `anthropic-beta` header. */
  status: ToolStatusSchema,
  /** Beta header literal required to enable this tool, or null for GA. */
  beta_header: z.string().nullable(),
  /** Short description for the model + UIs. */
  description: z.string(),
});
export type ToolCatalogEntry = z.infer<typeof ToolCatalogEntrySchema>;

/**
 * Authoritative catalog. Each entry corresponds to a tool type the
 * Messages API recognizes. Keep date-suffixed versions adjacent to
 * their family for easy review.
 */
export const TOOL_CATALOG: ReadonlyArray<ToolCatalogEntry> = [
  // ── Web search ─────────────────────────────────────────────────────
  {
    type: "web_search_20260209",
    family: "web_search",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "Search the public web. Returns ranked results + snippets.",
  },
  {
    type: "web_search_20250305",
    family: "web_search",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "Earlier web_search version (pre-Feb-2026 schema).",
  },
  // ── Web fetch ──────────────────────────────────────────────────────
  {
    type: "web_fetch_20260209",
    family: "web_fetch",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "Fetch a single URL and return its rendered text.",
  },
  {
    type: "web_fetch_20250910",
    family: "web_fetch",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "Earlier web_fetch version.",
  },
  // ── Code execution ─────────────────────────────────────────────────
  {
    type: "code_execution_20260120",
    family: "code_execution",
    execution: "server",
    status: "ga",
    beta_header: null,
    description:
      "Python sandbox. Pairs with allowed_callers on custom tools for programmatic tool calling.",
  },
  {
    type: "code_execution_20250825",
    family: "code_execution",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "Earlier code_execution version.",
  },
  // ── Advisor (beta) ─────────────────────────────────────────────────
  {
    type: "advisor_20260301",
    family: "advisor",
    execution: "server",
    status: "beta",
    beta_header: "advisor-tool-2026-03-01",
    description:
      "Server-side advisor tool — distinct from the Managed-Agents multi-agent coordinator pattern.",
  },
  // ── Tool search ────────────────────────────────────────────────────
  {
    type: "tool_search_tool_regex_20251119",
    family: "tool_search",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "Regex-based progressive tool disclosure.",
  },
  {
    type: "tool_search_tool_bm25_20251119",
    family: "tool_search",
    execution: "server",
    status: "ga",
    beta_header: null,
    description: "BM25-ranked progressive tool disclosure.",
  },
  // ── MCP connector (beta) ───────────────────────────────────────────
  {
    type: "mcp_toolset",
    family: "mcp",
    execution: "server",
    status: "beta",
    beta_header: "mcp-client-2025-11-20",
    description:
      "Connect an HTTP/SSE MCP server. Anthropic side calls `tools/list` internally; client doesn't enumerate.",
  },
  // ── Memory tool ────────────────────────────────────────────────────
  {
    type: "memory_20250818",
    family: "memory",
    execution: "client",
    status: "ga",
    beta_header: null,
    description:
      "Client-side memory store. Six commands: view, create, str_replace, insert, delete, rename. Path-scoped to /memories.",
  },
  // ── Bash ───────────────────────────────────────────────────────────
  {
    type: "bash_20250124",
    family: "bash",
    execution: "client",
    status: "ga",
    beta_header: null,
    description: "Run a bash command in the client process.",
  },
  // ── Text editor ────────────────────────────────────────────────────
  {
    type: "text_editor_20250728",
    family: "text_editor",
    execution: "client",
    status: "ga",
    beta_header: null,
    description: "File read/edit operations in the client filesystem.",
  },
  {
    type: "text_editor_20250124",
    family: "text_editor",
    execution: "client",
    status: "ga",
    beta_header: null,
    description: "Earlier text_editor version.",
  },
  // ── Computer use (beta) ────────────────────────────────────────────
  {
    type: "computer_20251124",
    family: "computer",
    execution: "client",
    status: "beta",
    beta_header: "computer-use-2025-11-24",
    description: "Screen capture + mouse/keyboard control.",
  },
  {
    type: "computer_20250124",
    family: "computer",
    execution: "client",
    status: "beta",
    beta_header: "computer-use-2025-01-24",
    description: "Earlier computer-use version.",
  },
];

/**
 * Return every catalog entry that requires a beta header. Useful when
 * configuring an `anthropic-beta` header list for a session that
 * enables multiple beta tools.
 */
export function betaTools(): ReadonlyArray<ToolCatalogEntry> {
  return TOOL_CATALOG.filter((t) => t.status === "beta");
}

/**
 * Return every catalog entry in a given execution mode. The Agent
 * SDK exposes both classes; this helper filters for the relevant
 * subset when wiring a specific runtime.
 */
export function toolsForExecution(mode: ToolExecution): ReadonlyArray<ToolCatalogEntry> {
  return TOOL_CATALOG.filter((t) => t.execution === mode);
}

/**
 * Lookup by exact type literal — used when the chassis sees a
 * `tool_use` block with an unknown type and wants to know whether
 * to require a beta header or expect a particular shape.
 */
export function lookupTool(type: string): ToolCatalogEntry | undefined {
  return TOOL_CATALOG.find((t) => t.type === type);
}

/**
 * Aggregate the `anthropic-beta` headers needed to enable a given set
 * of tool types. Deduplicates; returns sorted for deterministic
 * test output.
 */
export function requiredBetaHeaders(types: ReadonlyArray<string>): string[] {
  const out = new Set<string>();
  for (const t of types) {
    const entry = lookupTool(t);
    if (entry?.beta_header) out.add(entry.beta_header);
  }
  return Array.from(out).sort();
}
