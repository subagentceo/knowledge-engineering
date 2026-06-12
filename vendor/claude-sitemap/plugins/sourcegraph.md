# Sourcegraph

Search, navigate, and understand code across all your repositories directly from Claude Code. This plugin connects to your Sourcegraph instance via MCP, giving you access to semantic search, keyword/regex search, commit and diff history, symbol navigation, reference tracing, and Sourcegraph's Deep Search — all without leaving your terminal.

With twelve integrated tools spanning search, code navigation, and analysis, you can explore unfamiliar codebases, trace how symbols are used across repositories, investigate incidents through commit history, audit code for security patterns, and assess the impact of refactors before making changes.

**How to use:** Set your `SOURCEGRAPH_ENDPOINT` and `SOURCEGRAPH_ACCESS_TOKEN` environment variables, then try these commands and prompts:

`/sourcegraph:sg-search` — Run a Sourcegraph search using natural language or keyword syntax (e.g., "find all callers of parseConfig across our Go services").  
`/sourcegraph:sg-file` — Retrieve and summarize a file from any repository, highlighting key symbols and suggesting related files to explore.  
"Search for all uses of the deprecated handleAuth function and show me which repos still depend on it."  
"Find recent commits that modified database migration files across all backend repos."  
"Trace where the UserSession type is defined and list every file that references it."