# ADR: per-invocation Docker `--context` flag for concurrent-agent safety (OCTX1)

**Date:** 2026-05-22
**Outcome:** OCTX1
**Status:** Accepted

@cite docs/decisions/2026-05-16-platform-engineering-plugin.md

External reference (in prose, not via citation header since the source
is not yet mirrored into vendor/): Docker's CLI docs at
https://docs.docker.com/engine/reference/commandline/context/ describe
the per-invocation `--context` flag and the global-state semantics of
`docker context use`.

## Problem

This macOS device runs 2+ Claude orchestrator sessions concurrently (3-account
rotation, sometimes overlapping during handoff). Each session calls `docker`
freely. Docker contexts are how the CLI selects which daemon endpoint to
target (desktop-linux, default, tcd Testcontainers, etc.).

The naive switch — `docker context use <name>` — writes to
`~/.docker/config.json#currentContext`. That file is **shared state**
across all processes on the device. So the moment one session switches:

1. Session A switches `desktop-linux` → `tcd` to read Testcontainers
2. Session B's next `docker ps` (expecting `desktop-linux`) inherits `tcd`
3. Session B reads from the wrong daemon — silently. No error, just
   wrong results.

This has bitten the orchestrator at least once during the 2026-05-22 docker
context survey. The failure mode is invisible until output looks "wrong"
hours later.

## Decision

**Every `docker` invocation by an orchestrator session MUST explicitly
name its context per-invocation. Never call `docker context use`.**

Safe primitives (verified 2026-05-22):

- `docker --context <name> <cmd>` — per-invocation, no config write
- `docker -c <name> <cmd>` — short form
- `DOCKER_HOST=<endpoint> docker <cmd>` — env-var override, subshell-scoped

None of these touch `~/.docker/config.json`. All three are concurrent-safe.

## Verified endpoints (2026-05-22)

| Context | Endpoint | Use |
|---|---|---|
| `desktop-linux` (active) | `unix:///Users/alexzh/.docker/run/docker.sock` | Docker Desktop |
| `default` | `unix:///var/run/docker.sock` | Bare Docker socket |
| `tcd` | `tcp://127.0.0.1:49604` | Testcontainers daemon |

## Examples

```bash
# Read the default context without switching:
docker --context default ps

# Read testcontainers without switching:
docker --context tcd images

# Pipe via env (one-shot, no global effect):
DOCKER_HOST=tcp://127.0.0.1:49604 docker info
```

## Anti-pattern (do not do this)

```bash
# WRONG — writes ~/.docker/config.json#currentContext
# Other agents inherit this on their next docker call.
docker context use tcd
docker ps             # reads from tcd
docker context use desktop-linux   # tries to restore — race condition with other agents
```

Even with a `trap` to restore, the window between `use` and `trap` is
where the other agent's invocation lands on the wrong daemon. There is
no safe way to use `docker context use` in a concurrent-agent context.

## Scope

This directive applies to:

- Every shell command issued by an orchestrator session
- Every script in `scripts/`, `infra/`, and `.github/workflows/` that
  shells out to docker
- Every skill in `.claude/skills/` that documents docker usage

Sub-shells and child processes inherit the directive — if you write a
script that calls docker, the script must use `--context`/`--host` too.

## Enforcement

No automated linter today. Reviewers reject any new `docker context use`
in PRs. A grep guard could be added if drift becomes an issue:

```bash
rg -n "docker context use" scripts/ infra/ .github/workflows/
# Expect zero matches in scripts under orchestrator control.
```

## Related

- `~/.claude/projects/-Users-alexzh-subagentmcp-opensubagents/memory/` —
  loop-runtime guard; this ADR codifies the same rule in the repo so it
  survives session rotation
- `docs/decisions/2026-05-16-platform-engineering-plugin.md` — broader
  platform-engineering skill bundle that includes docker context handling
