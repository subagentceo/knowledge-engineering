Hookify lets you create custom behavioral guardrails for Claude using simple markdown files. Define rules to warn about or block unwanted behaviors like dangerous bash commands, debug code in production files, or hardcoded credentials—all without writing any code.

Rules are configured with YAML frontmatter in markdown files, supporting regex pattern matching across different event types: bash commands, file edits, user prompts, and session stops. Changes take effect immediately without restarting Claude.

**How to use:**

Create rules from natural language: `/hookify Warn me when I use rm -rf commands` or `/hookify Don't use console.log in TypeScript files`. Run `/hookify` without arguments to analyze recent conversation and auto-generate rules from behaviors you've corrected. Use `/hookify:list` to see active rules and `/hookify:configure` for interactive management.