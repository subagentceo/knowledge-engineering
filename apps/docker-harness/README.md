# apps/ Docker test harness

Build and test every app in `apps/` from a clean, version-correct container —
without polluting your host or fighting the Python 3.11 pin (the local sandbox
ships 3.10).

## Quick start

From the repo root, on your Mac with Docker Desktop running:

```bash
cd apps/docker-harness

# Python apps (api-core + admin-api + compliance-api + fivetran-bridge)
docker compose run --rm py-tests

# Node app (analytics-dashboard/cost type-check)
docker compose run --rm node-tests

# Swift apps — see note below; mostly host-only
docker compose run --rm swift-tests

# Long-running service deps, if you want to hit the FastAPI apps by hand
docker compose up redis postgres
```

## Images used

| Service | Image | Why |
|---|---|---|
| `redis` | `ubuntu/redis:7.0-22.04_stable` | Canonical hardened rock; `admin-api` reads `REDIS_URL`. |
| `postgres` | `ubuntu/postgres:16-24.04_stable` | Canonical hardened rock; for `compliance-api` / AlloyDB-style work. |
| `py-tests` | `python:3.13-slim` | Build image with pip + shell. The `ubuntu/python` rock is a Pebble **runtime** (no pip/build toolchain, capped at 3.13), so it can't run pytest. |
| `node-tests` | `node:22-bookworm-slim` | npm + tsc for the OTel cost poller. |
| `swift-tests` | `swift:6.0-noble` | Linux Swift; see caveat. |

> You asked for the `ubuntu/*` Canonical images. They fit **service** roles
> (redis, postgres) perfectly — those rocks are built to be run as containers.
> They do **not** fit **test-runner** roles: `ubuntu/python` ships a Pebble init
> and no pip/venv build chain, so `pytest`/`npm` need conventional build images.
> The harness uses each where it actually works.

## What each app needs / status signal

- **api-core** — pure Pydantic v2 lib. Real test suite (6 files). The other
  Python apps install it as a `file://` dependency, so it builds first.
- **admin-api** — FastAPI + Redis. Tests cover models; needs the `redis` service
  for the live `/health`+routes path.
- **compliance-api** — FastAPI. Routes are an explicit **stub** ("wire to AlloyDB
  in production") — tests pass but the data layer is not implemented.
- **fivetran-bridge** — Fivetran SDK connector. `schema()` is real; `update()` is
  a documented `pass` (needs a live Admin API token). Tests only exercise schema.
- **analytics-dashboard/cost** — TS OTel cost poller. No test suite; gate is
  `tsc --noEmit`.

## Swift on Linux (corrected — Swift is first-class on Linux)

Swift runs natively on Linux ([swift.org/install/linux](https://www.swift.org/install/linux/)),
so the harness builds and **tests the portable targets on Linux**, and only the
genuinely Apple-only surfaces are deferred to the Mac host. Verified against this
repo with Swift 6.1.2 on aarch64-linux:

| Target | Linux result |
|---|---|
| `OrchestratorCore` (Intelligence) | **builds + 3 tests pass** |
| `OrchestratorSummary` example | **runs** (prints prompt preview from `view.json`) |
| `agent-orchestrator` `Model.swift` | **typechecks** (Foundation-only) |
| `subagent-dashboard` `Model.swift` | **typechecks** |
| SwiftUI/AppKit views (all 3 apps) | host-only (Apple frameworks) |
| `OrchestratorIntelligence` FoundationModels bridge | host-only (macOS 27); compiles to an `#if canImport` shim on Linux |

`run-swift-tests.sh` runs the portable build+test, typechecks the model layers,
and documents the host-only pieces — no "expected to fail" theatre.

Host-only build/test:

```bash
cd apps/agent-orchestrator/Intelligence && swift test   # full package incl. bridge
cd apps/agent-orchestrator && open Package.swift          # SwiftUI app in Xcode
```

`corpus-viewer` and `subagent-dashboard` also depend on a sibling
`swift-markdown-ui` package via a relative path outside `apps/`.
