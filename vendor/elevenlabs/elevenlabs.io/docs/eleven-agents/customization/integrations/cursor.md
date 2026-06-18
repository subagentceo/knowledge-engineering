> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Cursor

## Overview

Connect your ElevenLabs AI agents with [Cursor](https://www.cursor.com/) to launch and manage background coding agents that work on your [GitHub](https://github.com) repositories. Your agents can start coding tasks, create pull requests, check agent progress, and send follow-up instructions through the available tools.

## Setup

This integration uses a **Cursor API key** for authentication.

Go to your [Cursor Dashboard](https://cursor.com/settings), navigate to **Integrations & MCP**, and generate an API key.

In the ElevenLabs integration setup, paste your Cursor API key in the **API Key** field.

Free Plan API keys do not support Background Agent API usage. A paid Cursor plan is required.

## Agent tools

When you add Cursor tools to an agent, the following built-in tools are available:

| Tool                            | Description                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `launch_cursor_agent`           | Start a new Cursor background agent to work on a GitHub repository. The agent can add features, fix bugs, refactor code, and optionally create a pull request when finished. |
| `list_cursor_agents`            | List all background agents for the authenticated user with their current status. Supports pagination.                                                                        |
| `get_cursor_agent`              | Retrieve the current status and results of a specific background agent by its ID.                                                                                            |
| `get_cursor_agent_conversation` | Retrieve the conversation history of a background agent, including all prompts and responses. Not available for deleted agents.                                              |
| `add_cursor_agent_followup`     | Send a follow-up instruction to an existing background agent to provide additional guidance while it is working.                                                             |

## Useful links

* [Cursor Background Agents API](https://cursor.com/docs/background-agent/api/overview)
* [Cursor API Keys documentation](https://docs.cursor.com/settings/api-keys)