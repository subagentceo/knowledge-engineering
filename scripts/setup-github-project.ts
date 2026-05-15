// scripts/setup-github-project.ts
//
// PR 4. Operator-run setup script that creates the GitHub Project v2 plus
// milestones for phases 1-12 and (if issues exist with phase:N labels)
// migrates those issues onto the matching milestone.
//
// Why this is operator-run, not agent-run, in PR 4:
//   The Claude Code agent harness in this session has the GitHub MCP
//   tools (mcp__github__*), but those tools do NOT expose milestone
//   creation or GitHub Projects v2. We need GraphQL + REST against the
//   GitHub API directly, which requires a GITHUB_TOKEN in env.
//
//   PR 4 ships this script as the operator-side bridge: the operator
//   runs `GITHUB_TOKEN=... npm run setup:project` once. After that, the
//   agent picks up via issue_write and pull_request_* tools as normal.
//
// Idempotent — re-running detects existing milestones / project / issue
// links and is a no-op.
//
// Required env:
//   GITHUB_TOKEN  — token with repo scope on subagentceo/knowledge-engineering.
//                   Projects V2 ops require `project` (or `read:project` +
//                   write) scope ALSO. When the token has `repo` but not
//                   `project`, the script degrades to milestones-only and
//                   exits 0 — Project V2 setup becomes a separate follow-up.
//                   Cited: https://docs.github.com/en/rest/issues/milestones
//                   (REST, `repo` scope) and
//                   https://docs.github.com/en/graphql/reference/mutations#createprojectv2
//                   (GraphQL, `project` scope).
//
// Optional env:
//   GH_OWNER       (default: subagentceo)
//   GH_REPO        (default: knowledge-engineering)
//   GH_PROJECT     (default: "Knowledge Engineering")
//   SKIP_PROJECT_V2  set to "1" to force milestones-only mode even if
//                    the token has `project` scope (useful for separating
//                    project creation into its own audit step).

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const RUBRICS_DIR = resolve(REPO_ROOT, "rubrics");

const GH_OWNER = process.env.GH_OWNER ?? "subagentceo";
const GH_REPO = process.env.GH_REPO ?? "knowledge-engineering";
const GH_PROJECT = process.env.GH_PROJECT ?? "Knowledge Engineering";
const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_API = "https://api.github.com";

interface PhaseSpec {
  phase: number;
  title: string;
  body: string;
}

function loadRubrics(): PhaseSpec[] {
  const out: PhaseSpec[] = [];
  for (let phase = 1; phase <= 12; phase += 1) {
    const path = resolve(RUBRICS_DIR, `phase-${phase}.md`);
    if (!existsSync(path)) continue;
    const body = readFileSync(path, "utf8");
    const titleMatch = body.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `Phase ${phase}`;
    out.push({ phase, title, body });
  }
  return out;
}

