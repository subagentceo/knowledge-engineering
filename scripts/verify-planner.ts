// scripts/verify-planner.ts
//
// Smoke test for the planner. Exits non-zero if:
//   - ANTHROPIC_API_KEY is set (OAuth-only)
//   - The agent does not emit TodoWrite (headless) or TaskCreate (interactive)
//   - The planner allows >1 in_progress steps
//   - Loop / schedule steps do not produce SlashCommand emissions

import { Planner, Plan, enforceSinglyInProgress } from "../src/agent/planning.js";

function fail(msg: string): never {
  console.error(`[verify:planner] FAIL — ${msg}`);
  process.exit(1);
}

if (process.env.ANTHROPIC_API_KEY) {
  fail("ANTHROPIC_API_KEY is set; this project is OAuth-only.");
}

interface Emitted { tool: string; input: unknown; }

async function runMode(mode: "headless" | "interactive"): Promise<Emitted[]> {
  const emitted: Emitted[] = [];
  const planner = new Planner({
    mode,
    emit: (tool, input) => { emitted.push({ tool, input }); },
  });

  const plan: Plan = [
    {
      id: "s1",
      kind: "task",
      content: "Fetch llms.txt",
      activeForm: "Fetching llms.txt",
      status: "pending",
    },
    {
      id: "s2",
      kind: "loop",
      content: "Watch for deploy completion",
      activeForm: "Watching for deploy completion",
      status: "pending",
      loop: { interval: "5m", prompt: "check if the deploy finished" },
    },
    {
      id: "s3",
      kind: "schedule",
      content: "Refresh docs daily",
      activeForm: "Refreshing docs daily",
      status: "pending",
      schedule: { description: "every weekday at 9am refresh four-lane docs" },
    },
    {
      id: "s4",
      kind: "verify",
      content: "Verifier sweep",
      activeForm: "Running verifier sweep",
      status: "pending",
    },
  ];

  await planner.setPlan(plan);
  await planner.setStatus("s1", "in_progress");
  await planner.setStatus("s1", "completed");
  await planner.dispatchLoop("s2");
  await planner.dispatchSchedule("s3");

  // invariant
  try {
    enforceSinglyInProgress(planner.getPlan());
  } catch (e) {
    fail(`invariant violated in ${mode}: ${(e as Error).message}`);
  }
  return emitted;
}

const headless = await runMode("headless");
const interactive = await runMode("interactive");

// Headless must use TodoWrite
if (!headless.some((e) => e.tool === "TodoWrite")) {
  fail("headless mode did not emit TodoWrite");
}
// Interactive must use TaskCreate / TaskUpdate
if (!interactive.some((e) => e.tool === "TaskCreate")) {
  fail("interactive mode did not emit TaskCreate");
}
if (!interactive.some((e) => e.tool === "TaskUpdate")) {
  fail("interactive mode did not emit TaskUpdate");
}
// Both modes must dispatch loop + schedule via SlashCommand
for (const [mode, list] of [["headless", headless], ["interactive", interactive]] as const) {
  const slashes = list.filter((e) => e.tool === "SlashCommand");
  const cmds = slashes.map((s) => (s.input as { command: string }).command);
  if (!cmds.some((c) => c.startsWith("/loop"))) fail(`${mode}: no /loop emitted`);
  if (!cmds.some((c) => c.startsWith("/schedule"))) fail(`${mode}: no /schedule emitted`);
}

console.log("[verify:planner] OK — headless TodoWrite, interactive Task*, /loop and /schedule first-class.");
