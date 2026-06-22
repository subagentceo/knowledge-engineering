# e2m `.mcpb`

The e2m-mcp peer lane as a Desktop Extension. Typed `Envelope` / `DurableTask` / `Transition` / `Team`
objects with structured I/O over append-only JSONL — so managers, coworkers, and subagents coordinate
without the operator in the loop. operator is a first-class participant (mailbox + queue).

Tools: `envelope_write` · `envelope_read` · `task_transition` · `mailbox_send` · `mailbox_recv` ·
`mailbox_ack` · `agent_directory` · `team_dispatch`.

Scope: `DATA_DIR` (default `coworkers/projects/2026/operational-plan/data`). Team `operational-plan` =
product/project/finance/legal managers. Pack: `npx @anthropic-ai/mcpb pack` → install in Claude Desktop.
