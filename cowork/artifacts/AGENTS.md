# e2m-workspaces — Agent Defaults

## Atlassian Rovo MCP

When connected to `atlassian` MCP server:
- **MUST** use Jira project key = `E2M`
- **MUST** use Confluence spaceId = (set after first login — run `getAccessibleAtlassianResources` once to discover)
- **MUST** use cloudId = (set after first login — run `getAccessibleAtlassianResources` once to discover)
- **MUST** use `maxResults: 10` or `limit: 10` for ALL Jira JQL and Confluence CQL search operations
- Do NOT call `getAccessibleAtlassianResources` on every request once cloudId is known

### Available Skills (type `/` to run)

| Skill | Trigger |
|-------|---------|
| Capture action items from meeting notes → Jira tasks | `/capture-tasks-from-meeting-notes` |
| Generate sprint/project status report | `/generate-status-report` |
| Search Confluence + Jira knowledge base | `/search-company-knowledge` |
| Convert spec/PRD → Jira backlog (epics + stories) | `/spec-to-backlog` |
| Triage and categorize a Jira issue | `/triage-issue` |

## e2m Project Conventions

- All IDs: UUIDv7 preferred for sortability
- Timestamps: ISO 8601 / RFC 3339
- Auth: NEVER use ANTHROPIC_API_KEY — egress proxy handles auth transparently
- SQL: parameterized queries only ($1, $2, ...) — never string-interpolate user data
- Redis keys: use CRAWL_KEYS/REDIS_KEY helpers — never construct raw keys with user input
- MCP secrets: `docker mcp secret set` only — never in profile YAML or env vars

## Tailscale Network (tail5af6de.ts.net)

| Device | IP | OS |
|--------|----|----|
| alexs-macbook-pro (primary) | 100.123.215.25 | macOS |
| desktop-ufngrm3 (WSL2) | 100.93.169.93 | Windows/Linux |
| ipad-gen-6 | 100.77.45.39 | iOS |
| iphone-11 | 100.70.138.33 | iOS |
