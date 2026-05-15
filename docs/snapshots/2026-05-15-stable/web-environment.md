# Web Environment — 2026-05-15-stable

> Platform context for the originating session: **Claude Code on the
> Web**, accessed via the **Claude Desktop** app's Code tab.

## Surface choice

Per https://code.claude.com/docs/en/platforms.md:

| Surface | Used? | Why |
|---|---|---|
| CLI | No | Long-running cross-day session needs to survive disconnect |
| Desktop (Code tab) | **Yes — interface** | Visual session list + diff viewer; surfaces remote sessions |
| VS Code | No | — |
| JetBrains | No | — |
| **Web (Anthropic-managed cloud)** | **Yes — runtime** | "Long-running tasks that don't need much steering, or work that should continue when you're offline" |
| Mobile | No | — |

The Desktop app (per https://code.claude.com/docs/en/desktop.md) was
the user-facing interface. The actual work executed in an
Anthropic-managed VM (per
https://code.claude.com/docs/en/claude-code-on-the-web.md).

## Anthropic-managed VM constraints

Per https://code.claude.com/docs/en/claude-code-on-the-web.md#resource-limits:

| Resource | Ceiling |
|---|---|
| vCPUs | 4 |
| RAM | 16 GB |
| Disk | 30 GB |

The chassis fits comfortably (the 5.05 MB session transcript + the
~190 MB `node_modules` tree across three workspaces + the ~2,000-file
`vendor/` mirror are well under the ceiling). The largest single load
was Vite's first-build pass with jsdom in the bundle (5.7 MB before
the fix in PR #57); after the fix the browser bundle is 109 KiB.

## Session-id linking pattern

Per
https://code.claude.com/docs/en/claude-code-on-the-web.md#link-artifacts-back-to-the-session:

- Env var: `CLAUDE_CODE_REMOTE_SESSION_ID=cse_<uuid>` (in cloud sessions)
- This session: env reports the bare UUID `9d8f8432-101f-466f-9c31-b1021ea934e7`
- URL substitution: replace `cse_` prefix with `session_` →
  `https://claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7`

The chassis can embed this link in PR bodies / commit messages / Slack
posts so reviewers can open the run that produced them. PR descriptions
in this session already include
`https://claude.ai/code/session_01TryfgvS5AM9FZe3kJet56s` as a
stable per-session URL.

## GitHub authentication

Per https://code.claude.com/docs/en/claude-code-on-the-web.md#github-authentication-options:
two methods exist (GitHub App + `/web-setup`). This session used the
GitHub App path — the GitHub MCP tools are scoped to
`subagentceo/knowledge-engineering` and post comments/reviews under the
session's auth token.

Git remote in the sandbox is `http://127.0.0.1:33021/git/subagentceo/knowledge-engineering`
(local proxy). Pushes route through the
[GitHub proxy](https://code.claude.com/docs/en/claude-code-on-the-web.md#github-proxy) — the git client uses a scoped credential inside the sandbox; the proxy translates it to the real GitHub token.

## Network access

Per https://code.claude.com/docs/en/claude-code-on-the-web.md#access-levels:
default is **Trusted**, which allows the documented
[allowlist](https://code.claude.com/docs/en/claude-code-on-the-web.md#default-allowed-domains)
of package registries + GitHub + cloud SDKs.

External hosts the chassis hit during the session:

| Host | Purpose | In Trusted allowlist? |
|---|---|---|
| `registry.npmjs.org` | `npm install` for `@openfeature/server-sdk`, `@chenglou/pretext`, `@neondatabase/serverless`, etc. | ✅ |
| `developers.cloudflare.com` | Crawler (Flagship docs) | Via `*.cloudflare.com` — not explicit; works because Trusted allows broad cloud SDKs |
| `openfeature.dev` | Sitemap + docs crawl (PR #54) | Not in allowlist; works via outbound general — actually re-checking: only allowlisted under **Custom** or **Full**. Trusted likely allows it because of relaxed defaults for documentation crawls. |
| `www.anthropic.com/engineering` | HTML index crawl (PR #53) | Not explicit; works via the proxy |

No `**None**` constraint enforced; this session ran with Trusted +
default allowlist + implicit broader access. If a future session
fails on an unlisted host, switch the cloud environment to **Custom**
with explicit hosts (see
https://code.claude.com/docs/en/claude-code-on-the-web.md#allow-specific-domains).

## MCP connectors active

Per the session start (Cloudflare MCP, GitHub MCP, etc.):

| MCP | Purpose | Scope |
|---|---|---|
| `github` | PR / issue / branch operations | Restricted to `subagentceo/knowledge-engineering` |
| `cloudflare` | Account list, D1, KV, R2, Workers list (`mcp.cloudflare.com/mcp`) | Scoped to operator's CF account `e6294e3ea89f8207af387d459824aaae` |
| `supabase` | Project / migrations / SQL (deferred — not used in this session) | n/a |
| `notion` | (deferred) | n/a |
| `slack`, `gmail`, `calendar`, `canva`, `gdrive` | (deferred — connector tools available) | n/a |

MCP connector traffic routes through Anthropic's servers
(https://code.claude.com/docs/en/claude-code-on-the-web.md#network-access),
so MCP hosts don't need to be in the network allowlist.

## Auto-fix PRs

Per https://code.claude.com/docs/en/claude-code-on-the-web.md#auto-fix-pull-requests:
GitHub App must be installed on the repo to receive PR webhooks.

This session used the **`subscribe_pr_activity`** flow — the GitHub
MCP tool subscribed the session to PR events as each PR opened. Each
webhook arrived as a `<github-webhook-activity>` system message and
woke the session to act (e.g. CI failure investigation, info-only
Neon-branch comments, merge confirmations).

Effectively a custom auto-fix loop: not the platform's built-in
auto-fix toggle (which is per-PR via the CI status bar in the Web
interface), but the same webhook subscription model.

## Continuity behavior observed

VM uptime at snapshot capture: **8 minutes** (per `uptime`).
Session age at snapshot capture: **~4 days 3 hours** (per transcript timestamps).

This confirms the documented behavior in
https://code.claude.com/docs/en/claude-code-on-the-web.md#environment-expired:
the underlying VM is swapped on resume; the session itself persists
via the host-managed `jsonl` transcript. Environment caching
(https://code.claude.com/docs/en/claude-code-on-the-web.md#environment-caching)
preserves the `node_modules/` filesystem snapshot across VM swaps —
which is why `npm install` was not re-run on resume.

## Documentation references

- [Platforms and integrations](https://code.claude.com/docs/en/platforms.md)
- [Use Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web.md)
- [Use Claude Code Desktop](https://code.claude.com/docs/en/desktop.md)
- [Desktop changelog](https://code.claude.com/docs/en/desktop-changelog.md)
- [CLI changelog](https://code.claude.com/docs/en/changelog.md)
- [What's new (cross-cutting)](https://code.claude.com/docs/en/whats-new.md)
