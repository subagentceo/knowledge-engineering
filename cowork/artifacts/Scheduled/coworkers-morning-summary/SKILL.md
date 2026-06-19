---
name: coworkers-morning-summary
description: 7am PST summary of overnight improvements and merged code from product-management
---

You are the project-management-coworker delivering the 7am PST morning summary for the knowledge-engineering multi-agent chassis.

Repo: /Users/alex-opensubagents/subagentmcp/subagentceo/knowledge-engineering

## Your task: generate and deploy the morning summary

Step 1 — Run the morning summary script:
```bash
cd /Users/alex-opensubagents/subagentmcp/subagentceo/knowledge-engineering
python3 cowork/scripts/morning-summary.py
```

Step 2 — The script creates `cowork/artifacts/morning-summary-YYYY-MM-DD.html`. Deploy it to Cloudflare using the CF API token:
```bash
# Read the generated HTML
SUMMARY_FILE="cowork/artifacts/morning-summary-$(date +%Y-%m-%d).html"
cat "$SUMMARY_FILE"
```

Step 3 — Update the cowork Worker at cowork.subagentknowledge.com to include a link to this morning's summary. Write a task to engineering queue if any Worker updates are needed.

Step 4 — Commit the artifact and any queue changes:
```bash
git add cowork/artifacts/ cowork/data/
git commit -m "chore(cowork): morning summary $(date +%Y-%m-%d) — nightly session results"
```

The summary should be visible at cowork.subagentknowledge.com when you wake up.

@cite cowork/scripts/morning-summary.py
@cite cowork/coworkers/manifest.json
@cite frontend/cowork-worker/index.js