async function ghREST<T>(method: string, path: string, body?: unknown): Promise<T> {
  if (!GH_TOKEN) throw new Error("GITHUB_TOKEN required");
  const r = await fetch(`${GH_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`${method} ${path} → ${r.status}: ${text}`);
  }
  return r.status === 204 ? (undefined as T) : ((await r.json()) as T);
}

async function ghGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!GH_TOKEN) throw new Error("GITHUB_TOKEN required");
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await r.json()) as { data?: T; errors?: unknown[] };
  if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
  return json.data as T;
}

interface Milestone {
  number: number;
  title: string;
  state: "open" | "closed";
}

async function ensureMilestone(spec: PhaseSpec): Promise<Milestone> {
  const existing = await ghREST<Milestone[]>("GET", `/repos/${GH_OWNER}/${GH_REPO}/milestones?state=open&per_page=100`);
  const found = existing.find((m) => m.title === spec.title);
  if (found) return found;
  return ghREST<Milestone>("POST", `/repos/${GH_OWNER}/${GH_REPO}/milestones`, {
    title: spec.title,
    description: `Phase ${spec.phase} of the larger plan. Rubric: rubrics/phase-${spec.phase}.md`,
    state: "open",
  });
}

async function linkIssuesToMilestone(label: string, milestoneNumber: number): Promise<number> {
  const issues = await ghREST<{ number: number; milestone: { number: number } | null }[]>(
    "GET",
    `/repos/${GH_OWNER}/${GH_REPO}/issues?labels=${encodeURIComponent(label)}&state=open&per_page=100`
  );
  let updated = 0;
  for (const issue of issues) {
    if (issue.milestone?.number === milestoneNumber) continue;
    await ghREST("PATCH", `/repos/${GH_OWNER}/${GH_REPO}/issues/${issue.number}`, {
      milestone: milestoneNumber,
    });
    updated += 1;
  }
  return updated;
}

interface ProjectId {
  id: string;
}

async function ensureProject(): Promise<string> {
  const data = await ghGraphQL<{
    repository: { projectsV2: { nodes: { id: string; title: string }[] } };
  }>(
    `query($owner:String!,$repo:String!){
      repository(owner:$owner,name:$repo){
        projectsV2(first:20){ nodes{ id title } }
      }
    }`,
    { owner: GH_OWNER, repo: GH_REPO }
  );
  const found = data.repository.projectsV2.nodes.find((p) => p.title === GH_PROJECT);
  if (found) return found.id;
  // Create at the org level. Owner field for projectsV2 is the org's node ID.
  const ownerNode = await ghGraphQL<{ organization: { id: string } }>(
    `query($login:String!){ organization(login:$login){ id } }`,
    { login: GH_OWNER }
  );
  const created = await ghGraphQL<{ createProjectV2: { projectV2: ProjectId } }>(
    `mutation($ownerId:ID!,$title:String!){
      createProjectV2(input:{ownerId:$ownerId,title:$title}){ projectV2{ id } }
    }`,
    { ownerId: ownerNode.organization.id, title: GH_PROJECT }
  );
  return created.createProjectV2.projectV2.id;
}

async function linkIssueToProject(projectId: string, issueNodeId: string): Promise<void> {
  await ghGraphQL(
    `mutation($projectId:ID!,$contentId:ID!){
      addProjectV2ItemById(input:{projectId:$projectId,contentId:$contentId}){ item{ id } }
    }`,
    { projectId, contentId: issueNodeId }
  );
}

/**
 * Probe whether the configured GITHUB_TOKEN has Projects V2 (`project`) scope.
 * Returns true if a benign GraphQL projectV2 query succeeds, false if the
 * server rejects it with a scope error. Other errors propagate.
 *
 * NOTE: `viewer.projectsV2` does NOT require `read:project` and returns
 * data even without it. The probe must use the field the script will
 * actually call (`repository.projectsV2`), which DOES require the scope.
 * Verified empirically 2026-05-15 against admin-jadecli's token (which
 * has admin:enterprise + admin:org but not read:project).
 */
async function tokenHasProjectScope(): Promise<boolean> {
  try {
    await ghGraphQL<{ repository: { projectsV2: { nodes: unknown[] } } }>(
      `query($owner:String!,$repo:String!){
        repository(owner:$owner,name:$repo){ projectsV2(first:1){ nodes{ id } } }
      }`,
      { owner: GH_OWNER, repo: GH_REPO }
    );
    return true;
  } catch (err) {
    const msg = (err as Error).message;
    if (/scope|insufficient|forbidden|read:project|`project`/i.test(msg)) {
      return false;
    }
    throw err;
  }
}

async function run(): Promise<void> {
  if (!GH_TOKEN) {
    console.error("GITHUB_TOKEN required. Provision a token with:");
    console.error("  Repository scope: repo (read/write issues, milestones)");
    console.error("  Optional: project (or read:project + write) for Projects V2 setup");
    console.error("");
    console.error("Then run: GITHUB_TOKEN=<token> npm run setup:project");
    console.error("");
    console.error("Skip Projects V2 explicitly: SKIP_PROJECT_V2=1 GITHUB_TOKEN=<token> npm run setup:project");
    process.exit(1);
  }

  const specs = loadRubrics();
  console.log(`loaded ${specs.length} rubrics from rubrics/phase-{1..12}.md`);

  const skipRequested = process.env.SKIP_PROJECT_V2 === "1";
  const projectScopeAvailable = !skipRequested && (await tokenHasProjectScope());
  let projectId: string | null = null;

  if (projectScopeAvailable) {
    projectId = await ensureProject();
    console.log(`project ready: ${GH_PROJECT} (${projectId})`);
  } else if (skipRequested) {
    console.log("Projects V2 skipped via SKIP_PROJECT_V2=1 (milestones only).");
  } else {
    console.log(
      "Projects V2 skipped: GITHUB_TOKEN lacks `project` scope. " +
        "Milestones will be created via REST `repo` scope. " +
        "To add Projects V2 later: `gh auth refresh -s project,read:project` " +
        "and re-run `npm run setup:project`."
    );
  }

  for (const spec of specs) {
    const ms = await ensureMilestone(spec);
    const label = `phase:${spec.phase}`;
    const linked = await linkIssuesToMilestone(label, ms.number);
    console.log(
      `  phase ${spec.phase.toString().padStart(2)} | milestone #${ms.number
        .toString()
        .padStart(3)} "${ms.title}" | linked ${linked} issue(s)`
    );

    if (projectId !== null) {
      // Link those issues to the project too.
      const issues = await ghREST<{ node_id: string }[]>(
        "GET",
        `/repos/${GH_OWNER}/${GH_REPO}/issues?labels=${encodeURIComponent(label)}&state=open&per_page=100`
      );
      for (const i of issues) {
        try {
          await linkIssueToProject(projectId, i.node_id);
        } catch (err) {
          // Already on the project — addProjectV2ItemById is idempotent on the
          // server side via PROJECT_ITEM_ALREADY_EXISTS, but other GraphQL
          // errors should surface.
          const msg = (err as Error).message;
          if (!msg.includes("PROJECT_ITEM_ALREADY_EXISTS")) throw err;
        }
      }
    }
  }

  console.log(
    projectId !== null
      ? "\nsetup-github-project: complete (milestones + project)"
      : "\nsetup-github-project: complete (milestones only; Project V2 pending scope)"
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
