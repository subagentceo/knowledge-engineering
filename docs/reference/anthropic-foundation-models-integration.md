# Integration investigation — Claude for Foundation Models × MCP × rclone (2026-06-13)

> Companion to `docs/prompts/handoff-2026-06-12-iphone-to-win11-canary.md`. Investigates how
> `anthropics/ClaudeForFoundationModels` composes with the official GitHub MCP server, rclone,
> and the surrounding Anthropic / Model Context Protocol package ecosystem, and how that maps
> onto this chassis's OAuth-only posture.

## 1. What actually exists (verified 2026-06-13)

Every repo/package below was fetched and confirmed live — not assumed.

| Artifact | Source | What it is | Lang/License |
| :-- | :-- | :-- | :-- |
| **ClaudeForFoundationModels** | `github.com/anthropics/ClaudeForFoundationModels` | Conforms Claude to Apple's Foundation Models `LanguageModel` protocol — drive it via `LanguageModelSession` (`respond(to:)`, streaming, guided generation, tool calling). **Beta**, targets the OS 27 server-side model API. | Swift / Apache-2.0 |
| **github-mcp-server** | `github.com/anthropics/github-mcp-server` (mirror of GitHub's official) | MCP server exposing GitHub APIs (repos, issues, pull_requests, users, code_security). Ships as `ghcr.io/github/github-mcp-server`. **This is the same server backing this session's `mcp__github__*` tools.** | Go / MIT |
| **rclone** | `github.com/anthropics/rclone` (fork of `rclone/rclone`) | "rsync for cloud storage" — Drive, S3, R2, B2, GCS, Azure, etc. | Go / MIT-ish (see COPYING) |
| **@anthropic-ai/** (npm org) | npmjs.com/org/anthropic-ai — 35 pkgs | `claude-agent-sdk`, `claude-code`, `claude-trace` (OTEL viewer), `dxt`/`mcpb` (Desktop Extensions / MCP Bundles), `foundry-sdk`. | — |
| **@modelcontextprotocol/** (npm org) | npmjs.com/org/modelcontextprotocol — 50 pkgs | `server`/`client` (2.0-alpha), `inspector`, `conformance`, `create-server`, `ext-apps`, Express/Fastify/Hono adapters. | — |
| **modelcontextprotocol/** (GitHub org) | 42 repos | `python-sdk`, `go-sdk` (w/ Google), `registry`, `servers`, `swift-sdk`, `mcpb`, `ext-apps`, `ext-tasks`, `ext-auth`. | — |
| **safety-research/** (GitHub org) | 50 repos | `safety-tooling`, `auditing-agents`, `persona_vectors`, benches. **Research, not integration surface** — out of scope here; flagged because it was in the source list. | — |

## 2. The compatibility finding that governs everything (CRITICAL)

`ClaudeForFoundationModels` quick-start authenticates with an **`ANTHROPIC_API_KEY`**:

```swift
let model = ClaudeLanguageModel(
  name: .sonnet4_6,
  auth: .apiKey(ProcessInfo.processInfo.environment["ANTHROPIC_API_KEY"] ?? "")
)
```

This chassis's hard invariant is **OAuth-only**: `ANTHROPIC_API_KEY` is rejected at every layer
(`src/oauth/token.ts`, the Worker env-sanitizer, the Sandbox env-sanitizer). The `.apiKey` path is
therefore **forbidden here** and is documented by Anthropic itself as dev-only ("a bundled key is
extractable from a shipping app").

The OAuth-compatible path is `.proxied` — the app ships **no** key; a relay backend adds the
credential server-side:

```swift
ClaudeLanguageModel(
  name: .opus4_8,
  auth: .proxied(headers: ["X-App-Token": "..."]),
  baseURL: URL(string: "https://api.subagentknowledge.com/claude")!  // our relay
)
```

> **Directive:** any Apple-surface client in this org uses `.proxied` pointed at a Worker relay
> that performs the OAuth exchange. The `infra/cloudflare/` agent Worker is the natural host —
> it already resolves a `CLAUDE_CODE_OAUTH_TOKEN` Secrets Store binding and forbids
> `ANTHROPIC_API_KEY`. Anthropic notes an App-Attest production mode is "coming soon" that would
> remove the need for a self-run relay; until then, `.proxied` is the posture.

## 3. How the three compose

These do not share an API; they compose as **three planes of one agent loop**, which is exactly the
device-handoff story of the companion doc — the iPhone 16 / macOS 27 surface is where
ClaudeForFoundationModels would run.

```
┌─ Apple client plane (iPhone 16 / macOS / visionOS, OS 27) ─────────────┐
│  ClaudeForFoundationModels → LanguageModelSession                       │
│    auth: .proxied → relay Worker (OAuth, no key on device)              │
│    serverTools: [.webSearch, .webFetch, .codeExecution]                 │
└────────────────────────────┬───────────────────────────────────────────┘
                             │ (client-side tools the framework invokes)
┌────────────────────────────▼─── MCP tool plane ─────────────────────────┐
│  github-mcp-server (ghcr.io/github/github-mcp-server, stdio/docker)      │
│    GITHUB_PERSONAL_ACCESS_TOKEN, --toolsets repos,issues,pull_requests   │
│  + this repo's own bridge (src/mcp/bridge-server.ts, 55 tools)           │
└────────────────────────────┬───────────────────────────────────────────┘
                             │ (artifacts, state, vendor mirror)
┌────────────────────────────▼─── Storage / sync plane ───────────────────┐
│  rclone — sync vendor/ mirror + frontend/public feeds + DW dumps to      │
│    R2 / B2 / Drive; back up the ephemeral cloud-VM working tree          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 4. Setup — grounded, copy-pasteable

### 4a. ClaudeForFoundationModels (Apple client)

`Package.swift`:

```swift
dependencies: [
  .package(url: "https://github.com/anthropics/ClaudeForFoundationModels.git", from: "0.1.0")
]
```

Requires iOS/macOS/visionOS/watchOS **27 beta** + **Xcode 27 beta**. Use `.proxied` auth (§2). Model
constants mirror API IDs (`.opus4_8` → `claude-opus-4-8`, dateless = pinned snapshot). Structured
output via `@Generable`; effort via `fixedEffort:`.

### 4b. github-mcp-server (GitHub tool plane)

Docker (Claude Desktop `mcpServers`):

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
               "-e", "GITHUB_TOOLSETS",
               "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<fine-grained PAT>",
        "GITHUB_TOOLSETS": "repos,issues,pull_requests,code_security"
      }
    }
  }
}
```

Build-from-source (no Docker, e.g. inside WSL on the Win 11 target): `go build` in
`cmd/github-mcp-server`, then `command: "/path/to/github-mcp-server", args: ["stdio"]`. Enterprise:
`--gh-host` / `GITHUB_HOST`. Beta dynamic discovery: `--dynamic-toolsets`.

### 4c. rclone (storage/sync plane)

```sh
# WSL Ubuntu on the Windows 11 target, or the cloud VM:
curl https://rclone.org/install.sh | sudo bash
rclone config            # add an R2/B2/Drive remote, e.g. "kestore"
# push the regenerated public feeds + vendor mirror off the ephemeral VM:
rclone copy frontend/public kestore:subagentknowledge/public --progress
rclone sync vendor kestore:subagentknowledge/vendor --fast-list
```

rclone is the durable-storage answer to the cloud VM being ephemeral (the reclaim risk noted in the
handoff): anything not committed to git can be `rclone sync`-ed to object storage on a schedule.

### 4d. Supporting packages worth pulling in

- **`@anthropic-ai/mcpb`** (+ GitHub `modelcontextprotocol/mcpb`) — bundle the github-mcp-server +
  this repo's bridge as a one-click **Desktop Extension** so the Win 11 / Claude Desktop install is
  a single `.mcpb`, not hand-edited JSON.
- **`@modelcontextprotocol/inspector`** — `npx @modelcontextprotocol/inspector` to smoke-test the
  bridge + github server tool lists before wiring them into Desktop.
- **`@anthropic-ai/claude-trace`** — OTEL trace viewer; complements this repo's existing
  `telemetry_*` lane for session cost/latency.
- **ext-tasks / ext-auth** (already referenced in the handoff) — the durable-task + additive-auth
  vocabulary the relay (§2) and the cross-device session model are framed in.

## 5. Fit with this chassis

- Relay Worker = extend `infra/cloudflare/` (OAuth-only, Secrets Store) to expose `/claude` for
  `.proxied`. No `ANTHROPIC_API_KEY` anywhere — invariant preserved.
- github-mcp-server already powers this session; documenting it as a first-class connector lets a
  forking founder reproduce the GitHub plane on Desktop/VS Code.
- rclone closes the durability gap for the ephemeral cloud VM and could back the `cache:warm` /
  `dw:load` artifact outputs.

## 6. Open / deferred

- App-Attest production auth for ClaudeForFoundationModels is "coming soon" — revisit to drop the
  self-run relay.
- `anthropics/rclone` is a fork of `rclone/rclone`; diff it against upstream before adopting (the
  README still points at rclone.org — likely a vanilla mirror, but verify before pinning).
- safety-research org repos are research artifacts, intentionally excluded from the integration.
