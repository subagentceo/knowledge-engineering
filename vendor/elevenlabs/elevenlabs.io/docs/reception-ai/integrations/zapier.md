> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Zapier

The Zapier integration connects your receptionist to over 5,000 apps through Zapier's MCP (Model Context Protocol) server. Supported categories include CRMs, email marketing, project management, and more.

## How it works

Unlike traditional Zapier integrations with triggers and actions, Reception AI connects to Zapier via MCP. The receptionist and assistant can **call Zapier actions directly** during conversations in real time, based on conversation context.

## Setting up Zapier

### Enable the integration

Go to **Integrations** → click **Zapier** → Enable.

### Connect your Zapier account

Follow the setup steps (7-step tutorial) to link your Zapier account via `mcp.zapier.com`.

### Configure actions in Zapier

In your Zapier account, set up the actions you want your receptionist to have access to.

### Refresh tools

Back in Reception AI, click **Refresh tools** to pull available actions from Zapier.

### Assign tools

Choose which Zapier actions are available to your customer-facing receptionist, business assistant, or both.

## What you can do

Example automations your receptionist can trigger mid-call:

| During a call...                         | Zapier action                                    |
| ---------------------------------------- | ------------------------------------------------ |
| Caller wants to be added to mailing list | Add contact to Mailchimp                         |
| New appointment booked                   | Create event in Google Calendar, notify in Slack |
| Caller reports an issue                  | Create ticket in Zendesk or Jira                 |
| New client identified                    | Create contact in HubSpot or Salesforce          |
| Caller requests a callback               | Create task in Asana or Notion                   |

## Tool assignments

Each Zapier action can be assigned to:

* **Customer-facing receptionist** — Used during phone calls
* **Business assistant** — Used in dashboard chat
* **Both** — Available everywhere

Zapier integration requires the **Plus** plan or higher.