/**
 * Tests for src/lib/tool-catalog.ts — static catalog of every
 * Messages API tool type. Each assertion drives one shape invariant.
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/mcp-connector.md
 */
import {
  AllowedCallerSchema,
  TOOL_CATALOG,
  ToolCatalogEntrySchema,
  ToolStatusSchema,
  ToolExecutionSchema,
  betaTools,
  lookupTool,
  requiredBetaHeaders,
  toolsForExecution,
} from "./tool-catalog.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("tool-catalog:");

// ────────────────────────────────────────────────────────────
// Schema invariants

check("ToolStatusSchema is an exhaustive 2-value enum", () => {
  ToolStatusSchema.parse("ga");
  ToolStatusSchema.parse("beta");
  if (ToolStatusSchema.safeParse("preview").success) throw new Error("accepted bogus status");
});

check("ToolExecutionSchema is an exhaustive 2-value enum", () => {
  ToolExecutionSchema.parse("server");
  ToolExecutionSchema.parse("client");
  if (ToolExecutionSchema.safeParse("hybrid").success) throw new Error("accepted bogus exec");
});

check("AllowedCallerSchema covers both code_execution + direct", () => {
  AllowedCallerSchema.parse("direct");
  AllowedCallerSchema.parse("code_execution_20260120");
});

check("every TOOL_CATALOG entry passes the zod schema", () => {
  for (const entry of TOOL_CATALOG) {
    ToolCatalogEntrySchema.parse(entry);
  }
});

// ────────────────────────────────────────────────────────────
// Content invariants

check("TOOL_CATALOG type literals are globally unique", () => {
  const seen = new Set<string>();
  for (const t of TOOL_CATALOG) {
    if (seen.has(t.type)) throw new Error(`duplicate type ${t.type}`);
    seen.add(t.type);
  }
});

check("every beta tool declares a beta_header", () => {
  for (const t of TOOL_CATALOG) {
    if (t.status === "beta" && t.beta_header === null) {
      throw new Error(`beta tool ${t.type} missing beta_header`);
    }
  }
});

check("every GA tool has beta_header: null", () => {
  for (const t of TOOL_CATALOG) {
    if (t.status === "ga" && t.beta_header !== null) {
      throw new Error(`GA tool ${t.type} has stray beta_header ${t.beta_header}`);
    }
  }
});

check("type literals match the YYYYMMDD or non-versioned convention", () => {
  const versionRe = /^[a-z][a-z0-9_]*_\d{8}$/;
  const nonVersioned = new Set(["mcp_toolset"]);
  for (const t of TOOL_CATALOG) {
    if (nonVersioned.has(t.type)) continue;
    if (!versionRe.test(t.type)) {
      throw new Error(`type ${t.type} doesn't match _YYYYMMDD convention`);
    }
  }
});

check("catalog covers every documented family", () => {
  const families = new Set(TOOL_CATALOG.map((t) => t.family));
  for (const required of [
    "web_search",
    "web_fetch",
    "code_execution",
    "advisor",
    "tool_search",
    "mcp",
    "memory",
    "bash",
    "text_editor",
    "computer",
  ]) {
    if (!families.has(required)) throw new Error(`missing family ${required}`);
  }
});

// ────────────────────────────────────────────────────────────
// Query helpers

check("betaTools() returns only beta-status entries with non-null headers", () => {
  const beta = betaTools();
  if (beta.length === 0) throw new Error("no beta tools surfaced");
  for (const t of beta) {
    if (t.status !== "beta") throw new Error(`non-beta in result: ${t.type}`);
    if (!t.beta_header) throw new Error(`beta tool missing header: ${t.type}`);
  }
});

check("toolsForExecution('client') includes memory + bash + text_editor", () => {
  const client = toolsForExecution("client");
  const families = new Set(client.map((t) => t.family));
  if (!families.has("memory")) throw new Error("memory missing");
  if (!families.has("bash")) throw new Error("bash missing");
  if (!families.has("text_editor")) throw new Error("text_editor missing");
});

check("toolsForExecution('server') includes web_search + code_execution + advisor", () => {
  const server = toolsForExecution("server");
  const families = new Set(server.map((t) => t.family));
  if (!families.has("web_search")) throw new Error("web_search missing");
  if (!families.has("code_execution")) throw new Error("code_execution missing");
  if (!families.has("advisor")) throw new Error("advisor missing");
});

check("lookupTool returns entry for known type", () => {
  const entry = lookupTool("memory_20250818");
  if (!entry) throw new Error("memory not found");
  if (entry.family !== "memory") throw new Error(`wrong family: ${entry.family}`);
  if (entry.execution !== "client") throw new Error(`wrong exec: ${entry.execution}`);
});

check("lookupTool returns undefined for unknown type", () => {
  if (lookupTool("not_a_real_tool_19990101") !== undefined) {
    throw new Error("returned non-undefined for bogus type");
  }
});

check("requiredBetaHeaders aggregates + deduplicates + sorts", () => {
  const headers = requiredBetaHeaders([
    "advisor_20260301",
    "mcp_toolset",
    "memory_20250818",
    "advisor_20260301",
  ]);
  // memory is GA — no header expected. advisor + mcp are beta.
  if (headers.length !== 2) throw new Error(`length=${headers.length}; got ${headers.join(",")}`);
  if (headers[0] !== "advisor-tool-2026-03-01") throw new Error(`order: ${headers[0]}`);
  if (headers[1] !== "mcp-client-2025-11-20") throw new Error(`order: ${headers[1]}`);
});

check("requiredBetaHeaders silently skips unknown types", () => {
  const headers = requiredBetaHeaders(["bogus_tool", "mcp_toolset"]);
  if (headers.length !== 1) throw new Error(`length=${headers.length}`);
});

// ────────────────────────────────────────────────────────────
// Catalog size

check("catalog has at least 14 entries (every documented tool variant)", () => {
  if (TOOL_CATALOG.length < 14) throw new Error(`length=${TOOL_CATALOG.length}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
