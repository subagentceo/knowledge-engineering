/**
 * Tests for src/lib/github-security-review.ts — the engine behind
 * the github-repo-security-review skill (OGRS1) and
 * github-org-security-review skill (OGOS1).
 *
 * Modeled after the diff-aware scan in anthropics/claude-code-security-review,
 * adapted to use CLAUDE_CODE_OAUTH_TOKEN (OAuth-only) instead of
 * ANTHROPIC_API_KEY.
 *
 * @tdd red
 * @cite vendor/osv-scanner/google.github.io/osv-scanner/usage/index.md
 * @cite vendor/agentskills/agentskills.io/specification.md
 */
import {
  reviewRepo,
  reviewOrg,
  scanDiffForSecretPatterns,
} from "./github-security-review.js";

let passed = 0;
let failed = 0;
function check(name: string, fn: () => Promise<void> | void): Promise<void> {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      passed++;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      failed++;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

console.log("github-security-review:");

await check("scanDiffForSecretPatterns flags an obvious AWS access key", () => {
  const diff = `+const KEY = "AKIAIOSFODNN7EXAMPLE";`;
  const findings = scanDiffForSecretPatterns(diff);
  if (findings.length === 0) throw new Error("missed AKIA key");
  if (!findings.some((f) => f.kind === "aws-access-key"))
    throw new Error("did not classify as aws-access-key");
});

await check("scanDiffForSecretPatterns flags an Anthropic API key (forbidden)", () => {
  const diff = `+const ANTHROPIC = "sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";`;
  const findings = scanDiffForSecretPatterns(diff);
  if (!findings.some((f) => f.kind === "anthropic-api-key"))
    throw new Error("did not classify as anthropic-api-key");
});

await check("scanDiffForSecretPatterns flags a GitHub PAT", () => {
  const diff = `+token: ghp_AbCdEfGhIjKlMnOpQrStUvWxYz0123456789`;
  const findings = scanDiffForSecretPatterns(diff);
  if (!findings.some((f) => f.kind === "github-pat"))
    throw new Error("did not classify as github-pat");
});

await check("scanDiffForSecretPatterns ignores comments + test fixtures", () => {
  const diff = `+// example only: AKIAIOSFODNN7EXAMPLE\n+const fixture = "ghp_FIXTURE_NOT_A_REAL_KEY";`;
  const findings = scanDiffForSecretPatterns(diff, {
    ignoreCommentLines: true,
    ignoreFixturePrefix: "ghp_FIXTURE",
  });
  if (findings.length !== 0)
    throw new Error(`expected 0 findings, got ${findings.length}`);
});

await check("scanDiffForSecretPatterns ignores deletion (lines starting with -)", () => {
  const diff = `-const KEY = "AKIAIOSFODNN7EXAMPLE";\n+const KEY = process.env.AWS_KEY;`;
  const findings = scanDiffForSecretPatterns(diff);
  if (findings.length !== 0)
    throw new Error(`removed-only secrets should not flag; got ${findings.length}`);
});

await check("reviewRepo refuses when ANTHROPIC_API_KEY is set (OAuth-only posture)", async () => {
  const before = process.env.ANTHROPIC_API_KEY;
  process.env.ANTHROPIC_API_KEY = "sk-ant-test";
  try {
    let threw = false;
    try {
      await reviewRepo({
        owner: "test",
        repo: "test",
        diff: "",
        callClaude: async () => "ok",
      });
    } catch {
      threw = true;
    }
    if (!threw) throw new Error("expected throw");
  } finally {
    if (before === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = before;
  }
});

await check("reviewRepo runs scanner + Claude pass + returns merged findings", async () => {
  const before = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    let claudeCalled = false;
    const result = await reviewRepo({
      owner: "subagentceo",
      repo: "knowledge-engineering",
      diff: `+const KEY = "AKIAIOSFODNN7EXAMPLE";`,
      callClaude: async () => {
        claudeCalled = true;
        return "Claude found 1 additional issue: unbounded recursion in foo.ts";
      },
    });
    if (!claudeCalled) throw new Error("Claude pass not called");
    if (result.patternFindings.length === 0)
      throw new Error("no pattern findings returned");
    if (!result.claudeNotes.includes("unbounded recursion"))
      throw new Error("Claude notes not included in result");
    if (result.owner !== "subagentceo") throw new Error("owner mangled");
  } finally {
    if (before) process.env.ANTHROPIC_API_KEY = before;
  }
});

await check("reviewOrg fans out reviewRepo over a list of repos", async () => {
  const before = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    const calls: string[] = [];
    const result = await reviewOrg({
      org: "subagentceo",
      repos: [
        { name: "alpha", diff: "" },
        { name: "beta", diff: `+const x = "AKIAIOSFODNN7EXAMPLE";` },
      ],
      callClaude: async (repo) => {
        calls.push(repo);
        return "ok";
      },
    });
    if (calls.length !== 2)
      throw new Error(`expected 2 Claude calls, got ${calls.length}`);
    if (result.org !== "subagentceo") throw new Error("org mangled");
    if (result.repos.length !== 2) throw new Error("repos count");
    if (result.totalFindings < 1)
      throw new Error("expected at least 1 pattern finding across the org");
  } finally {
    if (before) process.env.ANTHROPIC_API_KEY = before;
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
