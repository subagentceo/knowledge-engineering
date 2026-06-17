> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# ListenAsAgent

gRPC SERVER_STREAM

Establishes a server streaming connection that delivers tasks to taskable agents for execution.

 This method creates a persistent connection from Task Manager to an agent, allowing the server
 to push tasks to the agent as they become available. The agent receives a stream of tasks that
 match its selector criteria (e.g., entity IDs).

 The stream delivers three types of requests:
 - ExecuteRequest: Contains a new task for the agent to execute
 - CancelRequest: Indicates a task should be canceled
 - CompleteRequest: Indicates a task should be completed

 This is the primary method for taskable agents to receive and process tasks in real-time.
 Agents should maintain this connection and process incoming tasks according to their capabilities.

 When an agent receives a task, it should update the task status using the `UpdateStatus` RPC
 to provide progress information back to Task Manager.

 When `heartbeat_interval_ms` is set on the request, heartbeat messages are sent periodically to
 maintain the connection during idle periods when no tasks are being delivered.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-listen-as-agent