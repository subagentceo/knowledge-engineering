# `coworkers/` — conventions (the type-safety contract)

> `coworkers/` is the **aggressively type-checked package monorepo** for the e2m protocol — distinct
> from `cowork/` (the running chassis). Product vision: **coworkers as an app** (iPhone / iPad / macOS,
> written in Xcode), with `e2m-*` packages as the polyglot contract underneath.
>
> @cite cowork/schemas/envelope.zod.ts (the canonical e2m contract this monorepo binds)
> @cite docs/prompts/e2m-brain-dump-routed-2026-06-19.md §5 (one source → many bindings)

## The rule (every file that enters `coworkers/`)

1. **Builds into one aggressively type-checked subpackage.** No loose files. Strict everywhere
   (TS: all `strict` flags + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`; Rust: `#![deny(warnings)]` + serde; Python: pydantic + mypy `--strict`).
2. **Bare minimum.** A package contains the *smallest* code that expresses its contract — nothing
   speculative. The e2m envelope is the unit; packages bind it, they don't extend it.
3. **Tri-pass.** Anything built must pass for all three coworker roles:
   - **manager** — has a typed outcome/evaluator it can gate on (the package exports a parse/validate fn);
   - **knowledge-worker** — is documented + readable (a one-line purpose, exported types named after the contract);
   - **subagent (code)** — is `typecheck`-clean and unit-testable (a `typecheck` script + at least one round-trip test).
   A package that can't be gated, read, and type-checked does not enter `coworkers/`.

## Naming convention

```
coworkers/
  CONVENTIONS.md                         # this file
  organizations/
    github/                              # mirrors the e2m GitHub org — repo naming only (no vendored code)
      README.md                          # the repo registry + naming
      e2m-ts/        @coworkers/e2m-ts    # TypeScript + zod   -> npm        (DONE: tsc-clean, tests pass)
      e2m-tf/        coworkers/e2m        # Terraform + HCL    -> TF Registry (DONE: reusable IaC, HCL-validated)
      e2m-rs/        e2m-rs               # Rust + serde       -> crates.io
      e2m-py/        e2m-py               # Python + pydantic  -> PyPI
      e2m-cli/       e2m-cli              # CLI                -> npm   (based on anthropics/anti-cli)
      e2m-swift/     e2m-swift            # Swift — the app    -> Swift Package Index + App Store Connect (iOS 18 / iPadOS 18 / macOS 27)
```

- Package id: `e2m-<lang>` (lowercase, hyphen). TS npm name: `@coworkers/e2m-ts`.
- One source of truth = `cowork/schemas/envelope.ts`; every `e2m-<lang>` is **generated/bound** from it,
  never hand-forked (the day-2 drift bug).

## Hour-1 scope (atomic)

Get **`e2m-ts`** right: the bare-minimum, strict, tri-pass binding of the e2m envelope contract. Nothing
else enters `coworkers/` this hour.
