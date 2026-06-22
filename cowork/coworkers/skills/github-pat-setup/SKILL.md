---
name: github-pat-setup
description: >
  One-time deterministic setup of GITHUB_PERSONAL_ACCESS_TOKEN: check if a token
  already exists in macOS Keychain, guide the operator to create a fine-grained PAT
  on GitHub if needed, store it in macOS Keychain, export it to the shell profile
  and Claude Desktop env for the github plugin (.mcp.json), probe
  https://api.githubcopilot.com/mcp/ to verify GitHub MCP works, then write a
  completion DurableTask to the operator queue. Use WHENEVER the user says "set up
  github token", "github pat", "GITHUB_PERSONAL_ACCESS_TOKEN", "github mcp not
  working", "set up github plugin", "connect github mcp", or starts a session and
  the github plugin shows 401/missing. This activity is idempotent: if the token
  already exists and the MCP probe passes, it reports success and exits. Pairs with
  docker-mcp-toolkit-doctor and docker-mcp-toolkit-connect.
---

# github-pat-setup

One-time, idempotent setup of `GITHUB_PERSONAL_ACCESS_TOKEN` so the GitHub MCP
plugin (`cowork/plugins/github/.mcp.json`) can authenticate.

**Run every step in order. Never skip.** The whole skill is designed to be safe
to re-run — existing tokens are preserved, not overwritten.

## Context

The GitHub plugin in this repo authenticates via PAT over HTTP:

```json
{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/",
    "headers": { "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}" }
  }
}
```

The PAT must be available as `GITHUB_PERSONAL_ACCESS_TOKEN` in the shell env
whenever Claude Desktop (Claude.app), Claude Code (CLI), or a Cowork session
loads. The canonical store is **macOS Keychain** (the `security` CLI) — never a
dotfile committed to git, never `.env.defaults`.

---

## Step 1 — Check if token already exists

```bash
# Check macOS Keychain
STORED=$(security find-generic-password \
  -s "GITHUB_PERSONAL_ACCESS_TOKEN" \
  -a "claude-cowork" \
  -w 2>/dev/null)

if [ -n "$STORED" ]; then
  echo "[github-pat-setup] Token found in Keychain. Testing..."
  # Jump to Step 5 (probe)
else
  echo "[github-pat-setup] No token in Keychain. Proceeding with setup..."
fi
```

Also check the environment:

```bash
if [ -n "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
  echo "[github-pat-setup] Token present in env. Testing..."
  # Jump to Step 5 (probe)
fi
```

If either check passes, skip to Step 5. If Step 5 passes, report success and
write the completion DurableTask (Step 6). Don't recreate a working token.

---

## Step 2 — Verify PAT requirements

Before sending the operator to GitHub, tell them exactly what to create:

**Token type:** Fine-grained PAT (recommended). Use classic only if the target
org blocks fine-grained tokens.

**Token name:** `claude-cowork-github-mcp`

**Expiration:** No expiration (or 1 year if org policy requires one — set a
calendar reminder to rotate before it expires).

**Resource owner:** The GitHub user or org that owns the repos you'll work with.

**Repository access:** All repositories (or select the repos you need — start
broad, restrict later).

**Minimum permissions for GitHub MCP (40 tools):**

| Permission | Access | Why |
|---|---|---|
| Contents | Read & Write | Read/write files, commits |
| Issues | Read & Write | Create, edit, comment on issues |
| Pull requests | Read & Write | Open, merge, review PRs |
| Metadata | Read (auto-granted) | Repo info, always required |
| Actions | Read | View workflow runs |
| Discussions | Read & Write | GitHub Discussions |
| Projects | Read & Write | GitHub Projects (classic + new) |

Add `Administration: Read` if you need repo settings. Skip `Workflows` unless
you need to trigger Actions directly.

**Direct URL to create the PAT (pre-filled name):**

```
https://github.com/settings/personal-access-tokens/new?name=claude-cowork-github-mcp&description=GitHub+MCP+plugin+for+Claude+Desktop+%2F+Cowork
```

---

## Step 3 — Operator creates the PAT

This step requires the **operator in their browser** — Claude cannot create PATs.

