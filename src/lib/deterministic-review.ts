// deterministic-review.ts — non-LLM fallback review for the O-CICD1 kill switch.
//
// When CLAUDE_CICD_ENABLED is unset, the claude-review job skips and PRs get
// no review signal at all. This module is the deterministic substitute: pure
// functions over git-derived inputs (diff text, changed files, commit
// subjects), so the same PR state always produces the same findings.
//
// @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
// @cite seeds/citations/fable-5-pricing.md

export interface ReviewFinding {
  rule: string;
  detail: string;
}

// OAuth-only invariant (ADR OSEC1): the chassis fails closed on
// ANTHROPIC_API_KEY. Flag any ADDED diff line that assigns or wires the key,
// outside docs/vendor mirrors where it appears as prose.
export function findApiKeyIntroductions(diffText: string): ReviewFinding[] {
  const findings: ReviewFinding[] = [];
  let currentFile = "";
  for (const line of diffText.split("\n")) {
    const fileHeader = line.match(/^\+\+\+ b\/(.+)$/);
    if (fileHeader) {
      currentFile = fileHeader[1] ?? "";
      continue;
    }
    if (!line.startsWith("+") || line.startsWith("++")) continue;
    // Docs/mirrors mention the key as prose; test files use it as a fixture
    // (the env-sanitizer and this module's own tests assert rejection).
    if (/^(docs|vendor|seeds)\//.test(currentFile) || currentFile.endsWith(".md")) continue;
    if (/\.test\.[cm]?[jt]s$/.test(currentFile)) continue;
    // Match direct assignment (=) or YAML key-value (: followed by whitespace).
    // Excludes bash default-expansion ${VAR:-} where :- is not an assignment.
    if (/ANTHROPIC_API_KEY\s*=|ANTHROPIC_API_KEY\s*:\s/.test(line)) {
      findings.push({
        rule: "oauth-only (OSEC1)",
        detail: `${currentFile}: added line wires ANTHROPIC_API_KEY — the chassis is OAuth-only and fails closed on this key`,
      });
    }
  }
  return findings;
}

// Citation + TDD discipline on changed test files (mirrors citation-guard and
// verify:tdd, scoped to the diff so the finding lands at review time).
export function findTestHeaderGaps(
  changedTestFiles: { path: string; content: string }[],
): ReviewFinding[] {
  const findings: ReviewFinding[] = [];
  for (const { path, content } of changedTestFiles) {
    const header = content.slice(0, 2000);
    if (!/@cite\s+(vendor|seeds|rubrics)\//.test(header)) {
      findings.push({
        rule: "citation-discipline",
        detail: `${path}: missing @cite header pointing at vendor/, seeds/, or rubrics/`,
      });
    }
    if (!/@tdd\s+(red|green|refactor)\b/.test(header)) {
      findings.push({
        rule: "tdd-discipline",
        detail: `${path}: missing @tdd <red|green|refactor> tag`,
      });
    }
  }
  return findings;
}

// OPM3: CI-nudge commit subjects are banned — re-trigger CI with
// `gh run rerun`, never an empty commit. Same regex as conventions.test.ts.
export const BANNED_CI_NUDGE_RE =
  /\(OCIRETRIG\)|^(chore|ci)(\([^)]*\))?:\s*(nudge|drain|re-?trigger|serial drain|kick|poke|bump)\b.*\bci\b/i;

export function findBannedCommitSubjects(subjects: string[]): ReviewFinding[] {
  return subjects
    .filter((s) => BANNED_CI_NUDGE_RE.test(s))
    .map((s) => ({
      rule: "banned-ci-nudge (OPM3)",
      detail: `commit subject "${s}" is a CI-nudge commit — use \`gh run rerun\` instead`,
    }));
}

export function renderReviewSummary(findings: ReviewFinding[]): string {
  const lines = [
    "## Deterministic Review (fallback — Claude reviewer disabled via O-CICD1 kill switch)",
    "",
    "Set the repo/org Actions variable `CLAUDE_CICD_ENABLED=true` to re-enable the LLM reviewer.",
    "",
  ];
  if (findings.length === 0) {
    lines.push("✅ No findings: OAuth-only invariant, test-header discipline, and commit conventions all hold on this diff.");
  } else {
    lines.push(`❌ ${findings.length} finding(s):`, "");
    for (const f of findings) lines.push(`- **${f.rule}** — ${f.detail}`);
  }
  return lines.join("\n") + "\n";
}
