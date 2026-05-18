/**
 * @tdd green
 *
 * OIT2 — github-it-admin plugin conformance + claude-action-lint correctness
 *
 * @cite plugins/github-it-admin/CLAUDE.md
 * @cite plugins/github-it-admin/.claude-plugin/plugin.json
 * @cite plugins/github-it-admin/skills/claude-action-lint/scripts/lint.ts
 * @cite src/lib/claude-action-workflows.test.ts (OAUTO13 — sister test)
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { lint } from "../../plugins/github-it-admin/skills/claude-action-lint/scripts/lint.ts";

const PLUGIN = "plugins/github-it-admin";
const SKILLS = [
  "claude-oauth-rotate",
  "secret-promote",
  "secret-audit",
  "branch-protection-crud",
  "claude-action-lint",
];

// ─── manifest + structure ─────────────────────────────────────────────────

test("plugin.json lists all 5 skills + agent + hooks + monitors + mcpServers", () => {
  const m = JSON.parse(readFileSync(`${PLUGIN}/.claude-plugin/plugin.json`, "utf8"));
  assert.equal(m.name, "github-it-admin");
  for (const s of SKILLS) {
    assert.ok(m.skills.includes(`skills/${s}`), `manifest must list skills/${s}`);
  }
  assert.ok(Array.isArray(m.agents) && m.agents.length >= 1, "must declare at least 1 agent");
  assert.equal(m.hooks, "hooks/hooks.json");
  assert.equal(m.mcpServers, ".mcp.json");
  assert.ok(m.experimental?.monitors, "must declare experimental.monitors");
  assert.ok(m.userConfig?.gh_org, "must declare userConfig.gh_org");
  assert.ok(m.userConfig?.secret_max_age_days, "must declare userConfig.secret_max_age_days");
});

test("CLAUDE.md + README.md + .mcp.json present", () => {
  for (const p of ["CLAUDE.md", "README.md", ".mcp.json"]) {
    assert.ok(existsSync(`${PLUGIN}/${p}`), `${p} must exist`);
  }
});

test("hooks/hooks.json declares PreToolUse + SessionStart", () => {
  const h = JSON.parse(readFileSync(`${PLUGIN}/hooks/hooks.json`, "utf8"));
  assert.ok(h.hooks.PreToolUse, "PreToolUse hook required");
  assert.ok(h.hooks.SessionStart, "SessionStart hook required");
  assert.match(h.hooks.PreToolUse[0].matcher, /Write|Edit/);
});

test("monitors/monitors.json declares secret-age-watch", () => {
  const m = JSON.parse(readFileSync(`${PLUGIN}/monitors/monitors.json`, "utf8"));
  assert.ok(Array.isArray(m) && m.length >= 1);
  const watch = m.find((x: { name: string }) => x.name === "secret-age-watch");
  assert.ok(watch, "secret-age-watch monitor required");
  assert.match(watch.command, /\$\{user_config\.gh_org\}/);
  assert.match(watch.command, /\$\{user_config\.secret_max_age_days\}/);
});

test("agent frontmatter conforms to plugin spec (no hooks/mcpServers/permissionMode)", () => {
  const body = readFileSync(`${PLUGIN}/agents/claude-action-workflow-reviewer.md`, "utf8");
  assert.match(body, /^---\nname:\s*claude-action-workflow-reviewer\n/, "frontmatter present");
  assert.match(body, /\bmodel:\s*sonnet\b/);
  assert.match(body, /\bdisallowedTools:.*Write/);
  // Plugin agents cannot ship these per spec — must be absent
  for (const forbidden of ["hooks:", "mcpServers:", "permissionMode:"]) {
    assert.equal(body.match(new RegExp(`^${forbidden}`, "m")), null,
      `agent frontmatter cannot ship ${forbidden} (plugin spec security restriction)`);
  }
});

// ─── per-skill structural checks ──────────────────────────────────────────

for (const s of SKILLS) {
  test(`${s}: SKILL.md frontmatter present`, () => {
    const body = readFileSync(`${PLUGIN}/skills/${s}/SKILL.md`, "utf8");
    assert.match(body, /^---\nname: /);
    assert.match(body, /^description: /m);
  });
}

// ─── shell scripts: no-leak + pbpaste + length-check ──────────────────────

test("rotate.sh reads from pbpaste, asserts MIN_LEN, never read -p", () => {
  const body = readFileSync(`${PLUGIN}/skills/claude-oauth-rotate/scripts/rotate.sh`, "utf8");
  assert.match(body, /pbpaste/);
  assert.match(body, /MIN_LEN/);
  assert.equal(body.match(/read\s+-r?p\s/), null, "no read -p (echoes to scrollback)");
  assert.match(body, /pbcopy/, "must wipe clipboard");
});

test("promote.sh uses pbpaste, includes read-after-write verify", () => {
  const body = readFileSync(`${PLUGIN}/skills/secret-promote/scripts/promote.sh`, "utf8");
  assert.match(body, /pbpaste/);
  assert.match(body, /gh secret list --org/, "must verify post-write");
});

test("audit.sh wraps OSEC1 verifier + computes age threshold", () => {
  const body = readFileSync(`${PLUGIN}/skills/secret-audit/scripts/audit.sh`, "utf8");
  assert.match(body, /npm run verify:secrets/);
  assert.match(body, /SECRET_MAX_AGE_DAYS/);
});

// ─── claude-action-lint correctness ───────────────────────────────────────

const FIXTURE_BAD = `
name: bad
on:
  pull_request_target:
    types: [opened]
jobs:
  bad:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: anthropics/claude-code-action@main
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          allowed_bots: '*'
          prompt: '/code-review:code-review owner/repo/pull/1 --comment'
`;

const FIXTURE_GOOD_REVIEWER = `
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  claude-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: \${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          plugin_marketplaces: 'https://github.com/anthropics/claude-code.git'
          plugins: 'code-review@claude-code-plugins'
          prompt: '/code-review:code-review owner/repo/pull/1'
`;

const FIXTURE_GOOD_INTERACTIVE = `
name: Claude Code
on:
  issue_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: \${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
`;

const FIXTURE_UNRELATED = `
name: Unrelated
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo hello
`;

test("lint: bad fixture surfaces ALL expected ERROR-class findings", () => {
  const findings = lint("test.yml", FIXTURE_BAD);
  const errorRules = findings.filter((f) => f.severity === "ERROR").map((f) => f.rule);
  for (const rule of [
    "no-anthropic-api-key",
    "no-wildcard-bots",
    "pin-v1",
    "no-pull-request-target-with-write",
  ]) {
    assert.ok(errorRules.includes(rule), `must detect ${rule}; got ${errorRules}`);
  }
});

test("lint: bad fixture surfaces --comment WARNING", () => {
  const findings = lint("test.yml", FIXTURE_BAD);
  const warns = findings.filter((f) => f.rule === "no-comment-flag-on-code-review");
  assert.ok(warns.length >= 1, "must flag spurious --comment");
});

test("lint: good reviewer shape has no ERRORs", () => {
  const findings = lint("review.yml", FIXTURE_GOOD_REVIEWER);
  const errors = findings.filter((f) => f.severity === "ERROR");
  assert.equal(errors.length, 0, `expected 0 ERRORs, got: ${JSON.stringify(errors)}`);
});

test("lint: good interactive shape has no ERRORs", () => {
  const findings = lint("claude.yml", FIXTURE_GOOD_INTERACTIVE);
  const errors = findings.filter((f) => f.severity === "ERROR");
  assert.equal(errors.length, 0, `expected 0 ERRORs, got: ${JSON.stringify(errors)}`);
});

test("lint: skips files that don't use claude-code-action", () => {
  const findings = lint("unrelated.yml", FIXTURE_UNRELATED);
  assert.equal(findings.length, 0, "non-action workflows should produce no findings");
});

test("lint: reviewer-shape with contents:write triggers WARNING", () => {
  const broken = FIXTURE_GOOD_REVIEWER.replace("contents: read", "contents: write");
  const findings = lint("review.yml", broken);
  assert.ok(
    findings.some((f) => f.rule === "reviewer-no-contents-write"),
    "must warn when reviewer-shape has contents:write",
  );
});

test("lint: interactive-shape with contents:read triggers WARNING", () => {
  const broken = FIXTURE_GOOD_INTERACTIVE.replace("contents: write", "contents: read");
  const findings = lint("claude.yml", broken);
  assert.ok(
    findings.some((f) => f.rule === "interactive-needs-contents-write"),
    "must warn when interactive-shape has contents:read",
  );
});

// ─── live workflow lint (only run if OAUTO13 PR has merged) ──────────────

test("live: claude-code-review.yml lints clean (skip if OAUTO13 not merged yet)", (t) => {
  const path = ".github/workflows/claude-code-review.yml";
  const body = readFileSync(path, "utf8");
  // If still on pre-OAUTO13 shape (no use_sticky_comment), skip — that's main, not the refactor.
  if (!body.includes("use_sticky_comment")) {
    t.skip("OAUTO13 not yet on this branch's view of main");
    return;
  }
  const findings = lint(path, body);
  const errors = findings.filter((f) => f.severity === "ERROR");
  assert.equal(errors.length, 0, `live review workflow has ERRORs: ${JSON.stringify(errors)}`);
});
