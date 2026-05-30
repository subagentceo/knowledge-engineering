/**
 * @cite vendor/anthropics/code.claude.com/docs/en/worktrees.md
 * @cite vendor/anthropics/code.claude.com/docs/en/github-enterprise-server.md
 *
 * Canonical branch-name topology for this repo. Pure functions only (parse /
 * validate / generate); no git, no I/O. The CLI (scripts/branch/*.ts) and the
 * verify test drive these.
 *
 * Topology — modeled on the real anthropics/claude-code branch convention
 * (<user>/<ticket>-<desc>, e.g. joshpurvis/eng-3091-mcp-resource-indicators):
 *
 *     <git-user>/<JIRA-KEY>-<kebab-description>
 *     alexjadecli/KNOW-12-canonical-branch-topology
 *
 * - git-user     active session's git user, lowercased + de-punctuated. Leads
 *                the ref, exactly as upstream does (81/100 branches are
 *                <user>/... slash-namespaced).
 * - JIRA-KEY     literal uppercase Jira key (KNOW board for this repo). It is
 *                the REAL key Jira issues (KNOW-12, never zero-padded), so the
 *                Jira Software for GitHub app auto-links the branch + commits.
 * - description  free-form lowercase kebab (any length), like upstream.
 *
 * Conventional-commit TYPE is NOT in the branch — it lives in the commit
 * subject (`feat: …`), matching upstream. The session artifact (OTel
 * session.id UUID) rides the `Claude-Session:` commit trailer + PR body,
 * joining branch->commit->PR->telemetry without bloating the ref.
 */

/**
 * The Jira board key for this repo (subagentmcp/subagentceo/knowledge-engineering).
 * KENG = KNOWledge-ENGineering — a fixed 4-char alias for type-safety.
 */
export const JIRA_BOARD = "KENG";

/**
 * Issue numbering starts at 1000, so every key is NATURALLY 4 digits
 * (KENG-1000 .. KENG-9999) with no zero-padding. The literal key IS the
 * 4-digit key, so the Jira<->GitHub app auto-links it natively — we get
 * fixed-width type-safety AND auto-linking with zero special config.
 */
export const ISSUE_MIN = 1000;
export const ISSUE_MAX = 9999;

// git-user: lowercase alnum (punctuation stripped at generation time).
const USER_RE = "[a-z0-9]+";
// JIRA-KEY: uppercase 4-char board + dash + a real 4-digit number (1000-9999).
const KEY_RE = "[A-Z]{4}-[1-9][0-9]{3}";
// description: one-or-more lowercase-hyphen words; must start/end with alnum.
const DESC_RE = "[a-z0-9]+(?:-[a-z0-9]+)*";

export const BRANCH_RE = new RegExp(`^(${USER_RE})/(${KEY_RE})-(${DESC_RE})$`);

export interface BranchParts {
  user: string;
  key: string;
  description: string;
}

export interface ValidationError {
  code: "shape" | "user" | "key-format" | "key-board" | "description";
  message: string;
}

