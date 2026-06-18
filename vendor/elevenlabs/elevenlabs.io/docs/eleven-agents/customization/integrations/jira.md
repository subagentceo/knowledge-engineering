> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Jira

## Overview

Connect your ElevenLabs AI agents with Jira Cloud to manage issues, track projects, and automate support workflows. This integration enables your agents to create and update issues, transition issues through workflows, link related tickets for escalation, and search across projects.

## Setup

This integration uses a **Jira API token** with Basic authentication. You need your Atlassian account email, an API token, and your Jira Cloud subdomain.

Go to [Atlassian API token management](https://id.atlassian.com/manage-profile/security/api-tokens) and click **Create API token**. Copy the token - you won't be able to see it again.

Your subdomain is the first part of your Jira Cloud URL. For example, if your Jira is at `mycompany.atlassian.net`, your subdomain is `mycompany`.

In the ElevenLabs integration setup, enter:

* **Email** - your Atlassian account email
* **API Token** - the token you generated in step 1
* **Jira Subdomain** - your subdomain from step 2

API tokens expire after one year by default. If your agent stops being able to access Jira,
generate a new token and update the connection.

## Identifying callers

The `jira_search_issues` tool requires a `labels` parameter to scope searches to a specific user's tickets. This assumes your Jira workflow applies a label to each issue that identifies the caller — for example, converting an email like `jane.smith@example.com` into a label like `jane-smith-at-example-com`.

To automate this, configure the `labels` field as a [dynamic variable](/docs/eleven-agents/customization/personalization/dynamic-variables) that receives the caller's identifier from your application. This way the agent does not need to ask the caller for their email on every call.

Jira labels cannot contain spaces. A common convention is to replace `@` with `-at-` and `.` with
`-` (e.g., `jane-smith-at-example-com`). The `jira_search_issues` tool matches the label exactly,
so the value provided must match the label on the issue.

## How it works

The agent identifies the caller by email address or another identifier configured in the
labels field.

The agent collects information about the issue from the caller - what happened, severity,
and any relevant context.

The agent creates a Jira issue in the appropriate project with the right issue type,
priority, and description.

The agent reads back the created ticket number so the caller has a reference for follow-up.

The agent retrieves a Jira issue by its key (e.g., PROJ-123) and reads back the current
status, priority, and summary.

The agent adds a comment to the issue with details from the conversation, such as steps
taken or information gathered.

The agent transitions the issue to a resolved or closed status using the available workflow
transitions.

## Example system prompt

```text
# Personality

You are a helpful IT support agent responsible for managing support tickets in Jira. Be friendly, professional, and efficient.

# Environment

You operate in a support setting via voice or chat, where you help users report issues, check ticket status, and manage existing requests.

# Tone

Begin by asking how you can help. If the caller has an existing issue, ask whether they have the ticket number. If they are reporting a new issue, collect details about the problem.

Ask one question at a time and wait for the response before proceeding.

# Goal

For new issues:
- Collect a clear description of the problem
- Determine severity and urgency
- Create the ticket in the appropriate project with the right issue type and priority
- Read back the ticket number

For existing issues:
- If the caller provides a ticket number, look it up by key
- If the caller wants to check on their issues, search using the labels field
- Provide status updates
- Add comments or update priority when requested
- Always confirm before making changes

# Guardrails

- Do not discuss topics outside of IT support.
- Never expose raw Jira API responses, internal IDs, or technical field names to the caller.
- Always confirm with the caller before creating, updating, or transitioning issues.
```

## Available tools

| Tool                    | Description                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `jira_create_issue`     | Create an issue with project, summary, issue type, and optional fields like priority.       |
| `jira_get_issue`        | Retrieve details for a specific issue by key.                                               |
| `jira_search_issues`    | Search for issues by label, project, status, priority, type, assignee, text, or date range. |
| `jira_update_issue`     | Update fields on an existing issue - priority, assignee, labels, or description.            |
| `jira_add_comment`      | Add a plain-text comment to an issue.                                                       |
| `jira_get_transitions`  | List available workflow transitions for an issue.                                           |
| `jira_transition_issue` | Move an issue to a new workflow status using a transition ID from `jira_get_transitions`.   |
| `jira_link_issues`      | Link two issues together (e.g., "Blocks", "Duplicate", "Relates").                          |
| `jira_list_projects`    | List available projects and their keys.                                                     |
| `jira_get_issue_types`  | List available issue types (e.g., Bug, Task, Story).                                        |
| `jira_get_priorities`   | List available priority levels.                                                             |

Issue descriptions and comments are plain text only. The integration converts them into Jira's
Atlassian Document Format (ADF) automatically. Markdown and HTML are not supported.

## Useful links

* [Jira Cloud REST API documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
* [Manage API tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)