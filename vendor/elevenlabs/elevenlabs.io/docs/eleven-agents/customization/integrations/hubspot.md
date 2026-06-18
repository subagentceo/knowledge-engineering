> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# HubSpot

## Overview

Connect your ElevenLabs AI agents with [HubSpot](https://www.hubspot.com/) CRM to manage contacts, companies, and deals. This integration enables your agents to create and update CRM records, search for existing data, and automate sales and marketing workflows.

## Setup

This integration uses a **HubSpot Private App** token for authentication.

Go to **Development** > **Legacy apps** in your [HubSpot account](https://developers.hubspot.com/docs/api/private-apps) and click **Create legacy app** > **Private**. Grant it the CRM scopes your agent needs (e.g., `crm.objects.contacts.read`, `crm.objects.contacts.write`).

After creating the app, copy the generated access token. It starts with `pat-`.

In the ElevenLabs integration setup, paste your private app token in the **Private App Access Token** field.

This integration currently only supports US-hosted HubSpot accounts (`api.hubapi.com`). EU-hosted
accounts (tokens starting with `pat-eu1-`) are not yet supported.

## Demo video

This demo uses legacy webhook tools. If you're using the native HubSpot integration, the tools are
configured automatically — no manual webhook setup is needed.

## How it works

The agent asks the caller for an identifying detail such as their email address, then searches the CRM to verify whether a record exists.

The agent asks the caller about the purpose of their call. This step can be adapted to your particular workflow.

The agent fetches previous interactions from the CRM using the contact ID retrieved during identification.

The agent discusses the issue with the caller, relates it to any previous interactions, and creates a ticket for follow-up items.

## Useful links

* [HubSpot API documentation](https://developers.hubspot.com/docs/api/overview)
* [Private Apps guide](https://developers.hubspot.com/docs/api/private-apps)
* [CRM API reference](https://developers.hubspot.com/docs/api/crm/understanding-the-crm)