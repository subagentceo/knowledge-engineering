/**
 * Outcome: Run the orchestrator. The orchestrator delegates primary research
 * to `npm-research` (restricted to the four `npm-registry` MCP tools), then
 * to `verifier` (restricted to the twelve `knowledge-bridge` MCP tools), per
 * the multi-agent research pattern in
 * `anthropic.com/engineering/built-multi-agent-research-system`.
 *
 * Auth: OAuth only. `requireOAuth()` fails closed if `ANTHROPIC_API_KEY` is
 * set or no OAuth token is available (see src/oauth/token.ts).
 *
 * MCP servers mounted (both stdio):
 *   - npm-registry     -> dist/mcp/npm-registry/server.js
 *   - knowledge-bridge -> dist/mcp/bridge-server.js
 *
 * Planning: Planner (src/agent/planning.ts) emits TodoWrite (headless) or
 * TaskCreate/TaskUpdate (interactive). The TodoTracker (src/agent/todo-tracker.ts)
 * is a thin display layer for either surface.
 */
import { query, SYSTEM_PROMPT_DYNAMIC_BOUNDARY } from "@anthropic-ai/claude-agent-sdk";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { requireOAuth } from "../oauth/token.js";
import { getOpenFeatureClient } from "../lib/openfeature.js";
import { auditBashPreToolUse } from "../lib/safety-hooks.js";
import { Planner, type RunMode, type Plan } from "./planning.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

async function seed(name: string): Promise<string> {
  return readFile(resolve(root, "seeds/prompts", `${name}.md`), "utf8");
}

const auth = requireOAuth();
// Phase 13.B+ (O5): initialize OpenFeature client. In Worker runtime,
// the Worker calls setProvider(@cloudflare/flagship) before invoking
// this module. Locally, the InMemoryProvider seeded from
// seeds/openfeature/local-flags.json is used.
export const flagClient = getOpenFeatureClient();

// Concatenate the two orchestrator seeds: topology + planning discipline.
const [topology, planningDiscipline, npmResearch, verifier, crawlCurator] = await Promise.all([
  seed("system-orchestrator"),
  seed("orchestrator.system"),
  seed("subagent-npm-research"),
  seed("subagent-verifier"),
  seed("subagent-crawl-curator"),
]);

// Cacheable static prefix (topology + planning discipline) followed by the
// SDK's dynamic-boundary marker. Everything before the marker is a stable
// system-prompt prefix that the Anthropic prompt cache can reuse across
// turns; per-session dynamic context (cwd, memory paths, git status) lands
// after the marker. See:
//   vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
//   node_modules/@anthropic-ai/claude-agent-sdk/sdk.d.ts SYSTEM_PROMPT_DYNAMIC_BOUNDARY
const systemPrompt: string[] = [
  topology,
  planningDiscipline,
  SYSTEM_PROMPT_DYNAMIC_BOUNDARY,
];

// Mode is headless when invoked from the Agent SDK; interactive when
// launched from a Claude Code slash command. Allow override via env.
const mode: RunMode =
  process.env.KE_PLANNER_MODE === "interactive" ? "interactive" : "headless";

// The Planner exists at module scope so future plan emissions go through one
// invariant-checked surface. It is currently kept ready (not driven by a model
// loop here); commit 12's `verify:planner` smoke-tests both modes.
export const planner = new Planner({
  mode,
  emit: async (toolName, input) => {
    process.stderr.write(`[planner] ${toolName} ${JSON.stringify(input).slice(0, 200)}\n`);
  },
});

// Document the verifier-gate contract. The orchestrator system prompt
// instructs the model to only mark docs-lane todos `completed` after the
// verifier returns `pass`. The Planner's `enforceSinglyInProgress` invariant
// runs on every status transition to keep the rule machine-checked.
export const verifierGate = (verdict: "pass" | "warn" | "fail"): boolean =>
  verdict === "pass";

const userPrompt =
  process.argv.slice(2).join(" ") ||
  "What does the npm registry say about @modelcontextprotocol/sdk's recent versions, and how does that line up with what anthropic.com/engineering or the llms.txt namespaces have said about MCP?";

