> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# StreamEntityComponents

gRPC SERVER_STREAM

Establishes a server streaming RPC that returns a continuous stream of entities with specified components.
 This endpoint enables you to maintain a real-time view of the common operational picture (COP)
 by providing initial data for all pre-existing entities matching the filter, followed by updates
 as entities are created, modified, or deleted.
 The server first sends events with type PREEXISTING for all live entities matching the filter that
 existed before the stream was open, then continuously streams updates (EVENT_TYPE_UPDATE) and deletions
 (EVENT_TYPE_DELETED) as they occur. Optional heartbeat messages can be configured to maintain connection health and detect disconnects.

 Clients can use filter criteria to receive only relevant entities and specify which components
 they need populated, optimizing bandwidth usage. Rate limiting options are available to control
 throughput for high-volume scenarios.

Reference: https://developer.anduril.com/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-stream-entity-components