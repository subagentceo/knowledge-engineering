> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Zendesk

## Overview

Connect your ElevenLabs AI agents with [Zendesk](https://www.zendesk.com/) to manage support tickets, users, and organizations. This integration enables your agents to create and update tickets, search for existing records, manage users, and respond to incoming ticket comments.

## Setup

This integration supports two authentication methods: API token and OAuth client.

In [Zendesk Admin Center](https://support.zendesk.com/hc/en-us/articles/4581766374554-Using-Admin-Center), go to **Apps and integrations > APIs > Zendesk API** and enable **Token Access**.

Go to **Apps and integrations > APIs > API tokens** and click **Add API token**. Copy the token immediately — it is not shown again after closing the dialog.

Your Zendesk subdomain is the first part of your Zendesk URL (e.g., `mycompany` from `mycompany.zendesk.com`).

In the ElevenLabs integration setup, enter your **email**, **API token**, and **subdomain**.

In the ElevenLabs Zendesk integration setup, copy the **redirect URL**.

In [Zendesk Admin Center](https://support.zendesk.com/hc/en-us/articles/4581766374554-Using-Admin-Center), go to **Apps and integrations > APIs > OAuth clients** and click **Add Client**. Enter a **name** and a unique **identifier**.

Paste the **redirect URL** copied from ElevenLabs into the OAuth client configuration.

Save the OAuth client. Zendesk displays a **secret** — copy and store it securely. It is not shown again after closing the dialog.

In the ElevenLabs integration setup, enter the **identifier** as the client ID and provide the **secret**. Zendesk redirects you to authorize the connection.

## Zendesk tools

Add Zendesk tools to your agent to manage tickets, users, and organizations during conversations.

### How it works

The agent creates, updates, and searches tickets during a conversation — adding comments, changing status, assigning tickets, and managing tags. Bulk operations on up to 100 tickets at a time are supported.

The agent searches for users by email or phone, retrieves their ticket history, and creates new user records when needed.

For voice-based interactions, the agent logs call activity directly in Zendesk and checks agent availability.

### Example system prompt

```text
You are a helpful support agent responsible for gathering information
from users and creating support tickets. Be friendly, precise, and
concise.

Begin by asking for a detailed description of the problem. Then, ask
relevant support questions to gather additional details, one question
at a time, and wait for the user's response before proceeding.

Once you have a description of the issue, say you will check if there
are similar issues and any known resolutions. Search for resolved
tickets with similar issues and review their comments to find
relevant learnings.

After this, tell the customer the recommended resolution from a
previous similar issue. If they have already tried it or still want
to move forward, proceed to ticket creation. Only provide resolution
advice derived from previous ticket comments.

After capturing the support issue, gather the following contact
details:
- The user's name
- A valid email address (note: the email may be transcribed from
  voice, so ensure it is formatted correctly)
- Read the email back to the caller to confirm accuracy

Once the email is confirmed, explain that you will create the ticket.
Create the ticket with all relevant issue details in the comment body.
Thank the customer and say support will be in touch.

Clarifications:
- Do not inform the user that you are formatting the email; simply
  do it.
- If the caller asks you to move forward with creating the ticket,
  do so with the existing information.

Guardrails:
- Do not speak about topics outside of support issues.
```

### Legacy webhook setup

If you use the native Zendesk integration, tools are configured automatically. The steps below
apply only to manual webhook setup.

The integration uses three webhook tools to create the support agent. Review each tool's configuration in the tabs below.

**Name:** zendesk\_get\_ticket\_comments
**Description:** Retrieves the comments of a ticket.
**Method:** GET
**URL:** `https://acmecorp.zendesk.com/api/v2/tickets/{ticket_id}/comments.json`

**Headers:**

* **Content-Type:** `application/json`
* **Authorization:** *(Secret: `zendesk_key`)*

**Path Parameters:**

* **ticket\_id:** Extract the value from the `id` field in the get\_resolved\_tickets results.

**Tool JSON:**

```json
{
  "type": "webhook",
  "name": "zendesk_get_ticket_comments",
  "description": "Retrieves the comments of a ticket.",
  "api_schema": {
    "url": "https://acmecorp.zendesk.com/api/v2/tickets/{ticket_id}/comments.json",
    "method": "GET",
    "path_params_schema": [
      {
        "id": "ticket_id",
        "type": "string",
        "description": "Extract the value from the id field in the get_resolved_tickets results.",
        "dynamic_variable": "",
        "constant_value": "",
        "required": false,
        "value_type": "llm_prompt"
      }
    ],
    "query_params_schema": [],
    "request_body_schema": null,
    "request_headers": [
      {
        "type": "secret",
        "name": "Authorization",
        "secret_id": "zendesk_api_token"
      },
      {
        "type": "value",
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "response_timeout_secs": 20,
  "dynamic_variables": {
    "dynamic_variable_placeholders": {}
  }
}
```

**Name:** zendesk\_get\_resolved\_tickets
**Description:** Retrieves all resolved support tickets from Zendesk.
**Method:** GET
**URL:** `https://acmecorp.zendesk.com/api/v2/search.json?query=type:ticket+status:solved`

**Headers:**

* **Content-Type:** `application/json`
* **Authorization:** *(Secret: `zendesk_key`)*

**Tool JSON:**

```json
{
  "type": "webhook",
  "name": "zendesk_get_resolved_tickets",
  "description": "Retrieves all resolved support tickets from Zendesk.",
  "api_schema": {
    "url": "https://acmecorp.zendesk.com/api/v2/search.json?query=type:ticket+status:solved",
    "method": "GET",
    "path_params_schema": [],
    "query_params_schema": [],
    "request_body_schema": null,
    "request_headers": [
      {
        "type": "secret",
        "name": "Authorization",
        "secret_id": "zendesk_api_token"
      },
      {
        "type": "value",
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "response_timeout_secs": 20,
  "dynamic_variables": {
    "dynamic_variable_placeholders": {}
  }
}
```

**Name:** zendesk\_open\_ticket
**Description:** Opens a new support ticket.
**Method:** POST
**URL:** `https://acmecorp.zendesk.com/api/v2/tickets.json`

**Headers:**

* **Content-Type:** `application/json`
* **Authorization:** *(Secret: `zendesk_key`)*

**Body Parameters:**

* **ticket:** An object containing:
  * **comment:**
    * **body:** Detailed description of the support issue.
  * **subject:** A short subject line.
  * **requester:**
    * **name:** The full name of the requester.
    * **email:** A valid email address.

**Tool JSON:**

```json
{
  "type": "webhook",
  "name": "zendesk_open_ticket",
  "description": "API endpoint to open a customer support ticket\nMake sure the authorization header is formated as \"Authorization: Basic <auth>\".",
  "api_schema": {
    "url": "https://acmecorp.zendesk.com/api/v2/tickets.json",
    "method": "POST",
    "path_params_schema": [],
    "query_params_schema": [],
    "request_body_schema": {
      "id": "body",
      "type": "object",
      "description": "Details for the support ticket",
      "required": false,
      "properties": [
        {
          "id": "ticket",
          "type": "object",
          "description": "This is the main ticket body which contains all of the information needed to open a ticket.",
          "required": true,
          "properties": [
            {
              "id": "comment",
              "type": "object",
              "description": "This is the comment with information about the issue.",
              "required": true,
              "properties": [
                {
                  "id": "body",
                  "type": "string",
                  "description": "Body of the issue. Include all relevant details for the issue. ",
                  "dynamic_variable": "",
                  "constant_value": "",
                  "required": true,
                  "value_type": "llm_prompt"
                }
              ]
            },
            {
              "id": "subject",
              "type": "string",
              "description": "Create a short subject line for the support issue. Add \"DEMO: \" before the subject.",
              "dynamic_variable": "",
              "constant_value": "",
              "required": true,
              "value_type": "llm_prompt"
            },
            {
              "id": "requester",
              "type": "object",
              "description": "The details of the support requester",
              "required": true,
              "properties": [
                {
                  "id": "email",
                  "type": "string",
                  "description": "The email address of the requester. This should look like \njohnsmith@hotmail.com\nYou MUST use the @ symbol and remove any spaces.",
                  "dynamic_variable": "",
                  "constant_value": "",
                  "required": true,
                  "value_type": "llm_prompt"
                },
                {
                  "id": "name",
                  "type": "string",
                  "description": "The full name of the requester. ",
                  "dynamic_variable": "",
                  "constant_value": "",
                  "required": true,
                  "value_type": "llm_prompt"
                }
              ]
            }
          ]
        }
      ]
    },
    "request_headers": [
      {
        "type": "secret",
        "name": "Authorization",
        "secret_id": "zendesk_api_token"
      },
      {
        "type": "value",
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "response_timeout_secs": 20,
  "dynamic_variables": {
    "dynamic_variable_placeholders": {}
  }
}
```

Ensure that you add your workspace's Zendesk secret to the agent's secrets.

### Evaluation configuration

Configure evaluation criteria and data collection parameters in the **Analysis** tab to monitor customer interactions.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/7a2f0bb771e9e5dce8c543b988890c3d2febbd41b456b533080825ba8ac0b20e/agents-platform/pages/customization/integrations/zendesk/zendesk_analysis.png" alt="Evaluation criteria for support interactions" />

### Monitoring results

After setting up the integration, review conversation summaries and evaluation data in the ElevenLabs dashboard to track agent performance.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/f5727a3a4cb3b3b0b9eae6892db56a2f24c5bad7a15f822bbe644aa14aca213c/agents-platform/pages/customization/integrations/zendesk/zendesk_conv_overview.png" alt="Support agent conversation summary" />

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1e6a905998718cf42c0e175776e9043915519f256ddc378689dbbd9848e50b38/agents-platform/pages/customization/integrations/zendesk/zendesk_criteria_eval.png" alt="Evaluation criteria for support interactions" />

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/a3be54175bbaedf2a662585aefb4191822541fcb07258854dfbf38b3a912dc9a/agents-platform/pages/customization/integrations/zendesk/zendesk_data_collection.png" alt="Data collection parameters from conversation transcripts" />

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/caf81900840e71ab4f081ce2beee8aaf4e0c41d2e36f2f08e00786c9f96f4788/agents-platform/pages/customization/integrations/zendesk/zendesk_transcript.png" alt="Detailed conversation transcript example" />

## Zendesk triggers

Configure Zendesk triggers to have your agent monitor and react to incoming ticket comments, providing first-line support.

### Setup

In Zendesk Admin Center, go to **Objects and rules > Business rules > Triggers** and click **Add trigger**. Configure the conditions that determine which ticket events the agent should respond to (e.g., new tickets in a specific group, ticket comments with a certain tag). Note the trigger name — you will need it in the next step.

If the you cannot save the trigger because an action is missing, add a simple action like adding a "agent is processing" tag to the ticket.

On your agent's configuration page, add a new trigger and select **Zendesk Trigger**. Configure the fields:

* **Agent**: the agent that handles incoming conversations.
* **Trigger Rule Name**: the name of the Zendesk trigger you created in the previous step.
* **Daily Ticket Limit** (optional): maximum number of tickets the agent handles per day. Leave empty for unlimited.

When you activate the trigger, ElevenLabs creates a webhook in your Zendesk account and adds it as an action to the trigger you specified. Deactivating the trigger removes the webhook and action.

In Zendesk Admin Center, go to **Objects and rules > Business rules > Triggers** and view your previously created trigger. You should see a new action added to it.

If you created another action previously, you can now remove it again.

### Shadow mode

Enable shadow mode on a Zendesk trigger to let the agent observe and draft responses without replying to customers directly. When shadow mode is active, the agent writes its responses as **internal comments** on the ticket instead of public replies. Only Zendesk agents and admins can see internal comments — the end user is not notified.

Shadow mode only affects how the agent posts its responses. If the agent uses tools that modify
the ticket (e.g., changing status, adding tags, or assigning the ticket), those changes still
apply. To prevent unintended modifications, use a separate branch of the agent with modifying tool
calls removed.

Shadow mode is useful for evaluating agent quality before going live. Review the internal comments alongside the actual support responses to compare accuracy and tone, then promote the agent to active mode once you are confident in its output.

### Avoiding loops

When the agent responds to a ticket comment via the Zendesk API, that response is itself a new comment — which can re-trigger the agent and create an infinite loop. Add either of the following conditions to your Zendesk trigger to prevent this.

**Exclude the service account from the trigger.** Create a separate Zendesk user for the integration (e.g., `ai-agent@yourcompany.com`) and use this account's credentials when connecting in ElevenLabs. Then add this condition to your Zendesk trigger:

* **Current User**, **Is Not**, **\<your service account>**

**Exclude API updates from the trigger.** This filters out all updates made through the Zendesk API, regardless of which user made them:

* **Ticket > Update Via**, **Is Not**, **Web Service (API)**

## Useful links

* [Zendesk API documentation](https://developer.zendesk.com/api-reference/)
* [Managing API tokens](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-API-token-access-to-the-Zendesk-API)
* [Zendesk triggers guide](https://support.zendesk.com/hc/en-us/articles/203662246-About-triggers-and-how-they-work)