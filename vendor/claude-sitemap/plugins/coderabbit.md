# CodeRabbit

CodeRabbit brings AI-powered code review directly into Claude Code. It provides external validation using a specialized AI architecture and 40+ integrated static analyzers, offering a different perspective that catches bugs, security vulnerabilities, logic errors, and edge cases. The plugin performs context-aware analysis via AST parsing and codegraph relationships, and automatically incorporates your CLAUDE.md and project coding guidelines into reviews.

Reviews are organized by severity level: Critical findings (security issues and bugs), Suggestions (code improvements), and Positive feedback (code strengths). The plugin can automatically apply recommended fixes when code generation instructions are available.

**How to use:** Run `/coderabbit:review` to review your code changes. You can also ask naturally: "Review my code", "Check for security issues", or "What's wrong with my changes?" The review command supports different scopes—review all changes, only committed changes, only uncommitted changes, or compare against a specific branch like main.

**Prerequisites:** Requires installing and authenticating the CodeRabbit CLI before use. The plugin is free to use and works within any Git repository.