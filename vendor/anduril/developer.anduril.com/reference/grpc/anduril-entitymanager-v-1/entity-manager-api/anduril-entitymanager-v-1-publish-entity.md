> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# PublishEntity

gRPC UNARY

Create or update an entity and get a response confirming whether the Entity Manager API succesfully processes
 the entity. Ideal for testing environments.
 When publishing an entity, only your integration can modify or delete that entity; other sources, such as the
 UI or other integrations, can't. If you're pushing entity updates so fast that your publish task can't keep
 up with your update rate (a rough estimate of >= 1 Hz), use the PublishEntities request instead.

Reference: https://developer.anduril.com/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-publish-entity