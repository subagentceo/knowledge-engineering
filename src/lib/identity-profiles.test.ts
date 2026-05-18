/**
 * @tdd green
 * @cite vendor/git/git-scm.com/docs/git-config.md
 * @cite seeds/operator-config/git/alex.inc
 * @cite seeds/operator-config/git/admin.inc
 * @cite seeds/operator-config/git/zhoukalex.inc
 * @cite seeds/operator-config/ssh/config.fragment
 *
 * Asserts the operator-config inheritance shape per the authoritative
 * git-config(1) §"Includes" spec at vendor/git/git-scm.com/docs/git-config.md:
 *   "Included configuration files are processed as if their contents
 *    were directly present at the location of the include directive."
 *
 * Shape:
 *   alex.inc is the base; admin.inc and zhoukalex.inc inherit from it
 *   via [include] path = ./alex.inc; jade.inc is the legacy standalone
 *   base (intentionally excluded from the chain); ssh/config.fragment
 *   declares all four Host entries with IdentitiesOnly yes.
 *
 * OIDENT2 fix: the citation-shape assertion now requires each .inc to
 * point at vendor/git/git-scm.com/docs/git-config.md — the actual spec
 * for [include] / [includeIf] — instead of OIDENT1's wrong cite to
 * vendor/docs-github/.../github-cli/quickstart.md (which is about
 * `gh auth switch`, not git includes).
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

// git-config(5) grammar: section headers begin a line (no leading `#`,
// which is the comment marker). We match `[include]` only as a real section
// header, not when it appears inside a comment that quotes the spec.
const SECTION_INCLUDE = /^\[include\]/m;

// Matches a `[include]` section header followed (anywhere later in the
// file) by `path = ./<base>.inc`, tolerating any whitespace around `=`.
function includesAlex(body: string): boolean {
  if (!SECTION_INCLUDE.test(body)) return false;
  return /path\s*=\s*\.\/alex\.inc/.test(body);
}

test("admin.inc inherits alex.inc via [include] section", () => {
  const body = readFileSync(ADMIN, "utf8");
  assert.ok(
    SECTION_INCLUDE.test(body),
    "admin.inc missing [include] section header at line start",
  );
  assert.ok(
    /path\s*=\s*\.\/alex\.inc/.test(body),
    "admin.inc missing `path = ./alex.inc`",
  );
  assert.ok(includesAlex(body), "admin.inc does not inherit alex.inc");
});

test("zhoukalex.inc inherits alex.inc via [include] section", () => {
  const body = readFileSync(ZHOUKALEX, "utf8");
  assert.ok(
    SECTION_INCLUDE.test(body),
    "zhoukalex.inc missing [include] section header at line start",
  );
  assert.ok(
    /path\s*=\s*\.\/alex\.inc/.test(body),
    "zhoukalex.inc missing `path = ./alex.inc`",
  );
  assert.ok(includesAlex(body), "zhoukalex.inc does not inherit alex.inc");
});

test("alex.inc is the base — has no [include] section", () => {
  const body = readFileSync(ALEX, "utf8");
  assert.ok(
    !SECTION_INCLUDE.test(body),
    "alex.inc must not contain an [include] section; it is the inheritance base (comments quoting the spec are allowed)",
  );
});

test("jade.inc is legacy base — has no [include] section", () => {
  const body = readFileSync(JADE, "utf8");
  assert.ok(
    !SECTION_INCLUDE.test(body),
    "jade.inc must not contain an [include] section; legacy alias is intentionally excluded from the inheritance chain (comments are fine)",
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

test("every .inc file cites the authoritative git-config Includes spec", () => {
  // Per OIDENT2: the load-bearing citation for the inheritance pattern is
  // vendor/git/git-scm.com/docs/git-config.md §"Includes", NOT the github-cli
  // quickstart (which is about `gh auth switch`, a separate concern).
  for (const path of [ALEX, ADMIN, ZHOUKALEX, JADE]) {
    const body = readFileSync(path, "utf8");
    assert.ok(
      body.includes("vendor/git/git-scm.com/docs/git-config.md"),
      `${path} missing \`vendor/git/git-scm.com/docs/git-config.md\` citation`,
    );
  }
});

test("no .inc file still carries OIDENT1's wrong vendor/docs-github cite (drift guard)", () => {
  // Guard against citation regressions: vendor/docs-github/.../github-cli was
  // OIDENT1's wrong cite for the inheritance pattern. If any .inc reverts to
  // referencing it as the basis for [include] semantics, fail loudly.
  // (The runbook intentionally still cites it for the `gh auth login` step;
  // this guard is scoped to .inc files only.)
  for (const path of [ALEX, ADMIN, ZHOUKALEX, JADE]) {
    const body = readFileSync(path, "utf8");
    assert.ok(
      !body.includes("vendor/docs-github"),
      `${path} still references vendor/docs-github — see OIDENT2 fix; the load-bearing cite is vendor/git/git-scm.com/docs/git-config.md`,
    );
  }
});
