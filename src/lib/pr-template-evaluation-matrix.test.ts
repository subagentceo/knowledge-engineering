/**
 * @tdd green
 * @cite seeds/citations/define-outcomes.md
 * @cite rubrics/phase-14.md
 *
 * Asserts the PR template contains the Evaluation matrix section described
 * by the citations-tests-outcomes rubric
 * (plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md),
 * which guards .github/pull_request_template.md against future drift. The
 * citation headers above point at canonical citation-root proxies (the
 * define-outcomes doctrine extract + phase-14 rubric) because
 * citation-guard.ts requires citations under vendor/, seeds/, or rubrics/.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

test("PR template requires Evaluation matrix section per citations-tests-outcomes rubric", () => {
  const templatePath = resolve(REPO_ROOT, ".github/pull_request_template.md");
  const body = readFileSync(templatePath, "utf8");

  assert.ok(
    body.includes("## Evaluation matrix"),
    "PR template missing '## Evaluation matrix' section header",
  );

  assert.ok(
    body.includes("| Criterion | How it's measured | Result |"),
    "PR template missing canonical evaluation matrix header row",
  );
});
