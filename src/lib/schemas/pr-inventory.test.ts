/**
 * Tests for src/lib/schemas/pr-inventory.ts — typed open-PR / draft /
 * orphan-branch inventory + the pure `classifyInventory` fold.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite rubrics/phase-I.md
 */
import {
  PullRequestSchema,
  OpenPullRequestSchema,
  DraftPullRequestSchema,
  BranchSchema,
  InventorySchema,
  classifyInventory,
  parsePullRequestList,
  parseBranchList,
  type PullRequest,
  type Branch,
} from "./pr-inventory.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function assert(cond: unknown, msg: string): void {
  if (!cond) throw new Error(msg);
}

const ref = (r: string, s = "deadbeef") => ({ ref: r, sha: s });

const prFixture = (over: Partial<PullRequest> = {}): PullRequest => ({
  number: 1,
  title: "t",
  state: "open",
  draft: false,
  head: ref("feature/x"),
  base: ref("main"),
  ...over,
});

console.log("pr-inventory schema:");

check("PullRequestSchema accepts a list_pull_requests-shaped record", () => {
  const r = PullRequestSchema.safeParse({
    number: 49,
    title: "type-safe PR schema",
    state: "open",
    draft: true,
    head: { ref: "claude/type-safe-pr-schema-nym8j", sha: "abc123" },
    base: { ref: "main", sha: "def456" },
    user: { login: "octocat" },
    html_url: "https://github.com/o/r/pull/49",
    created_at: "2026-05-29T00:00:00Z",
    updated_at: "2026-05-29T01:00:00Z",
  });
  assert(r.success, "should parse full record");
});

check("PullRequestSchema strips unknown GitHub keys", () => {
  const r = PullRequestSchema.parse({
    ...prFixture(),
    mergeable_state: "clean",
    _links: { self: { href: "x" } },
  });
  assert(!("mergeable_state" in r), "extra key should be stripped");
});

check("OpenPullRequestSchema rejects closed PRs", () => {
  assert(
    !OpenPullRequestSchema.safeParse(prFixture({ state: "closed" })).success,
    "closed must not validate as open",
  );
});

check("DraftPullRequestSchema requires draft:true", () => {
  assert(
    !DraftPullRequestSchema.safeParse(prFixture({ draft: false })).success,
    "non-draft must not validate as draft",
  );
  assert(
    DraftPullRequestSchema.safeParse(prFixture({ draft: true })).success,
    "draft should validate",
  );
});

check("BranchSchema defaults protected to false", () => {
  const b = BranchSchema.parse({ name: "feature/x", commit: { sha: "s" } });
  assert(b.protected === false, "protected should default false");
});

check("classifyInventory splits open / drafts / orphans", () => {
  const prs: PullRequest[] = [
    prFixture({ number: 10, head: ref("feature/open-ready") }),
    prFixture({ number: 11, draft: true, head: ref("feature/open-draft") }),
    prFixture({ number: 12, state: "closed", head: ref("feature/closed") }),
  ];
  const branches: Branch[] = [
    { name: "main", commit: { sha: "m" }, protected: true },
    { name: "feature/open-ready", commit: { sha: "a" }, protected: false },
    { name: "feature/open-draft", commit: { sha: "b" }, protected: false },
    { name: "feature/orphan", commit: { sha: "c" }, protected: false },
    { name: "feature/closed", commit: { sha: "d" }, protected: false },
  ];

  const inv = classifyInventory(branches, prs);
  assert(InventorySchema.safeParse(inv).success, "inventory must validate");

  assert(inv.open.length === 2, `expected 2 open, got ${inv.open.length}`);
  assert(inv.drafts.length === 1, `expected 1 draft, got ${inv.drafts.length}`);
  assert(inv.drafts[0]!.number === 11, "draft should be #11");

  const names = inv.orphanBranches.map((o) => o.name).sort();
  // main is protected; open-ready/open-draft back open PRs;
  // closed + orphan have no OPEN PR head → both orphan.
  assert(
    JSON.stringify(names) === JSON.stringify(["feature/closed", "feature/orphan"]),
    `unexpected orphans: ${names.join(",")}`,
  );
});

check("classifyInventory honors protectedBranches option", () => {
  const branches: Branch[] = [
    { name: "develop", commit: { sha: "x" }, protected: false },
  ];
  const inv = classifyInventory(branches, [], { protectedBranches: ["develop"] });
  assert(inv.orphanBranches.length === 0, "develop should be shielded from orphan");
});

check("parsePullRequestList / parseBranchList round-trip JSON", () => {
  const prs = parsePullRequestList(JSON.stringify([prFixture()]));
  assert(prs.length === 1, "one PR parsed");
  const branches = parseBranchList(
    JSON.stringify([{ name: "x", commit: { sha: "s" } }]),
  );
  assert(branches[0]!.protected === false, "branch default applied");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
