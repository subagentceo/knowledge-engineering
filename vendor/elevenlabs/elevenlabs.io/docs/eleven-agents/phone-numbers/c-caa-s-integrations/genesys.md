> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Genesys

## Overview

This guide explains how to integrate ElevenLabs Agents with Genesys Cloud using the Audio Connector integration. This integration enables seamless voice AI capabilities within your existing Genesys contact center infrastructure over websocket, without requiring SIP trunking.

## How Genesys integration works

The Genesys integration uses a native WebSocket connection through the Audio Connector integration:

1. **WebSocket connection**: Direct connection to ElevenLabs using the Audio Connector integration in Genesys Cloud
2. **Real-time audio**: Bidirectional audio streaming between Genesys and ElevenLabs agents
3. **Flow integration**: Seamless integration within your Genesys Architect flows using bot actions
4. **Dynamic variables**: Support for passing context and data between Genesys and ElevenLabs

## Requirements

Before setting up the Genesys integration, ensure you have:

1. Genesys Cloud CX license with bot flow capabilities
2. Administrator access to Genesys Cloud organization
3. A configured ElevenLabs account and ElevenLabs agent
4. ElevenLabs API key

## Setting up the Audio Connector integration

Sign in to your Genesys Cloud organization with administrator privileges.

Go to Admin → Integrations in the Genesys Cloud interface.

1. Click "Add Integration" and search for "Audio Connector", and click "Install"

2. Select the Audio Connector integration type

3. Provide a descriptive name for your integration

1) Navigate to the Configuration section of your Audio Connector integration

2) In Properties, in the Base Connection URI field, enter the appropriate URL for your environment:

   | Environment                | Base Connection URI                                                         |
   | -------------------------- | --------------------------------------------------------------------------- |
   | Default (US/International) | `wss://api.elevenlabs.io/v1/convai/conversation/genesys`                    |
   | Data residency             | `wss://api.<region>.residency.elevenlabs.io/v1/convai/conversation/genesys` |

   If your ElevenLabs account is on an isolated residency environment, replace `<region>` with your
   region code. Using the wrong URL will result in authentication failures. See [data
   residency](/docs/overview/administration/data-residency) for the list of available regions and
   their URLs.

3) In Credentials, enter your ElevenLabs API key in the authentication configuration

4) Save the integration configuration

Set the integration status to "Active" to enable the connection.

## Configuring your Genesys flow

Navigate to Admin → Architect in Genesys Cloud.

Open an existing inbound, outbound, or in-queue call flow, or create a new one where you want to
use the ElevenLabs agent.

1. In your flow, add a "Call Audio Connector" action from the Bot category

2. Select your Audio Connector integration from the integration dropdown

3. In the Connector ID field, specify your ElevenLabs agent ID

If you need to pass context to your ElevenLabs agent, configure input session variables in the bot
action. These will be available as dynamic variables in your ElevenLabs agent.

Save and publish your flow to make the integration active.

## Agent configuration requirements

Your ElevenLabs Agents agent must be configured with specific audio settings for Genesys compatibility:

### Audio format requirements

* **TTS output format**: Set to μ-law 8000 Hz in Agent Settings → Voice
* **User input audio format**: Set to μ-law 8000 Hz in Agent Settings → Advanced

### Supported client events

The Genesys integration supports only the following client events:

* **Audio events**: For processing voice input from callers
* **Interruption events**: For handling caller interruptions during agent speech

Other client event types are not supported in the Genesys integration and will be silently ignored
if configured.

## Session variables

You can pass dynamic context from your Genesys flow to your ElevenLabs agent using input session variables and receive data back through output session variables. Session variables can also be used to override specific agent configuration settings directly from your Genesys flow.

### Input session variables

1. **In Genesys flow**: Define input session variables in your "Call Audio Connector" action
2. **In ElevenLabs agent**: Variables are available as dynamic variables and/or override configuration settings
3. **Usage**: Reference these variables in your agent's conversation flow or system prompts

Learn more about [dynamic variables](/docs/eleven-agents/customization/personalization/dynamic-variables).

#### Configuration overrides

The following session variables can modify your agent's configuration at runtime:

* **`system__override_system_prompt`**: Overrides the agent's system prompt.
* **`system__override_first_message`**: Overrides the agent's first message to the user.
* **`system__override_language`**: Sets the agent's language for this session.
* **`system__override_voice_id`**: Sets the agent's voice ID for this session.

### Example usage

Genesys flow input session variables:

* `customer_name = "John Smith"`
* `system__override_first_message = "Hello! Welcome to our support line."`
* `system__override_language = "en"`

ElevenLabs agent prompt: Hi \{\{customer\_name}}, how can I help you today?

### Output session variables

You can now receive data from your ElevenLabs agent back to your Genesys flow using output session variables.

Any data collected through [Data Collection](/docs/eleven-agents/customization/agent-analysis/data-collection) in your ElevenLabs agent will be available as output session variables in your Genesys flow after the conversation ends.

### Example usage

After your ElevenLabs agent conversation completes, you can use the output variables in your Genesys flow:

1. **Decision logic**: Use output variables in decision nodes to route calls
2. **Data processing**: Pass conversation data to external systems
3. **Reporting**: Include conversation outcomes in your contact center analytics

## Transfer to number functionality

The ElevenLabs integration now supports call transfers back to Genesys for routing to specific numbers or queues.

### Setting up transfers

In your ElevenLabs agent, add a data collection item with a detailed identifier and description to collect where the user should be transferred.

Add instructions to your agent's system prompt to use the end\_call tool when a transfer is requested. For example:

```
If the caller requests to be transferred to a specific department or asks to
speak with a human agent, use the end_call tool to end the conversation.
```

In your Genesys Architect flow, add decision nodes after the Audio Connector action to check output variables and route the call accordingly:

1. Use output session variables to determine if a transfer was requested
2. Configure routing logic based on the transfer type or destination
3. Use Genesys native transfer capabilities to complete the transfer

### Example transfer flow

1. **Customer request**: "I need to speak with billing"
2. **Agent response**: "I'll transfer you to our billing department"
3. **Agent action**: Uses end\_call tool
4. **Data collection**: Data collection field is populated
5. **Genesys flow**: Checks output variable and routes to billing queue

## Limitations and unsupported features

The following tools and features are not supported in the Genesys integration:

### Unsupported tools

* **Client tool**: Not compatible with Genesys WebSocket integration

## Troubleshooting

Verify that your API key is correctly configured in the Audio Connector integration and the ElevenLabs agent ID is correctly configured in the Connector ID field in your Architect flow.
If there are any dynamic variables defined on your agent, they must be passed in as input session variables.

Verify that input session variables are properly defined in your Genesys flow's "Call Audio Connector" action and that they're referenced correctly in your ElevenLabs agent using the \{\{variable\_name}} syntax.