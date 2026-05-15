---
runbook: turbopuffer-api-key
outcome: TURBOPUFFER_API_KEY (or _WRITE variant) provisioned + chassis wired
unblocks: Phase 14.B vector-store integration (#127)
operator-manual-steps: 2FA on turbopuffer.com dashboard; key value never typed into terminal scrollback
---

# Runbook: provision `TURBOPUFFER_API_KEY` + wire the chassis

> **Bootstrap entry recorded 2026-05-15:** This runbook was written *during* a
> bootstrap session in which the operator provided a temporary `_WRITE`-scoped
> key (`tpuf_*`, 37 bytes) for same-day use. The key value entered the chat
> transcript at 2026-05-15 ~04:10 PT; operator confirmed auto-revoke at EOD
> 2026-05-15 PT. See **§ Failure modes encountered** for the full leak audit.

## Identity

| Role | Identity |
| --- | --- |
| Subscription owner ($64/mo premium) | alex@jadecli.com / alex-jadecli |
| Org-read inheritor | admin@jadecli.com / admin-jadecli (via turbopuffer team feature once provisioned — see #132) |
| GH secret target | `subagentceo/knowledge-engineering` |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae` (alex@jadecli.com's CF account), store id `565244614fc34be7aa8488ce46112f60` |

## Outcome

A GitHub Actions repo secret AND a CF Secrets Store entry both named
**`TURBOPUFFER_API_KEY`** (or `_WRITE` variant during bootstrap) exist on
`subagentceo/knowledge-engineering`. The chassis can read the key via
`process.env.TURBOPUFFER_API_KEY_WRITE` (Node scripts) or
`env.TURBOPUFFER_API_KEY_WRITE.get()` (Worker bindings) and successfully
write to the operator's brand-new turbopuffer account at region
`gcp-us-central1`.

## Rubric

- [x] **R1.** `gh secret list --repo subagentceo/knowledge-engineering | grep TURBOPUFFER` returns a row. Verified 2026-05-15 04:12Z (`TURBOPUFFER_API_KEY_WRITE` Updated `2026-05-15T11:12:31Z`).
- [x] **R2.** CF Secrets Store entry exists, store id `565244614fc34be7aa8488ce46112f60`. Verified 2026-05-15 04:12Z (`TURBOPUFFER_API_KEY_WRITE` id `f4f7c359e8b7405985c1f4b36e3b4ab7`).
- [x] **R3.** Key value never echoed to chat transcript, never piped through `cat`/`tee`/`echo` of a curl response, never appears in shell history. Pipeline: Node `fs.writeFileSync` to mode-0o600 file → `cat <file> | wrangler/gh ... --remote` via stdin. See `scripts/smoke-turbopuffer.ts` for the reference pattern (Node `readFileSync` only).
- [x] **R4.** `infra/cloudflare/src/outbound-allowlist.ts` includes both `turbopuffer.com` (base) AND `*.turbopuffer.com` (regional API hosts). Verified `gcp-us-central1.turbopuffer.com` is reachable from the Worker.
- [x] **R5.** `@turbopuffer/turbopuffer ^2.0.0` is a dep in `package.json` AND `infra/cloudflare/package.json`. Verified via `npm install` + lockfile presence.
- [x] **R6.** `src/lib/turbopuffer-client.ts` exposes `makeTurbopufferClient(apiKey)` and `getNamespace(client, name)` — additive to existing `src/lib/embeddings.ts`, NOT a replacement.
- [x] **R7.** Smoke test passes: `npm run smoke:turbopuffer` writes 2 rows to namespace `ke-smoke-2026-05-15-sdk` and reports `rows_upserted: 2`. Verified 2026-05-15 04:14Z.
- [ ] **R8** (post-EOD). The bootstrap WRITE key is revoked (operator auto-revoke EOD 2026-05-15 PT). Verify with: `curl -sS -X POST https://gcp-us-central1.turbopuffer.com/v2/namespaces/ke-smoke-write-2026-05-15 -H "Authorization: Bearer <key>" -d '{}'` returns 401. **Tracked as the closing condition of this runbook's first iteration.**
- [ ] **R9** (#132). A long-lived `TURBOPUFFER_API_KEY` (read+write, separate from the bootstrap `_WRITE` key) is provisioned and admin@jadecli.com is invited to the turbopuffer team. Closes #127 fully.

## Citations

Cited from:

- `vendor/turbopuffer/turbopuffer.com/docs/quickstart.md:17` — `Authorization: Bearer $TURBOPUFFER_API_KEY` (the auth shape)
- `vendor/turbopuffer/turbopuffer.com/docs/permissions.md:23` — application-level attribute-based permissions (relevant for #132's admin-jadecli scoping)
- `vendor/turbopuffer/turbopuffer.com/docs/namespaces.md:60` — namespaces are implicit on first write
- `vendor/turbopuffer/turbopuffer.com/docs/regions.md` — region selection (`gcp-us-central1` is operator's default)
- `vendor/turbopuffer/turbopuffer.com/docs/write.md` — `upsert_rows`, `distance_metric`, `schema` shape
- `vendor/turbopuffer/turbopuffer.com/docs/architecture.md` — multi-tenancy / per-namespace permissions

## Bootstrap path (this session, 2026-05-15)

Used **once** to unblock chassis development. Key is auto-revoked EOD.

1. Operator provides `tpuf_<37-char-key>` directly in the chat (`_WRITE`-scoped, brand-new account, 0 data).
2. Agent stages the value to `~/.config/ke-turbopuffer-write-key.tmp` (mode 0o600) via a self-deleting Node script that reads from `process.env.K`. The value never appears in subsequent Bash tool calls.
3. Agent verifies auth via `curl -X POST .../v2/namespaces/ke-smoke-probe.../query`: 403 with "API key does not have permission" proves auth + write-only scope.
4. Agent verifies write via `curl -X POST .../v2/namespaces/ke-smoke-write-2026-05-15` with a 1-row upsert: 200 + `rows_upserted:1`.
5. `cat ~/.config/ke-turbopuffer-write-key.tmp | wrangler secrets-store secret create 565244614fc34be7aa8488ce46112f60 --name TURBOPUFFER_API_KEY_WRITE --scopes workers --remote`
6. `cat ~/.config/ke-turbopuffer-write-key.tmp | gh secret set TURBOPUFFER_API_KEY_WRITE --repo subagentceo/knowledge-engineering`
7. `npm install @turbopuffer/turbopuffer` (root + `infra/cloudflare/`)
8. Write `src/lib/turbopuffer-client.ts` (thin wrapper over the SDK)
9. Write `scripts/smoke-turbopuffer.ts` (writes 2 rows via SDK; key read via `readFileSync`)
10. Run `npm run smoke:turbopuffer`: expect `rows_upserted: 2`.
11. (deferred) Operator manually revokes the bootstrap key at EOD via the dashboard.
12. Cleanup: `rm -P ~/.config/ke-turbopuffer-write-key.tmp` (macOS overwrite-then-unlink).

## Production path (`claude --chrome` paste-block — for follow-up #132)

Run this once the bootstrap key has been revoked, to provision a long-lived read+write key.

```
You are Claude in Chrome (model: Opus 4.7), running in the operator's
authenticated browser session. Your outcome is to provision a long-lived
TURBOPUFFER_API_KEY (read+write) on the operator's premium account at
turbopuffer.com, then invite admin@jadecli.com as a team member.

Citations the operator expects you to honor:
- vendor/turbopuffer/turbopuffer.com/docs/permissions.md
- vendor/turbopuffer/turbopuffer.com/docs/architecture.md

## Steps

1. Open https://turbopuffer.com/dashboard.
2. Confirm signed in as alex@jadecli.com. If not, pause and ask the
   operator to sign in.
3. Navigate to Account Settings → API Keys.
4. Click "Create API Key". Name: "ke-cloud-agent-prod-<date>".
   Scopes: full read+write (NOT _WRITE-only — this replaces the bootstrap).
5. The dashboard shows the key value ONCE. Click "Copy".
   DO NOT paste into chat. The value goes directly into GitHub via the
   next step.
6. Open https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions
7. Click "New repository secret".
8. Name = TURBOPUFFER_API_KEY. Value = paste from clipboard.
9. Click "Add secret".
10. Return to turbopuffer.com dashboard. Navigate to Team / Members.
11. Click "Invite member". Email = admin@jadecli.com. Role = read-only
    (or whatever the lowest read tier turbopuffer offers).
12. Click "Send invite".
13. Run the rotation script that re-mints the CF Secrets Store entry
    from the new GH secret (or invoke the CI workflow's `bootstrap-secrets`
    job which does this automatically).
14. Report:
    - "✓ turbopuffer prod key created"
    - "✓ GH secret TURBOPUFFER_API_KEY set"
    - "✓ admin@jadecli.com invited as team member"
    - DO NOT include the key value.

## Safety

- If 2FA is required, pause and ask the operator to confirm.
- NEVER paste the key value into chat output or any file outside the
  GH secret form.
- If the dashboard shows the wrong account, pause and ask which to use.
- If admin@jadecli.com invitation requires payment-plan upgrade,
  pause and surface that to the operator.
```

## Verification

```bash
# GH secret + CF Secrets Store both present
gh secret list --repo subagentceo/knowledge-engineering | grep TURBOPUFFER
npx --prefix infra/cloudflare wrangler secrets-store secret list 565244614fc34be7aa8488ce46112f60 --remote | grep TURBOPUFFER

# Outbound allow-list rule present
grep -E '\*\.turbopuffer\.com' infra/cloudflare/src/outbound-allowlist.ts

# SDK + smoke test
test -f src/lib/turbopuffer-client.ts && echo "client ✅"
npm run smoke:turbopuffer
# Expect: rows_upserted: 2, "OK ✅"

# Post-EOD revocation sanity check
curl -sS -o /dev/null -w "%{http_code}\n" -X POST \
  -H "Authorization: Bearer $(cat ~/.config/ke-turbopuffer-write-key.tmp 2>/dev/null || echo BOGUS)" \
  -d '{"upsert_rows":[{"id":1,"vector":[0,0,0]}],"distance_metric":"cosine_distance"}' \
  https://gcp-us-central1.turbopuffer.com/v2/namespaces/anyns
# After EOD revoke: expect 401. Today: expects 200.
```

## Failure modes encountered

### F1. Bootstrap key leaked into transcript (2026-05-15 ~04:10Z)

**What happened.** The operator provided the bootstrap `_WRITE` key value directly in a chat message (`tpuf_*`, 37 bytes) to unblock same-day development. The value entered:
- The agent's conversation context (in-memory).
- The JSONL session record on disk at `~/.claude/projects/-Users-alexzh-knowledge-engineering/581f8397-6f88-4e04-a34b-4426a5c70b48.jsonl`.

**Mitigation (in operator's plan).**

1. **Bounded use.** Key was scoped `_WRITE`-only on a brand-new account with 0 data. Read of any namespace returns 403 with "API key does not have permission" (verified 2026-05-15 04:11Z). No read-data exposure possible.
2. **Same-day auto-revoke.** Operator confirmed revocation at EOD 2026-05-15 PT. After revoke, all `Authorization: Bearer <key>` calls return 401 (verifiable via R8 above).
3. **Filesystem residue.** The JSONL session record contains the value until rotated. The same residual-risk footnote applies as the F1 entry in `desktop-driven-unblock-2026-05-15.md`: bounded by local-FS access + any backups of `~/.claude/projects/`.

**Plumbing change to prevent recurrence.**

- **Future keys MUST follow the F2 pipeline** documented in `docs/outcomes/desktop-driven-unblock-2026-05-15.md` § F1: operator stages the value to a mode-0600 file via a TTY-side `read -rs` invocation on their own machine, then the agent consumes the file via stdio without re-typing the value into any tool call. This bootstrap was a one-time exception authorized by the operator for development unblock.
- **Production key (R9 / #132)** uses the `claude --chrome` paste-block flow above, which routes the value Clipboard → GH UI → GH secret WITHOUT the agent observing the value.

## Rotation

- **Bootstrap key (this iteration).** Auto-revoked EOD 2026-05-15 PT. Operator confirms at <https://turbopuffer.com/dashboard> → Account Settings → API Keys → Delete.
- **Production key (post-#132).** Re-mint via the `claude --chrome` paste-block above. Yearly or post-leak.
- **CF Secrets Store entry rotation.** Same stdin-pipe pattern as `scripts/mint-claude-oauth-secret.ts` and `scripts/mint-neon-api-secret.ts` (#116 deliverable).
