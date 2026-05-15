> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI

> Use the Nimble SDK as a tool inside OpenAI function calling and the Agents SDK.

Give OpenAI models real-time web data by wiring the Nimble SDK into function calling — no extra packages needed.

## Prerequisites

<CodeGroup>
  ```bash Python theme={"system"}
  pip install openai nimble_python
  ```

  ```bash Node theme={"system"}
  npm install openai @nimble-way/nimble-js
  ```
</CodeGroup>

Set environment variables:

```bash theme={"system"}
export OPENAI_API_KEY="your-openai-api-key"
export NIMBLE_API_KEY="your-nimble-api-key"
```

Get a Nimble API key from the [dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available).

## Quick Start — OpenAI Agents SDK

The [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) provides a higher-level framework for building agents. Wrap Nimble tools with the `@function_tool` decorator and the SDK handles the tool-calling loop automatically.

```bash theme={"system"}
pip install openai-agents nimble_python
```

```python Python theme={"system"}
import os
import asyncio
from agents import Agent, Runner, function_tool
from nimble_python import Nimble

nimble_client = Nimble(api_key=os.environ["NIMBLE_API_KEY"])

@function_tool
def nimble_search(query: str) -> str:
    """Search the web using Nimble and return relevant results."""
    result = nimble_client.search(query=query)
    return str(result)

@function_tool
def nimble_extract(url: str) -> str:
    """Extract clean content from a URL using Nimble."""
    result = nimble_client.extract(url=url)
    return str(result)

async def main():
    agent = Agent(
        name="Web Research Agent",
        instructions=(
            "You are a research assistant with access to real-time web data. "
            "Use nimble_search to find information and nimble_extract to read specific pages."
        ),
        tools=[nimble_search, nimble_extract],
    )

    result = await Runner.run(agent, "What are the latest trends in AI agents?")
    print(result.final_output)

asyncio.run(main())
```

## Chat Completions API

For more control over the tool-calling loop, define Nimble tools as OpenAI function schemas and handle calls manually.

### 1. Define the Tool Schema

```python Python theme={"system"}
tools = [
    {
        "type": "function",
        "function": {
            "name": "nimble_search",
            "description": "Search the web using Nimble and return relevant results.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query to execute"
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "nimble_extract",
            "description": "Extract clean content from a URL using Nimble.",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "The URL to extract content from"
                    }
                },
                "required": ["url"]
            }
        }
    }
]
```

### 2. Handle Tool Calls

```python Python theme={"system"}
import os
import json
from openai import OpenAI
from nimble_python import Nimble

openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
nimble_client = Nimble(api_key=os.environ["NIMBLE_API_KEY"])

def handle_tool_call(name, args):
    if name == "nimble_search":
        result = nimble_client.search(query=args["query"])
        return json.dumps(result, default=str)
    elif name == "nimble_extract":
        result = nimble_client.extract(url=args["url"])
        return json.dumps(result, default=str)

messages = [
    {"role": "system", "content": "You are a research assistant with access to real-time web data."},
    {"role": "user", "content": "What are the latest trends in AI agents?"}
]

response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
)

assistant_msg = response.choices[0].message
messages.append(assistant_msg)

if assistant_msg.tool_calls:
    for tc in assistant_msg.tool_calls:
        args = json.loads(tc.function.arguments)
        result = handle_tool_call(tc.function.name, args)
        messages.append({
            "role": "tool",
            "tool_call_id": tc.id,
            "content": result,
        })

    final = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )
    print(final.choices[0].message.content)
```

### Node.js Example

```typescript Node theme={"system"}
import OpenAI from "openai";
import Nimble from "@nimble-way/nimble-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const nimble = new Nimble({ apiKey: process.env.NIMBLE_API_KEY });

const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "nimble_search",
      description: "Search the web using Nimble and return relevant results.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "The search query to execute" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "nimble_extract",
      description: "Extract clean content from a URL using Nimble.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "The URL to extract content from" },
        },
        required: ["url"],
      },
    },
  },
];

async function handleToolCall(name: string, args: Record<string, string>) {
  if (name === "nimble_search") {
    return await nimble.search({ query: args.query });
  }
  if (name === "nimble_extract") {
    return await nimble.extract({ url: args.url });
  }
}

const messages: OpenAI.ChatCompletionMessageParam[] = [
  { role: "system", content: "You are a research assistant with access to real-time web data." },
  { role: "user", content: "What are the latest trends in AI agents?" },
];

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages,
  tools,
});

const assistantMsg = response.choices[0].message;
messages.push(assistantMsg);

if (assistantMsg.tool_calls) {
  for (const tc of assistantMsg.tool_calls) {
    const args = JSON.parse(tc.function.arguments);
    const result = await handleToolCall(tc.function.name, args);
    messages.push({
      role: "tool",
      tool_call_id: tc.id,
      content: JSON.stringify(result),
    });
  }

  const final = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });

  console.log(final.choices[0].message.content);
}
```

## Available Tools

Any Nimble SDK method can be exposed as an OpenAI tool. Here are the most common ones:

| Tool             | SDK Method           | Use Case                           |
| ---------------- | -------------------- | ---------------------------------- |
| `nimble_search`  | `client.search()`    | Web search with structured results |
| `nimble_extract` | `client.extract()`   | Extract content from a URL         |
| `nimble_crawl`   | `client.crawl.run()` | Crawl an entire site               |
| `nimble_map`     | `client.map()`       | Discover all URLs on a domain      |

<Tip>
  See the [Python SDK](/nimble-sdk/sdks/python) and [Node SDK](/nimble-sdk/sdks/node) docs for the full list of methods and parameters.
</Tip>

## Next Steps

<CardGroup cols={2}>
  <Card title="Python SDK" icon="python" href="/nimble-sdk/sdks/python">
    Full Python SDK reference — all methods and configuration options
  </Card>

  <Card title="Node SDK" icon="node-js" href="/nimble-sdk/sdks/node">
    Full Node.js SDK reference with TypeScript support
  </Card>

  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Web search with depth levels, filtering, and AI answers
  </Card>

  <Card title="LangChain" icon="link" href="/integrations/connectors/langchain">
    Pre-built LangChain tools and retrievers for Nimble
  </Card>
</CardGroup>
