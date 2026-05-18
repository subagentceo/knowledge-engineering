# Cloud-session task: ollama-cloud bootstrap (#129, depends on #131 vendor crawl)

You are a Claude Code on the Web session spawned to bootstrap the ollama-cloud vendor integration for `subagentceo/knowledge-engineering`. The operator has a $20 paid tier on alex@jadecli.com.

## Critical: citation gap

`vendor/ollama/` does NOT exist in the repo yet. **Phase 0 of your work is to fill the citation gap by crawling ollama.com/docs/cloud.**

## Branch

Branch off `main`. Name your branch `feat/ollama-cloud-bootstrap-2026-05-15`.

## Phase 0: vendor crawl (closes #131)

1. Read `scripts/crawl-vendors.ts` to understand the vendor registration shape (look for `CrawlConfig` interface around line 59).
2. Add an `ollama` entry. Seed URL: `https://ollama.com/docs/cloud` or `https://ollama.com/llms.txt` (check which exists first via `curl -sS -o /dev/null -w "%{http_code}\n"`).
3. Run `npm run crawl:vendor -- ollama`.
4. Verify `find vendor/ollama -name '*.md' | wc -l` returns ≥ 5.

## Phase 1: vendor wiring (closes #129)

Now you have `vendor/ollama/` to cite. Mirror the turbopuffer pattern:

1. Read the freshly-crawled `vendor/ollama/ollama.com/docs/cloud/` to find:
   - The API host (likely `https://api.ollama.com` or `https://ollama.com/api`)
   - The auth header shape (almost certainly `Authorization: Bearer ...`)
   - The simplest GET endpoint for smoke (probably `GET /api/tags` or `GET /api/v1/models`)

2. Deliverables:
   - `src/lib/ollama-client.ts` — thin wrapper exporting `makeOllamaCloudClient(apiKey: string)`
   - `scripts/smoke-ollama-cloud.ts` — reads key from `~/.config/ke-ollama-cloud-key.tmp`. Hits the simplest auth endpoint. Reports `OK ✅` or skip.
   - `docs/operator-runbooks/ollama-cloud-api-key.md` — runbook following turbopuffer template
   - Append `ollama.com` AND `api.ollama.com` to `infra/cloudflare/src/outbound-allowlist.ts`
   - Append `"smoke:ollama-cloud": "tsx scripts/smoke-ollama-cloud.ts"` to `package.json`
   - Append a row to `docs/operator-runbooks/README.md`

3. Run `npm run verify`.

## Hard constraints

- Same as turbopuffer: no key echo, OAuth-only invariant, leak-safe pipeline.
- Atomic commits: ONE for the crawl, ONE for the wiring. Both `(O8)`.
- Citation discipline: every test file's `@cite` header must point at a real path under the freshly-crawled `vendor/ollama/`.

## E2E

```bash
test -f ~/.config/ke-ollama-cloud-key.tmp || echo "skip: key not staged"
npm run smoke:ollama-cloud
```

## Open 2 PRs (or one with both commits)

```bash
gh pr create --label automerge \
  --title "feat(vendor-crawl): register ollama + crawl ollama.com/docs/cloud" \
  --body "Closes #131. (O8)"

# After phase 1:
gh pr create --label automerge \
  --title "feat(ollama-cloud): bootstrap client + smoke + runbook" \
  --body "Closes #129. Depends on #131. Refs #110. (O8)"
```

End your run with both `PR: <url>` lines.
