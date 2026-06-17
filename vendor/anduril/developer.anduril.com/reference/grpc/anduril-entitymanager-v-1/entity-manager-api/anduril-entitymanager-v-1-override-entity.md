> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# OverrideEntity

gRPC UNARY

Override an Entity Component. An override is a definitive change to entity data. Any authorized user of service
 can override overridable components on any entity. Only fields marked with overridable can be overridden.
 When setting an override, the user or service setting the override is asserting that they are certain of the change
 and the truth behind it.

Reference: https://developer.anduril.com/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-override-entity