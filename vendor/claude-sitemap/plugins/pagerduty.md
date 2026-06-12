# PagerDuty Pre-Commit Risk Score

Assess pre-commit risk by correlating PagerDuty incident history with your current code changes. The `/risk-score` command maps your repo to a PagerDuty service, checks for active incidents, analyzes 90 days of incident history, and identifies correlations between areas you're changing and areas that have caused past incidents.

Outputs a structured risk assessment with a 0-5 score, incident context, structural risk signals, and actionable recommendations. Requires a PagerDuty API key.

**How to use:**

Run `/risk-score` before committing changes to a production service. The plugin checks if there are active P1/P2 incidents on your service and warns you if your changes touch code related to the ongoing incident, helping you avoid making things worse during an outage.

Run `/risk-score` after modifying database migration files or authentication code. The plugin identifies structural risk signals in your diff and cross-references them with past incident patterns, surfacing whether similar changes have preceded incidents in the last 90 days.

Run `/risk-score` on a new repo. The plugin auto-detects your PagerDuty service by matching the repo name, or lets you pick from a list. It caches the mapping so subsequent checks are instant.