Tell the operator:

> 1. Open the URL above in your browser.
> 2. Set Resource owner to your account (or org).
> 3. Set Repository access to "All repositories" (or select specific ones).
> 4. Under "Repository permissions", grant at minimum: Contents (Read/Write),
>    Issues (Read/Write), Pull requests (Read/Write), Metadata (Read).
> 5. Click "Generate token".
> 6. **Copy the token immediately** — GitHub shows it once only.
> 7. Paste it here so I can store it safely.

**Wait for the operator to paste the token before continuing.**

The token starts with `github_pat_` (fine-grained) or `ghp_` (classic).

---

## Step 4 — Store in macOS Keychain + shell profile

Once the operator provides the token, store it in two places:

### 4a — macOS Keychain

```bash
# Store in Keychain (replace TOKEN with the actual value)
security add-generic-password \
  -s "GITHUB_PERSONAL_ACCESS_TOKEN" \
  -a "claude-cowork" \
  -w "$TOKEN" \
  -U   # -U updates if already exists

echo "[github-pat-setup] ✓ Stored in macOS Keychain"
```

### 4b — Shell profile (so new terminals inherit it)

Check which shell profile is active:

```bash
PROFILE=""
if [ -f "$HOME/.zprofile" ]; then
  PROFILE="$HOME/.zprofile"
elif [ -f "$HOME/.zshrc" ]; then
  PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bash_profile" ]; then
  PROFILE="$HOME/.bash_profile"
fi
echo "Profile: $PROFILE"
```

Add a Keychain-sourcing stanza if not already present:

```bash
STANZA='# GITHUB_PERSONAL_ACCESS_TOKEN — loaded from macOS Keychain by github-pat-setup
export GITHUB_PERSONAL_ACCESS_TOKEN=$(security find-generic-password -s "GITHUB_PERSONAL_ACCESS_TOKEN" -a "claude-cowork" -w 2>/dev/null)'

if ! grep -q "GITHUB_PERSONAL_ACCESS_TOKEN" "$PROFILE" 2>/dev/null; then
  echo "" >> "$PROFILE"
  echo "$STANZA" >> "$PROFILE"
  echo "[github-pat-setup] ✓ Added Keychain loader to $PROFILE"
else
  echo "[github-pat-setup] ✓ Shell profile already has GITHUB_PERSONAL_ACCESS_TOKEN loader"
fi
```

**Why this pattern instead of hardcoding the value:** The token value never
appears in the shell profile — only the `security` command that reads from
Keychain. If the token is rotated, update Keychain only; the profile stays
unchanged.

### 4c — Export to current session

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=$(security find-generic-password \
  -s "GITHUB_PERSONAL_ACCESS_TOKEN" \
  -a "claude-cowork" \
  -w 2>/dev/null)
echo "[github-pat-setup] ✓ Exported to current session"
```

---

## Step 5 — Probe the GitHub MCP endpoint

Verify the token works against the actual MCP endpoint:

```bash
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $GITHUB_PERSONAL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.githubcopilot.com/mcp/")

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "307" ] || [ "$HTTP_STATUS" = "400" ]; then
  # 307 = redirect to MCP init, 400 = missing JSON body — both mean auth passed
  echo "[github-pat-setup] ✓ Probe passed (HTTP $HTTP_STATUS) — GitHub MCP authenticated"
  MCP_STATUS="connected"
else
  echo "[github-pat-setup] ✗ Probe failed (HTTP $HTTP_STATUS)"
  MCP_STATUS="auth_failed"
fi
```

**Expected statuses:**
- `200` / `307` / `400` → auth accepted, MCP is functional
- `401` → token invalid or missing — go back to Step 3
- `403` → token exists but lacks permissions — check scope in Step 2
- `000` → network error — check connectivity

---

## Step 6 — Write DurableTask to operator queue

```python
import json, uuid, datetime

status = "connected"   # or "auth_failed"

