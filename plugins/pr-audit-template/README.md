# pr-audit-template

Per-merged-PR audit follow-up generator for `subagentceo/knowledge-engineering`. After every PR merges, this plugin produces a follow-up audit PR + top-3 highest-impact findings as issues.

See [`CLAUDE.md`](./CLAUDE.md) for the design rationale, audit source (`~/.claude/projects/<slug>/<session-id>.jsonl`), skill list, and OAUDIT outcome family.

## Quick start

```bash
# After a PR merges, dispatch the audit (skills land in OAUDIT2/3/4):
claude run pr-audit-template/pr-audit-body --pr <merged-pr-number>
```

## Status

- **OAUDIT1** (this PR): plugin scaffold, manifest, README, CLAUDE.md
- **OAUDIT2**: `transcript-parse` skill (next)
- **OAUDIT3**: `waste-analyze` skill
- **OAUDIT4**: `pr-audit-body` skill + first dogfood run
