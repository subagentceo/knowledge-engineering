# AWS Agents for DevSecOps

Bring your AWS DevOps Agent and AWS Security Agent capabilities into Claude Code. Investigate production incidents by querying logs, metrics, and traces across your connected observability tools. Scan source code for vulnerabilities, run penetration tests against live endpoints, and apply auto-generated fixes — all through conversational prompts without leaving your editor.

Two agents power the experience: AWS DevOps Agent for release readiness review of code changes, automated release testing of web and API based applications, and operational incident response, topology exploration, and telemetry queries across Grafana, Datadog, Splunk, New Relic, and CloudWatch; and AWS Security Agent for automated code security scanning, penetration testing, and vulnerability remediation. The plugin connects to your existing Agent Spaces and respects all configured IAM policies, tool allowlists, and integration settings.

**How to use:** After installing, configure your AWS credentials. Then use natural-language prompts such as:

*   "Investigate why my service is returning 500 errors"
*   "Scan this directory for security vulnerabilities"
*   "Run a pentest against my staging endpoint"
*   "What's alarming in my Grafana dashboards?"