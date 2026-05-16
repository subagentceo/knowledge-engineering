Keep your project memory fresh and effective. This plugin provides tools to audit CLAUDE.md file quality and capture session learnings, ensuring Claude always has the context it needs to work efficiently in your codebase.

The **claude-md-improver** skill scans your repository for all CLAUDE.md files, evaluates them against quality criteria (commands, architecture, gotchas, conciseness), and generates a detailed quality report with scores and grades. It then proposes targeted additions based on gaps it discovers.

The **/revise-claude-md** command helps you capture learnings at the end of a session—bash commands discovered, code patterns followed, environment quirks encountered—and suggests updates to the appropriate CLAUDE.md or .claude.local.md file.

**How to use:**

Say "audit my CLAUDE.md files" or "check if my CLAUDE.md is up to date" to trigger the audit skill. Run `/revise-claude-md` after a productive session to capture new insights. The plugin will show you proposed changes as diffs and only apply them with your approval.