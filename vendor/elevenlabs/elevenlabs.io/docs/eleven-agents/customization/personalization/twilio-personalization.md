> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Twilio personalization

## Overview

When receiving inbound Twilio calls, you can dynamically fetch conversation initiation data through a webhook. This allows you to customize your agent's behavior based on caller information and other contextual data.

## How it works

1. When a Twilio call is received, ElevenAgents will make a webhook call to your specified endpoint, passing call information (`caller_id`, `agent_id`, `called_number`, `call_sid`) as arguments
2. Your webhook returns conversation initiation client data, including dynamic variables and overrides (an example is shown below)
3. This data is used to initiate the conversation

The system uses Twilio's connection/dialing period to fetch webhook data in parallel, creating a
seamless experience where:

* Users hear the expected telephone connection sound
* In parallel, ElevenAgents fetches necessary webhook data
* The conversation is initiated with the fetched data by the time the audio connection is established

## Configuration

In the [settings page](https://elevenlabs.io/app/agents/settings) of ElevenAgents, configure the webhook URL and add any
secrets needed for authentication.

![Enable webhook](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/53e98b709e5751bfb6cf6758372a8105c5408b20191523c7e91c2a7625d8b603/assets/images/conversational-ai/convai-settings.png)

Click on the webhook to modify which secrets are sent in the headers.

![Add secrets to headers](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/416d30e6906cd209de92820bfc146ac9478fbb6ce61c8fbbc24d62cad54d9f05/assets/images/conversational-ai/convai-initiation-webhook.png)

In the "Security" tab of the [agent's page](https://elevenlabs.io/app/agents/agents/), enable fetching conversation initiation data for inbound Twilio calls, and define fields that can be overridden.

![Enable webhook](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6024b7f7541b8f856514b56ebf391cd6ee24206fd89c07327de1b01d81795c20/assets/images/conversational-ai/enable-twilio-webhook.png)

The webhook will receive a POST request with the following parameters:

| Parameter       | Type   | Description                            |
| --------------- | ------ | -------------------------------------- |
| `caller_id`     | string | The phone number of the caller         |
| `agent_id`      | string | The ID of the agent receiving the call |
| `called_number` | string | The Twilio number that was called      |
| `call_sid`      | string | Unique identifier for the Twilio call  |

Your webhook must return a JSON response containing the initiation data for the agent.

The `dynamic_variables` field must contain all dynamic variables defined for the agent. Overrides
on the other hand are entirely optional. For more information about dynamic variables and
overrides see the [dynamic variables](/docs/eleven-agents/customization/personalization/dynamic-variables) and
[overrides](/docs/eleven-agents/customization/personalization/overrides) docs.

An example response could be:

```json
{
  "type": "conversation_initiation_client_data",
  "conversation_config_override": {
    "agent": {
      "prompt": {
        "prompt": "The customer's bank account balance is $100. They are based in San Francisco.",
        "llm": "gpt-4o"
      },
      "first_message": "Hi, how can I help you today?",
      "language": "en"
    },
    "tts": {
      "voice_id": "new-voice-id"
    },
    "conversation": {
      "text_only": false
    }
  },
  "dynamic_variables": {
    "customer_name": "John Doe",
    "account_status": "premium",
    "last_interaction": "2024-01-15"
  },
  "branch_id": "agtbrch_xxxx",
  "environment": "production"
}
```

ElevenAgents will use the dynamic variables to populate the conversation initiation data, and the conversation will start smoothly.

Ensure your webhook responds within a reasonable timeout period to avoid delaying the call
handling.

## Security

* Use HTTPS endpoints only
* Implement authentication using request headers
* Store sensitive values as secrets through the [ElevenLabs secrets manager](https://elevenlabs.io/app/agents/settings)
* Validate the incoming request parameters