> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# QueryTasks

gRPC UNARY

Searches for Tasks that match specified filtering criteria and returns matching tasks in paginated form.

 This method allows filtering tasks based on multiple criteria including:
 - Parent task relationships
 - Task status (with inclusive or exclusive filtering)
 - Update time ranges
 - Task view (manager or agent perspective)
 - Task assignee
 - Task type (via exact URL matches or prefix matching)

 Results are returned in pages. When more results are available than can be returned in a single
 response, a page_token is provided that can be used in subsequent requests to retrieve the next
 set of results.

 By default, this returns the latest task version for each matching task from the manager's perspective.

Reference: https://developer.anduril.com/reference/grpc/anduril-taskmanager-v-1/task-manager-api/anduril-taskmanager-v-1-query-tasks