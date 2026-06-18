> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Webhook tools

**Tools** enable your assistant to connect to external data and systems. You can define a set of tools that the assistant has access to, and the assistant will use them where appropriate based on the conversation.

## Overview

Many applications require assistants to call external APIs to get real-time information. Tools give your assistant the ability to make external function calls to third party apps so you can get real-time information.

Here are a few examples where tools can be useful:

* **Fetching data**: enable an assistant to retrieve real-time data from any REST-enabled database or 3rd party integration before responding to the user.
* **Taking action**: allow an assistant to trigger authenticated actions based on the conversation, like scheduling meetings or initiating order returns.

To interact with Application UIs or trigger client-side events use [client
tools](/docs/eleven-agents/customization/tools/client-tools) instead.

## Tool configuration

ElevenLabs agents can be equipped with tools to interact with external APIs. Unlike traditional requests, the assistant generates query, body, and path parameters dynamically based on the conversation and parameter descriptions you provide.

All tool configurations and parameter descriptions help the assistant determine **when** and **how** to use these tools. To orchestrate tool usage effectively, update the assistant’s system prompt to specify the sequence and logic for making these calls. This includes:

* **Which tool** to use and under what conditions.
* **What parameters** the tool needs to function properly.
* **How to handle** the responses.

<br />

Define a high-level `Name` and `Description` to describe the tool's purpose. This helps the LLM understand the tool and know when to call it.

If the API requires path parameters, include variables in the URL path by wrapping them in curly
braces `{}`, for example: `/api/resource/{id}` where `id` is a path parameter.

![Configuration](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/fb6e6619e4e7a5f19c2a86f9c2a489f5cb33cfb0883c14a06f0eec3cb35d71d5/assets/images/conversational-ai/tool-configuration.jpg)

Configure authentication by adding custom headers or using out-of-the-box authentication methods through auth connections.

![Tool authentication](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5ffae070945a86b74975cd9b56679c2bb76f0ce70d05fe7b10e8e5dff6ddd630/assets/images/conversational-ai/tool-secrets.jpg)

Specify any headers that need to be included in the request.

![Headers](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9c8c3f2d42f84a6e40922a4c777199e79646b174fa51b9e4d5b21695d7da3f66/assets/images/conversational-ai/tool-headers.jpg)

Include variables in the URL path by wrapping them in curly braces `{}`:

* **Example**: `/api/resource/{id}` where `id` is a path parameter.

![Path parameters](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/12dde95654a12f8fd5894eefe2bdbebb8b819072d3589ed32ddd578997f53c1d/assets/images/conversational-ai/tool-path-parameters.jpg)

Specify any body parameters to be included in the request.

![Body parameters](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/17627460d24323cc40f461196625d34a5825dbe85d684618be0bc46b11ff9205/assets/images/conversational-ai/tool-body-parameters.jpg)

### Content Type

Configure the format for request body encoding:

* **JSON** (default): Sends body parameters as `application/json`
* **URL-encoded**: Sends body parameters as `application/x-www-form-urlencoded`

URL-encoded format is useful when integrating with APIs that require form data submission, such as:

* Legacy systems that only accept form-encoded requests
* OAuth token endpoints
* Payment processing APIs
* Third-party integrations with specific content-type requirements

The content type setting only applies to POST, PUT, and PATCH requests with body parameters.

Specify any query parameters to be included in the request.

![Query parameters](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/4127f87fe066cdaa71df0e6f75caa24ec8174e7d156c74b3c62ea9df98b9712e/assets/images/conversational-ai/tool-query-parameters.jpg)

Specify dynamic variables to update from the tool response for later use in the conversation.

![Query parameters](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/95ff0cae8613eafa8bc4312e7cafa39ac0eab34d2fd2b21f0894a30775366110/assets/images/conversational-ai/dv-assignment.png)

## Guide

In this guide, we'll create a weather assistant that can provide real-time weather information for any location. The assistant will use its geographic knowledge to convert location names into coordinates and fetch accurate weather data.

<iframe src="https://player.vimeo.com/video/1061374724?h=bd9bdb535e&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="weatheragent" />

The weather tool sends GET requests to `https://api.open-meteo.com/v1/forecast` with `latitude` and `longitude` as path parameters supplied by the LLM.

On the **Agent** section of your agent settings page, choose **Add Tool**. Select **Webhook** as the Tool Type, then configure the weather API integration with these values:

