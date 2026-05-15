// scripts/orchestrator/agents.ts
//
// Programmatic subagent definitions for the orchestrator. Each agent is
// invoked via the Agent tool with a `subagent_type` matching the key
// below. Citations:
//
//   - vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//     ("Define subagents directly in your code using the `agents` parameter")
//   - vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
//     §AgentDefinition (shape: description, tools, prompt, model)
//
// Tool restrictions (per agent-sdk/subagents.md § Tool restrictions):
// "Subagents can be limited to specific tools, reducing the risk of
// unintended actions." Each agent below gets the minimum tool set for
// its job.
//
// The `Agent` tool MUST be in the parent's allowedTools (see
// scripts/orchestrator.ts) since Claude invokes subagents through it.

import type { AgentDefinition } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPTS = join(__dirname, "prompts");

function load(name: string): string {
  return readFileSync(join(PROMPTS, `${name}.md`), "utf8");
}

/**
 * The orchestrator's subagent roster. Keyed by canonical name; each
 * `description` tells Claude when to delegate to that agent (per
 * subagents.md: "Claude determines whether to invoke them based on each
 * subagent's `description` field").
 */
export const ORCHESTRATOR_AGENTS: Record<string, AgentDefinition> = {
  "vendor-bootstrapper": {
    description:
      "Bootstrap a new vendor API key + TypeScript client + smoke test mirroring the turbopuffer pattern landed in commit 2335179. Use for parallel.ai, nimbleway, ollama-cloud, and similar vendors where the chassis needs to make authenticated outbound calls.",
    prompt: load("vendor-bootstrapper"),
    tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Agent"],
    model: "opus",
  },
  "runbook-writer": {
    description:
      "Write a docs/operator-runbooks/<vendor>.md following the template at docs/operator-runbooks/turbopuffer-api-key.md. Use for any new operator runbook (vendor API keys, CI flows, infra setup).",
    prompt: load("runbook-writer"),
    tools: ["Read", "Write", "Edit", "Glob", "Grep"],
    model: "opus",
  },
  "ci-fixer": {
    description:
      "Investigate a failing CI run from the verify/osv-scanner/cloudflare-preview/neon-branch workflows, classify the failure type (flaky vs real), and apply a fix. Reference the heartbeat skill's CI-failure classifier at .claude/skills/heartbeat/SKILL.md:153-165. Use for the pr-babysitter and ci-healer routines.",
    prompt: load("ci-fixer"),
    tools: ["Read", "Bash", "Grep", "Edit"],
    model: "opus",
  },
  "citation-validator": {
    description:
      "Verify @cite headers in test files resolve to real vendor/ paths. Run scripts/lib/citation-guard.ts and report failures with file paths and missing-citation rows. Use before any commit that touches test files.",
    prompt: load("citation-validator"),
    tools: ["Read", "Grep", "Bash"],
    model: "opus",
  },
  "smoke-tester": {
    description:
      "Run an existing scripts/smoke-<vendor>.ts script and report results structurally (success / skip-because-key-not-staged / fail-with-reason). Use to verify a vendor's wiring after vendor-bootstrapper lands its code.",
    prompt: load("smoke-tester"),
    tools: ["Bash", "Read"],
    model: "opus",
  },
};
