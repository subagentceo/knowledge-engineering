# LogRocket

Connect Claude Code to LogRocket to query session replays, metrics, issues, and user behavior using natural language. Investigate user-reported bugs by searching and watching session replays, analyze feature usage patterns, identify regressions after deployments, and surface high-impact issues — all without leaving your terminal.

The plugin provides six tools: `list_organizations` and `list_projects` for discovering your LogRocket resources, `use_logrocket` for broad natural language queries, `find_sessions` to filter sessions by user, URL, timeframe, or events, `watch_sessions` to examine specific session details and user behavior, and `build_metric` to query analytics data directly.

**How to use:** Ask Claude naturally about your LogRocket data. Try prompts like:

*   "Find sessions where users hit errors on the checkout page in the last 24 hours"
*   "What are the top issues affecting users this week?"
*   "Watch the session for user [email protected] and tell me what went wrong"
*   "Build a metric showing page load times for /dashboard over the past month"
*   "Show me sessions with rage clicks on the signup form"

For open-ended investigation, use natural language and the plugin will route to the right tool. For targeted debugging, be specific about URLs, user identifiers, time ranges, and custom events to get more precise results. You can also combine LogRocket data with your backend observability tools for comprehensive end-to-end debugging.