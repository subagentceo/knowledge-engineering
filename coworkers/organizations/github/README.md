# `organizations/github/` — the e2m repository registry

This directory mirrors the **e2m GitHub org**. It fixes the *naming convention* only — each entry is a
subpackage that binds the one canonical contract (`cowork/schemas/envelope.ts`). No repo is hand-forked.

| repo id     | package name        | lang / typecheck            | publish registry                                  | role                                        | status        |
|-------------|---------------------|-----------------------------|---------------------------------------------------|---------------------------------------------|---------------|
| `e2m-ts`    | `@coworkers/e2m-ts` | TypeScript + zod (`tsc`)    | **npmjs** — `npmjs.com/package/@coworkers/e2m-ts` | reference binding; the contract every other repo mirrors | **this hour** |
| `e2m-py`    | `e2m-py`            | Python + pydantic (`mypy`)  | **PyPI** — `pypi.org/project/e2m-py`              | data/warehouse + scripts                    | planned       |
| `e2m-rs`    | `e2m-rs`            | Rust + serde (`cargo`)      | **crates.io** — `crates.io/crates/e2m-rs`         | redis L1/L2/L3 crate + perf path            | planned       |
| `e2m-tf` | `coworkers/e2m` | Terraform + HCL (`validate`) | **Terraform Registry** — `registry.terraform.io/modules/coworkers/e2m` | infra: workers + email routing + KV (reusable modules) | **scaffolded** |
| `e2m-swift` | `e2m-swift`         | Swift (`xcodebuild`)        | **Swift Package Index** (pkg) + **App Store Connect** (app) | **the app** — coworkers on iPhone/iPad/Mac | planned       |
| `e2m-cli`   | `e2m-cli`           | TypeScript (`tsc`)          | **npmjs** — `npmjs.com/package/e2m-cli`           | CLI surface (based on `anthropics/anti-cli`)| planned       |

> **Registries (one per ecosystem).** Each repo publishes to exactly one home, and the package id there
> matches the repo id: **npm** (`@coworkers` scope) · **PyPI** · **crates.io** · **Terraform Registry**
> (`coworkers` namespace) · **Swift Package Index** for the SwiftPM package, with the shipped app
> distributed through **App Store Connect** (TestFlight → App Store). One source of truth
> (`cowork/schemas/envelope.ts`) fans out to all six; the registry is just where each binding lands.

## Naming rules

- Repo id = `e2m-<lang>`, lowercase, single hyphen. The `<lang>` is the binding's host, not its purpose.
- The TypeScript package publishes under the `@coworkers` scope: `@coworkers/e2m-ts`.
- Every repo exports the **same three record kinds** under the same names — `Envelope`, `DurableTask`,
  `Transition` — plus a `parse`/validate entry point. Naming parity is the contract.

## Product vision (why `e2m-swift` exists)

Coworkers ships as a native app written in **Xcode**, targeting:

- **iPhone** — iOS 18 (beta) minimum. *(The Claude app itself requires iOS 18; an iPad on 17.7 can't install
  it — so 18 is the floor for the device tier.)*
- **iPad** — iPadOS 18 (beta) minimum.
- **Mac** — macOS 27 (beta).

`e2m-swift` consumes the same envelope contract `e2m-ts` defines this hour. Get `e2m-ts` right and the Swift
app inherits a typed, drift-free protocol.

## This hour

Only `e2m-ts/` is scaffolded — bare minimum, aggressively type-checked, tri-pass (see `../../CONVENTIONS.md`).
