# Dust enables agents to go deeper at lower cost with Claude

Dust is a multiplayer AI platform for human-agent collaboration. It gives companies a shared workspace where teams can build, deploy, and manage model-agnostic AI agents connected to their company knowledge, tools, and workflows. The agents read from a company's stack and write back to it: updating the CRM, drafting the report, or kicking off the workflow, without writing code. Teams at companies like Datadog, Vanta, and 1Password use Dust and together have deployed more than 300,000 agents.

## With Claude, Dust achieved:

*   An 18% reduction in overall model spend, roughly $10K per day, after optimizing prompt caching
*   Increased cache reads from 30% to 65% of input tokens, cutting input spend by 22%
*   An increase in autonomous tool-calling depth from 4–5 to 8+ steps per agent run, with no engineering changes
*   A redesigned execution loop supporting up to 24 tool calls per run
*   Deep Research workflows, orchestrated by Claude, that run for 10+ minutes across data warehouses, the web, and internal sources
*   A standard integration layer built on Model Context Protocol (MCP), with Dust operating as both client and server