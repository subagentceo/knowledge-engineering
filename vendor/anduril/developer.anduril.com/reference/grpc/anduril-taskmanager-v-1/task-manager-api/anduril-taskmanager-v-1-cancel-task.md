> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# CancelTask

gRPC UNARY

This method initiates task cancellation based on the task's current state:
 - If the task has not been sent to an agent, it cancels immediately and transitions the task
   to a terminal state (`STATUS_DONE_NOT_OK` with `ERROR_CODE_CANCELLED`).
 - If the task has already been sent to an agent, the cancellation request is routed to the agent.
   The agent is then responsible for deciding whether cancellation is possible or not:
   - If the task can be cancelled, the agent must use `UpdateStatus` and set the task status to `STATUS_DONE_NOT_OK`.
   - If the task cannot be cancelled, the agent must use `UpdateStatus` to attach a `TaskError` to the task with the error code `ERROR_CODE_REJECTED`
     and a `message` explaining why the task cannot be cancelled.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-cancel-task