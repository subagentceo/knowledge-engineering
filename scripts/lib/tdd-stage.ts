/**
 * `@tdd <stage>` tag parser for the Phase B TDD-stage CI gate.
 *
 * Stages: `red` (failing test landed first), `green` (impl makes it
 * pass), `refactor` (post-green cleanup). Convention from
 * Kent Beck's red/green/refactor cycle.
 *
 * Per founder primitive P2 (on-distribution-stack) + D4 (≤300 LOC):
 * pure functions, no parser dep. The tag lives in a JSDoc-style
 * header at the top of every new test file.
 *
 * Phase B / O-B2 — paired with scripts/lib/tdd-stage.test.ts.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */

export const TDD_STAGES = ["red", "green", "refactor"] as const;
export type TddStage = (typeof TDD_STAGES)[number];

export function isValidTddStage(s: string): s is TddStage {
  return (TDD_STAGES as ReadonlyArray<string>).includes(s);
}

/**
 * Parse the first `@tdd <stage>` tag in a file source. Returns null
 * when missing or invalid. Case-sensitive on the tag name (`@TDD`
 * does NOT match — we want one canonical spelling).
 */
export function parseTddStage(source: string): TddStage | null {
  const m = source.match(/@tdd\s+(\w+)/);
  if (!m) return null;
  const candidate = m[1]!;
  return isValidTddStage(candidate) ? candidate : null;
}
