/**
 * Tests for src/lib/security-posture.ts — asserts the forbidden
 * GitHub security settings (per ADR OSL1) stay disabled.
 *
 * Outcome OSL1. Forbidden settings list mirrors
 * docs/decisions/2026-05-16-osv-only-no-secret-scanning.md.
 *
 * @tdd red
 * @cite vendor/osv-scanner/google.github.io/osv-scanner/github-action/index.md
 * @cite seeds/posture/session-start.xml
 */
import {
  FORBIDDEN_ORG_SETTINGS,
  FORBIDDEN_REPO_SETTINGS,
  assertOrgPosture,
  assertRepoPosture,
} from "./security-posture.js";

let passed = 0;
let failed = 0;
function check(name: string, fn: () => void): void {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("security-posture:");

check("FORBIDDEN_ORG_SETTINGS includes all 4 GitHub-native security toggles", () => {
  const expected = [
    "dependabot_alerts_enabled_for_new_repositories",
    "dependabot_security_updates_enabled_for_new_repositories",
    "secret_scanning_enabled_for_new_repositories",
    "secret_scanning_push_protection_enabled_for_new_repositories",
  ];
  for (const k of expected) {
    if (!FORBIDDEN_ORG_SETTINGS.includes(k))
      throw new Error(`missing ${k}`);
  }
});

check("FORBIDDEN_REPO_SETTINGS includes security_and_analysis sub-fields", () => {
  const expected = [
    "secret_scanning",
    "secret_scanning_push_protection",
    "dependabot_security_updates",
  ];
  for (const k of expected) {
    if (!FORBIDDEN_REPO_SETTINGS.includes(k))
      throw new Error(`missing ${k}`);
  }
});

check("assertOrgPosture passes when all forbidden flags are false", () => {
  assertOrgPosture({
    dependabot_alerts_enabled_for_new_repositories: false,
    dependabot_security_updates_enabled_for_new_repositories: false,
    secret_scanning_enabled_for_new_repositories: false,
    secret_scanning_push_protection_enabled_for_new_repositories: false,
  });
});

check("assertOrgPosture throws when ANY forbidden flag is true", () => {
  let threw = false;
  try {
    assertOrgPosture({
      dependabot_alerts_enabled_for_new_repositories: true,
      dependabot_security_updates_enabled_for_new_repositories: false,
      secret_scanning_enabled_for_new_repositories: false,
      secret_scanning_push_protection_enabled_for_new_repositories: false,
    });
  } catch (err) {
    threw = true;
    if (!String(err).includes("dependabot_alerts"))
      throw new Error("error message should name the violating flag");
  }
  if (!threw) throw new Error("expected throw");
});

check("assertRepoPosture passes when all security_and_analysis are disabled", () => {
  assertRepoPosture({
    security_and_analysis: {
      secret_scanning: { status: "disabled" },
      secret_scanning_push_protection: { status: "disabled" },
      dependabot_security_updates: { status: "disabled" },
    },
  });
});

check("assertRepoPosture throws when any security_and_analysis is enabled", () => {
  let threw = false;
  try {
    assertRepoPosture({
      security_and_analysis: {
        secret_scanning: { status: "enabled" },
        secret_scanning_push_protection: { status: "disabled" },
        dependabot_security_updates: { status: "disabled" },
      },
    });
  } catch (err) {
    threw = true;
    if (!String(err).includes("secret_scanning"))
      throw new Error("error message should name the violating field");
  }
  if (!threw) throw new Error("expected throw");
});

check("assertRepoPosture tolerates missing security_and_analysis (private repos)", () => {
  // GH returns nothing when no setting is on. Permissive: no setting = pass.
  assertRepoPosture({});
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
