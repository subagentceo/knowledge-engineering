> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Anthropic SDK

> Use the Nimble SDK as a tool inside Claude's tool-use API.

Give Claude models real-time web data by wiring the Nimble SDK into Anthropic tool use — no extra packages needed.

## Prerequisites

<CodeGroup>
  ```bash Python theme={"system"}
  pip install anthropic nimble_python
  ```

  ```bash Node theme={"system"}
  npm install @anthropic-ai/sdk @nimble-way/nimble-js
  ```
</CodeGroup>

Set environment variables:

```bash theme={"system"}
export ANTHROPIC_API_KEY="your-anthropic-api-key"
export NIMBLE_API_KEY="your-nimble-api-key"
```

Get a Nimble API key from the [dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available).

## Quick Start — Tool Runner

The Anthropic Python SDK includes a `tool_runner` that handles the tool-calling loop automatically. Define Nimble tools with the `@beta_tool` decorator and the SDK manages execution, message history, and retries.

```python Python theme={"system"}
import os
import json
import anthropic
from anthropic import beta_tool
from nimble_python import Nimble

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
nimble_client = Nimble(api_key=os.environ["NIMBLE_API_KEY"])

@beta_tool
def nimble_search(query: str) -> str:
    """Search the web using Nimble and return relevant results.

    Args:
        query: The search query to execute.
    """
    result = nimble_client.search(query=query)
    return json.dumps(result, default=str)

@beta_tool
def nimble_extract(url: str) -> str:
    """Extract clean content from a URL using Nimble.

    Args:
        url: The URL to extract content from.
    """
    result = nimble_client.extract(url=url)
    return json.dumps(result, default=str)

runner = client.beta.messages.tool_runner(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    tools=[nimble_search, nimble_extract],
    messages=[{"role": "user", "content": "What are the latest trends in AI agents?"}],
)

for message in runner:
    for block in message.content:
        if hasattr(block, "text"):
            print(block.text)
```

<Tip>
  The `@beta_tool` decorator auto-generates the JSON schema from type hints and doc strings — no manual schema definition needed.
</Tip>

## Messages API (Manual Loop)

For more control, define tools using the Anthropic `input_schema` format and handle the `tool_use` → `tool_result` loop manually.

### 1. Define the Tool Schema

```python Python theme={"system"}
tools = [
    {
        "name": "nimble_search",
        "description": "Search the web using Nimble and return relevant results.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query to execute"
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "nimble_extract",
        "description": "Extract clean content from a URL using Nimble.",
        "input_schema": {
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
]
```

### 2. Handle the Tool-Use Loop

```python Python theme={"system"}
import os
import json
import anthropic
from nimble_python import Nimble

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
nimble_client = Nimble(api_key=os.environ["NIMBLE_API_KEY"])

def process_tool_call(name, tool_input):
    if name == "nimble_search":
        result = nimble_client.search(query=tool_input["query"])
        return json.dumps(result, default=str)
    elif name == "nimble_extract":
        result = nimble_client.extract(url=tool_input["url"])
        return json.dumps(result, default=str)

messages = [
    {"role": "user", "content": "What are the latest trends in AI agents?"}
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    tools=tools,
    messages=messages,
)

# Tool-use loop: keep processing until Claude stops calling tools
while response.stop_reason == "tool_use":
    tool_use_blocks = [block for block in response.content if block.type == "tool_use"]
    messages.append({"role": "assistant", "content": response.content})

    tool_results = []
    for tool_use in tool_use_blocks:
        result = process_tool_call(tool_use.name, tool_use.input)
        tool_results.append({
            "type": "tool_result",
            "tool_use_id": tool_use.id,
            "content": result,
        })

    messages.append({"role": "user", "content": tool_results})

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        tools=tools,
        messages=messages,
    )

for block in response.content:
    if hasattr(block, "text"):
        print(block.text)
```

### Node.js Example

```typescript Node theme={"system"}
import Anthropic from "@anthropic-ai/sdk";
import Nimble from "@nimble-way/nimble-js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const nimble = new Nimble({ apiKey: process.env.NIMBLE_API_KEY });

const tools: Anthropic.Tool[] = [
  {
    name: "nimble_search",
    description: "Search the web using Nimble and return relevant results.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "The search query to execute" },
      },
      required: ["query"],
    },
  },
  {
    name: "nimble_extract",
    description: "Extract clean content from a URL using Nimble.",
    input_schema: {
      type: "object" as const,
      properties: {
        url: { type: "string", description: "The URL to extract content from" },
      },
      required: ["url"],
    },
  },
];

async function processToolCall(name: string, toolInput: Record<string, string>) {
  if (name === "nimble_search") {
    return await nimble.search({ query: toolInput.query });
  }
  if (name === "nimble_extract") {
    return await nimble.extract({ url: toolInput.url });
  }
}

const messages: Anthropic.MessageParam[] = [
  { role: "user", content: "What are the latest trends in AI agents?" },
];

let response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 4096,
  tools,
  messages,
});

while (response.stop_reason === "tool_use") {
  const toolUseBlocks = response.content.filter(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );

  messages.push({ role: "assistant", content: response.content });

  const toolResults: Anthropic.ToolResultBlockParam[] = [];
  for (const toolUse of toolUseBlocks) {
    const result = await processToolCall(
      toolUse.name,
      toolUse.input as Record<string, string>
    );
    toolResults.push({
      type: "tool_result",
      tool_use_id: toolUse.id,
      content: JSON.stringify(result),
    });
  }

  messages.push({ role: "user", content: toolResults });

  response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    tools,
    messages,
  });
}

for (const block of response.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
```

## How It Works

The Anthropic tool-use flow has three steps:

<Steps>
  <Step title="Send tools and message">
    Pass the tool definitions and user message to Claude. If Claude decides to use a tool, it returns a `tool_use` content block with the tool name and input.
  </Step>

  <Step title="Execute the tool">
    Parse the `tool_use` block and call the corresponding Nimble SDK method. Return the result as a `tool_result` message.
  </Step>

  <Step title="Get the final answer">
    Claude processes the tool result and responds with a text answer. If it needs more data, it may call another tool — the loop continues until `stop_reason` is `end_turn`.
  </Step>
</Steps>

## Available Tools

Any Nimble SDK method can be exposed as an Anthropic tool. Here are the most common ones:

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

  <Card title="OpenAI" icon="bolt" href="/integrations/connectors/openai">
    Use Nimble with OpenAI function calling and the Agents SDK
  </Card>
</CardGroup>
