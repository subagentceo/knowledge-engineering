---
runbook: neon-pg18-extensions
outcome: Document the current Postgres version + enabled extensions on the chassis's Neon project, flag citation gaps in vendor/neon/, decide whether pg18 migration is needed
unblocks: Phase 14+ pgvector wiring decisions; future extension audit
operator-manual-steps: none (audit via `npm run audit:neon`; decisions surface as follow-up issues)
---

# Operator runbook: Neon pg18 + extensions audit

This is a **decision doc**, not a mint flow. The actual `NEON_API_KEY` rotation lives in `mint-neon-api-secret.ts` (closed by #116) and the per-PR branch workflow at `.github/workflows/neon-branch.yml`.

## Identity

| Role | Identity |
| - | - |
| Neon project | `divine-cloud-27295848` (alex@jadecli.com's account) |
| GH integration | `secrets.NEON_API_KEY` + `vars.NEON_PROJECT_ID` (both already set; see `cloud-env-vars-contract.md`) |

## Outcome

After running `npm run audit:neon` (lands with this PR), the operator has a JSON report containing:

1. **Current pg_version** on `divine-cloud-27295848` (likely `17` as of 2026-05-15; Neon's pg18 default may be in waitlist/preview).
2. **List of all branches** in the project (`primary` flag marks the production branch).
3. **Documented extensions** cross-referenced from `vendor/neon/neon.com/docs/extensions/pgvector.md`'s related-extensions section.
4. **Mirrored extensions** (which of the documented ones actually have a vendor/ mirror file).
5. **Citation gaps**: extensions that are documented-but-not-mirrored. These need a crawl-vendors pass to fill.

## Rubric

- [ ] **R1.** `npm run audit:neon` returns a valid JSON report (parseable; all fields present).
- [ ] **R2.** Report's `pg_version` matches what the Neon dashboard shows for `divine-cloud-27295848`. (If discrepancy: API response shape changed; update `audit-neon-extensions.ts`.)
- [ ] **R3.** Report flags `pgvector` as mirrored (it's in `vendor/neon/neon.com/docs/extensions/pgvector.md`).
- [ ] **R4.** Report flags the remaining 5 referenced extensions (`pgrag`, `pg_graphql`, `pg_partman`, `postgis`, `timescaledb`) as **citation gaps** since vendor/ only mirrors pgvector.
- [ ] **R5.** **[CITATION GAP]** for pg18: vendor/neon/ has no pg18-specific doc. If the chassis ever depends on pg18-only features (e.g., `MERGE ... RETURNING`), open a follow-up to mirror Neon's pg18 announcement page.
- [ ] **R6.** If the audit finds the project is on pg17 AND the chassis genuinely needs pg18 features, open a sub-issue `kind:operator-runbook` tagged `runbook:neon-pg18-migration` documenting the upgrade path. (Out of scope for this PR.)

## Citations

- `vendor/neon/neon.com/docs/extensions/pgvector.md` (the only mirrored extension; cross-references the others)
- `vendor/neon/neon.com/docs/ai/ai-intro.md`, `ai-concepts.md` (Neon's official embeddings guidance)
- `vendor/neon/neon.com/docs/reference/api-reference.md` (the `/projects/{id}` endpoint with `pg_version` field per Explore agent 2026-05-15)
- `scripts/audit-neon-extensions.ts` (this audit script)
- `scripts/mint-neon-api-secret.ts` (the parallel rotation script; same neonctl OAuth pattern)
- `docs/operator-runbooks/neon-secrets-matrix.md` (existing Neon secrets inventory)
- `docs/operator-runbooks/cloud-env-vars-contract.md` (canonical inventory the audit complements)

## Citation gaps flagged (as of 2026-05-15)

**Major:**
1. `vendor/neon/neon.com/docs/<some path>/pg18.md` — Postgres 18 announcement / version compatibility. Not yet mirrored.

**Minor (per pgvector.md cross-references):**
1. `vendor/neon/neon.com/docs/extensions/pgrag.md` (RAG extension)
2. `vendor/neon/neon.com/docs/extensions/pg_graphql.md` (GraphQL extension)
3. `vendor/neon/neon.com/docs/extensions/pg_partman.md` (Partition management)
4. `vendor/neon/neon.com/docs/extensions/postgis.md` (PostGIS)
5. `vendor/neon/neon.com/docs/extensions/timescaledb.md` (Timescale)

**To fill:** add an entry to `scripts/crawl-vendors.ts`'s vendor registry that extends the Neon crawl's `allow_prefixes` to include `neon.com/docs/extensions/`, then run `npm run crawl:vendor -- neon`. (Out of scope for this PR; tracked as follow-up.)

## Execution

```bash
# One-shot audit:
npm run audit:neon
# Expected: JSON to stdout with the 7 fields above

# Save report for the historical record:
npm run audit:neon > docs/snapshots/neon-audit-$(date -u +%Y-%m-%d).json
```

## Verification

```bash
# Audit script type-checks + runs
test -f scripts/audit-neon-extensions.ts
npm run audit:neon | jq '.is_pg18, .citation_gaps | length'
# Expected: false, 5  (until pg18 + 5 extensions are mirrored)
```

## Rotation

This audit doc itself is re-fired when:
- Neon announces pg18 GA (or whichever version is current)
- The chassis adds a new extension dependency (then the audit's "mirrored" list grows)
- A leak / rotation event affects the Neon project (cross-cuts with #116)

The `pr-babysitter` routine (per #128 sub-issue / future PR) can be configured to re-run this audit weekly via `/loop` and open an issue if `is_pg18` flips from `false` to `true`.
