/**
 * @cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
 * upstream: https://code.claude.com/docs/en/agent-view.md
 *           https://code.claude.com/docs/en/agent-teams.md
 *
 * Emit an OrchestratorView JSON snapshot for the SwiftUI agent-view surface.
 * Reads live data from the two sources agent-teams.md + agent-view.md document:
 *   - `claude agents --json`              → AgentSession rows
 *   - ~/.claude/teams/<team>/config.json  → TeamConfig.members
 *   - ~/.claude/tasks/<team>/             → TeamTask list
 * When those aren't present (no team running yet) it falls back to the Jira
 * SCRUM backlog so the app still has the planned tasks to visualize.
 *
 * Writes to apps/agent-orchestrator/view.json (the path the Swift app watches).
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  type AgentSession,
  type OrchestratorView,
  type TeamConfig,
  type TeamTask,
} from "./subagent-schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const OUT = resolve(REPO_ROOT, "apps/agent-orchestrator/view.json");
const TEAM_NAME = process.env.TEAM_NAME ?? "knowledge-engineering";

/**
 * Map the live `claude agents --json` status onto the documented agent-view.md
 * SessionState enum. The CLI emits some states (e.g. `busy`, `running`) not in
 * the doc table; normalize so the Swift decode never chokes on an unknown value.
 */
function normalizeState(raw: unknown): AgentSession["state"] {
  switch (String(raw)) {
    case "busy":
    case "running":
      return "working";
    case "blocked":
    case "waiting":
      return "needs_input";
    case "working":
    case "needs_input":
    case "idle":
    case "completed":
    case "failed":
    case "stopped":
      return String(raw) as AgentSession["state"];
    default:
      return "idle";
  }
}

function liveSessions(): AgentSession[] {
  try {
    const raw = execFileSync("claude", ["agents", "--json", "--cwd", REPO_ROOT], {
      encoding: "utf8",
      timeout: 15_000,
    });
    const rows = JSON.parse(raw) as Array<Record<string, unknown>>;
    return rows.map((r) => ({
      sessionId: String(r.sessionId ?? r.pid ?? ""),
      name: String(r.name ?? r.sessionId ?? "session"),
      state: normalizeState(r.status),
      shape: "alive",
      cwd: String(r.cwd ?? REPO_ROOT),
      kind: String(r.kind ?? "session"),
      startedAt: String(r.startedAt ?? new Date().toISOString()),
      pinned: false,
    }));
  } catch {
    return []; // claude agents unavailable (e.g. Bedrock/Vertex) — empty rows
  }
}

function teamConfig(): TeamConfig {
  const path = join(homedir(), ".claude", "teams", TEAM_NAME, "config.json");
  if (existsSync(path)) {
    const cfg = JSON.parse(readFileSync(path, "utf8")) as Partial<TeamConfig>;
    return {
      name: cfg.name ?? TEAM_NAME,
      members: cfg.members ?? [],
      teammateMode: cfg.teammateMode ?? "auto",
    };
  }
  return { name: TEAM_NAME, members: [], teammateMode: "auto" };
}

function teamTasks(): TeamTask[] {
  const dir = join(homedir(), ".claude", "tasks", TEAM_NAME);
  if (!existsSync(dir)) return jiraFallback();
  const tasks: TeamTask[] = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
    try {
      const t = JSON.parse(readFileSync(join(dir, f), "utf8")) as Partial<TeamTask>;
      if (t.id && t.subject) {
        tasks.push({
          id: t.id,
          subject: t.subject,
          state: t.state ?? "pending",
          dependsOn: t.dependsOn ?? [],
          ...(t.owner ? { owner: t.owner } : {}),
          ...(t.jiraKey ? { jiraKey: t.jiraKey } : {}),
        });
      }
    } catch {
      /* skip malformed task file */
    }
  }
  return tasks.length ? tasks : jiraFallback();
}

/** The rest-of-day SCRUM backlog, so the app shows planned work pre-team. */
function jiraFallback(): TeamTask[] {
  return [
    { id: "SCRUM-7", subject: "Wire pre-verify script-gate into steerKnowledgeLoop", state: "pending", dependsOn: [], jiraKey: "SCRUM-7" },
    { id: "SCRUM-8", subject: "Python steer.py + memory.py durable chassis (dragonfly + alloydb)", state: "pending", dependsOn: [], jiraKey: "SCRUM-8" },
    { id: "SCRUM-9", subject: "Resume SIFT mobile + macOS app build", state: "pending", dependsOn: ["SCRUM-7"], jiraKey: "SCRUM-9" },
    { id: "SCRUM-10", subject: "Plugins-per-lane: code-review as engineering verifier", state: "pending", dependsOn: ["SCRUM-7"], jiraKey: "SCRUM-10" },
  ];
}

export function buildView(): OrchestratorView {
  return {
    team: teamConfig(),
    tasks: teamTasks(),
    sessions: liveSessions(),
    workflows: [],
    generatedAt: new Date().toISOString(),
  };
}

function emitOnce(): void {
  const view = buildView();
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(view, null, 2) + "\n");
  process.stdout.write(
    `${new Date().toISOString()} wrote ${OUT} — ${view.tasks.length} tasks, ${view.sessions.length} sessions\n`,
  );
}

/**
 * --watch re-emits on an interval so the SwiftUI app stays live without the
 * user re-running the script. Interval (seconds) from --interval=<n>, default 5.
 * One durable process; Ctrl-C to stop.
 */
function main(): void {
  const args = process.argv.slice(2);
  emitOnce();
  if (!args.includes("--watch")) return;
  const flag = args.find((a) => a.startsWith("--interval="));
  const seconds = flag ? Math.max(2, Number(flag.split("=")[1]) || 5) : 5;
  process.stdout.write(`watching — re-emitting every ${seconds}s (Ctrl-C to stop)\n`);
  setInterval(emitOnce, seconds * 1000);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
