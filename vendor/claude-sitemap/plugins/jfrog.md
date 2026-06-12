# JFrog

Connect Claude Code to your JFrog Platform to simplify platform administration and bring DevSecOps context directly into agents' development process. This plugin makes it easy for agents to consume artifacts through Artifactory, where they are scanned, verified, and governed by your organization's security and compliance policies.

It also ensures that the MCP tools the agent uses are controlled through the JFrog AI Catalog, enforcing centralized allow and block policies across all agent activity. This gives you a single point of control over both the artifacts flowing through your pipelines and the tools your agent is allowed to use.

Key capabilities include vulnerability scanning, provenance verification, and curation checks on artifacts; governance of MCP tools and AI assets; visibility into build and artifact metadata; and project administration tasks such as repository creation and permission management. The plugin integrates JFrog Platform Skills and MCP tools with simple authentication, while providing reliable, native access to the entire JFrog Platform.

**How to use:** Once installed and authenticated, interact with Claude Code in natural language as usual. Relevant requests are routed through JFrog for action. Try prompts like:

*   "Is it safe to upgrade to package-name version X.Y.Z?"
*   "Show me curation audit events from the last 7 days"
*   "Which build produced artifact-name in repo-name?"
*   "Which MCP am I allowed to install?"
*   "Provision a new project and create a local NPM repository for it."

You can also orchestrate multi-step workflows, such as:

*   "Show me available repositories, download package-name from repo-name, and check it for vulnerabilities."

**Install in Claude Code:** `claude plugin install jfrog@claude-plugins-official`  
**Made by:** JFrog