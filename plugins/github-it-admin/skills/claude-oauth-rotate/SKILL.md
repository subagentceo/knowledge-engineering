---
name: claude-oauth-rotate
description: Re-mint CLAUDE_CODE_OAUTH_TOKEN via `claude setup-token` and dual-write to gh org + repo. Use when rotating the Claude Code OAuth token (quarterly per docs/operator-runbooks/secret-rotation.md, immediately on compromise, or when switching the active identity between admin-jadecli and alex-jadecli). Wraps the manual flow used 2026-05-18 into a reusable scaffold.
---

# claude-oauth-rotate

## When to invoke

- Quarterly rotation per `docs/operator-runbooks/secret-rotation.md`.
- On compromise (e.g., token displayed in a context that shouldn't have seen it).
- When switching the OAuth identity (e.g., admin-jadecli → alex-jadecli, as done 2026-05-18).
- After running `/install-github-app` (which writes the repo-scope secret; this skill ensures org-scope matches).

## Why interactive (no full automation)

`claude setup-token` opens a browser for OAuth approval — it can't be driven by an agent. The script `scripts/rotate.sh` therefore implements the **operator-paste pattern** (same as `plugins/macos-it-admin/skills/turbopuffer-crud`):

1. Operator runs `claude setup-token` in a terminal; copies the printed token.
2. Operator runs this skill's `scripts/rotate.sh`.
3. Script reads the token from `pbpaste` (macOS clipboard) — never `read -p`, which would print the prompt to terminal scrollback.
4. Pipes value through `gh secret set` for both org and repo scope.
5. Wipes clipboard. Self-deletes if invoked as a one-shot.

The value never enters Claude's context. This is the **exact pattern used successfully on 2026-05-18** to rotate from admin-jadecli to alex-jadecli.

## Verbs

### CREATE / UPDATE (same operation — re-mint always overwrites)

```bash
# Step 1: in a terminal, run claude setup-token (interactive; browser opens):
claude setup-token
# → approve in browser, token prints in terminal, copy to clipboard

# Step 2: run this script (reads from clipboard, dual-writes, wipes):
bash "${CLAUDE_PLUGIN_ROOT}/skills/claude-oauth-rotate/scripts/rotate.sh"
```

The script:
- Reads `CLAUDE_CODE_OAUTH_TOKEN` value from `pbpaste`
- Asserts length is plausible (`>= 50` chars; 41 was the wrong-thing-copied signature from the 2026-05-18 incident)
- Pipes into `gh secret set --org ${user_config.gh_org} --visibility selected --repos ${user_config.gh_repo}`
- Pipes into `gh secret set --repo ${user_config.gh_org}/${user_config.gh_repo}`
- Wipes clipboard (`printf '' | pbcopy`)
- Prints updated timestamps from `gh secret list` so operator can confirm both moved

### READ

```bash
gh secret list --org "${user_config.gh_org}" --json name,updatedAt -q '.[] | select(.name=="CLAUDE_CODE_OAUTH_TOKEN")'
gh secret list --repo "${user_config.gh_org}/${user_config.gh_repo}" --json name,updatedAt -q '.[] | select(.name=="CLAUDE_CODE_OAUTH_TOKEN")'
```

Both timestamps should match (or org should be newer than repo, never the inverse, since repo-scope wins in resolution per gh docs).

### DELETE

Don't. The Claude Code Action workflows in this repo (`claude.yml`, `claude-code-review.yml`) hard-reference `secrets.CLAUDE_CODE_OAUTH_TOKEN`. Deleting causes 401s on every CI run. To "revoke" — re-mint via CREATE (which overwrites the old value, invalidating it upstream via Anthropic's session-rotation behavior).

## Anti-silent-failure rules

1. **Never paste the value into the chat.** Script reads from `pbpaste` exclusively.
2. **Plausibility check on length.** The 2026-05-18 incident captured a 41-char value that was actually the OAuth `code` query param, not the exchanged token. Real tokens are 50+ chars. Script aborts on `< 50`.
3. **Read-after-write verify.** Script prints both timestamps via `gh secret list`. Operator visually confirms both moved.
4. **Self-delete the script after one use** if invoked from `/tmp` (matches the 2026-05-18 pattern); skip self-delete when running from the plugin tree (the script there is reusable).

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT2-oauth-1 | Script reads only from clipboard (`pbpaste`), never `read -p` | `src/lib/github-it-admin-plugin.test.ts` |
| OIT2-oauth-2 | Asserts length >= 50 chars before piping to `gh secret set` | same test |
| OIT2-oauth-3 | Dual-writes to both org and repo | same test |
| OIT2-oauth-4 | Clipboard wiped after use | same test |

## Citations

@cite docs/operator-runbooks/secret-rotation.md
@cite docs/decisions/2026-05-17-secret-store-tiers.md (OSEC2)
@cite vendor/anthropics/code.claude.com/docs/en/github-actions.md (OAuth setup section)
@cite https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md
