---
name: pr-changed-content
description: After an incremental crawl, open a pull request containing only the new and changed pages (the sha256 delta), not the whole mirror. Trigger when asked to "PR the new content and changed content" for a vendor, refresh a vendor mirror and ship the diff, or wire a recurring crawl→PR job for surfaces like code.claude.com (llms.txt + sitemap.xml). Pairs with the incremental-crawl skill and the repo's claude/* → automerge PR loop.
---

# pr-changed-content

> Turns an incremental crawl into a minimal, reviewable delta PR. Pairs with the
> `incremental-crawl` skill and `.claude/rules/pr-ops.md`.

The crawl already does the hard part: only new/changed pages are written and the
`manifest.json` is updated. The git working tree therefore **is** the delta. This
skill ships exactly that.

## Workflow

```bash
# 1. branch (branch name MUST start with claude/ per branch-guard)
git checkout -b claude/refresh-<target>-$(date +%Y%m%d)

# 2. incremental crawl — writes only new/changed pages + manifest
#    --changed-only lists the touched paths so you can summarize them in the PR
tsx scripts/incremental-crawl.ts --target <target> --changed-only | tee /tmp/<target>-delta.txt

# 3. nothing changed? stop — no PR needed
git diff --quiet && echo "no upstream changes; skip PR" && exit 0

# 4. stage exactly the mirror dir (the delta + manifest)
git add <out_dir>

# 5. commit (Conventional Commits + (O<N>) per docs/CONVENTIONS.md)
git commit -m "feat(<target>): refresh mirror — N new, M changed pages (O1)"

# 6. push + PR (labels BEFORE CI per pr-ops.md), enable automerge
git push -u origin HEAD
# mcp__github__create_pull_request ...
# mcp__github__issue_write labels=["automerge"]
# mcp__github__enable_pr_auto_merge mergeMethod=REBASE
```

## Why the PR is minimal

`content_sha256` gates every write. An unchanged page is never rewritten, so it
never appears in `git status`. The diff is precisely: new pages added, changed
pages rewritten, and the manifest lines for those URLs. Reviewers see the real
content delta, not crawl noise.

## Worked example — code.claude.com

The operator's target: keep a mirror of `code.claude.com` fresh from its
`llms.txt` + `sitemap.xml`, and PR only what moved.

```bash
git checkout -b claude/refresh-code-claude-$(date +%Y%m%d)
tsx scripts/incremental-crawl.ts --target code-claude --changed-only
# first run: 'added=<all>' — the initial mirror
# later runs: 'added=<new pages> changed=<edited pages> unchanged=<rest>'
git add vendor/code-claude-incremental
git commit -m "feat(code-claude): refresh docs mirror — sha256 delta (O1)"
git push -u origin HEAD   # then create PR + labels + automerge
```

The PR title/body should quote the `--changed-only` paths and the
`added=/changed=` line so the delta is auditable at a glance.

## Recurring refresh

To run this on a schedule, wrap steps 1–6 in a routine and dispatch it via the
repo's `/schedule` (see `.claude/skills/schedule-bridge`). The job is a no-op PR
when upstream is unchanged (step 3 short-circuits), so it is safe to run often.

## Guardrails

- **Branch name** must start with `claude/` (branch-guard).
- **Labels before CI**: `automerge` immediately after PR creation. `agent-session-cost-report.yml` auto-generates the cost artifact — `skip-cost-gate` is not needed (OCOST1).
- **Stage only the mirror dir** so unrelated working-tree changes don't ride along.
- **Commit format**: Conventional Commits ending in `(O<N>)`.

## See also

- `incremental-crawl` — the engine that produces the delta
- `structured-metadata-extract` — JS-SPA surfaces
- `.claude/rules/pr-ops.md` — PR creation checklist, labels, rescue procedures
