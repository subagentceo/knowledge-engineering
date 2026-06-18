> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Agent tools deprecation

## Overview

The way you wire tools into your ConvAI agents is getting a refresh.

### What's changing?

* The old request field `body.conversation_config.agent.prompt.tools` is **deprecated**.
* Use `body.conversation_config.agent.prompt.tool_ids` to list the IDs of the client or webhook tools your agent should use.
* **New field** `prompt.built_in_tools` is introduced for **system tools** (e.g., `end_call`, `language_detection`). These tools are referenced by **name**, not by ID.

### Critical deadlines

**July 14, 2025** - Last day for full backwards compatibility. You can continue using
`prompt.tools` until this date.

**July 15, 2025** - GET endpoints will stop returning the `tools` field. Only `prompt.tool_ids`
will be included in responses.

**July 23, 2025** - Legacy `prompt.tools` field will be permanently removed. All requests
containing this field will be rejected.

## Why the change?

Decoupling tools from agents brings several advantages:

* **Re-use** – the same tool can be shared across multiple agents.
* **Simpler audits** – inspect, update or delete a tool in one place.
* **Cleaner payloads** – agent configurations stay lightweight.

## What has already happened?

Good news — we've already migrated your data! Every tool that previously lived in `prompt.tools`
now exists as a standalone record, and its ID is present in the agent's `prompt.tool_ids` array.
No scripts required.

We have **automatically migrated all existing data**:

* Every tool that was previously in an agent's `prompt.tools` array now exists as a standalone record.
* The agent's `prompt.tool_ids` array already references those new tool records.

No one-off scripts are required — your agents continue to work unchanged.

## Deprecation timeline

| Date              | Status                   | Behaviour                                                                        |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **July 14, 2025** | ✅ Full compatibility     | You may keep sending `prompt.tools`. GET responses include the `tools` field.    |
| **July 15, 2025** | ⚠️ Partial compatibility | GET endpoints stop returning the `tools` field. Only `prompt.tool_ids` included. |
| **July 23, 2025** | ❌ No compatibility       | POST and PATCH endpoints **reject** any request containing `prompt.tools`.       |

## Toolbox endpoint

All tool management lives under a dedicated endpoint:

```http title="Tool management"
POST | GET | PATCH | DELETE  https://api.elevenlabs.io/v1/convai/tools
```

Use it to:

* **Create** a tool and obtain its ID.
* **Update** it when requirements change.
* **Delete** it when it is no longer needed.

Anything that once sat in the old `tools` array now belongs here.

## Migration guide

System tools are **not** supported in `prompt.tool_ids`. Instead, specify them in the **new**
`prompt.built_in_tools` field.

If you are still using the legacy field, follow the steps below.

### 1. Stop sending `prompt.tools`

Remove the `tools` array from your agent configuration.

### 2. Send the tool IDs instead

Replace it with `prompt.tool_ids`, containing the IDs of the client or webhook tools the agent
should use.

### 3. (Optional) Clean up

After 23 July, delete any unused standalone tools via the toolbox endpoint.

## Example payloads

A request must include **either** `prompt.tool_ids` **or** the legacy `prompt.tools` array —
**never both**. Sending both fields results in an error.

```json title="Legacy format (deprecated)"
{
  "conversation_config": {
    "agent": {
      "prompt": {
        "tools": [
          {
            "type": "client", 
            "name": "open_url",
            "description": "Open a provided URL in the user's browser."
          },
          {
            "type": "system",
            "name": "end_call", 
            "description": "",
            "response_timeout_secs": 20,
            "params": {
              "system_tool_type": "end_call"
            }
          }
        ]
      }
    }
  }
}
```

```json title="New format (recommended) – client tool via ID + system tool"
{
  "conversation_config": {
    "agent": {
      "prompt": {
        "tool_ids": ["tool_123456789abcdef0"],
        "built_in_tools": {
          "end_call": {
            "name": "end_call",
            "description": "",
            "response_timeout_secs": 20,
            "type": "system",
            "params": {
              "system_tool_type": "end_call"
            }
          },
          "language_detection": null,
          "transfer_to_agent": null,
          "transfer_to_number": null,
          "skip_turn": null
        }
      }
    }
  }
}
```

## FAQ

No. Until July 23, the API will silently migrate any `prompt.tools` array you send. However,
starting July 15, GET and PATCH responses will no longer include full tool objects. After July
23, any POST/PATCH requests containing `prompt.tools` will be rejected.

No. A request must use **either** `prompt.tool_ids` **or** `prompt.tools` — never both.

List your tools via `GET /v1/convai/tools` or inspect the response when you create one.