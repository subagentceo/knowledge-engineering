// scripts/orchestrator/units.ts
//
// The work-unit registry for the orchestrator. Each unit maps to a
// dispatch mode (in-process subagent OR cloud-session paste-prompt) and
// a brief description. Citation: see /Users/alexzh/.claude/plans/cosmic-skipping-bengio.md
// for the full plan including merge order and dispatch rationale.

export type DispatchMode = "in-process" | "cloud-session";

export interface WorkUnit {
  /** Stable id (slug). */
  id: string;
  /** Build order (1 = first this session). */
  buildOrder: number;
  /** Merge order (1 = lands to main first; 10 = last, ruleset tightening). */
  mergeOrder: number;
  /** Which dispatch surface this unit uses. */
  dispatch: DispatchMode;
  /** Short title shown in status table. */
  title: string;
  /** Detailed description for the subagent prompt. */
  description: string;
  /** Subagent name (only meaningful for in-process). */
  subagent?: string;
  /** Paste-prompt file (only meaningful for cloud-session). */
  pastePromptFile?: string;
  /** Outcome ID (always "O8" in this batch). */
  outcomeId: "O8";
}

export const UNITS: WorkUnit[] = [
  {
    id: "cloud-env-vars-contract",
    buildOrder: 2,
    mergeOrder: 1,
    dispatch: "in-process",
    subagent: "runbook-writer",
    title: "cloud-env-vars-contract.md",
    description:
      "Canonical matrix of every GH secret, GH var, CF Secrets Store entry, and Worker binding. Closes #120.",
    outcomeId: "O8",
  },
  {
    id: "ci-cd-unblock-paste-block",
    buildOrder: 3,
    mergeOrder: 2,
    dispatch: "in-process",
    subagent: "runbook-writer",
    title: "ci-cd-unblock.md paste-block",
    description:
      "claude --chrome paste-block to mint CLOUDFLARE_API_TOKEN + verify other secrets. Refs #114, #119.",
    outcomeId: "O8",
  },
  {
    id: "parallel-ai-bootstrap",
    buildOrder: 6,
    mergeOrder: 3,
    dispatch: "cloud-session",
    pastePromptFile: "parallel-ai.md",
    title: "parallel-ai bootstrap (cloud session)",
    description:
      "Wire @parallelhq SDK or direct fetch + smoke + runbook + outbound-allowlist api.parallel.ai. Premium $70 tier on alex@jadecli.com.",
    outcomeId: "O8",
  },
  {
    id: "nimbleway-bootstrap",
    buildOrder: 7,
    mergeOrder: 4,
    dispatch: "cloud-session",
    pastePromptFile: "nimbleway.md",
    title: "nimbleway bootstrap (cloud session)",
    description:
      "Wire client + smoke against GET sdk.nimbleway.com/v1/tasks/{id} + runbook + outbound-allowlist sdk.nimbleway.com + mcp.nimbleway.com.",
    outcomeId: "O8",
  },
  {
    id: "mint-neon-api-secret",
    buildOrder: 1,
    mergeOrder: 5,
    dispatch: "in-process",
    title: "mint-neon-api-secret.ts",
    description:
      "Leak-safe rotation script mirroring scripts/mint-claude-oauth-secret.ts. npm run rotate:neon. Closes #116.",
    outcomeId: "O8",
  },
  {
    id: "loop-pr-babysitter",
    buildOrder: 4,
    mergeOrder: 6,
    dispatch: "in-process",
    title: "loop-pr-babysitter routine",
    description:
      "New plugin-style skill .claude/skills/routines/pr-babysitter/{SKILL.md,scripts/pr-babysitter.ts}. Mirrors Boris's PR babysitting pattern (whats-new.md Week 15 + /autofix-pr).",
    outcomeId: "O8",
  },
  {
    id: "loop-ci-healer",
    buildOrder: 5,
    mergeOrder: 7,
    dispatch: "in-process",
    title: "loop-ci-healer routine",
    description:
      "New plugin-style skill .claude/skills/routines/ci-healer/{SKILL.md,scripts/ci-healer.ts}. Re-runs flakies, surfaces real failures.",
    outcomeId: "O8",
  },
  {
    id: "ollama-cloud-bootstrap",
    buildOrder: 8,
    mergeOrder: 8,
    dispatch: "cloud-session",
    pastePromptFile: "ollama-cloud.md",
    title: "ollama-cloud bootstrap (cloud session)",
    description:
      "Crawl ollama.com/docs/cloud (fill citation gap) + wire client + smoke + runbook + outbound-allowlist ollama.com + api.ollama.com. Paid $20 tier.",
    outcomeId: "O8",
  },
  {
    id: "neon-pg18-audit",
    buildOrder: 9,
    mergeOrder: 9,
    dispatch: "in-process",
    title: "neon-pg18 audit",
    description:
      "scripts/audit-neon-extensions.ts + decision doc. Query Neon API for pg_version + extensions on divine-cloud-27295848.",
    outcomeId: "O8",
  },
  {
    id: "auto-merge-strict-ci",
    buildOrder: 10,
    mergeOrder: 10,
    dispatch: "in-process",
    title: "auto-merge strict-CI tightening",
    description:
      "Refactor .github/workflows/auto-merge.yml + scripts/setup-branch-protection.ts to require 5 checks (verify, osv-scanner, cloudflare-preview, neon-branch, copilot). LANDS LAST.",
    outcomeId: "O8",
  },
];

export function unitsInBuildOrder(): WorkUnit[] {
  return [...UNITS].sort((a, b) => a.buildOrder - b.buildOrder);
}

export function unitsInMergeOrder(): WorkUnit[] {
  return [...UNITS].sort((a, b) => a.mergeOrder - b.mergeOrder);
}

export function unitById(id: string): WorkUnit | undefined {
  return UNITS.find((u) => u.id === id);
}
