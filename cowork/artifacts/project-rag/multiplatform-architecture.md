# Multi-Platform Architecture — e2m Stealth Startup
# Tailscale-first, personal, cross-device
# Updated: 2026-06-09

## Tailnet: tail5af6de.ts.net

| Device | OS | Tailscale IP | Role | Setup script |
|--------|-----|--------------|------|-------------|
| alexs-macbook-pro | macOS 26.5.1 | 100.123.215.25 | **Primary** — Claude Desktop + CLI + Docker MCP | `setup-desktop.sh` ✓ |
| desktop-ufngrm3 | Windows 11 / WSL2 | 100.93.169.93 | **Worker** — ant beta:worker + Claude Code web | `setup-linux.sh` (WSL2) |
| ipad-gen-6 | iPadOS 17 | 100.77.45.39 | **Mobile** — Dispatch + Remote Control | Claude iOS app |
| iphone-11 | iOS 18 | 100.70.138.33 | **Mobile** — Dispatch + Remote Control | Claude iOS app |

---

## Platform surface map

```
macOS (Claude Desktop)     ← you are here
│  ├─ Diff viewer, parallel sessions, computer use
│  ├─ Dispatch receiver (mobile → Desktop task spawn)
│  ├─ Docker MCP gateway: redis ✓, tailscale (needs key), database-server (ARM64 broken)
│  └─ CLI: claude remote-control, claude channel start
│
Windows WSL2 (ant worker)
│  ├─ ant beta:worker --environment-id env_... --environment-key envkey_...
│  ├─ Runs Claude Code CLI in headless mode
│  ├─ Receives sessions from Managed Agents cloud
│  └─ Auth: ANTHROPIC_ENVIRONMENT_KEY (not API key)
│
Claude Code on the Web (cloud.anthropic.com)
│  ├─ Long-running tasks that survive disconnect
│  ├─ PM tasks: spec writing, research, issue triage
│  ├─ Delegates to WSL2 worker OR runs in Anthropic cloud sandbox
│  └─ Connects to e2m memory stores across sessions
│
Mobile (iPad + iPhone)
│  ├─ Dispatch → macOS Desktop (spawn task on your Mac from phone)
│  ├─ Remote Control → steer a running CLI/VS Code session
│  └─ Monitor: view session progress, approve tool use
│
Channels (Telegram → Claude CLI session)
│  ├─ Trigger: message @bot in Telegram
│  ├─ Claude runs on: macOS CLI (persistent)
│  └─ Use: CI failures, crawler alerts, daily digest
```

---

## Memory architecture (Managed Agents Memory API)

```
MemoryStore: e2m-project-context   (memstore_...)  ← read_write — project state
MemoryStore: e2m-shared-reference  (memstore_...)  ← read_only  — schemas, conventions
MemoryStore: e2m-user-prefs        (memstore_...)  ← read_write — PM preferences
```

All stores mounted at `/mnt/memory/` inside agent sandboxes.
Dreams API consolidates store content after N sessions (research preview — request access).

---

## Priority action list

### Immediate (unblock WSL2 worker)
1. On desktop-ufngrm3 WSL2: `ANTHROPIC_ENVIRONMENT_ID=env_... ANTHROPIC_ENVIRONMENT_KEY=envkey_... bash setup-linux.sh`
2. Verify: `curl -s http://100.93.169.93:PORT` (check ant worker heartbeat)
3. Run `gh repo create opencoworkers/e2m-workspaces --private` then push + clone to WSL2

### Short-term (mobile + channels)
4. macOS: `claude remote-control` (enables phone → Mac steering via claude.ai/code)
5. macOS: `claude channel start telegram` (Telegram → CLI session bridge)
6. Pair iPhone/iPad: Claude mobile app → Settings → pair with Desktop for Dispatch

### Medium-term (memory + dreams)
7. Create 3 memory stores via Managed Agents API (see resource-ids.yaml)
8. Seed e2m-project-context with CLAUDE.md content
9. Request Dreams API access: https://claude.com/form/claude-managed-agents

### Platform coverage by role
- **PM work**: Claude web (long-running spec/research), Dispatch from phone
- **Engineering**: macOS Desktop (code review, diffs) + WSL2 worker (CI/builds)
- **Data**: Scheduled tasks → crawl → AlloyDB → rpt_ tables → Mermaid Chart MCP
