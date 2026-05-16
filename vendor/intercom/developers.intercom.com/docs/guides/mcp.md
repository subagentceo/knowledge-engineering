# Model Context Protocol (MCP)

Learn how to use the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) to enable AI agents to securely access and interact with your Intercom data whenever helpful.

Region availability
Currently the Intercom MCP server is only supported in US hosted workspaces.

## What is Model Context Protocol?

MCP is a protocol that enables AI tools and applications to connect with Intercom's data and services in a secure, standardized way. It provides a structured method for AI models to:

- Find and retrieve Intercom data (conversations, contacts, etc.)
- Access specific tools and functionality provided by Intercom
- Maintain context about your Intercom workspace when working with AI assistants


## How MCP Works

Intercom hosts a remote MCP server that follows the authenticated remote MCP specification ([docs](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)). This server handles requests from AI tools and provides access to Intercom data through a secure interface.

**Connection URLs:**

- **Streamable HTTP (Recommended)**: `https://mcp.intercom.com/mcp`
- **Legacy SSE**: `https://mcp.intercom.com/sse` (deprecated, maintained for backwards compatibility)


When an AI tool or application needs to access Intercom data:

1. The tool connects to Intercom's MCP server
2. Authentication verifies the user's permissions
3. The tool can then access relevant Intercom data and functionality
4. The connection remains live to receive updates as needed


## Benefits of Using MCP

- **Secure Access**: All data access is authenticated and authorized
- **Standardized Interface**: Consistent interaction pattern across different AI tools
- **Contextual Understanding**: AI assistants maintain awareness of your Intercom environment
- **Increased Development Efficiency**: Retrieve and interpret customer data from Intercom via your internal AI tools to be more efficient in your work


## Available Tools

The Intercom MCP Server provides **13 tools** for interacting with the Intercom API:

### Universal Tools

#### **search**

Universal search tool for finding conversations and contacts using a query DSL approach.

**Key Features:**

- **Must specify** `object_type:conversations` or `object_type:contacts` to indicate which API to call
- Supports complex field-based queries with operators (eq, neq, gt, lt, contains, etc.)
- Returns summary results with IDs prefixed by type (`conversation_*` or `contact_*`)
- Built-in pagination support with `starting_after` parameter
- Free-text search capability with `q:` parameter


**Example Queries:**


```
object_type:conversations state:open source_type:email
object_type:contacts email_domain:"example.com"
object_type:conversations source_body:contains:"refund" limit:20
object_type:conversations team_assignee_id:15
object_type:conversations admin_assignee_id:6
```

**Pagination:**

- Results are paginated with up to 150 items per page (default 5, set with `limit:` parameter)
- When more results exist, the response includes a `_note` with the cursor to use
- To fetch the next page, add `starting_after:cursor_value` to your query
- Example: `object_type:conversations state:open starting_after:cursor_abc123`


**Response includes:**

- `total_in_page`: Count of results in current page
- `results`: Array of result objects with IDs prefixed by type
- `pages`: Pagination metadata (when available)
- `_note`: Helpful hint when more pages exist (e.g., "More results available. To get the next page, add to your query: starting_after:cursor_abc123")


#### **fetch**

Retrieve complete detailed information for specific resources.

**Key Features:**

- Use IDs returned from search results (prefixed with `conversation_`, `contact_`, or `company_`)
- Returns full resource details including metadata, conversation parts, custom attributes
- Includes direct links to Intercom app for easy navigation


### Direct API Tools

#### **search_conversations**

Search conversations by specific IDs with advanced filtering options including source type, author details, state, assignment fields (team_assignee_id, admin_assignee_id), and timing statistics.

**Key Filter Parameters:**

- `ids`: Array of conversation IDs
- `source_type`: Filter by source type (email, chat, etc.)
- `source_author_name`, `source_author_email`: Filter by author details
- `state`: Filter by conversation state (open, closed, snoozed)
- `team_assignee_id`: Filter by team assignee ID (string)
- `admin_assignee_id`: Filter by admin assignee ID (number)
- `statistics_time_to_assignment`, `statistics_time_to_admin_reply`, `statistics_time_to_first_close`: Filter by timing statistics with operators (<, >, =, !=, <=, >=)


