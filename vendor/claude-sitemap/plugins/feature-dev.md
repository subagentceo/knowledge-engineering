# Feature Dev

A structured 7-phase workflow for building features systematically. Rather than jumping into code, this plugin guides you through understanding the existing codebase, clarifying requirements, designing architecture thoughtfully, and conducting quality reviews before and after implementation.

The plugin deploys three specialized agents: **code-explorer** traces execution paths and maps architecture layers to understand existing patterns; **code-architect** proposes multiple implementation approaches with clear trade-offs; and **code-reviewer** catches bugs, security issues, and convention violations with confidence-scored findings.

**How to use:** Run `/feature-dev` followed by a description of what you want to build. For example: `/feature-dev Add user authentication with OAuth` or simply `/feature-dev` to start the guided workflow. The plugin will walk you through discovery, codebase exploration, clarifying questions, architecture design, implementation, quality review, and a final summary.
