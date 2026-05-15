// scripts/setup-branch-protection.ts
//
// PR 4 autonomy-i. Operator-run script that creates the Repository
// Ruleset on main per docs/governance.md.
//
// Why operator-run: the Claude Code agent harness's GitHub MCP tools
// do not expose Repository Ruleset creation. We need REST against the
// rulesets API, which requires GITHUB_TOKEN with `repo` + `admin:repo`
// scopes (or fine-grained PAT with Administration: write).
//
// Idempotent: existing rulesets with the same name are updated.
//
// Required env:
//   GITHUB_TOKEN — fine-grained PAT with Administration: write on
//                  subagentceo/knowledge-engineering
//
// Optional env:
//   GH_OWNER       (default: subagentceo)
//   GH_REPO        (default: knowledge-engineering)
//   RULESET_NAME   (default: "Protect main — no HITL")

const GH_OWNER = process.env.GH_OWNER ?? "subagentceo";
const GH_REPO = process.env.GH_REPO ?? "knowledge-engineering";
const RULESET_NAME = process.env.RULESET_NAME ?? "Protect main — no HITL";
const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_API = "https://api.github.com";

interface Ruleset {
  id: number;
  name: string;
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

function rulesetBody() {
  // Required status check contexts.
  //
  // IMPORTANT: GitHub records the **job name** as the check context,
  // not the workflow name. Get these strings from
  //   gh pr view <N> --json statusCheckRollup --jq '.statusCheckRollup[].name'
  // on a real PR. Setting the workflow name (e.g. "verify") makes the
  // ruleset block every PR because no check ever resolves it.
  //
  // Optional CI workflows (neon-branch, cloudflare-preview, copilot)
  // are NOT required so the repo can land changes whether or not those
  // secrets are provisioned.
  const requiredChecks = [
    "npm run verify",            // job in .github/workflows/verify.yml
    "OSV-Scanner (PR) / osv-scan", // job in .github/workflows/osv-scanner.yml
  ];
  return {
    name: RULESET_NAME,
    target: "branch",
    enforcement: "active",
    conditions: {
      ref_name: { include: ["refs/heads/main"], exclude: [] },
    },
    bypass_actors: [],
    rules: [
      { type: "deletion" },
      { type: "non_fast_forward" },
      {
        type: "pull_request",
        parameters: {
          required_approving_review_count: 0,
          dismiss_stale_reviews_on_push: true,
          require_code_owner_review: false,
          require_last_push_approval: false,
          required_review_thread_resolution: false,
          // Removed `automatic_copilot_code_review_enabled` 2026-05-15:
          // GitHub Rulesets API responds 422 "Unexpected parameter" for
          // this key on POST /repos/{owner}/{repo}/rulesets. It is a UI
          // affordance, not part of the documented rule schema. See
          // https://docs.github.com/rest/repos/rules#create-a-repository-ruleset.
        },
      },
      {
        type: "required_status_checks",
        parameters: {
          strict_required_status_checks_policy: true,
          do_not_enforce_on_create: false,
          required_status_checks: requiredChecks.map((context) => ({
            context,
            integration_id: undefined as unknown as number,
          })),
        },
      },
    ],
  };
}

async function findExistingRuleset(): Promise<Ruleset | undefined> {
  const list = await ghREST<Ruleset[]>(
    "GET",
    `/repos/${GH_OWNER}/${GH_REPO}/rulesets`
  );
  return list.find((r) => r.name === RULESET_NAME);
}

async function run(): Promise<void> {
  if (!GH_TOKEN) {
    console.error("GITHUB_TOKEN required. Fine-grained PAT with:");
    console.error("  Administration: write on subagentceo/knowledge-engineering");
    console.error("");
    console.error("Then run: GITHUB_TOKEN=<pat> npm run setup:branch-protection");
    process.exit(1);
  }

  const existing = await findExistingRuleset();
  const body = rulesetBody();

  if (existing) {
    console.log(`updating existing ruleset #${existing.id} ("${RULESET_NAME}")`);
    await ghREST(
      "PUT",
      `/repos/${GH_OWNER}/${GH_REPO}/rulesets/${existing.id}`,
      body
    );
  } else {
    console.log(`creating new ruleset "${RULESET_NAME}"`);
    await ghREST("POST", `/repos/${GH_OWNER}/${GH_REPO}/rulesets`, body);
  }

  console.log("\nbranch-protection: complete");
  console.log("Verify in the GitHub UI: Settings → Rules → Rulesets.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
