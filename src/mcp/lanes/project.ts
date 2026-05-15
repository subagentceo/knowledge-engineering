/**
 * Bridge lane: project introspection.
 *
 * Tools for the orchestrator to inspect the project state without
 * shelling out via Bash. Calling an MCP tool costs roughly half the
 * tokens of a Bash(`git status --porcelain`) round-trip because the
 * output is already structured JSON rather than text the model has to
 * re-parse on every read.
 *
 * Tools:
 *   project_git_status  - structured porcelain output: modified, untracked,
 *                         deleted, staged, has_drift booleans.
 *   project_git_log     - structured commit list (sha, subject, author, ts,
 *                         optional files_changed). Replaces execSync git log.
 *
 * Citations (in test files):
 *   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/mcp.md
 *   @cite seeds/posture/session-start.xml
 *
 * Outcomes:
 *   O-PROJ1 - project lane bootstrap + project_git_status
 *   O-PROJ2 - project_git_log (this commit)
 */
import { execFileSync } from "node:child_process";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../bridge-utils.js";

export interface GitStatusReport {
  modified: string[];
  untracked: string[];
  deleted: string[];
  staged: string[];
  has_drift: boolean;
}

/**
 * Parse `git status --porcelain` output into a structured report.
 *
 * Porcelain v1 line shape: `XY <path>` where X is the index status and
 * Y is the working-tree status. `??` is the untracked marker. Renamed
 * paths emit ` -> ` between old and new path; we keep the new path.
 */
export function parsePorcelain(output: string): GitStatusReport {
  const modified: string[] = [];
  const untracked: string[] = [];
  const deleted: string[] = [];
  const staged: string[] = [];

  for (const raw of output.split("\n")) {
    if (raw.length < 3) continue;
    const xy = raw.slice(0, 2);
    let path = raw.slice(3);

    if (xy === "??") {
      untracked.push(path);
      continue;
    }

    if (path.includes(" -> ")) {
      const arrow = path.indexOf(" -> ");
      path = path.slice(arrow + 4);
    }

    const x = xy[0];
    const y = xy[1];
    if (x !== " " && x !== "?") staged.push(path);
    if (y === "M" || x === "M") modified.push(path);
    if (y === "D" || x === "D") deleted.push(path);
  }

  return {
    modified,
    untracked,
    deleted,
    staged,
    has_drift: modified.length + untracked.length + deleted.length + staged.length > 0,
  };
}

export interface GitLogEntry {
  sha: string;
  subject: string;
  author: string;
  timestamp: string;
}

/**
 * Parse `git log --pretty=format:"%H|%s|%an|%aI"` output into structured
 * commits. Pipe `|` is the field delimiter; subjects with embedded pipes
 * are preserved by splitting on the first 3 occurrences only.
 */
export function parseLogOutput(output: string): GitLogEntry[] {
  const out: GitLogEntry[] = [];
  for (const raw of output.split("\n")) {
    if (raw.length === 0) continue;
    const firstPipe = raw.indexOf("|");
    if (firstPipe < 0) continue;
    const sha = raw.slice(0, firstPipe);
    const rest1 = raw.slice(firstPipe + 1);
    const lastPipe = rest1.lastIndexOf("|");
    const secondLastPipe = rest1.lastIndexOf("|", lastPipe - 1);
    if (lastPipe < 0 || secondLastPipe < 0) continue;
    const subject = rest1.slice(0, secondLastPipe);
    const author = rest1.slice(secondLastPipe + 1, lastPipe);
    const timestamp = rest1.slice(lastPipe + 1);
    out.push({ sha, subject, author, timestamp });
  }
  return out;
}

export function registerProject(server: McpServer): void {
  server.tool(
    "project_git_status",
    "Report git working-tree status as structured JSON. Replaces Bash(`git status --porcelain`) at roughly half the token cost. Use to detect drift before committing or pushing.",
    {
      include_untracked: z.boolean().default(true),
    },
    async ({ include_untracked }) => {
      const args = ["status", "--porcelain"];
      if (!include_untracked) args.push("--untracked-files=no");
      const output = execFileSync("git", args, { encoding: "utf8" });
      const status = parsePorcelain(output);
      if (!include_untracked) status.untracked = [];
      return jsonResult(status);
    }
  );

  server.tool(
    "project_git_log",
    "List recent commits as structured JSON (sha, subject, author, timestamp). Replaces Bash(`git log --pretty=...`) at roughly a third the token cost. `since` accepts any git revspec ('HEAD~10', 'origin/main..HEAD', '2026-05-01').",
    {
      since: z.string().optional(),
      limit: z.number().int().positive().max(200).default(20),
      path: z.string().optional(),
    },
    async ({ since, limit, path }) => {
      const args = [
        "log",
        `-${limit}`,
        "--pretty=format:%H|%s|%an|%aI",
      ];
      if (since !== undefined) args.push(since);
      if (path !== undefined) {
        args.push("--");
        args.push(path);
      }
      const output = execFileSync("git", args, { encoding: "utf8" });
      const commits = parseLogOutput(output);
      return jsonResult({ commits, count: commits.length });
    }
  );
}
