> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Client tools

**Client tools** enable your assistant to execute client-side functions. Unlike [webhook tools](/docs/eleven-agents/customization/tools/webhook-tools), client tools allow the assistant to perform actions such as triggering browser events, running client-side functions, or sending notifications to a UI.

## Overview

Applications may require assistants to interact directly with the user's environment. Client-side tools give your assistant the ability to perform client-side operations.

Here are a few examples where client tools can be useful:

* **Triggering UI events**: Allow an assistant to trigger browser events, such as alerts, modals or notifications.
* **Interacting with the DOM**: Enable an assistant to manipulate the Document Object Model (DOM) for dynamic content updates or to guide users through complex interfaces.

To call server-side APIs, use [webhook
tools](/docs/eleven-agents/customization/tools/webhook-tools) instead.

## Guide

### Prerequisites

* An [ElevenLabs account](https://elevenlabs.io)
* A configured ElevenLabs Conversational Agent ([create one here](https://elevenlabs.io/app/agents))

Configure a client tool named `logMessage` with a required string parameter `message` ("The message to log in the console").

Navigate to your agent dashboard. In the **Tools** section, click **Add Tool**. Ensure the **Tool Type** is set to **Client**. Then configure the following:

| Setting     | Parameter                                                        |
| ----------- | ---------------------------------------------------------------- |
| Name        | logMessage                                                       |
| Description | Use this client-side tool to log a message to the user's client. |

Then create a new parameter `message` with the following configuration:

| Setting     | Parameter                                                                          |
| ----------- | ---------------------------------------------------------------------------------- |
| Data Type   | String                                                                             |
| Identifier  | message                                                                            |
| Required    | true                                                                               |
| Description | The message to log in the console. Ensure the message is informative and relevant. |

![logMessage client-tool setup](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/f7ed25d49a2a814b76112f3e385d471e0dc8444705e11f2f6fad0bd23f1eae12/assets/images/conversational-ai/client-tool-example.jpg)

Save the following as `tool_configs/log_message.json`:

```json
{
  "type": "client",
  "name": "logMessage",
  "description": "Use this client-side tool to log a message to the user's client.",
  "expects_response": false,
  "parameters": [
    {
      "id": "message",
      "type": "string",
      "value_type": "llm_prompt",
      "description": "The message to log in the console.",
      "required": true
    }
  ]
}
```

```bash
elevenlabs tools add "logMessage" --type "client" --config-path ./tool_configs/log_message.json
```

Edit `agent_configs/<agent-name>.json` to add the tool's ID to `conversation_config.agent.prompt.tool_ids`, then push:

```bash
elevenlabs agents push --agent "<agent-name>"
```

```python
from elevenlabs import ElevenLabs

elevenlabs = ElevenLabs()

tool = elevenlabs.conversational_ai.tools.create(
    tool_config={
        "type": "client",
        "name": "logMessage",
        "description": "Use this client-side tool to log a message to the user's client.",
        "expects_response": False,
        "parameters": [
            {
                "id": "message",
                "type": "string",
                "value_type": "llm_prompt",
                "description": "The message to log in the console.",
                "required": True,
            }
        ],
    }
)

elevenlabs.conversational_ai.agents.update(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    conversation_config={
        "agent": {"prompt": {"tool_ids": [tool.id]}},
    },
)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

const tool = await elevenlabs.conversationalAi.tools.create({
  toolConfig: {
    type: "client",
    name: "logMessage",
    description: "Use this client-side tool to log a message to the user's client.",
    expectsResponse: false,
    parameters: [
      {
        id: "message",
        type: "string",
        valueType: "llm_prompt",
        description: "The message to log in the console.",
        required: true,
      },
    ],
  },
});

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  conversationConfig: {
    agent: { prompt: { toolIds: [tool.id] } },
  },
});
```

Unlike webhook tools, client tools need to be registered in your code.

Use the following code to register the client tool:

```python title="Python" focus={4-16}
from elevenlabs import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation, ClientTools

def log_message(parameters):
    message = parameters.get("message")
    print(message)

client_tools = ClientTools()
client_tools.register("logMessage", log_message)

conversation = Conversation(
    client=ElevenLabs(api_key="your-api-key"),
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    requires_auth=True,
    client_tools=client_tools,
    # ...
)

conversation.start_session()
```

```javascript title="JavaScript" focus={2-10}
// ...
const conversation = await Conversation.startSession({
  // ...
  clientTools: {
    logMessage: async ({message}) => {
      console.log(message);
    }
  },
  // ...
});
```

```swift title="Swift" focus={2-10}
// ...
var clientTools = ElevenLabsSDK.ClientTools()

clientTools.register("logMessage") { parameters async throws -> String? in
    guard let message = parameters["message"] as? String else {
        throw ElevenLabsSDK.ClientToolError.invalidParameters
    }
    print(message)
    return message
}
```

The tool and parameter names in the agent configuration are case-sensitive and **must** match those registered in your code.

Initiate a conversation with your agent and say something like:

> *Log a message to the console that says Hello World*

You should see a `Hello World` log appear in your console.

Now that you've set up a basic client-side event, you can:

* Explore more complex client tools like opening modals, navigating to pages, or interacting with the DOM.
* Combine client tools with server-side webhooks for full-stack interactions.
* Use client tools to enhance user engagement and provide real-time feedback during conversations.

### Passing client tool results to the conversation context

When you want your agent to receive data back from a client tool, ensure that you tick the **Wait for response** option in the tool configuration.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/0ecc615fc9f25446b67369fd3e010e34b39549a22146a2483ea17251206caf1e/assets/images/conversational-ai/wait-until-tool-result.png" alt="Wait for response option in client tool configuration" />

Once the client tool is added, when the function is called the agent will wait for its response and append the response to the conversation context.

```python title="Python"
def get_customer_details():
    # Fetch customer details (e.g., from an API or database)
    customer_data = {
        "id": 123,
        "name": "Alice",
        "subscription": "Pro"
    }
    # Return the customer data; it can also be a JSON string if needed.
    return customer_data

client_tools = ClientTools()
client_tools.register("getCustomerDetails", get_customer_details)

conversation = Conversation(
    client=ElevenLabs(api_key="your-api-key"),
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    requires_auth=True,
    client_tools=client_tools,
    # ...
)

conversation.start_session()
```

```javascript title="JavaScript"
const clientTools = {
  getCustomerDetails: async () => {
    // Fetch customer details (e.g., from an API)
    const customerData = {
      id: 123,
      name: "Alice",
      subscription: "Pro"
    };
    // Return data directly to the agent.
    return customerData;
  }
};

// Start the conversation with client tools configured.
const conversation = await Conversation.startSession({ clientTools });
```

In this example, when the agent calls **getCustomerDetails**, the function will execute on the client and the agent will receive the returned data, which is then used as part of the conversation context. The values from the response can also optionally be assigned to dynamic variables, similar to [webhook tools](https://elevenlabs.io/docs/eleven-agents/customization/tools/webhook-tools). Note system tools cannot update dynamic variables.

### Troubleshooting

* Ensure the tool and parameter names in the agent configuration match those registered in your code.
* View the conversation transcript in the agent dashboard to verify the tool is being executed.

- Open the browser console to check for any errors.
- Ensure that your code has necessary error handling for undefined or unexpected parameters.

## Best practices

<h4>
  Name tools intuitively, with detailed descriptions
</h4>

If you find the assistant does not make calls to the correct tools, you may need to update your tool names and descriptions so the assistant more clearly understands when it should select each tool. Avoid using abbreviations or acronyms to shorten tool and argument names.

You can also include detailed descriptions for when a tool should be called. For complex tools, you should include descriptions for each of the arguments to help the assistant know what it needs to ask the user to collect that argument.

<h4>
  Name tool parameters intuitively, with detailed descriptions
</h4>

Use clear and descriptive names for tool parameters. If applicable, specify the expected format for a parameter in the description (e.g., YYYY-mm-dd or dd/mm/yy for a date).

<h4>
  Consider providing additional information about how and when to call tools in your assistant's
  system prompt
</h4>

Providing clear instructions in your system prompt can significantly improve the assistant's tool calling accuracy. For example, guide the assistant with instructions like the following:

```plaintext
Use `check_order_status` when the user inquires about the status of their order, such as 'Where is my order?' or 'Has my order shipped yet?'.
```

Provide context for complex scenarios. For example:

```plaintext
Before scheduling a meeting with `schedule_meeting`, check the user's calendar for availability using check_availability to avoid conflicts.
```

<h4>
  LLM selection
</h4>

When using tools, we recommend picking high intelligence models like GPT 5.2, Gemini-2.5-Flash, or
Claude Sonnet 4.5 and avoiding Gemini-2.0-Flash.

It's important to note that the choice of LLM matters to the success of function calls. Some LLMs can struggle with extracting the relevant parameters from the conversation.