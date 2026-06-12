# Claude Code Setup

Claude Code Setup analyzes your codebase and recommends tailored Claude Code automations to supercharge your development workflow. It examines your project structure, dependencies, and patterns to suggest the most valuable integrations across five categories: MCP servers, skills, hooks, subagents, and slash commands.

The plugin operates in read-only mode, providing expert recommendations without modifying your files. It detects your project type by examining package.json, language files, and directory structure, then generates targeted suggestions based on your specific tech stack—for example, recommending Playwright MCP for React projects or security-reviewer subagents when it detects authentication code.

**How to use:** Invoke the automation recommender with prompts like "recommend automations for this project", "help me set up Claude Code", or "what hooks should I use?" The plugin will analyze your codebase and surface the top 1-2 highest-value recommendations per category. Ask for a specific type (e.g., "what MCP servers should I use?") to get expanded lists of 3-5 options.