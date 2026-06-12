# Atlan

Connect Claude Code to your Atlan data catalog and interact with your entire data estate through natural language. This plugin provides 15 MCP tools (12 enabled by default, 3 via feature flags) for discovering, exploring, governing, and managing data assets — all powered by the Atlan MCP server with secure OAuth 2.1 authentication requiring no API keys.

Core capabilities include semantic search across your data catalog, upstream and downstream lineage traversal, asset metadata updates, glossary management (glossaries, terms, and categories), data mesh operations (domains and data products), and data quality rule creation, scheduling, and management. Three additional tools for structured asset search, DSL-based querying, and SQL execution are available via tenant feature flags.

**How to use:** After installing, authenticate by running `/mcp` in Claude Code — this opens a browser-based login flow. Then interact with your catalog using natural language prompts like:

*   "Search for all tables related to customer revenue"
*   "Show me the upstream lineage for the orders_fact table"
*   "Create a glossary term called 'Monthly Active Users' with a definition"
*   "Set the certification status of the payments table to VERIFIED"
*   "Create a data quality rule to check for null values in the email column"
*   "List all data products in the Finance domain"