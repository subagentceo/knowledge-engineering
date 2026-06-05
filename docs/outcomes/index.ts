/**
 * docs/outcomes/index.ts — barrel export + OutcomeRegistry
 *
 * Re-exports all session outcome arrays, builds a Map<id, SessionOutcome>,
 * and exports a getOutcome(id) helper for runtime lookups.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

export {
  outcomes as outcomes_2026_06_02,
  SessionOutcomeSchema,
} from "./session-2026-06-02.js";
export type { SessionOutcome } from "./session-2026-06-02.js";

export { outcomes as outcomes_2026_06_03 } from "./session-2026-06-03.js";
export { outcomes as outcomes_2026_06_04 } from "./session-2026-06-04.js";
export { outcomes as outcomes_2026_06_05 } from "./session-2026-06-05.js";

import { outcomes as outcomes_2026_06_02 } from "./session-2026-06-02.js";
import { outcomes as outcomes_2026_06_03 } from "./session-2026-06-03.js";
import { outcomes as outcomes_2026_06_04 } from "./session-2026-06-04.js";
import { outcomes as outcomes_2026_06_05 } from "./session-2026-06-05.js";
import type { SessionOutcome } from "./session-2026-06-02.js";

const allOutcomes: SessionOutcome[] = [
  ...outcomes_2026_06_02,
  ...outcomes_2026_06_03,
  ...outcomes_2026_06_04,
  ...outcomes_2026_06_05,
];

/**
 * OutcomeRegistry — Map<id, SessionOutcome> keyed by outcome id.
 * Ids are expected to be unique across sessions; the last writer wins
 * if there is a collision (which the per-session tests prevent).
 */
export const OutcomeRegistry: Map<string, SessionOutcome> = new Map(
  allOutcomes.map((o) => [o.id, o])
);

/**
 * getOutcome — look up a single outcome by id.
 * Returns undefined when the id is not registered.
 */
export function getOutcome(id: string): SessionOutcome | undefined {
  return OutcomeRegistry.get(id);
}
