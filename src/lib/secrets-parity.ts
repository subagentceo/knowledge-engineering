/**
 * Pure parity-check logic for OSEC1. The CLI wrapper lives at
 * scripts/verify-secrets-parity.ts and shells out to gh; this module is
 * pure so tests can drive it with synthetic plane sets.
 *
 * @cite docs/decisions/2026-05-17-secrets-parity.md
 * @cite docs/data/secrets-parity.json
 */

export type Posture = "REQUIRED" | "OPTIONAL" | "FORBIDDEN" | "NA";

export interface Row {
  name: string;
  local: Posture;
  gh_repo: Posture;
  gh_org: Posture;
  cloud_env: Posture;
  rationale: string;
}

export interface Table {
  version: number;
  secrets: Row[];
}

export type Plane = "local" | "gh_repo" | "gh_org";

export interface Violation {
  secret: string;
  plane: Plane;
  posture: Posture;
  observed: "PRESENT" | "ABSENT";
}

export function check(
  table: Table,
  local: Set<string>,
  repo: Set<string>,
  org: Set<string>,
): Violation[] {
  const planes: Array<{ key: Plane; set: Set<string> }> = [
    { key: "local", set: local },
    { key: "gh_repo", set: repo },
    { key: "gh_org", set: org },
  ];
  const violations: Violation[] = [];
  for (const row of table.secrets) {
    for (const { key, set } of planes) {
      const posture = row[key];
      const present = set.has(row.name);
      if (posture === "REQUIRED" && !present) {
        violations.push({
          secret: row.name,
          plane: key,
          posture,
          observed: "ABSENT",
        });
      } else if (posture === "FORBIDDEN" && present) {
        violations.push({
          secret: row.name,
          plane: key,
          posture,
          observed: "PRESENT",
        });
      }
    }
  }
  return violations;
}
