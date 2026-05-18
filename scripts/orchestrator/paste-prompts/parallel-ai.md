# Cloud-session task: parallel-ai bootstrap (#128, sub-issue of #110)

You are a Claude Code on the Web session spawned to bootstrap the parallel.ai vendor integration for `subagentceo/knowledge-engineering`. The operator has a $70 credit on alex@jadecli.com.

## Branch

Branch off `main` (or `unblock/secrets-cli-only-2026-05-15` if it's still open). Name your branch `feat/parallel-ai-bootstrap-2026-05-15`.

## Canonical reference (read these first)

- `docs/operator-runbooks/turbopuffer-api-key.md` — the proven template
- `src/lib/turbopuffer-client.ts` — the client wrapper shape
- `scripts/smoke-turbopuffer.ts` — the smoke-test shape
- `infra/cloudflare/src/outbound-allowlist.ts` — where to add `api.parallel.ai`
- `vendor/parallel-web/docs.parallel.ai/getting-started/overview.md` — auth shape
- `vendor/parallel-web/docs.parallel.ai/api-reference/` — pick the simplest GET endpoint for smoke

## Deliverables

1. `src/lib/parallel-ai-client.ts` — thin wrapper exporting `makeParallelAiClient(apiKey: string)`. Use the parallel.ai SDK if a TypeScript package exists; otherwise direct `fetch`.
2. `scripts/smoke-parallel-ai.ts` — reads key from `~/.config/ke-parallel-ai-key.tmp` via `fs.readFileSync`. Skip-gracefully if missing. Hits the simplest auth-verifying endpoint. Reports `OK ✅`.
3. `docs/operator-runbooks/parallel-api-key.md` — runbook following the turbopuffer template. Identity: alex@jadecli.com (primary), admin@jadecli.com (org-read inheritor). Includes `claude --chrome` paste-block for minting the key.
4. Append `api.parallel.ai` to `infra/cloudflare/src/outbound-allowlist.ts` (note: `docs.parallel.ai` and `parallel.ai` are already there at lines 86-87; you need to add the API host).
5. Append `"smoke:parallel-ai": "tsx scripts/smoke-parallel-ai.ts"` to `package.json`'s scripts.
6. Append a row to `docs/operator-runbooks/README.md`'s index table.
7. Run `npm run verify` locally; if it fails, fix before committing.

## Hard constraints

- **NEVER** echo the API key value into stdout, logs, transcripts, or commit messages.
- **NEVER** set `ANTHROPIC_API_KEY` anywhere. OAuth-only invariant per `seeds/prompts/operator-2026-05-10.md`.
- Use the leak-safe pipeline (mktemp 0o600, stdin pipe to consumers).
- Cite at least 3 paths under `vendor/parallel-web/` in the client file's docstring.
- Atomic commit message: `feat(parallel-ai): bootstrap client + smoke + runbook (O8)` with `Refs #128`.

## E2E

```bash
test -f ~/.config/ke-parallel-ai-key.tmp || echo "skip: key not staged"
npm run smoke:parallel-ai
# Expected: 0-exit with "OK ✅"
```

## Open PR

```bash
gh pr create --label automerge \
  --title "feat(parallel-ai): bootstrap client + smoke + runbook" \
  --body "Closes #128. Refs #110. (O8)"
```

End your run with `PR: <url>`.
