# `@coworkers/e2m-ts`

The e2m envelope contract in TypeScript — the reference binding every other `e2m-<lang>` repo mirrors.

Exports three record kinds (`Envelope`, `DurableTask`, `Transition`), their inferred types, and one
entry point: `parse(value)` (throws) / `safeParse(value)` (the manager's gate). Bare minimum; drift-free
from `cowork/schemas/envelope.ts`.

```bash
npm install
npm run typecheck   # tsc --noEmit, aggressively strict (see tsconfig.json)
npm test            # node --test (round-trip + contract-violation)
```

Tri-pass (per `../../CONVENTIONS.md`): **manager** gates on `safeParse`; **knowledge-worker** reads the
named types; **subagent** runs `typecheck` + `test`.