task = {
    "_type": "task",
    "id": str(uuid.uuid4()),
    "queue": "operator",
    "subject": f"GitHub PAT setup: {status}",
    "state": "completed" if status == "connected" else "failed",
    "created_at": datetime.datetime.utcnow().isoformat() + "Z",
    "updated_at": datetime.datetime.utcnow().isoformat() + "Z",
    "from": "github-pat-setup",
    "ke_fit_score": 5,
    "payload": {
        "token_source": "macOS Keychain (service=GITHUB_PERSONAL_ACCESS_TOKEN, account=claude-cowork)",
        "mcp_endpoint": "https://api.githubcopilot.com/mcp/",
        "probe_status": status,
        "shell_profile_updated": True,
        "resolvable": status == "auth_failed",
        "suggested_skill": "github-pat-setup" if status == "auth_failed" else None,
        "note": (
            "GITHUB_PERSONAL_ACCESS_TOKEN stored in macOS Keychain and shell profile. "
            "GitHub MCP plugin is functional."
        ) if status == "connected" else (
            "PAT probe failed. Re-run github-pat-setup and create a new token."
        ),
    }
}

with open("cowork/data/queues/operator.jsonl", "a") as f:
    f.write(json.dumps(task) + "\n")

print(f"[github-pat-setup] DurableTask written: {task['state']}")
```

---

## Step 7 — Claude Desktop restart note

For the env var to be picked up by Claude.app (which reads the shell env at
launch), the operator must **quit and relaunch Claude Desktop** after Step 4.

Tell the operator:

> The token is now in your Keychain and shell profile. To make the GitHub MCP
> plugin active in Cowork and Claude Code sessions:
>
> 1. **Quit Claude Desktop** (⌘Q in Claude.app).
> 2. **Open a new terminal** and verify: `echo $GITHUB_PERSONAL_ACCESS_TOKEN`
>    — it should print your token.
> 3. **Relaunch Claude Desktop** — the github plugin will now load with auth.
>
> You do NOT need to do this again. The Keychain lookup is permanent and the
> shell profile exports it on every new shell.

---

## Idempotency guarantee

| Run condition | Outcome |
|---|---|
| No token anywhere | Full setup flow (Steps 1–7) |
| Token in env, probe passes | Report success, write DurableTask, exit |
| Token in Keychain, probe passes | Report success, write DurableTask, exit |
| Token in Keychain, probe fails (401) | Guide rotation: new token → Step 3 |
| Token in Keychain, probe fails (403) | Guide permission expansion: update scopes |

Never prompt for a new token if an existing one probes successfully. Never
overwrite a working token.

---

## Security invariants

- **Never commit the token to git.** `.env.defaults` is committed — never put
  the token there. The Keychain stanza in the shell profile only calls
  `security find-generic-password`, not the value.
- **Never log the token value.** All log lines use `$MCP_STATUS` or
  `"✓ stored"`, not the token string.
- **Token stays in Keychain.** Other tools read via `security find-generic-password`.
  Claude never needs to see the raw value again after Step 4a.
- **ANTHROPIC_API_KEY forbidden.** This skill sets only
  `GITHUB_PERSONAL_ACCESS_TOKEN`. Never set `ANTHROPIC_API_KEY` — the OAuth gate
  rejects it at `src/oauth/token.ts`. `@cite .env.defaults` OAuth-only invariant.

---

## Quick rotation (when token expires)

```bash
# 1. Create new PAT on GitHub (same scopes, new name)
#    https://github.com/settings/personal-access-tokens

# 2. Update Keychain (replace NEW_TOKEN)
security add-generic-password \
  -s "GITHUB_PERSONAL_ACCESS_TOKEN" \
  -a "claude-cowork" \
  -w "$NEW_TOKEN" \
  -U

# 3. Export to current session
export GITHUB_PERSONAL_ACCESS_TOKEN=$(security find-generic-password \
  -s "GITHUB_PERSONAL_ACCESS_TOKEN" -a "claude-cowork" -w)

# 4. Probe to confirm
curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $GITHUB_PERSONAL_ACCESS_TOKEN" \
  "https://api.githubcopilot.com/mcp/"
# Expect: 200 | 307 | 400

# 5. Quit + relaunch Claude Desktop if using Cowork mode
```

Shell profile picks up the new value automatically on next shell open — no
profile edit needed.
