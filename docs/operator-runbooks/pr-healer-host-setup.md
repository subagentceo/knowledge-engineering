# Operator runbook: spawn the PR-healer host

> One-page checklist. Operator-only — Claude cannot run `claude` CLI commands itself.

The PR-healer is a long-lived opus-4.7-1m Remote Control session whose
only job is keeping open `automerge`-labeled PRs green. Spawn it once,
send it a `/goal`, walk away. See the [`pr-healer` skill](../../plugins/platform-engineering/skills/pr-healer/SKILL.md).

## Preflight (one time per machine)

- [ ] `claude --version` reports `2.1.51` or later
- [ ] `env | grep ANTHROPIC_API_KEY` is empty (OAuth-only invariant)
- [ ] `gh auth status` shows an authenticated user with `repo` scope
- [ ] From the repo root, run `claude` once and accept the workspace trust dialog

## Step 1 — Start the healer host

In a terminal at the repo root:

```
npm run rc:healer
```

This runs `claude remote-control --capacity 4 --spawn worktree --name pr-healer`.
The terminal prints a session URL and (tap spacebar) a QR code.
Capacity 4 is deliberate: the healer rarely needs more than 1-2
concurrent worktrees, and a low cap prevents the healer from
starving the operator's normal `npm run rc` (capacity 32).

## Step 2 — Pair from claude.ai/code

- [ ] Open the printed URL on claude.ai/code, or scan the QR with the Claude phone app
- [ ] Confirm the session is paired to host `pr-healer` (shown in the session header)

## Step 3 — Send the goal

In the paired claude.ai/code session, type:

```
/goal "keep healing failing CI on open automerge PRs until none failing"
```

The session will keep taking turns until the small evaluator model
agrees the goal predicate holds. The healer follows the
[`pr-healer` skill](../../plugins/platform-engineering/skills/pr-healer/SKILL.md)
and uses the
[`diagnose-check-failure` paste-prompt](../../plugins/platform-engineering/skills/pr-healer/prompts/diagnose-check-failure.md)
for each failing check.

## Step 4 — Walk away

- [ ] Close the laptop. The host terminal stays running; paired sessions resume on reconnect.
- [ ] Check back via the phone or claude.ai/code session history.

## Step 5 — Stop the healer

When the merge train is quiet (or you need the capacity back):

- [ ] In the paired session: `/goal clear`
- [ ] In the host terminal: `Ctrl-C`

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `disableRemoteControl` error on host start | Managed setting blocking RC | Remove `disableRemoteControl: true` from `.claude/settings*.json`. Enforced by `src/lib/remote-control-posture.test.ts`. |
| Healer keeps escalating every PR | `gh` token lacks `repo` scope on the target | `gh auth refresh -s repo` |
| Healer commits land under the wrong identity | `git config user.email` not set per worktree | Set it in the spawned worktree or in `~/.gitconfig` |
| Healer never converges | Same flaky test loops forever | Move it to `src/lib/*.flaky.test.ts` so the classifier marks it `flaky` deterministically, or add a `no-automerge` label to the PR |

## See also

- [`pr-healer` skill](../../plugins/platform-engineering/skills/pr-healer/SKILL.md)
- [`remote-control-host` skill](../../plugins/platform-engineering/skills/remote-control-host/SKILL.md)
- [ADR — Remote Control adoption (ORC1)](../decisions/2026-05-17-remote-control-adoption.md)
