> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Webhooks

Webhook integrations expose custom HTTP endpoints as tools that the receptionist or business assistant can call during conversations. Unlike passive notification systems, the AI actively invokes these endpoints when the conversation context requires it.

## How webhook tools work

When you create a webhook integration, you define:

1. An HTTP endpoint your receptionist can call
2. A description of what it does (so the AI knows when to use it)
3. Parameters the AI should collect from the conversation

During a call, if the conversation matches the tool's purpose, your receptionist calls the endpoint, processes the response, and continues the conversation.

## Creating a webhook tool

1. Go to **Integrations** → click **Webhook**
2. Click **Add webhook**
3. Configure:

| Field                     | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| **Name**                  | Tool name the AI sees internally                     |
| **Description**           | When and why to use this tool (helps the AI decide)  |
| **URL**                   | Your HTTP endpoint                                   |
| **Method**                | GET, POST, PUT, PATCH, or DELETE                     |
| **Body parameters**       | Parameters sent in the request body                  |
| **Query parameters**      | Parameters sent as URL query strings                 |
| **Response timeout**      | How long to wait for your server (seconds)           |
| **Disable interruptions** | Prevent caller from interrupting while tool executes |
| **Agent targets**         | Which agents can use this tool                       |

### Parameters

Each parameter has:

* **Key** — The field name
* **Type** — `string`, `number`, or `boolean`
* **Description** — What value the AI should extract from the conversation
* **Required** — Whether the AI must collect this before calling

## Agent targets

Assign each webhook tool to:

* **Customer-facing receptionist** — Available during phone calls
* **Business assistant** — Available in the dashboard chat
* **Both** — Available everywhere

## Use cases

| Scenario        | Description                                           | Method |
| --------------- | ----------------------------------------------------- | ------ |
| CRM lookup      | Look up customer info in your system                  | GET    |
| Inventory check | Check product availability in real-time               | GET    |
| Lead capture    | Send caller details to your marketing system          | POST   |
| Ticket creation | Create a support ticket during the call               | POST   |
| Price quote     | Calculate a custom quote based on caller requirements | POST   |

## Example

A plumbing business creates a webhook tool:

* **Name:** "Check availability in area"
* **Description:** "Check if we service the caller's zip code and what the next available slot is"
* **URL:** `https://api.mybusiness.com/check-area`
* **Method:** POST
* **Parameters:** `zip_code` (string, required), `service_type` (string, required)

During a call, when someone asks about availability in their area, the receptionist collects their zip code, calls the webhook, and tells them the result.

Webhook integrations require the **Plus** plan or higher.