/** Normalize a raw git user into the branch-name user segment. */
export function normalizeUser(rawUser: string): string {
  return rawUser.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Normalize a free-form phrase into a kebab description segment. */
export function normalizeDescription(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Parse a branch name into parts, or null if it doesn't match the topology. */
export function parseBranch(name: string): BranchParts | null {
  const m = BRANCH_RE.exec(name);
  if (!m) return null;
  // All three groups are guaranteed present when BRANCH_RE matches.
  return { user: m[1]!, key: m[2]!, description: m[3]! };
}

/**
 * Validate a branch name against the canonical topology. Returns [] when valid.
 * Reports the most specific failure(s) so the CI guard can tell the user what
 * to fix, not just "invalid".
 */
export function validateBranch(
  name: string,
  opts: { board?: string } = {},
): ValidationError[] {
  const board = opts.board ?? JIRA_BOARD;
  const errors: ValidationError[] = [];

  const parts = parseBranch(name);
  if (!parts) {
    // The ref is <user>/<KEY>-<desc>: one slash, then KEY-desc after it.
    const slash = name.indexOf("/");
    if (slash < 0) {
      errors.push({
        code: "shape",
        message: `expected <git-user>/<${board}-N>-<kebab-description>, got "${name}" (no "/")`,
      });
      return errors;
    }
    const user = name.slice(0, slash);
    const rest = name.slice(slash + 1);
    if (!new RegExp(`^${USER_RE}$`).test(user)) {
      errors.push({
        code: "user",
        message: `user "${user}" must be lowercase alphanumeric (the git user, e.g. alexjadecli)`,
      });
    }
    const keyMatch = new RegExp(`^(${KEY_RE})-(${DESC_RE})$`).exec(rest);
    if (!keyMatch) {
      // Distinguish a bad key from a bad description. A well-formed key is a
      // 4-char board + a 4-digit number 1000-9999, anchored by the following
      // dash. If `rest` doesn't lead with exactly that, the key is at fault;
      // only when the key is well-formed do we blame the description.
      const wellFormedKey = new RegExp(`^${KEY_RE}-`).test(rest);
      if (!wellFormedKey) {
        errors.push({
          code: "key-format",
          message: `"${rest}" must start with a real Jira key then -description (e.g. ${board}-1037-add-retry); keys are a 4-char UPPERCASE board + a 4-digit number ${ISSUE_MIN}-${ISSUE_MAX} (numbering starts at ${ISSUE_MIN} so the literal key is 4 digits and auto-links)`,
        });
      } else {
        errors.push({
          code: "description",
          message: `description after the Jira key must be lowercase kebab (e.g. ${board}-1037-add-retry-logic)`,
        });
      }
    }
    return errors;
  }

  // Structurally valid — enforce the board binding (this repo = KNOW).
  if (!parts.key.startsWith(`${board}-`)) {
    errors.push({
      code: "key-board",
      message: `Jira key "${parts.key}" must be on the ${board} board (this repo is bound to ${board})`,
    });
  }
  return errors;
}

export function isValidBranch(name: string, opts: { board?: string } = {}): boolean {
  return validateBranch(name, opts).length === 0;
}

export interface GenerateInput {
  /** Raw git user (will be normalized). */
  user: string;
  /** Jira issue number (digits) or a full key. Bare number → BOARD-<n>. */
  issue: string | number;
  /** Free-form description; normalized to kebab. */
  description: string;
  board?: string;
}

/** Build a canonical branch name from parts. Throws on an invalid result. */
export function generateBranch(input: GenerateInput): string {
  const board = input.board ?? JIRA_BOARD;
  const key =
    typeof input.issue === "number" || /^[0-9]+$/.test(String(input.issue))
      ? `${board}-${Number(input.issue)}`
      : String(input.issue).toUpperCase();
  const name = `${normalizeUser(input.user)}/${key}-${normalizeDescription(input.description)}`;
  const errors = validateBranch(name, { board });
  if (errors.length > 0) {
    throw new Error(
      `generated branch "${name}" is invalid: ${errors.map((e) => e.message).join("; ")}`,
    );
  }
  return name;
}

/** The git commit trailer that carries the OTel session.id for traceability. */
export const SESSION_TRAILER_KEY = "Claude-Session";

/** Render the session trailer line for a commit message. */
export function sessionTrailer(sessionId: string): string {
  return `${SESSION_TRAILER_KEY}: ${sessionId}`;
}

const SESSION_TRAILER_RE = new RegExp(
  `^${SESSION_TRAILER_KEY}:\\s*([0-9a-fA-F-]{8,})\\s*$`,
  "m",
);

/** Extract the session id from a commit message's trailer, or null. */
export function parseSessionTrailer(commitMessage: string): string | null {
  const m = SESSION_TRAILER_RE.exec(commitMessage);
  return m?.[1] ?? null;
}
