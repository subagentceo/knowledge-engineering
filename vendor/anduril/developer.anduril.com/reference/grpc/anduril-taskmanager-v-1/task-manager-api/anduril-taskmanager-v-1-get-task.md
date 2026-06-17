> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# GetTask

gRPC UNARY

Retrieves a specific Task by its ID, with options to select a particular task version or view.

 This method returns detailed information about a task including its current status,
 specification, relations, and other metadata. The response includes the complete Task object
 with all associated fields.

 By default, the method returns the latest definition version of the task from the manager's
 perspective. The definition_version parameter allows retrieving a specific historical version,
 while the task_view parameter controls whether to show the task from the manager's or agent's
 perspective.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-get-task