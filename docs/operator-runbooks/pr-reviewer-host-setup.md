# Runbook — PR reviewer host setup

How to spawn the long-lived Opus-4.7-1M Remote Control session that
runs the `pr-reviewer-roving` skill across all open PRs in this repo.

## Why a separate host

The roving reviewer must run as an identity **distinct from the PR
author**, otherwise GitHub silently drops self-approvals. The host
session also outlives any single Claude Desktop / CLI window — it
sits in a Remote Control session for hours and sweeps the PR queue
continuously.

## Identity choice

Pick one of the three active aliases (see `~/.claude/CLAUDE.md`).
Recommended: `admin-jadecli` or `zhoukalex` — anything except the
identity that authored the bulk of the PRs being reviewed.

Verify the chosen alias has a `gh` token in scope:

```bash
gh auth status --hostname github.com
gh auth token --user <alias>
```

## Spawn the session

1. Open a fresh Claude Code session (CLI or Desktop) on the chosen
   identity's Max account.

2. Set the cwd to a clean checkout of this repo:

   ```bash
   cd /path/to/knowledge-engineering
   ```

3. Load the skill explicitly so the session knows the roving posture:

   ```
   /skills pr-reviewer-roving
   ```

   Or, if the operator prefers to scope by plugin, ensure the
   `platform-engineering` plugin is installed (see
   `plugins/platform-engineering/.claude-plugin/plugin.json` — this
   skill ships as part of that plugin's `skills[]` array).

4. Hand the session the operating prompt:

   > Rove the open PRs in this repo. Apply the `pr-reviewer-roving`
   > skill exactly as documented. Sweep every 10 minutes. Stop only
   > when the operator messages STOP or the 5-hour window closes.

## Pairing with `/loop` or `/schedule`

For unattended operation, wrap the sweep in `/loop`:

```
/loop 10m Sweep open PRs per the pr-reviewer-roving skill.
```

`/loop` is documented at
[`vendor/anthropics/code.claude.com/docs/en/remote-control.md`](../../vendor/anthropics/code.claude.com/docs/en/remote-control.md).

For cross-session continuity (the 5-hour cap forces rotation), pair
with `/schedule` so the next account in the rotation picks up the
queue automatically:

```
/schedule "every 5 hours" /loop 10m Sweep open PRs per the pr-reviewer-roving skill.
```

## Safety bounds

- The reviewer **never** runs `gh pr merge --admin` — only
  `gh pr merge --auto --squash`. Branch protection still gates the
  final merge.
- The reviewer **never** pushes commits, force-pushes, or modifies
  PR bodies / branches. It only posts comments and toggles
  auto-merge.
- The reviewer **never** approves PRs authored by itself (GitHub
  enforces this; we just don't rely on it as the only guard — pick
  an alias that isn't authoring PRs).
- The `[approve-pending: operator-decision]` shape is a signal to
  the operator, not a blocking GitHub review. The operator owns the
  decision to merge, push back, or fix.

## Stopping the session

- Type `STOP` in the Remote Control session — the loop guard
  recognizes it and exits cleanly.
- Or close the Claude window; `/loop` halts when the session ends.
- Or wait for the 5-hour cap; the session ends naturally.

## See also

- `plugins/platform-engineering/skills/pr-reviewer-roving/SKILL.md` — the skill itself
- `plugins/platform-engineering/skills/pr-reviewer-roving/prompts/structured-review.md` — the only two comment shapes the reviewer may post
- `docs/governance.md` — branch ruleset + auto-merge state machine this skill plugs into
- `~/.claude/CLAUDE.md` — active alias inventory
