> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# StreamTasks

gRPC SERVER_STREAM

Establishes a server streaming connection that delivers task updates in real-time.

 The stream delivers all existing non-terminal tasks when first connected, followed by real-time
 updates for task creation and status changes. Additionally, heartbeat messages are sent
 periodically to maintain the connection.

 The stream delivers two types of responses:
 - Heartbeat: A periodic message to maintain connection health
 - TaskEvent: Contains a task and an event type indicating whether the task was created,
   updated, or was preexisting when the stream was established

 Filtering options allow narrowing the stream to specific task types, statuses, assignees,
 parent tasks, or tasks updated after a certain time.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-stream-tasks