# Operator runbook — AlloyDB-local per-PR branching

> SCRUM-34. The data-plane replacement for the Neon copy-on-write
> branch-per-PR flow. Mirrors the public shape of the Neon equivalent so
> callers swap by config, not code.

## Why this exists

Neon gave us a per-PR preview database for free via its copy-on-write
**branch** API: `.github/workflows/neon-branch.yml` created
`preview/pr-<N>-<slug>` on PR open/sync, applied migrations, posted a
schema diff, and deleted the branch on close. That stopped being viable
once the Neon budget ran out (see the `NEON_ENABLED` gate added to the
workflow on the 2026-05-29 train — the job now skips cleanly instead of
failing red on every PR).

The data plane is moving to **AlloyDB Omni** running locally in a
container. AlloyDB Omni has **no Neon-style branch API** — there is no
copy-on-write fork primitive. The equivalent isolation is plain Postgres:

```sql
CREATE DATABASE keng_pr_<N> TEMPLATE <base>;   -- per-PR isolated db
-- ... run migrations + tests against keng_pr_<N> ...
DROP DATABASE IF EXISTS keng_pr_<N> WITH (FORCE);  -- cleanup on close
```

`CREATE DATABASE ... TEMPLATE` performs a physical file copy of the base
catalog. It is not copy-on-write, so it costs real bytes and a few
hundred ms per clone — but on an **8-CPU local host** that headroom is
ample to run many parallel per-PR test databases cheaply. There is no
per-branch billing meter to exhaust, which is the whole point of the
migration off Neon.

## The library

`src/lib/alloydb-branch.ts` is the implementation. It keeps the public
function names close to the Neon equivalent so swapping is a config
decision:

| Concept | Neon flow | AlloyDB-local flow |
| :--- | :--- | :--- |
| create per-PR db | `neondatabase/create-branch-action` | `createPrBranch(prNumber)` → `{ dbName, connectionString }` |
| drop per-PR db | `neondatabase/delete-branch-action` | `dropPrBranch(prNumber)` |
| db name | `preview/pr-<N>-<slug>` | `keng_pr_<N>` |
| base/template | Neon parent branch | `ALLOYDB_TEMPLATE_DB` (default `template0`) |

Surface:

- `createPrBranch(prNumber)` — runs `CREATE DATABASE keng_pr_<N> TEMPLATE <base>`
  against the admin connection and returns the PR-scoped connection
  string (same host/credentials, `pathname` swapped to the new db).
- `dropPrBranch(prNumber)` — runs `DROP DATABASE IF EXISTS keng_pr_<N> WITH (FORCE)`.
  `WITH (FORCE)` terminates lingering sessions so cleanup never hangs on a
  held connection from a crashed test run; `IF EXISTS` makes re-runs safe.
- `prBranchDbName` / `createPrBranchSql` / `dropPrBranchSql` — pure
  SQL-builders, no I/O. Useful for the live-container E2E recipe below.
- `isEnabled(env)` — true only when `ALLOYDB_DATABASE_URL` is set.

### Safety: no SQL injection via PR number

`CREATE DATABASE` / `DROP DATABASE` take **identifiers**, not bind
parameters, so the db name cannot be parameterized — it is interpolated
into the DDL. The injection vector is closed at the edge: `prBranchDbName`
runs `prNumber` through a positive-integer assertion and throws on
anything else (floats, zero, negatives, `NaN`, strings). A PR number is
the only untrusted input, and it is always an integer from the GitHub
event payload.

## The enabled-gate (`ALLOYDB_DATABASE_URL`)

The thin pg exec is gated on `ALLOYDB_DATABASE_URL`:

- **Unset** → `createPrBranch` / `dropPrBranch` throw / fail closed; the
  caller (CI job) is expected to skip. This mirrors the no-op-when-unset
  posture of `scripts/lib/neon-client.ts` (`upsertVendorPage` is a no-op
  when `NEON_DATABASE_URL` is unset).
- **Set** (e.g. `postgres://admin:pw@localhost:5433/postgres`) → the
  admin client connects and runs the DDL. The PR-scoped connection string
  reuses host + credentials with the db path swapped.

`ALLOYDB_TEMPLATE_DB` optionally overrides the clone base (default
`template0` for an empty schema; set it to a seeded base db to clone a
pre-migrated catalog).

## CI gating: the Neon-branch jobs become no-ops

This PR does **not** rewrite `.github/workflows/neon-branch.yml` — that
is a follow-up once the AlloyDB client + workflow land. The intended
gating, documented here so the follow-up is unambiguous:

- Introduce a `DATA_PLANE` repo/org variable: `neon` | `alloydb`.
- The **Create/Delete Neon Branch** jobs already carry a `NEON_ENABLED`
  gate. When `DATA_PLANE == 'alloydb'`, set `NEON_ENABLED=false` (or add
  `&& vars.DATA_PLANE != 'alloydb'` to the existing `if:`) so both
  `create_neon_branch` and `delete_neon_branch` **skip cleanly** — they
  become no-ops, not failures. A skipped job is green-neutral and does not
  block a required check.
- A new `alloydb-branch.yml` workflow (follow-up) will run the equivalent
  create-on-open / drop-on-close steps by calling this library, gated on
  `vars.DATA_PLANE == 'alloydb' && vars.ALLOYDB_DATABASE_URL != ''`.

Do **not** delete `neon-branch.yml`. Keeping it (gated off) lets the data
plane flip back to Neon by flipping one variable if AlloyDB headroom or
the migration regresses.

## E2E: prove isolation against a live container

If the local `alloydb` container is up (`docker ps`), the TEMPLATE clone
can be proven end-to-end:

```bash
PSQL="psql postgres://admin:pw@localhost:5433/postgres"
$PSQL -c "CREATE DATABASE keng_pr_test TEMPLATE template0;"
$PSQL -c "\l" | grep keng_pr_test            # the clone exists, isolated
$PSQL -c "DROP DATABASE IF EXISTS keng_pr_test WITH (FORCE);"
$PSQL -c "\l" | grep keng_pr_test || echo "dropped — isolation proven"
```

If the container is unreachable, the mocked SQL-builder unit test
(`src/lib/alloydb-branch.test.ts`) is sufficient — never hard-fail CI on
container absence.

## See also

- `src/lib/alloydb-branch.ts` — the implementation
- `src/lib/alloydb-branch.test.ts` — mocked-pg unit tests
- `.github/workflows/neon-branch.yml` — the flow this replaces (kept, gated off)
- `seeds/citations/neon-branching.md` — the Neon branch-per-PR pattern this mirrors
- `scripts/lib/neon-client.ts` — the no-op-when-unset posture this gate mirrors
