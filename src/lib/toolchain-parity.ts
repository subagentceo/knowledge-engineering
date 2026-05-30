/**
 * @cite docs/data/toolchain-parity.json
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
 *
 * Managed-Agents cloud-sandbox toolchain parity loader + checkers.
 *
 * Pure functions only — no process spawning, no I/O beyond the caller passing
 * in the probed state. The doctor (scripts/parity/doctor.sh) does the actual
 * `command -v` / `--version` probing and feeds results here; the verify test
 * (src/lib/toolchain-parity.test.ts) feeds a synthetic table. One shared
 * implementation, same pattern as secrets-parity.ts.
 */

export type Posture = "REQUIRED" | "OPTIONAL" | "NA";

export interface LanguageRow {
  name: string;
  probe: string;
  min: string;
  managers: string[];
  posture: Posture;
}

export interface ToolRow {
  name: string;
  probe: string;
  posture: Posture;
}

export interface ParityTable {
  version: number;
  languages: LanguageRow[];
  managers: ToolRow[];
  databases: ToolRow[];
  utilities: ToolRow[];
}

export interface ProbeState {
  /** probe (binary) name → resolved path or null if absent. */
  present: Record<string, string | null>;
  /** probe name → detected version string (e.g. "3.14.2"), if known. */
  versions?: Record<string, string>;
}

export interface ParityResult {
  name: string;
  probe: string;
  posture: Posture;
  present: boolean;
  versionOk: boolean;
  detected: string | null;
  min: string | null;
  ok: boolean;
}

/** Compare dotted versions numerically. "3.14" >= "3.12" → true. */
export function versionGte(detected: string, min: string): boolean {
  const d = detected.split(".").map((n) => parseInt(n, 10) || 0);
  const m = min.split(".").map((n) => parseInt(n, 10) || 0);
  const len = Math.max(d.length, m.length);
  for (let i = 0; i < len; i++) {
    const a = d[i] ?? 0;
    const b = m[i] ?? 0;
    if (a > b) return true;
    if (a < b) return false;
  }
  return true;
}

function rowResult(
  name: string,
  probe: string,
  posture: Posture,
  min: string | null,
  state: ProbeState,
): ParityResult {
  const present = Boolean(state.present[probe]);
  const detected = state.versions?.[probe] ?? null;
  const versionOk = min === null || detected === null ? present : versionGte(detected, min);
  // OPTIONAL rows never fail the run; their absence is informational.
  const ok = posture === "OPTIONAL" ? true : present && versionOk;
  return { name, probe, posture, present, versionOk, detected, min, ok };
}

export function checkLanguages(table: ParityTable, state: ProbeState): ParityResult[] {
  return table.languages.map((l) => rowResult(l.name, l.probe, l.posture, l.min, state));
}

export function checkTools(rows: ToolRow[], state: ProbeState): ParityResult[] {
  return rows.map((t) => rowResult(t.name, t.probe, t.posture, null, state));
}

export function checkAll(table: ParityTable, state: ProbeState): ParityResult[] {
  return [
    ...checkLanguages(table, state),
    ...checkTools(table.managers, state),
    ...checkTools(table.databases, state),
    ...checkTools(table.utilities, state),
  ];
}

/** A run passes when every non-OPTIONAL row is ok. */
export function passes(results: ParityResult[]): boolean {
  return results.every((r) => r.ok);
}

export function failures(results: ParityResult[]): ParityResult[] {
  return results.filter((r) => !r.ok);
}
