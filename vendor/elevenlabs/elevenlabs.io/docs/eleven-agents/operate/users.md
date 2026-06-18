> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Users

## Overview

The Users page lists everyone who has talked to your agents in this workspace — who they are, when they last made contact, and which agent they spoke with.

Each user is identified by the `user_id` you pass when starting a conversation. See [conversation initiation client data](/docs/eleven-agents/customization/personalization#conversation-initiation-client-data-structure) for how to set this, or the relevant guide under [integrate](/docs/eleven-agents/integrate/overview) for your platform.

![Users page showing the user list and a selected user's
conversations](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/353b30276a034eed7007aa17008b84bab1ae50fe903b0890fd0d87d7bbc51fcd/assets/images/conversational-ai/users-page.png)

## Table columns

* **User ID** — the external id you passed at session start.
* **Last contact** — when the user last interacted (sortable).
* **Agent** — the agent involved in that interaction.
* **Conversations** — total conversation count (sortable).

## Search and filters

Search performs an exact match on user id — enter the full id, not a partial string.

You can also filter by date range, agent, and branch (requires [versioning](/docs/eleven-agents/operate/versioning) enabled on the selected agent).

## Drill-down

Click a row to open that user's conversations in chronological order. From there you can open any individual conversation the same way as in conversation history.

## API reference

[List users](/docs/api-reference/users/list) — request parameters, response shape, and pagination.