# OrchestratorIntelligence

A bare-minimum, layerable slice that summarizes the agent-team `OrchestratorView`
into a one-paragraph standup using **Claude as a server-side LanguageModel** via
Apple's [FoundationModels](https://developer.apple.com/documentation/foundationmodels)
framework, through [`anthropics/ClaudeForFoundationModels`](https://github.com/anthropics/ClaudeForFoundationModels).

## Why a separate package

The app (`../Package.swift`) targets **macOS 13** with swift-tools 5.9, so the
SwiftUI surface keeps building on older toolchains. FoundationModels' server-side
LM API requires **macOS 27 + Xcode 27 + swift-tools 6.2**. Folding that into the
app package would raise the app's floor to macOS 27. So this lives as its own
package; the app adopts it once its deployment target moves to 27.

## Two targets — portable core, Apple-only bridge

| Target | Platforms | What |
|---|---|---|
| `OrchestratorCore` | Linux, macOS, Windows | `TeamSnapshot`, `standupPrompt`, `decodeSnapshot`. Pure Foundation. **Builds + tests on Linux** (verified, Swift 6.1.2 aarch64). |
| `OrchestratorIntelligence` | macOS 27 | Claude ↔ FoundationModels bridge. Self-gated with `#if canImport(FoundationModels)` → compiles to an empty shim on Linux; the `ClaudeForFoundationModels` product only links on macOS. |
| `OrchestratorSummary` | runs anywhere | Example over `view.json`. On macOS 27 it calls Claude; elsewhere it prints the prompt preview. |

## Requirements

- **Portable core / tests:** any Swift 6.1+ toolchain — Linux included
  ([swift.org/install/linux](https://www.swift.org/install/linux/)).
- **Claude summarization:** macOS 27 (Tahoe) host + Xcode 27 / Swift 6.2, plus a
  Claude credential supplied **via proxy** (see auth below).

## Auth — OAuth-only invariant

This chassis never sets `ANTHROPIC_API_KEY` (repo `CLAUDE.md`). So the session
defaults to `ClaudeLanguageModel(auth: .proxied(...))`: a backend relay attaches
the credential server-side and the app ships no key. The relay URL comes from
`CLAUDE_PROXY_URL`.

```sh
CLAUDE_PROXY_URL=https://api.yourapp.com/claude \
  swift run OrchestratorSummary ../view.json
```

### Backend routing

`baseURL` is overridable, so requests can go to Anthropic, a proxy, or (as an
**unverified experiment**) a local Anthropic-compatible server. The lanes,
with which claims are verified-from-source vs. unproven, are documented in
[`docs/backend-routing.md`](docs/backend-routing.md). Short version: the proxy
lane is solid; pointing the bridge at a local Ollama is likely to break on
model-id and SSE-shape mismatch and must be tested before being relied on.

## Build / test

On Linux (portable core only — no network, no FoundationModels):

```sh
cd apps/agent-orchestrator/Intelligence
swift test --filter OrchestratorCoreTests
```

On the Mac host (full package, including the Claude bridge):

```sh
cd apps/agent-orchestrator/Intelligence
swift build && swift test
```

The Docker harness (`apps/docker-harness`) builds + tests `OrchestratorCore` on
Linux and documents the macOS-only bridge — it does not pretend the package
can't build on Linux.

## What's here (and what to layer next)

Working slice now:

- `TeamSnapshot` — transport-agnostic view of the team state.
- `standupPrompt(_:)` — pure, unit-tested prompt builder.
- `makeClaudeSession(model:)` / `summarizeStandup(_:)` — Claude-backed session.
- `OrchestratorSummary` — runnable example over `view.json`.

Layer next, atomically:

1. Stream the summary (`session.streamResponse(to:)`) into the SwiftUI app.
2. Structured output (`@Generable`) for per-session risk flags instead of prose.
3. Server-side tools (`.webSearch`) to enrich PR-status sessions.
