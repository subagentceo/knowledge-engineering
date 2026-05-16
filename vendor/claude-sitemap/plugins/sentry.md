The Sentry plugin brings powerful error monitoring and debugging capabilities directly into Claude Code. Connect to your Sentry environment to analyze production errors, investigate stack traces, and identify patterns across issues—all through natural language queries. The plugin provides real-time access to your error data with severity indicators, user impact metrics, and direct links to Sentry issues.

Key features include the issue-summarizer agent for parallel analysis of multiple issues, automatic pattern detection across error types, and root cause investigation with actionable fix suggestions. The plugin quantifies user impact and prioritizes issues by severity, helping you focus on what matters most.

**How to use:**

Use `/seer` followed by natural language queries like "What are the top errors in the last 24 hours?" or "Show me unresolved issues assigned to me." Run `/getIssues [projectName]` to retrieve recent issues from a specific project. The sentry-code-review skill automatically analyzes and fixes detected bugs in GitHub Pull Requests.