> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# PublishEntities

gRPC CLIENT_STREAM

Create or update one or more entities rapidly using PublishEntities, which doesn't return error messages
 for invalid entities or provide server feedback. When publishing entities, only your integration can
 modify or delete those entities; other sources, such as the UI or other integrations, can't.
 When you use PublishEntities, you gain higher throughput at the expense of receiving no server responses or
 validation. In addition, due to gRPC stream mechanics, you risk losing messages queued on the outgoing gRPC
 buffer if the stream connection is lost prior to the messages being sent. If you need validation responses,
 are developing in testing environments, or have lower entity update rates, use PublishEntity.

Reference: https://developer.anduril.com/reference/grpc/anduril-entitymanager-v-1/entity-manager-api/anduril-entitymanager-v-1-publish-entities