**Pagination Support:**

- Results are paginated with up to 150 items per page (default 5)
- If more results exist, the response includes a `pages` object with `pages.next.starting_after` cursor
- To fetch the next page, make another request with the SAME search parameters plus the `starting_after` value from the previous response
- Continue until `pages.next` is not present in the response


**Response includes:**

- `total_in_page`: Count of results in current page
- `conversations`: Array of conversation objects
- `pages`: Pagination metadata (when available)
- `_note`: Helpful hint when more pages exist


#### **get_conversation**

Retrieve a single conversation by ID with complete details including all conversation parts and metadata.

#### **search_contacts**

Search contacts by IDs, name, email, phone, custom attributes, or email domain with flexible matching options.

**Pagination Support:**

- Results are paginated with up to 150 items per page (default 5)
- If more results exist, the response includes a `pages` object with `pages.next.starting_after` cursor
- To fetch the next page, make another request with the SAME search parameters plus the `starting_after` value from the previous response
- Continue until `pages.next` is not present in the response


**Response includes:**

- `total_in_page`: Count of results in current page
- `data`: Array of contact objects
- `pages`: Pagination metadata (when available)
- `_note`: Helpful hint when more pages exist


#### **get_contact**

Get complete contact information including custom attributes, location data, and activity timestamps.

#### **list_companies**

List companies with optional filters.

**Key Filter Parameters:**

- `name`: Find a company by exact name match (returns single company)
- `company_id`: Find a company by external company_id (returns single company)
- `tag_id`: Filter companies by tag ID
- `segment_id`: Filter companies by segment ID
- `per_page`: Results per page (default 15, max 60)
- `page`: Page number (default 1)


Uses page-based pagination. Response includes `total_count` and `pages` with `total_pages`.

#### **get_company**

Retrieve complete details for a specific company including all custom attributes, segments, and tags.

#### **list_articles**

List all articles in the Intercom Help Center.

**Key Parameters:**

- `page`: Page number to retrieve (default 1)
- `per_page`: Articles per page (1-150, default 25)


Uses page-based pagination. Response includes `pages` with `total_pages`.

#### **search_articles**

Search for articles in the Intercom Help Center. At least one search parameter must be provided.

**Key Parameters:**

- `phrase`: Free-text search across article title and body
- `state`: Filter by `published` or `draft`
- `help_center_id`: Filter by Help Center ID (numeric)
- `highlight`: When true, returns highlighted matching snippets


#### **get_article**

Retrieve complete details for a specific article including full HTML body, metadata, and parent collection information.

#### **create_article**

Create a new article in the Intercom Help Center.

**Required Parameters:**

- `title`: The article title
- `author_id`: Numeric ID of the admin/teammate who authored the article


**Optional Parameters:**

- `description`: A short summary
- `body`: Article content in HTML format
- `state`: `published` or `draft` (defaults to draft)
- `parent_id`: Numeric ID of the parent collection or section
- `parent_type`: `collection` or `section` (required if `parent_id` is set)


#### **update_article**

Update an existing article. At least one field to update must be provided.

**Required Parameters:**

- `id`: The article ID to update


**Optional Parameters:**

- `title`, `author_id`, `description`, `body`, `state`, `parent_id`, `parent_type`


## Setting things up

### Authentication Methods

The MCP server supports **two authentication approaches**:

1. **OAuth Flow (Recommended)**: Automatic browser-based authentication
2. **Bearer Token**: Direct API token authentication


### Configuration Examples

Configuration Guide
The examples below are generic templates. **Always refer to your specific LLM provider's official documentation** for the most up-to-date configuration instructions, as setup details may vary between versions and providers.

For **OAuth authentication** (recommended):


```json
{
  "mcpServers": {
    "intercom": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.intercom.com/mcp"
      ]
    }
  }
}
```

For **Bearer token authentication**:


