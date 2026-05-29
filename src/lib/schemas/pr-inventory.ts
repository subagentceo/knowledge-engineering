/**
 * zod model of a repository's PR/branch inventory — the typed shape
 * behind "what's open, what's a draft, what's orphaned?".
 *
 * Three first-class concepts:
 *   - OpenPullRequest — a PR with state="open" (draft or ready).
 *   - Draft           — the subset where draft=true. Same record,
 *                       narrowed by `DraftPullRequestSchema`.
 *   - OrphanBranch    — a branch with no open PR pointing at it as
 *                       `head`, excluding protected/default branches.
 *
 * Field names mirror the GitHub MCP surfaces this is parsed from:
 *   - mcp__github__list_pull_requests  → PullRequestSchema
 *   - mcp__github__list_branches       → BranchSchema
 * so a list response drops straight into `PullRequestSchema.array()`.
 *
 * Pure: `classifyInventory` is a total function over (branches, PRs);
 * no MCP calls, no I/O. Callers inject the two list results.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite rubrics/phase-I.md
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export const PullRequestStateSchema = z.enum(["open", "closed"]);
export type PullRequestState = z.infer<typeof PullRequestStateSchema>;

/** Minimal git ref as it appears under a PR's `head`/`base`. */
export const GitRefSchema = z.object({
  ref: z.string().min(1),
  sha: z.string().min(1),
});
export type GitRef = z.infer<typeof GitRefSchema>;

export const GitUserSchema = z.object({
  login: z.string().min(1),
});
export type GitUser = z.infer<typeof GitUserSchema>;

// ---------------------------------------------------------------------------
// Pull request
// ---------------------------------------------------------------------------

/**
 * A pull request as returned by list_pull_requests. Unknown extra keys
 * are stripped (default zod object behavior) so the schema tolerates
 * the larger GitHub payload while pinning the fields we reason about.
 */
export const PullRequestSchema = z.object({
  number: z.number().int().positive(),
  title: z.string(),
  state: PullRequestStateSchema,
  draft: z.boolean(),
  head: GitRefSchema,
  base: GitRefSchema,
  user: GitUserSchema.nullable().optional(),
  html_url: z.url().optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
});
export type PullRequest = z.infer<typeof PullRequestSchema>;

/** state === "open". */
export const OpenPullRequestSchema = PullRequestSchema.extend({
  state: z.literal("open"),
});
export type OpenPullRequest = z.infer<typeof OpenPullRequestSchema>;

/** state === "open" && draft === true. */
export const DraftPullRequestSchema = OpenPullRequestSchema.extend({
  draft: z.literal(true),
});
export type DraftPullRequest = z.infer<typeof DraftPullRequestSchema>;

// ---------------------------------------------------------------------------
// Branch
// ---------------------------------------------------------------------------

/** A branch as returned by list_branches. */
export const BranchSchema = z.object({
  name: z.string().min(1),
  commit: z.object({
    sha: z.string().min(1),
  }),
  protected: z.boolean().default(false),
});
export type Branch = z.infer<typeof BranchSchema>;

/**
 * A branch with no open PR using it as `head`. `reason` records why a
 * branch was *not* classified as orphan when callers want to audit the
 * negative space — but only orphans land in the inventory's array.
 */
export const OrphanBranchSchema = z.object({
  name: z.string().min(1),
  sha: z.string().min(1),
  protected: z.boolean(),
});
export type OrphanBranch = z.infer<typeof OrphanBranchSchema>;

// ---------------------------------------------------------------------------
// Inventory (the type-safe aggregate)
// ---------------------------------------------------------------------------

export const InventorySchema = z.object({
  open: z.array(OpenPullRequestSchema),
  drafts: z.array(DraftPullRequestSchema),
  orphanBranches: z.array(OrphanBranchSchema),
});
export type Inventory = z.infer<typeof InventorySchema>;

export interface ClassifyOptions {
  /** Branch names never treated as orphans (default branch, release lines). */
  protectedBranches?: ReadonlyArray<string>;
}

/**
 * Fold a list_branches result + a list_pull_requests result into the
 * typed inventory. A branch is orphan iff it is not protected, not in
 * `protectedBranches`, and no open PR points at it via `head.ref`.
 */
export function classifyInventory(
  branches: ReadonlyArray<Branch>,
  pullRequests: ReadonlyArray<PullRequest>,
  options?: ClassifyOptions,
): Inventory {
  const open = pullRequests.filter(
    (pr): pr is OpenPullRequest => pr.state === "open",
  );
  const drafts = open.filter((pr): pr is DraftPullRequest => pr.draft === true);

  const openHeads = new Set(open.map((pr) => pr.head.ref));
  const protectedNames = new Set(options?.protectedBranches ?? []);

  const orphanBranches: OrphanBranch[] = branches
    .filter(
      (b) => !b.protected && !protectedNames.has(b.name) && !openHeads.has(b.name),
    )
    .map((b) => ({ name: b.name, sha: b.commit.sha, protected: b.protected }));

  return { open, drafts, orphanBranches };
}

// ---------------------------------------------------------------------------
// Parsers (mirror crawl-config.ts / routine.ts ergonomics)
// ---------------------------------------------------------------------------

export function parsePullRequestList(body: string): PullRequest[] {
  return z.array(PullRequestSchema).parse(JSON.parse(body));
}

export function parseBranchList(body: string): Branch[] {
  return z.array(BranchSchema).parse(JSON.parse(body));
}
