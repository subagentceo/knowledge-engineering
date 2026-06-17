> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# ListenForManualControlFrames

gRPC SERVER_STREAM

Establishes a server streaming connection for receiving manual control frames for a specific task.

 Agents call this RPC to subscribe to manual control frames for a task they are executing.
 Task Manager forwards frames from the operator's `SendManualControlFrames` stream, including
 epoch and sequence metadata for handling concurrent control sessions and detecting stale frames.

 The agent should open this stream before setting the task status to `STATUS_EXECUTING` to ensure it is ready
 to receive control input as soon as the operator begins sending frames.

 The stream terminates when the task reaches a terminal state, either `STATUS_DONE_OK` or `STATUS_DONE_NOT_OK`.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-listen-for-manual-control-frames