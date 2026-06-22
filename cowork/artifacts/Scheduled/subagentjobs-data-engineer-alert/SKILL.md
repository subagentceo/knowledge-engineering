---
name: subagentjobs-data-engineer-alert
description: Alert via iMessage when new data/analytics engineer jobs appear on subagentjobs.com
---

Check subagentjobs.com for new job postings matching the pattern: (title contains "data" AND "engineer") OR (title contains "analytics" AND "engineer"). Case-insensitive matching.

Steps:
1. Fetch https://subagentjobs.com/api/jobs — parse the "jobs" array from the JSON response.
2. Load the seen-jobs state from ~/.subagentjobs_seen.json (a JSON array of job ID strings). If the file doesn't exist, treat seen as empty.
3. For each job, compute a stable ID: "{job_post_id}:{company_name}". Collect all current IDs into a set.
4. Find new matches: jobs whose stable ID is NOT in seen AND whose title matches the pattern above.
5. Save the full set of current IDs back to ~/.subagentjobs_seen.json (overwrite).
6. If there are new matches, send an iMessage to (425) 647-0604 using this osascript via mcp__Desktop_Commander__start_process:

```
osascript -e 'tell application "Messages"
  set targetService to 1st account whose service type = iMessage
  set targetBuddy to participant "(425) 647-0604" of targetService
  send "New data/analytics engineer jobs on subagentjobs.com:\n[LIST]\nsubagentjobs.com" to targetBuddy
end tell'
```

Replace [LIST] with up to 12 bullet lines like "- Senior Data Engineer @ stripe". Use \n for newlines inside the osascript string.

7. If there are no new matches, log the count of total jobs checked and exit silently (no message sent).

The API returns JSON like: {"jobs": [{"job_post_id": "...", "company_name": "...", "title": "...", ...}, ...]}