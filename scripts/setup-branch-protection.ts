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
  // 2026-05-15: extended from {verify, osv-scanner} → 5 checks per the /batch
  // unit 10 directive ("only automerge if all ci/cd is green"). All CI workflows
  // now gate the merge; if any required workflow's secrets are not provisioned
  // (e.g., CLOUDFLARE_API_TOKEN missing → cloudflare-preview can't run),
  // automerge will WAIT rather than land a PR with unknown CI state.
  //
  // The pr-babysitter routine (.claude/skills/routines/pr-babysitter/) detects
  // this state and surfaces the remediation runbook (docs/operator-runbooks/ci-cd-unblock.md
  // for missing CF secrets; rotate:neon for stale Neon; rotate:claude-oauth
  // for stale OAuth) to the operator.
  //
  // Citations:
  //   - vendor/anthropics/code.claude.com/docs/en/whats-new.md Week 15 (/loop, /autofix-pr)
  //   - vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
  //     (Auto-fix PR engine handles review-comment remediation per check)
  //   - docs/operator-runbooks/cloud-env-vars-contract.md (canonical env-var inventory)
  const requiredChecks = [
    "verify",
    "osv-scanner",
    // Cloudflare Worker preview deploy (gates on CLOUDFLARE_API_TOKEN +
    // CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_WORKER_NAME being set)
    "cloudflare-preview",
    // Neon per-PR branch creation (gates on NEON_API_KEY + NEON_PROJECT_ID)
    "neon-branch",
    // GitHub Copilot review (CodeQL & advanced security review)
    "copilot",
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
          automatic_copilot_code_review_enabled: false,
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
