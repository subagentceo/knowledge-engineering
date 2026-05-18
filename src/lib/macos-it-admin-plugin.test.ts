/**
 * @tdd green
 *
 * OIT1 — macos-it-admin plugin conformance
 *   - plugin manifest valid + lists all 5 skills
 *   - every SKILL.md has frontmatter + CRUD verbs section
 *   - every script (4 TS + 1 shell) follows no-leak rules
 *
 * @cite plugins/macos-it-admin/CLAUDE.md
 * @cite plugins/macos-it-admin/.claude-plugin/plugin.json
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const PLUGIN_DIR = "plugins/macos-it-admin";
const SKILLS = [
  "cloudflare-crud",
  "turbopuffer-crud",
  "neon-crud",
  "parallel-ai-crud",
  "nimbleway-crud",
];

test("plugin.json exists and lists all 5 skills", () => {
  const manifest = JSON.parse(
    readFileSync(`${PLUGIN_DIR}/.claude-plugin/plugin.json`, "utf8"),
  );
  assert.equal(manifest.name, "macos-it-admin");
  assert.ok(Array.isArray(manifest.skills));
  for (const skill of SKILLS) {
    assert.ok(
      manifest.skills.includes(`skills/${skill}`),
      `manifest must list skills/${skill}`,
    );
  }
});

test(".mcp.json documents expected connectors", () => {
  const mcp = JSON.parse(readFileSync(`${PLUGIN_DIR}/.mcp.json`, "utf8"));
  assert.ok(mcp.expected_connectors);
  assert.ok(mcp.no_connector_available?.turbopuffer);
});

test("CLAUDE.md and README.md exist", () => {
  assert.ok(existsSync(`${PLUGIN_DIR}/CLAUDE.md`));
  assert.ok(existsSync(`${PLUGIN_DIR}/README.md`));
});

for (const skill of SKILLS) {
  test(`${skill}: SKILL.md has frontmatter + CRUD content`, () => {
    const path = `${PLUGIN_DIR}/skills/${skill}/SKILL.md`;
    assert.ok(existsSync(path), `${path} must exist`);
    const body = readFileSync(path, "utf8");
    assert.match(body, /^---\nname: /, "must start with YAML frontmatter");
    assert.match(body, /\bname:\s*\S+/);
    assert.match(body, /\bdescription:/);
    // CRUD verbs: must mention at least Create and one of Read/Update/Delete
    assert.match(body, /###?\s*CREATE/i, "must document CREATE verb");
    assert.match(body, /(READ|UPDATE|DELETE)/i, "must document at least one of R/U/D");
  });
}

const SCRIPT_PATHS = [
  "plugins/macos-it-admin/skills/neon-crud/scripts/create.ts",
  "plugins/macos-it-admin/skills/parallel-ai-crud/scripts/create.ts",
  "plugins/macos-it-admin/skills/nimbleway-crud/scripts/create.ts",
];

for (const path of SCRIPT_PATHS) {
  test(`${path}: no-leak rules (OIT1, OSEC3-inherited)`, () => {
    const body = readFileSync(path, "utf8");
    const forbidden = [
      [/console\.log\([^)]*tokenValue/, "console.log of tokenValue"],
      [/console\.log\([^)]*\.key\b/, "console.log of .key field"],
      [/writeFileSync\([^)]*tokenValue/, "writeFileSync of tokenValue"],
      [/appendFileSync\([^)]*tokenValue/, "appendFileSync of tokenValue"],
    ] as const;
    for (const [re, label] of forbidden) {
      assert.equal(body.match(re), null, `OIT1 violation in ${path}: ${label}`);
    }
    // Status-to-stderr discipline
    assert.match(
      body,
      /console\.error\(.*OIT1/,
      `${path} must emit [OIT1-*] status lines via console.error`,
    );
    // Keychain read for minter (script must call `security find-generic-password`
    // AND name a *_TOKEN_MINTER service)
    assert.match(
      body,
      /find-generic-password/,
      `${path} must call security find-generic-password`,
    );
    assert.match(
      body,
      /[A-Z]+_TOKEN_MINTER/,
      `${path} must reference a *_TOKEN_MINTER keychain service`,
    );
  });
}

test("turbopuffer-crud has create.sh (NOT create.ts — browser-only)", () => {
  const tsPath = `${PLUGIN_DIR}/skills/turbopuffer-crud/scripts/create.ts`;
  const shPath = `${PLUGIN_DIR}/skills/turbopuffer-crud/scripts/create.sh`;
  assert.equal(existsSync(tsPath), false, "must NOT have create.ts");
  assert.ok(existsSync(shPath), "must have create.sh operator-paste scaffold");
  const body = readFileSync(shPath, "utf8");
  assert.match(body, /read -rs/, "must use read -rs silent prompt");
  assert.match(body, /unset VAL/, "must unset VAL after dual-write");
});

test("cloudflare-crud references the OSEC3 canonical script (does not duplicate)", () => {
  const body = readFileSync(
    `${PLUGIN_DIR}/skills/cloudflare-crud/SKILL.md`,
    "utf8",
  );
  assert.match(body, /scripts\/secret-mint\/cf-token-mint\.ts/);
});

test("all scripts/ dirs that exist are well-formed", () => {
  for (const skill of SKILLS) {
    const dir = `${PLUGIN_DIR}/skills/${skill}/scripts`;
    if (!existsSync(dir)) continue;
    const entries = readdirSync(dir);
    assert.ok(entries.length > 0, `${dir} should not be empty if it exists`);
    for (const e of entries) {
      assert.ok(statSync(`${dir}/${e}`).isFile(), `${dir}/${e} should be a file`);
    }
  }
});
