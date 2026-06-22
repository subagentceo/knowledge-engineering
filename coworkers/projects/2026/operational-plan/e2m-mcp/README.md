# e2m-mcp — operational-plan instance (v0.2.0)

A project-local instance of the e2m MCP for the 2026 operational plan. Same tools as
`cowork/mcp/e2m-mcp` (envelope_write, envelope_read, task_transition, mailbox_send, mailbox_recv,
mailbox_ack), plus the improvement that matters here:

- **`agents.ts`** — the 15-agent registry (5 functions x 3 tiers), the single source tying each agent's
  **code** to its **email** (`<fn>-<tier>@subagentknowledge.com`), mailbox, and queue.
- **`agent_directory`** MCP tool — returns the registry so a planner can dispatch to the right inbox.

The 15 emails are created via `coworkers/organizations/github/e2m-tf` (Terraform), never the API.
