# Prisma

Prisma MCP integration brings natural language database management to Claude Code. Connect to Prisma Postgres databases to provision new instances, run schema migrations, execute SQL queries, analyze data, and manage connection strings — all through conversational prompts. The plugin configures both a local MCP server (via `npx prisma mcp`) and a remote hosted server at `mcp.prisma.io`, giving you flexibility for local development and cloud workflows.

Key capabilities include creating and configuring databases, executing queries and analyzing results, managing schema migrations, handling backups and connection strings, and opening Prisma Studio to browse your data. The integration supports enterprise-grade security with OAuth, and is compliant with GDPR, HIPAA, ISO 27001, and SOC 2.

**How to use:** Once installed, interact with your Postgres databases using natural language prompts like:

- `"Set up this project with a new database in us-east-1"`
- `"Show me all users who signed up this week and their activity levels"`
- `"Check my migration status and create a new user preferences table"`
- `"Create a new database from the most recent backup"`
- `"Open Prisma Studio and show me the data in my users table"`