| Field       | Value                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | get\_weather                                                                                                                                                                                                                                                                                                                                                                           |
| Description | Gets the current weather forecast for a location                                                                                                                                                                                                                                                                                                                                       |
| Method      | GET                                                                                                                                                                                                                                                                                                                                                                                    |
| URL         | [https://api.open-meteo.com/v1/forecast?latitude=\{latitude}\&longitude=\{longitude}\&current=temperature\_2m,wind\_speed\_10m\&hourly=temperature\_2m,relative\_humidity\_2m,wind\_speed\_10m](https://api.open-meteo.com/v1/forecast?latitude=\{latitude}\&longitude=\{longitude}\&current=temperature_2m,wind_speed_10m\&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m) |

Add two path parameters with `LLM Prompt` value type:

| Data Type | Identifier | Description                                         |
| --------- | ---------- | --------------------------------------------------- |
| string    | latitude   | The latitude coordinate for the requested location  |
| string    | longitude  | The longitude coordinate for the requested location |

Save the following as `tool_configs/get_weather.json`:

```json
{
  "type": "webhook",
  "name": "get_weather",
  "description": "Gets the current weather forecast for a location",
  "api_schema": {
    "url": "https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m",
    "method": "GET",
    "path_params_schema": {
      "latitude": {
        "type": "string",
        "description": "The latitude coordinate for the requested location"
      },
      "longitude": {
        "type": "string",
        "description": "The longitude coordinate for the requested location"
      }
    }
  }
}
```

```bash
elevenlabs tools add "get_weather" --type "webhook" --config-path ./tool_configs/get_weather.json
```

Edit `agent_configs/<agent-name>.json` and add the tool's ID to `conversation_config.agent.prompt.tool_ids`, then push:

```bash
elevenlabs agents push --agent "<agent-name>"
```

```python
from elevenlabs import ElevenLabs

elevenlabs = ElevenLabs()

tool = elevenlabs.conversational_ai.tools.create(
    tool_config={
        "type": "webhook",
        "name": "get_weather",
        "description": "Gets the current weather forecast for a location",
        "api_schema": {
            "url": "https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m",
            "method": "GET",
            "path_params_schema": {
                "latitude": {
                    "type": "string",
                    "description": "The latitude coordinate for the requested location",
                },
                "longitude": {
                    "type": "string",
                    "description": "The longitude coordinate for the requested location",
                },
            },
        },
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
    type: "webhook",
    name: "get_weather",
    description: "Gets the current weather forecast for a location",
    apiSchema: {
      url: "https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m",
      method: "GET",
      pathParamsSchema: {
        latitude: {
          type: "string",
          description: "The latitude coordinate for the requested location",
        },
        longitude: {
          type: "string",
          description: "The longitude coordinate for the requested location",
        },
      },
    },
  },
});

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  conversationConfig: {
    agent: { prompt: { toolIds: [tool.id] } },
  },
});
```

An API key is not required for this tool. If one is required, this should be passed in the headers and stored as a secret.

Configure your assistant to handle weather queries intelligently with this system prompt:

```plaintext System prompt
You are a helpful conversational agent with access to a weather tool. When users ask about
weather conditions, use the get_weather tool to fetch accurate, real-time data. The tool requires
a latitude and longitude - use your geographic knowledge to convert location names to coordinates
accurately.

Never ask users for coordinates - you must determine these yourself. Always report weather
information conversationally, referring to locations by name only. For weather requests:

1. Extract the location from the user's message
2. Convert the location to coordinates and call get_weather
3. Present the information naturally and helpfully

For non-weather queries, provide friendly assistance within your knowledge boundaries. Always be
concise, accurate, and helpful.

First message: "Hey, how can I help you today?"
```

Test your assistant by asking about the weather in different locations. The assistant should
handle specific locations ("What's the weather in Tokyo?") and ask for clarification after general queries ("How's
the weather looking today?").

## Supported Authentication Methods

ElevenLabs Agents supports multiple authentication methods to securely connect your tools with external APIs. Authentication methods are configured in your agent settings and then connected to individual tools as needed.

![Workspace Auth Connection](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/131f7e017f01eaba444cddc672efdb77415db1a4c3a39f05b92a1678c5cd68f1/assets/images/conversational-ai/workspace-auth-connection.png)

Once configured, you can connect these authentication methods to your tools and manage custom headers in the tool configuration:

![Tool Auth Connection](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/c018c5bf11266512a6d6157e33274b1a12f8c20768e5ab18da0f20f933f8aea9/assets/images/conversational-ai/tool-auth-config.png)

#### OAuth2 Client Credentials

Automatically handles the OAuth2 client credentials flow. Configure with your client ID, client secret, and token URL (e.g., `https://api.example.com/oauth/token`). Optionally specify scopes as comma-separated values and additional JSON parameters. Set up by clicking **Add Auth** on **Workspace Auth Connections** on the **Agent** section of your agent settings page.

#### OAuth2 JWT

Uses JSON Web Token authentication for OAuth 2.0 JWT Bearer flow. Requires your JWT signing secret, token URL, and algorithm (default: HS256). Configure JWT claims including issuer, audience, and subject. Optionally set key ID, expiration (default: 3600 seconds), scopes, and extra parameters. Set up by clicking **Add Auth** on **Workspace Auth Connections** on the **Agent** section of your agent settings page.

#### Basic Authentication

Simple username and password authentication for APIs that support HTTP Basic Auth. Set up by clicking **Add Auth** on **Workspace Auth Connections** in the **Agent** section of your agent settings page.

#### Bearer Tokens

Token-based authentication that adds your bearer token value to the request header. Configure by adding a header to the tool configuration, selecting **Secret** as the header type, and clicking **Create New Secret**.

#### Custom Headers

Add custom authentication headers with any name and value for proprietary authentication methods. Configure by adding a header to the tool configuration and specifying its **name** and **value**.

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

## Tool Call Sounds

You can configure ambient audio to play during tool execution to enhance the user experience. Learn more about [Tool Call Sounds](/docs/eleven-agents/customization/tools/tool-configuration/tool-call-sounds).