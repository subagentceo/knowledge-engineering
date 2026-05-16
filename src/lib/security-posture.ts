/**
 * Assertion helpers for the GoogleOSV-only security posture
 * (ADR OSL1: docs/decisions/2026-05-16-osv-only-no-secret-scanning.md).
 *
 * Imported by scripts/verify-security-posture.ts which fetches live
 * org + repo settings via gh api and feeds them through these
 * asserters. If any forbidden setting flips back to enabled, verify
 * fails — preventing a future agent from quietly re-enabling
 * GitHub-native security tooling that the operator explicitly
 * disabled for cost reasons.
 *
 * @cite vendor/osv-scanner/google.github.io/osv-scanner/github-action/index.md
 */

export const FORBIDDEN_ORG_SETTINGS = [
  "dependabot_alerts_enabled_for_new_repositories",
  "dependabot_security_updates_enabled_for_new_repositories",
  "secret_scanning_enabled_for_new_repositories",
  "secret_scanning_push_protection_enabled_for_new_repositories",
] as const;

export const FORBIDDEN_REPO_SETTINGS = [
  "secret_scanning",
  "secret_scanning_push_protection",
  "dependabot_security_updates",
] as const;

export type OrgSettings = Partial<Record<
  (typeof FORBIDDEN_ORG_SETTINGS)[number],
  boolean
>>;

export interface RepoSettings {
  security_and_analysis?: Partial<
    Record<(typeof FORBIDDEN_REPO_SETTINGS)[number], { status: string }>
  >;
}

export function assertOrgPosture(s: OrgSettings): void {
  const violations: string[] = [];
  for (const k of FORBIDDEN_ORG_SETTINGS) {
    if (s[k] === true) violations.push(k);
  }
  if (violations.length > 0) {
    throw new Error(
      `security-posture: forbidden org settings are enabled: ${violations.join(", ")}. ` +
        `Per ADR OSL1 they must be false. Reverse with: ` +
        `gh api -X PATCH orgs/<org> ${violations.map((v) => `-F ${v}=false`).join(" ")}`,
    );
  }
}

export function assertRepoPosture(s: RepoSettings): void {
  const sa = s.security_and_analysis;
  if (!sa) return;
  const violations: string[] = [];
  for (const k of FORBIDDEN_REPO_SETTINGS) {
    if (sa[k]?.status === "enabled") violations.push(k);
  }
  if (violations.length > 0) {
    throw new Error(
      `security-posture: forbidden repo settings are enabled: ${violations.join(", ")}. ` +
        `Per ADR OSL1 they must be disabled.`,
    );
  }
}
