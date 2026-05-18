// scripts/orchestrator/dispatch.ts
//
// Dispatch logic for the orchestrator. Routes each WorkUnit to either:
//   - in-process subagent (via SDK's Agent tool)
//   - cloud-session paste-prompt (operator's mobile claude.ai/code)
//
// Citations:
//   vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//     (Agent tool invocation pattern)
//   vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
//     (cloud-session model — fresh VM + repo clone per session)
//   vendor/anthropics/code.claude.com/docs/en/remote-control.md
//     (this orchestrator runs under Remote Control; operator monitors from mobile)

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { WorkUnit } from "./units.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PASTE_PROMPTS_DIR = join(__dirname, "paste-prompts");

export interface DispatchResult {
  unitId: string;
  mode: "in-process" | "cloud-session";
  /** For in-process: the prompt to give the parent (Claude in this terminal). */
  parentPrompt?: string;
  /** For cloud-session: the body to paste into a fresh claude.ai/code session. */
  pastePrompt?: string;
  /** Path the operator should reference. */
  promptFile?: string;
}

/**
 * Produce a dispatch package for the given unit. The orchestrator's main
 * loop consumes this and either:
 *   - runs the in-process query() with the subagent definition, OR
 *   - prints the paste-prompt to stdout (operator copies to mobile)
 */
export function dispatchUnit(unit: WorkUnit): DispatchResult {
  if (unit.dispatch === "in-process") {
    const parentPrompt = buildInProcessPrompt(unit);
    return {
      unitId: unit.id,
      mode: "in-process",
      parentPrompt,
    };
  }

  // cloud-session
  if (!unit.pastePromptFile) {
    throw new Error(
      `Unit ${unit.id} has dispatch=cloud-session but no pastePromptFile`,
    );
  }
  const promptFile = join(PASTE_PROMPTS_DIR, unit.pastePromptFile);
  if (!existsSync(promptFile)) {
    throw new Error(
      `Unit ${unit.id}: paste-prompt file missing at ${promptFile}`,
    );
  }
  const pastePrompt = readFileSync(promptFile, "utf8");
  return {
    unitId: unit.id,
    mode: "cloud-session",
    pastePrompt,
    promptFile,
  };
}

function buildInProcessPrompt(unit: WorkUnit): string {
  const subagentHint = unit.subagent
    ? `\n\nUse the ${unit.subagent} subagent via the Agent tool.`
    : "";

  return `# Work unit: ${unit.id}

**Title:** ${unit.title}
**Description:** ${unit.description}
**Outcome ID:** ${unit.outcomeId}
**Build order:** ${unit.buildOrder} of 10
**Merge order:** ${unit.mergeOrder} of 10
${subagentHint}

## Conventions

- Atomic commit per unit ending with \`(${unit.outcomeId})\`
- Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
- OAuth-only invariant: never set ANTHROPIC_API_KEY anywhere
- Leak-safe secret handling: mktemp 0o600, stdin pipe to consumers, never echo

## Acceptance

Run \`npm run verify\` after your change. If it fails, fix before committing.
Open a PR via \`gh pr create --label automerge\`. Report \`PR: <url>\` as your final line.
`;
}