const result = query({
  prompt: userPrompt,
  options: {
    systemPrompt,
    // Explicit settingSources: load project-level CLAUDE.md + .claude/skills/
    // + .claude/settings.json hooks, but skip user (~/.claude/) and local
    // (CLAUDE.local.md / settings.local.json). The orchestrator chassis is
    // the source of truth; host-level config should not leak in.
    // @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md
    settingSources: ["project"],
    // Enable all project-level skills (heartbeat, routines, refresh-vendors,
    // schedule-bridge). The Skill tool is auto-registered when this is set.
    skills: "all",
    // Programmatic PreToolUse hook: blocks ANTHROPIC_API_KEY exports +
    // destructive Bash patterns at runtime. Supplements the startup-time
    // gate in src/oauth/token.ts.
    hooks: {
      PreToolUse: [
        { matcher: "Bash", hooks: [async (input) => auditBashPreToolUse(input)] },
      ],
    },
    mcpServers: {
      "npm-registry": {
        type: "stdio",
        command: "node",
        args: [resolve(root, "dist/mcp/npm-registry/server.js")],
      },
      "knowledge-bridge": {
        type: "stdio",
        command: "node",
        args: [resolve(root, "dist/mcp/bridge-server.js")],
      },
    },
    agents: {
      "npm-research": {
        description:
          "Sub-agent restricted to the four npm-registry MCP tools. Pulls primary npm data; cites registry URLs.",
        prompt: npmResearch,
        tools: [
          "mcp__npm-registry__npm_org_packages",
          "mcp__npm-registry__npm_package_metadata",
          "mcp__npm-registry__npm_downloads",
          "mcp__npm-registry__npm_search",
        ],
      },
      verifier: {
        description:
          "Independent verifier restricted to the four-lane knowledge-bridge tools. Runs after npm-research and grades its output against docs/rubric.md.",
        prompt: verifier,
        tools: [
          "mcp__knowledge-bridge__engineering_index",
          "mcp__knowledge-bridge__engineering_fetch",
          "mcp__knowledge-bridge__engineering_search",
          "mcp__knowledge-bridge__blog_index",
          "mcp__knowledge-bridge__blog_fetch",
          "mcp__knowledge-bridge__blog_search",
          "mcp__knowledge-bridge__support_collections",
          "mcp__knowledge-bridge__support_collection",
          "mcp__knowledge-bridge__support_article",
          "mcp__knowledge-bridge__llms_namespaces",
          "mcp__knowledge-bridge__llms_fetch",
          "mcp__knowledge-bridge__llms_grep",
        ],
      },
      // Phase 10 — third sub-agent. Specialization per
      // vendor/anthropics/platform.claude.com/docs/en/managed-agents/multi-agent.md.
      // Owns the per-vendor crawl.json audit + drift detection on the
      // local mirror. Restricted to the 3 vendor_* tools (not the full
      // 16) so its blast radius stays small.
      "crawl-curator": {
        description:
          "Per-vendor crawl.json auditor. Inspects vendor/<name>/urls.md + crawl.json against the upstream llms.txt; surfaces tune-crawl-json / recrawl / discover-llms-txt next_steps[]. Restricted to the 3 vendor_* tools.",
        prompt: crawlCurator,
        tools: [
          "mcp__knowledge-bridge__vendor_list",
          "mcp__knowledge-bridge__vendor_fetch",
          "mcp__knowledge-bridge__vendor_grep",
        ],
      },
    },
  },
});

process.stderr.write(`[oauth] using ${auth.source} token\n`);
process.stderr.write(`[planner] mode=${mode}\n`);

// Type-only export so `Plan` flows out of this module for downstream loaders.
export type { Plan };

for await (const msg of result) {
  if (msg.type === "assistant") {
    for (const block of msg.message.content) {
      if (block.type === "text") process.stdout.write(block.text);
    }
  }
}
process.stdout.write("\n");
