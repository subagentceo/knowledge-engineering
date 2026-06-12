# handoff — iphone 16 / chrome → windows 11 / chrome canary (2026-06-12)

terse house format: yaml refs up top, xml load-bearing directives mid, typed shape at bottom.

```yaml
refs:
  session: https://claude.ai/code/session_012KGAYQo4ayWtc4QrZ1PkRW
  mcp_ext_tasks: https://github.com/modelcontextprotocol/ext-tasks   # io.modelcontextprotocol/tasks — durable task state machines, taskId, poll/deferred-fetch
  mcp_ext_auth: https://github.com/modelcontextprotocol/ext-auth     # optional/additive/composable auth extensions; client-credentials + enterprise-managed
  web_docs: https://code.claude.com/docs/en/claude-code-on-the-web
  wsl_bootstrap: enterprise-mirror/bootstrap-wsl.sh                  # windows 11 / WSL ubuntu reproduction of the devcontainer

surfaces:
  origin_device: iPhone 16 — Chrome — claude.ai (mobile web client)
  execution: Anthropic-managed cloud VM — Ubuntu 24.04.4, Linux 6.18.5 x86_64, node 22.22.2, redis up, postgres 16 up
  target_device: Windows 11 — Chrome Canary
  invariant: the SESSION lives in the cloud VM, not on the device — switching devices is reattaching a client, no state moves

session_state:
  open_prs:
    - { pr: 475, branch: claude/frontend-typecheck-vitest, closes: ["#471"], status: automerge pending checks }
    - { pr: 477, branch: claude/osv-esbuild-bump, fixes: osv esbuild findings, status: automerge pending checks }
  merged_today: [454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 474, 476, 478]
  open_issues_gated:
    - { issue: 466, gate: cloudflare dashboard / re-scoped token (zone settings) }
    - { issue: 468, gate: prod DATABASE_URL+REDIS_URL env + account-level /schedule }
    - { issue: 470, gate: maintenance window for worker rename cutover }
    - { issue: 265, gate: 4 residual anthropics crawl failures, confirm transient next sweep }
    - { issue: 118, gate: worker runtime 1101 — needs wrangler tail + #110 secrets }
```

<handoff_task kind="task" spec="io.modelcontextprotocol/tasks">
  <!-- ext-tasks vocabulary: a task is a durable state machine carrying
       execution state, uniquely identified by a receiver-generated taskId,
       supporting requestor polling and deferred result retrieval. This
       handoff IS such a task: the cloud session is the receiver, the
       device is the requestor; reattaching from a new device is a poll. -->
  <task_id>session_012KGAYQo4ayWtc4QrZ1PkRW</task_id>
  <state>working — PR-watch loop over #475/#477; gated issues parked</state>
  <poll>open claude.ai/code in Chrome Canary on the Windows 11 device; the session list shows this task; opening it resumes live</poll>
  <deferred_results>merge webhooks for #475/#477 deliver on their own schedule; the session reacts regardless of which device is attached</deferred_results>
</handoff_task>

<directives spec="ext-auth: optional, additive, composable, independently versioned">
  <directive n="1">auth carries over additively — the claude.ai account session on Canary reuses the same identity; nothing on the iPhone is invalidated (composable, not transferred)</directive>
  <directive n="2">github + connector actions keep appearing as the linked accounts (admin-jadecli); device switch changes no authorization scope — scope is bound to the account + environment, not the browser</directive>
  <directive n="3">OAuth-only invariant holds on every surface: ANTHROPIC_API_KEY is rejected at every layer; the only credential class in play is the account's OAuth session (client-credentials pattern stays server-side per ext-auth)</directive>
  <directive n="4">for a TERMINAL on the windows device: install WSL ubuntu, run enterprise-mirror/bootstrap-wsl.sh, then `claude` + teleport the session — do NOT clone state by hand</directive>
  <directive n="5">no action required to "move" anything: closing Chrome on the iPhone is safe at any time; the cloud VM keeps working and the PR webhooks keep arriving</directive>
</directives>

```ts
// typed shape of what the windows 11 / canary client receives on attach
interface HandoffAttach {
  taskId: "session_012KGAYQo4ayWtc4QrZ1PkRW";
  surface: { os: "Windows 11"; browser: "Chrome Canary"; client: "claude.ai/code" };
  resumes: { openPrs: [475, 477]; watchLoop: true; gatedIssues: [466, 468, 470, 265, 118] };
  authDelta: null; // ext-auth additive: same account, same scopes, zero re-grant
}
```
