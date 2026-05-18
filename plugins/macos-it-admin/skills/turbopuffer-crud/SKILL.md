---
name: turbopuffer-crud
description: CRUD over Turbopuffer API keys. UNIQUE among the 5 vendors in this plugin — Turbopuffer exposes NO admin REST API and NO MCP connector, so all token operations are browser-driven via turbopuffer.com/dashboard/api-keys. This skill documents the operator-paste flow with anti-silent-failure scaffolding; it does NOT automate the browser, because doing so requires screenshotting the one-shot value (the 2026-05-17 anti-pattern).
---

# turbopuffer-crud

## When to invoke

- Quarterly rotation of `TURBOPUFFER_API_KEY_WRITE` per `docs/operator-runbooks/secret-rotation.md`.
- When provisioning a read-only key for analytics access.
- On suspected key compromise.

## Why this skill is browser-only

Turbopuffer's API (as of 2026-05-17 verified at https://turbopuffer.com/docs) exposes only data-plane operations (`POST /v1/namespaces/...`) — no `/v1/api-keys` or equivalent admin surface. Vendor design choice; mirrors several other AI-native vendors.

OSEC3's minter pattern requires a token-mint REST endpoint. Without one, the only path is the dashboard. This skill therefore **does not implement a `scripts/create.ts` like the other 4 vendor CRUD skills do**. Instead it provides:

1. A guided operator-paste flow (the "least-exposure" browser pattern).
2. Read-after-write verification using Turbopuffer's data-plane (`GET /v1/namespaces`) to prove the new key works.

## Verbs

### CREATE — operator-paste flow

The skill prints these steps and waits at a `read -rs` prompt:

```bash
cat <<'EOF'
=== TURBOPUFFER KEY CREATE ===
1. Open https://turbopuffer.com/dashboard/api-keys in your browser
2. Click "Create API Key"
3. Name: "knowledge-engineering-write-$(date +%Y-%m-%d)"
4. Permissions: Write (matches TURBOPUFFER_API_KEY_WRITE convention)
5. Click Create
6. The value displays ONCE. Click the copy button — do NOT screenshot.
7. Paste at the prompt below; press Enter (no echo).
EOF

read -rs VAL && echo "(got $(echo -n "$VAL" | wc -c) chars)"

# Dual-write
printf '%s' "$VAL" | gh secret set --org subagentceo \
  --visibility selected --repos knowledge-engineering TURBOPUFFER_API_KEY_WRITE
printf '%s' "$VAL" | gh secret set TURBOPUFFER_API_KEY_WRITE

# Optional runtime tier
if [ -n "$CLOUDFLARE_SECRETS_STORE_ID" ]; then
  wrangler secrets-store secret create "$CLOUDFLARE_SECRETS_STORE_ID" \
    --name TURBOPUFFER_API_KEY_WRITE --value "$VAL" --scopes workers --remote
fi

# Read-after-write verify: list namespaces with the new key
curl -sS https://api.turbopuffer.com/v1/namespaces \
  -H "Authorization: Bearer $VAL" \
  -o /dev/null -w "HTTP %{http_code}\n"

unset VAL
```

If the curl prints `HTTP 200`, the new key works. If `HTTP 401`, the value didn't take.

The full scaffold lives at `scripts/create.sh` in this skill directory.

### READ — list (browser-only)

Turbopuffer dashboard at https://turbopuffer.com/dashboard/api-keys shows name + created date + last-used + scope. No API equivalent.

### UPDATE — re-mint with new scope

Turbopuffer keys, like Cloudflare's, are immutable in scope. UPDATE = CREATE new + verify consumer + DELETE old. Same dashboard, same paste flow.

### DELETE — revoke

Browser: dashboard → Actions → Delete. Confirm. No API equivalent.

After delete: rerun a smoke test that uses the key (e.g., `npm run dev` and exercise a namespace query). If the deletion targeted the still-active key, expect 401. Mitigation as Cloudflare-crud: only DELETE after a green smoke on the replacement.

## Anti-silent-failure rules

1. **Never run this skill from a Claude in Chrome session.** Claude has no clipboard-only read primitive for browser-rendered values; reading the value via `read_page`, `find`, or screenshot puts it in the conversation context (the 2026-05-17 anti-pattern).
2. The operator-paste flow uses `read -rs` (silent + no history) — value is in the shell variable for the dual-write block only, `unset` immediately after.
3. Read-after-write `HTTP 200` from `/v1/namespaces` is the only positive signal — without it, assume the write silently failed.

## When the operator will hate this

When they have to rotate this quarterly and there's no script. Document the upstream gap in vendor-feedback memory; if Turbopuffer ships a `/v1/api-keys` endpoint, this skill flips to the OSEC3 script pattern in one commit.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT1-tp-1 | The skill does NOT contain a `scripts/create.ts` — only `scripts/create.sh` operator-paste scaffold | `ls plugins/macos-it-admin/skills/turbopuffer-crud/scripts/` |
| OIT1-tp-2 | Read-after-write verify via `/v1/namespaces` is in the scaffold | the scaffold file's last block |
| OIT1-tp-3 | Skill explicitly forbids Claude-in-Chrome execution | this file's "Anti-silent-failure rules" §1 |

## Citations

@cite docs/decisions/2026-05-17-cf-token-mint.md (the anti-pattern this skill avoids)
@cite docs/decisions/2026-05-17-secrets-parity.md
@cite docs/operator-runbooks/secret-rotation.md
