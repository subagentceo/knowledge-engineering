/**
 * @tdd green
 * @cite seeds/operator-config/git/alex.inc
 * @cite seeds/operator-config/git/admin.inc
 * @cite seeds/operator-config/git/zhoukalex.inc
 * @cite seeds/operator-config/ssh/config.fragment
 *
 * Asserts the operator-config inheritance shape:
 *   alex.inc is the base; admin.inc and zhoukalex.inc inherit from it
 *   via [include] path = ./alex.inc; jade.inc is the legacy standalone
 *   base (intentionally excluded from the chain); ssh/config.fragment
 *   declares all four Host entries with IdentitiesOnly yes.
 *
 * Sibling sub-agents OIDENT1.A (git/*.inc) and OIDENT1.B
 * (ssh/config.fragment) land the asserted files in the same PR. Until
 * those commits coexist with this one, this test is intentionally RED.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

const GIT_DIR = resolve(REPO_ROOT, "seeds/operator-config/git");
const SSH_FRAGMENT = resolve(REPO_ROOT, "seeds/operator-config/ssh/config.fragment");

const ALEX = resolve(GIT_DIR, "alex.inc");
const ADMIN = resolve(GIT_DIR, "admin.inc");
const ZHOUKALEX = resolve(GIT_DIR, "zhoukalex.inc");
const JADE = resolve(GIT_DIR, "jade.inc");

// Matches a literal `[include]` section followed (anywhere later in the
// file) by `path = ./<base>.inc`, tolerating any whitespace around `=`.
function includesAlex(body: string): boolean {
  if (!/\[include\]/.test(body)) return false;
  return /path\s*=\s*\.\/alex\.inc/.test(body);
}

test("admin.inc inherits alex.inc via [include]", () => {
  const body = readFileSync(ADMIN, "utf8");
  assert.ok(
    /\[include\]/.test(body),
    "admin.inc missing [include] section",
  );
  assert.ok(
    /path\s*=\s*\.\/alex\.inc/.test(body),
    "admin.inc missing `path = ./alex.inc`",
  );
  assert.ok(includesAlex(body), "admin.inc does not inherit alex.inc");
});

test("zhoukalex.inc inherits alex.inc via [include]", () => {
  const body = readFileSync(ZHOUKALEX, "utf8");
  assert.ok(
    /\[include\]/.test(body),
    "zhoukalex.inc missing [include] section",
  );
  assert.ok(
    /path\s*=\s*\.\/alex\.inc/.test(body),
    "zhoukalex.inc missing `path = ./alex.inc`",
  );
  assert.ok(includesAlex(body), "zhoukalex.inc does not inherit alex.inc");
});

test("alex.inc is the base — does NOT include any other .inc", () => {
  const body = readFileSync(ALEX, "utf8");
  assert.ok(
    !/\[include\]/.test(body),
    "alex.inc must not contain [include]; it is the inheritance base",
  );
});

test("jade.inc is legacy base — does NOT include alex.inc", () => {
  const body = readFileSync(JADE, "utf8");
  assert.ok(
    !/\[include\]/.test(body),
    "jade.inc must not contain [include]; legacy alias is intentionally excluded from the inheritance chain",
  );
});

test("ssh/config.fragment declares all 4 Host entries with IdentitiesOnly yes", () => {
  const body = readFileSync(SSH_FRAGMENT, "utf8");
  for (const host of [
    "Host github.com-alex",
    "Host github.com-admin",
    "Host github.com-zhoukalex",
    "Host github.com-jade",
  ]) {
    assert.ok(body.includes(host), `ssh/config.fragment missing \`${host}\``);
  }
  const identitiesOnlyMatches = body.match(/IdentitiesOnly\s+yes/g) ?? [];
  assert.ok(
    identitiesOnlyMatches.length >= 4,
    `ssh/config.fragment must contain >= 4 \`IdentitiesOnly yes\` lines, found ${identitiesOnlyMatches.length}`,
  );
});

test("every .inc file cites vendor/docs-github for the multi-account doctrine", () => {
  for (const path of [ALEX, ADMIN, ZHOUKALEX, JADE]) {
    const body = readFileSync(path, "utf8");
    assert.ok(
      body.includes("vendor/docs-github"),
      `${path} missing \`vendor/docs-github\` citation`,
    );
  }
});
