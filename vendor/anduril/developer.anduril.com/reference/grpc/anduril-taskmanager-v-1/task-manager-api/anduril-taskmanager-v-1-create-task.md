> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# CreateTask

gRPC UNARY

Creates a new Task in the system with the specified parameters.

 This method initiates a new task with a unique ID, if one is not provided,
 sets the initial task state to STATUS_SENT, and establishes task ownership. The task
 must be assigned to a specific agent using the Relations field.

 Once created, a task enters the lifecycle workflow and can be tracked, updated, and managed
 through other Task Manager APIs.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-create-task