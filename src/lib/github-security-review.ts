/**
 * Engine behind the github-repo-security-review and
 * github-org-security-review skills.
 *
 * Two-pass design:
 *   1. scanDiffForSecretPatterns — fast regex-based scan for the
 *      well-known secret formats (AWS, GitHub, Anthropic, etc.).
 *      Same surface anthropics/claude-code-security-review's
 *      pattern matcher covers, minus the proprietary signatures
 *      we don't have access to.
 *   2. Claude pass — caller-provided callClaude() runs the diff
 *      through Claude Code (via CLAUDE_CODE_OAUTH_TOKEN, NOT
 *      ANTHROPIC_API_KEY) for semantic vuln review.
 *
 * Fanout to org level via reviewOrg.
 *
 * @cite vendor/osv-scanner/google.github.io/osv-scanner/usage/index.md
 * @cite vendor/agentskills/agentskills.io/specification.md
 */

export type SecretKind =
  | "aws-access-key"
  | "github-pat"
  | "github-app-token"
  | "anthropic-api-key"
  | "openai-api-key"
  | "stripe-live-key"
  | "generic-bearer";

export interface SecretFinding {
  kind: SecretKind;
  match: string;
  line: number;
}

export interface ScanOptions {
  ignoreCommentLines?: boolean;
  ignoreFixturePrefix?: string;
}

interface PatternRule {
  kind: SecretKind;
  re: RegExp;
}

// Carefully scoped patterns. Each one anchors on a prefix that is
// extremely unlikely to appear by accident (no broad alphanumeric
// matchers that would false-positive on test data).
const PATTERNS: PatternRule[] = [
  { kind: "aws-access-key", re: /\b(AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { kind: "github-pat", re: /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b/ },
  { kind: "github-app-token", re: /\bghs_[A-Za-z0-9]{36,}\b/ },
  { kind: "anthropic-api-key", re: /\bsk-ant-(api03|admin01)-[A-Za-z0-9_-]{20,}\b/ },
  { kind: "openai-api-key", re: /\bsk-(proj-)?[A-Za-z0-9_-]{40,}\b/ },
  { kind: "stripe-live-key", re: /\b(sk|rk)_live_[A-Za-z0-9]{20,}\b/ },
];

const COMMENT_LINE_RE = /^[+\s]*(?:\/\/|#|--|;|<!--)/;

export function scanDiffForSecretPatterns(
  diff: string,
  opts: ScanOptions = {},
): SecretFinding[] {
  const findings: SecretFinding[] = [];
  const lines = diff.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    // Only consider added lines.
    if (!line.startsWith("+")) continue;
    // Skip diff header lines like "+++ b/foo.ts".
    if (line.startsWith("+++")) continue;
    // Optional comment filter (without the leading "+").
    if (opts.ignoreCommentLines && COMMENT_LINE_RE.test(line)) continue;
    for (const rule of PATTERNS) {
      const m = line.match(rule.re);
      if (!m) continue;
      const match = m[0];
      if (opts.ignoreFixturePrefix && match.startsWith(opts.ignoreFixturePrefix))
        continue;
      findings.push({ kind: rule.kind, match, line: i + 1 });
    }
  }
  return findings;
}

export interface ReviewRepoInput {
  owner: string;
  repo: string;
  diff: string;
  callClaude: (context: { owner: string; repo: string; diff: string }) => Promise<string>;
  scanOptions?: ScanOptions;
}

export interface ReviewRepoResult {
  owner: string;
  repo: string;
  patternFindings: SecretFinding[];
  claudeNotes: string;
}

function assertOAuthOnlyPosture(): void {
  if (process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "github-security-review: ANTHROPIC_API_KEY must not be set " +
        "(OAuth-only posture; this engine uses CLAUDE_CODE_OAUTH_TOKEN only)",
    );
  }
}

export async function reviewRepo(input: ReviewRepoInput): Promise<ReviewRepoResult> {
  assertOAuthOnlyPosture();
  const patternFindings = scanDiffForSecretPatterns(input.diff, input.scanOptions);
  const claudeNotes = await input.callClaude({
    owner: input.owner,
    repo: input.repo,
    diff: input.diff,
  });
  return {
    owner: input.owner,
    repo: input.repo,
    patternFindings,
    claudeNotes,
  };
}

export interface ReviewOrgInput {
  org: string;
  repos: Array<{ name: string; diff: string }>;
  callClaude: (repo: string, diff: string) => Promise<string>;
  scanOptions?: ScanOptions;
}

export interface ReviewOrgResult {
  org: string;
  repos: ReviewRepoResult[];
  totalFindings: number;
}

export async function reviewOrg(input: ReviewOrgInput): Promise<ReviewOrgResult> {
  assertOAuthOnlyPosture();
  const repos: ReviewRepoResult[] = [];
  let totalFindings = 0;
  for (const r of input.repos) {
    const result = await reviewRepo({
      owner: input.org,
      repo: r.name,
      diff: r.diff,
      callClaude: (ctx) => input.callClaude(ctx.repo, ctx.diff),
      ...(input.scanOptions ? { scanOptions: input.scanOptions } : {}),
    });
    repos.push(result);
    totalFindings += result.patternFindings.length;
  }
  return { org: input.org, repos, totalFindings };
}
