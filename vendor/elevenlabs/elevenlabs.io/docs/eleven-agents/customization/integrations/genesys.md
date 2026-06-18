> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Genesys

## Overview

Integrate ElevenLabs conversational AI with Genesys Cloud to power your contact center with natural-sounding voice and text agents. This integration supports both voice-based interactions through the Audio Connector and text-based conversations through the Bot Connector, enabling seamless customer experiences across multiple channels.

With this integration, you can deploy AI agents that handle inbound calls, chat conversations, and messaging interactions in your Genesys Cloud environment.

## Setup

This integration uses **OAuth 2.0 Client Credentials** for authentication.

In Genesys Cloud Admin Center, navigate to **Admin > Integrations > OAuth** and click **Add Client**.

* Set **Grant Type** to **Client Credentials**
* Assign the admin role for your Division(s)
* Save the client configuration

After creating the OAuth client, copy the **Client ID** and **Client Secret** immediately — the secret will not be shown again.

Identify your Genesys Cloud region (e.g., `mypurecloud.com` for US, `mypurecloud.de` for Europe, etc.).

In the ElevenLabs dashboard, go to Agents > Integrations, click **Add Integeration** and select **Genesys**.
Under the configure tab, enter your **region**, **Client ID**, and **Client Secret**.

## Triggers

### Audio Connector

For voice-based agents, configure the Genesys Audio Connector to connect phone numbers to your ElevenLabs conversational AI agents.

Follow our comprehensive documentation for step-by-step setup instructions including authentication, phone number configuration, and call routing:

[Genesys Audio Connector Documentation](https://elevenlabs.io/docs/eleven-agents/phone-numbers/c-caa-s-integrations/genesys)

### Bot Connector

The Genesys Bot Connector is currently in limited availability and not yet available in all
workspaces.

For text-based agents, use the Genesys Bot Connector trigger to enable chat and messaging interactions. The Bot Connector automatically creates and configures the integration in your Genesys Cloud environment.

#### Configure inbound message flow

In Architect, open the Inbound Message Flow you want to use.

1. Add a **Call Bot Connector** node and point it at your bot integration and bot name (both derived from the trigger name you set in ElevenLabs)
2. Handle the returned intents:
   * **success** → send the agent's response back to the user
   * **escalate** → transfer to a support queue
   * **failure** → transfer to a fallback queue

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/49cf1993f9e6978e75af83e28ac8de1256198630f3c06b9e850c1ce3f4486cb2/agents-platform/pages/customization/integrations/genesys/genesys_example_bot_connector_flow.png" alt="Genesys Bot Connector flow configuration" />

#### Configure escalation

To enable your agent to escalate conversations to human support, configure the following in ElevenLabs:

In your agent configuration, add the **Update state** system tool. This allows the agent to set dynamic variables that control the conversation flow.
The **Update state** tool needs to be configured to set the `genesys_should_escalate` Dynamic Variable to true.

Add escalation instructions to your agent's system prompt:

```text
### Escalation

When escalating, ALWAYS ask first if the user would like to talk to another client services team member. If they say yes, use the update_state tool to set the genesys_should_escalate dynamic variable to true.
```

Include escalation scenarios in your agent's business rules. For example:

```text
- If a question is partially covered, answer what you can and then escalate
- If a question is not covered in the knowledge base, respond: "I'm not able to help with that here". Then escalate to a client services team member.
```

When the agent sets `genesys_should_escalate` to `true`, the Bot Connector will return the `escalate` intent, triggering the escalation flow you configured in Architect.

## FAQ

### Why did my Bot Connector activation fail?

Bot Connector activation can fail when information doesn't propagate through Genesys internal systems fast enough. Retrying after a couple of minutes usually succeeds. If the problem persists, reach out to ElevenLabs support.

### Will agents see conversation history after escalation?

Yes, past messages will appear as bot messages in the Genesys interface, so the agent can see the full conversation history.

## Useful links

* [Genesys Cloud OAuth documentation](https://developer.genesys.cloud/authorization/platform-auth/use-client-credentials)
* [Genesys Architect overview](https://help.mypurecloud.com/articles/architect-overview/)
* [Genesys Bot Connector documentation](https://help.genesys.cloud/articles/about-genesys-bot-connector/)
* [ElevenLabs Audio Connector for Genesys](https://elevenlabs.io/docs/eleven-agents/phone-numbers/c-caa-s-integrations/genesys)