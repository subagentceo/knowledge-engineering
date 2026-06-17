> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# UpdateStatus

gRPC UNARY

Updates the status of a Task as it progresses through its lifecycle.

 This method allows agents or operators to report the current state of a task,
 which could include changes to task status and error information.

 Each status update increments the task's status_version. When updating status,
 clients must provide the current version to ensure consistency. The system rejects
 updates with mismatched versions to prevent race conditions.

 Terminal states (`STATUS_DONE_OK` and `STATUS_DONE_NOT_OK`) are permanent; once a task
 reaches these states, no further updates are allowed.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-update-status