```json
{
  "mcpServers": {
    "intercom": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.intercom.com/mcp",
        "--header",
        "Authorization:${AUTH_HEADER}"
      ],
      "env": {
        "AUTH_HEADER": "Bearer YOUR_INTERCOM_API_TOKEN"
      }
    }
  }
}
```

### LLM Provider Setup Guides

Each AI provider has specific setup instructions for MCP servers. Please consult the official documentation for your provider:

- **Claude Desktop**: [MCP setup documentation](https://modelcontextprotocol.io/quickstart/user)
- **Claude Code**: [MCP setup documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)
- **OpenAI**: [MCP integration guide](https://platform.openai.com/docs/guides/tools-remote-mcp)
- **Claude.ai**: Go to [settings](https://claude.ai/settings/profile) > Integrations > + Add integration, then use `https://mcp.intercom.com/mcp`
- **Cursor**: [MCP configuration guide](https://docs.cursor.com/context/model-context-protocol)
- **Windsurf**: [MCP setup instructions](https://docs.windsurf.com/windsurf/cascade/mcp)
- **VS Code**: [MCP integration docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)


## Working with Pagination

All search and list tools support pagination to handle large result sets efficiently.

**Cursor-based pagination** is used by `search`, `search_conversations`, and `search_contacts` — use the `starting_after` parameter.

**Page-based pagination** is used by `list_articles`, `list_companies` — use the `page` parameter.

### Example Pagination Workflow

**1. Initial Search Request**

Using the `search` tool:


```
object_type:conversations state:open limit:50
```

**2. Response with More Results**

If more results exist, you'll receive:


```json
{
  "total_in_page": 50,
  "results": [...],
  "pages": {
    "type": "pages",
    "page": 1,
    "per_page": 50,
    "total_pages": 5,
    "next": {
      "page": 2,
      "starting_after": "cursor_abc123"
    }
  },
  "_note": "More results available. To get the next page, add to your query: starting_after:cursor_abc123"
}
```

**3. Fetch Next Page**

Use the cursor from the response:


```
object_type:conversations state:open limit:50 starting_after:cursor_abc123
```

**4. Continue Until Complete**

Keep paginating until the response no longer includes `pages.next` or `_note`, indicating you've reached the last page.

### Tool-Specific Pagination

For **`search_conversations`** and **`search_contacts`**, use the `starting_after` parameter:


```json
{
  "state": "open",
  "per_page": 50,
  "starting_after": "cursor_abc123"
}
```

The response will include the same pagination metadata to guide you through the result set.

## Required Scopes

The Intercom MCP server requires the following permissions to access your workspace data. When using Bearer token authentication, ensure your access token includes these scopes. [Learn more about OAuth permissions](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth#permissions).

- **Read and list users and companies**: Required for contact and company data access
- **Read conversations**: Required for conversation data access
- **Read and write articles**: Required for Help Center article access (list, search, get, create, update)


## MCP Inspector for Server Exploration

Test the connection using:


```bash
npx @modelcontextprotocol/inspector
```

Then connect to:

- **Transport Type**: Streamable HTTP
- **URL**: `https://mcp.intercom.com/mcp` (or `/sse` for legacy)


## Debugging and Troubleshooting MCP-Remote

1. **Authentication Problems**

```bash
# Kill existing connections
pkill -f mcp-remote

# Clear MCP auth cache
rm -rf ~/.mcp-auth
```
2. **Connection Testing**

```bash
# Test direct connection
npx mcp-remote https://mcp.intercom.com/mcp

# With bearer token
npx mcp-remote https://mcp.intercom.com/mcp --header "Authorization:Bearer YOUR_TOKEN"
```
3. **View Active MCP Connections**

```bash
ps aux | grep mcp-remote | grep -v grep
```


### Error Handling

- **Invalid queries**: The search tool validates field names and operators, returning specific error messages
- **Authentication failures**: Check token validity or restart OAuth flow
- **Rate limiting**: Intercom API limits apply - reduce request frequency if needed


### Troubleshooting Tips

- Restart AI Agent after configuration changes
- Use the MCP Inspector to verify tool availability
- Check browser console for OAuth-related errors
- Verify Intercom API token permissions for bearer auth