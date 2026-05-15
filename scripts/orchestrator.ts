// scripts/orchestrator.ts
//
// Long-lived multi-agent orchestrator for /batch work.
//
// Architecture (see /Users/alexzh/.claude/plans/cosmic-skipping-bengio.md):
//   Layer 1: Operator's mobile (claude.ai/code) drives this session via Remote Control
//   Layer 2: This terminal session (Opus 4.7 1M, Remote Control server)
//   Layer 3: In-process subagents via SDK's `agents: {...}` parameter
//   Layer 4: Cloud sessions (operator launches at claude.ai/code from mobile)
//
// Citations:
//   - vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
//     (query, startup, AgentDefinition, Options types)
//   - vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//     (programmatic subagent pattern + Agent tool requirement)
//   - vendor/anthropics/code.claude.com/docs/en/remote-control.md
//     (operator's mobile entry into this session)
//   - seeds/prompts/operator-2026-05-10.md (OAuth-only invariant)
//   - docs/operator-runbooks/turbopuffer-api-key.md (proven bootstrap pattern this orchestrator extends)
//
// Run:
//   npm run orchestrate              # full run
//   npm run orchestrate -- --dry-run # validate registry + print dispatch plan, don't act
//   npm run orchestrate -- --unit <id>  # single unit
//
// Auth:
//   This script does NOT read CLAUDE_CODE_OAUTH_TOKEN directly. The Agent
//   SDK spawns the Claude Code CLI subprocess, which reads the token from
//   the macOS keychain entry "Claude Code-credentials". The OAuth-only
//   invariant is enforced by src/oauth/token.ts (fails closed if
//   ANTHROPIC_API_KEY is set).

import { startup, type Options } from "@anthropic-ai/claude-agent-sdk";
import { ORCHESTRATOR_AGENTS } from "./orchestrator/agents.ts";
import { dispatchUnit } from "./orchestrator/dispatch.ts";
import { UNITS, unitsInBuildOrder, unitById } from "./orchestrator/units.ts";

interface Args {
  dryRun: boolean;
  unitId?: string;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dry-run") a.dryRun = true;
    else if (argv[i] === "--unit" && argv[i + 1]) {
      a.unitId = argv[++i];
    }
  }
  return a;
}

function envSafetyCheck(): void {
  // Layer-1 OAuth-only invariant: ANTHROPIC_API_KEY must not be set.
  // Cited from seeds/prompts/operator-2026-05-10.md and CLAUDE.md.
  if (process.env.ANTHROPIC_API_KEY) {
    console.error(
      "[orchestrator] FATAL: ANTHROPIC_API_KEY is set in env. The OAuth-only " +
        "invariant forbids this. The Claude Code CLI reads CLAUDE_CODE_OAUTH_TOKEN " +
        "from the macOS keychain entry \"Claude Code-credentials\". Unset " +
        "ANTHROPIC_API_KEY and retry.\n" +
        "  unset ANTHROPIC_API_KEY\n",
    );
    process.exit(2);
  }
}

function printDispatchPlan(): void {
  console.log("[orchestrator] Dispatch plan (build order):\n");
  console.log("  # | Build | Merge | Mode          | Unit");
  console.log("  - | ----- | ----- | ------------- | ----");
  for (const u of unitsInBuildOrder()) {
    const mode = u.dispatch === "in-process" ? "in-process   " : "cloud-session";
    console.log(
      `  ${String(u.buildOrder).padStart(2)} | ${String(u.buildOrder).padStart(5)} | ${String(
        u.mergeOrder,
      ).padStart(5)} | ${mode} | ${u.title}`,
    );
  }
  console.log("");
  console.log(`[orchestrator] Subagents registered: ${Object.keys(ORCHESTRATOR_AGENTS).join(", ")}`);
  console.log(`[orchestrator] Total units: ${UNITS.length}`);
}

async function main(): Promise<void> {
  envSafetyCheck();

  const args = parseArgs(process.argv.slice(2));

  if (args.dryRun) {
    printDispatchPlan();
    console.log("\n[orchestrator] --dry-run: validated registry; no work dispatched.");
    process.exit(0);
  }

  // Filter units if --unit specified
  const targets = args.unitId
    ? (() => {
        const u = unitById(args.unitId!);
        if (!u) {
          console.error(`[orchestrator] Unknown unit id: ${args.unitId}`);
          process.exit(2);
        }
        return [u];
      })()
    : unitsInBuildOrder();

  console.log(
    `[orchestrator] Executing ${targets.length} unit(s) in build order. Outcome IDs: ${[
      ...new Set(targets.map((u) => u.outcomeId)),
    ].join(", ")}.`,
  );

  // Pre-warm the SDK subprocess so the first query() doesn't pay spawn
  // + initialize cost inline. Cited from agent-sdk/typescript.md §startup().
  const options: Options = {
    agents: ORCHESTRATOR_AGENTS,
    allowedTools: [
      "Read",
      "Write",
      "Edit",
      "Bash",
      "Glob",
      "Grep",
      "Agent",
      "TodoWrite",
    ],
    maxTurns: 50,
    permissionMode: "acceptEdits",
    model: "opus",
  };

  console.log("[orchestrator] Pre-warming CLI subprocess via startup()...");
  const warm = await startup({ options, initializeTimeoutMs: 30000 });

  for (const unit of targets) {
    const plan = dispatchUnit(unit);

    if (plan.mode === "cloud-session") {
      // Cloud-session dispatch: print the paste-prompt for the operator
      // to copy into a fresh claude.ai/code session. The orchestrator
      // doesn't wait — it logs and moves on; operator's session opens
      // its own PR.
      console.log(`\n[orchestrator] ━━━ Unit ${unit.id}: CLOUD-SESSION DISPATCH ━━━`);
      console.log(`Paste the prompt below into a fresh claude.ai/code session.`);
      console.log(`Source file: ${plan.promptFile}\n`);
      console.log("┌─ BEGIN PASTE-PROMPT ─────────────────────────────────────────");
      for (const line of plan.pastePrompt!.split("\n")) {
        console.log(`│ ${line}`);
      }
      console.log("└─ END PASTE-PROMPT ───────────────────────────────────────────\n");
      continue;
    }

    // In-process dispatch via query()
    console.log(`\n[orchestrator] ━━━ Unit ${unit.id}: IN-PROCESS ━━━`);
    const q = warm.query(plan.parentPrompt!);
    for await (const msg of q) {
      // The orchestrator forwards subagent progress to stdout so operator
      // can watch from Remote Control. We don't aggressively filter —
      // visibility matters more than terseness here.
      if (msg.type === "assistant") {
        const text = msg.message.content
          .map((c) => (c.type === "text" ? c.text : ""))
          .join("");
        if (text) process.stdout.write(text + "\n");
      } else if (msg.type === "result") {
        console.log(`[orchestrator] Unit ${unit.id} finished: ${msg.subtype}`);
      }
    }
  }

  console.log("\n[orchestrator] All units dispatched.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("[orchestrator] FATAL:", err);
    process.exit(1);
  });
}
