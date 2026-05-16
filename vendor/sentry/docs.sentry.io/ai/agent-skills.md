---
title: "Agent Skills"
description: "Teach your AI coding assistant how to set up and configure Sentry in your projects, and how to use Sentry's AI agents to debug and fix issues, even in your PRs."
url: https://docs.sentry.io/ai/agent-skills/
---

# Agent Skills

Agent skills are instruction sets that teach AI coding assistants how to perform specific tasks. Sentry's official agent skills give your AI assistant the knowledge to set up and configure Sentry in your projects with no manual configuration required. Use [workflow skills](https://skills.sh/getsentry/sentry-for-ai/sentry-workflow) to debug and fix issues in your projects.

## [Available Skills](https://docs.sentry.io/ai/agent-skills.md#available-skills)

There are two types of official Sentry agent skills:

* **Setup skills** - Set up Sentry in your projects with no manual configuration required.
* **Workflow skills** - Debug and fix issues in your projects.

Check out the latest and full list of skills [here](https://skills.sh/getsentry/sentry-for-ai).

## [Install](https://docs.sentry.io/ai/agent-skills.md#install)

Run this in your project (or from any directory for user-level install) to add Sentry agent skills. Omit `--skill` to add all skills from the repo.

```bash
npx skills add getsentry/sentry-for-ai --skill sentry-fix-issues
```

To add all Sentry skills:

```bash
npx skills add getsentry/sentry-for-ai
```

Alternatively, use [dotagents](https://docs.sentry.io/ai/dotagents.md) to manage skills declaratively with locked versions. Initialize your project, add Sentry skills, then install:

```bash
# Initialize dotagents in your project (creates agents.toml)
npx @sentry/dotagents init

# Add a specific Sentry skill
npx @sentry/dotagents add getsentry/sentry-for-ai --name sentry-fix-issues

# Or add all Sentry skills
npx @sentry/dotagents add getsentry/sentry-for-ai

# Install all declared skills
npx @sentry/dotagents install
```

This creates an `agents.toml` that pins skill versions and can be committed to your repo, so every team member gets the same skills automatically.

## [Quick Reference](https://docs.sentry.io/ai/agent-skills.md#quick-reference)

Paths where each client looks for skills: **user-level** (all your projects) and **project-level** (current repository only).

| Client          | User-Level Path             | Project-Level Path |
| --------------- | --------------------------- | ------------------ |
| **Claude Code** | `~/.claude/skills/`         | `.claude/skills/`  |
| **Codex**       | `~/.codex/skills/`          | `.codex/skills/`   |
| **Copilot**     | `~/.copilot/skills/`        | `.github/skills/`  |
| **Cursor**      | `~/.cursor/skills/`         | `.cursor/skills/`  |
| **OpenCode**    | `~/.config/opencode/skill/` | `.opencode/skill/` |
| **AmpCode**     | `~/.config/agents/skills/`  | `.agents/skills/`  |

## [Usage](https://docs.sentry.io/ai/agent-skills.md#usage)

Once installed, your AI assistant will automatically discover the skills. Simply ask it to perform Sentry-related tasks:

### [Setup](https://docs.sentry.io/ai/agent-skills.md#setup)

| What to Say                                | Skill Used                   |
| ------------------------------------------ | ---------------------------- |
| "Add Sentry to my React app"               | `sentry-react-sdk`           |
| "Set up Sentry in React Native"            | `sentry-react-native-sdk`    |
| "Add Sentry to my Python/Django/Flask app" | `sentry-python-sdk`          |
| "Set up Sentry in my Ruby/Rails app"       | `sentry-ruby-sdk`            |
| "Add Sentry to my iOS app"                 | `sentry-cocoa-sdk`           |
| "Add Sentry to my Next.js app"             | `sentry-nextjs-sdk`          |
| "Add Sentry to my .NET app"                | `sentry-dotnet-sdk`          |
| "Add Sentry to my Go app"                  | `sentry-go-sdk`              |
| "Add Sentry to my Svelte app"              | `sentry-svelte-sdk`          |
| "Monitor my OpenAI/LangChain calls"        | `sentry-setup-ai-monitoring` |
| "Set up OpenTelemetry exporter"            | `sentry-otel-exporter-setup` |

### [Debugging & Workflow](https://docs.sentry.io/ai/agent-skills.md#debugging--workflow)

| What to Say                                                          | Skill Used              |
| -------------------------------------------------------------------- | ----------------------- |
| "Fix the recent Sentry errors"                                       | `sentry-fix-issues`     |
| "Debug the production TypeError"                                     | `sentry-fix-issues`     |
| "Work through my Sentry backlog"                                     | `sentry-fix-issues`     |
| "Review Sentry comments on PR #123"                                  | `sentry-pr-code-review` |
| "Fix the issues Sentry found in my PR"                               | `sentry-pr-code-review` |
| "Review Sentry bot comments on my PR"                                | `sentry-code-review`    |
| "Create an alert that emails me when a high priority issue resolves" | `sentry-create-alert`   |
| "Set up a Slack notification for new Sentry issues"                  | `sentry-create-alert`   |

The assistant will load the appropriate skill and guide you through the process.

## [Contributing](https://docs.sentry.io/ai/agent-skills.md#contributing)

Want to contribute a new skill? Skills follow the [Agent Skills specification](https://agentskills.io/specification). Here's what one looks like:

Each skill is a folder with a `SKILL.md` file. The file has YAML frontmatter (`name`, `description`) and markdown instructions the AI assistant will use.

```text
skill-name/
  SKILL.md        # Required: YAML frontmatter + markdown instructions
```

**Requirements:**

1. Follow the [Agent Skills specification](https://agentskills.io/specification)
2. Have a valid `name` (lowercase, hyphens, 1-64 characters)
3. Include a clear `description` (1-1024 characters)
4. **Keep skills concise** — use tables over prose, avoid obvious information
5. Include an "Invoke This Skill When" section with trigger phrases
6. Verify technical details against Sentry docs

### [Style Guidelines](https://docs.sentry.io/ai/agent-skills.md#style-guidelines)

* Prefer tables over paragraphs for reference information
* Use phases/steps for multi-stage workflows
* Include version requirements where applicable
* Add troubleshooting tables for common issues
* Target \~100-200 lines per skill to minimize token usage

Submit contributions to the [sentry-for-ai repository](https://github.com/getsentry/sentry-for-ai).
