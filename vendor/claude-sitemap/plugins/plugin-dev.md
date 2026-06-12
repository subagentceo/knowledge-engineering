# Plugin Developer Toolkit

A comprehensive development toolkit for building Claude Code plugins. Features 7 specialized skills covering hook development (PreToolUse, PostToolUse, Stop, and 6 other event types), MCP server integration (stdio, SSE, HTTP, WebSocket), plugin structure and settings, slash command creation, agent development, and skill authoring. Includes 12+ working examples, 6 production-ready validation scripts, and approximately 21,000 words of documentation.

The toolkit emphasizes security-first development, portable configurations using environment variables, and progressive disclosure patterns that balance context efficiency with comprehensive guidance when needed.

**How to use:** Run `/plugin-dev:create-plugin` to start an 8-phase guided workflow that walks you through discovery, planning, design, implementation, validation, testing, and documentation. Ask questions like "how do I create a PreToolUse hook?", "how do I set up an MCP server?", or "what's the best plugin structure?" to load the relevant skill automatically.