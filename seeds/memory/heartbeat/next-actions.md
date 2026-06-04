# Next Actions — 2026-06-04-T9

## Immediate (T10)
1. Monitor Agent PRs: vendor-refresh, harvest-admonitions, kg-ingest, fivetran-bridge, root-fixes
2. Once Agent 2 PR merges: run `npm run harvest:admonitions` to populate Redis + dist/admonitions.jsonl
3. Once Agent 3 PR merges: run `npm run ingest:vendor-pages` to upsert KGNodes
4. Phase 0d: create `infra/sqlite/kg-session-schema.sql` (session-local SQLite mirror)
5. Phase 0e: create `scripts/verify-kg.ts` and add to verify chain

## Blocked on operator
- D1 deploy: `task_ledger` has no rows; needs CF D1 binding
- 9 operator runbooks in docs/pending.md Column 1 (CF tokens, PAT, etc.)

## Phase −1 (next session)
- `src/lib/schemas/project-plan.ts` Zod schema
- `apps/api-core/src/ke_api_core/project_plan.py` Pydantic mirror
- `infra/sqlite/project-plans-schema.sql`
- `migrations/0043_project_plans.sql`

## Phase 1+ (after Phase 0 complete)
- `schema/ke.graphql` unified SDL
- TS/Python/Swift MCP trio
- Multi-model mailbox dispatch
