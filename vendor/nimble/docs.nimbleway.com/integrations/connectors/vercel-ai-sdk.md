> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Vercel AI SDK

> Integrate Nimble with the Vercel AI SDK to enhance your AI agents with powerful real-time web search.

### Overview

The [`@nimble-way/ai-sdk`](https://www.npmjs.com/package/@nimble-way/ai-sdk) package provides a pre-built tool for Vercel's AI SDK v6, making it easy to add real-time web search to your AI applications. Register `nimbleSearch()` on an agent and the model decides when to search, runs the query through Nimble, and gets back clean, structured results to cite.

* **One tool, zero boilerplate** — drop `nimbleSearch()` into your agent and you're done.
* **Works with any model** — OpenAI, Anthropic, Google, and others supported by the AI SDK.
* **Two search depths** — `lite` for fast metadata, `deep` for full page content.
* **Type-safe** — written in TypeScript with typed options and output.

<Note>
  v1 ships **Web Search** only. Extract, Map, Crawl, and Agents are planned as follow-ups.
</Note>

### Quick Start

<Steps>
  <Step title="Install">
    ```bash theme={"system"}
    npm install @nimble-way/ai-sdk ai @ai-sdk/openai
    ```

    `ai` (v6) and `zod` are peer dependencies. The examples use OpenAI via [`@ai-sdk/openai`](https://www.npmjs.com/package/@ai-sdk/openai), but `nimbleSearch` works with any AI SDK model provider.
  </Step>

  <Step title="Set your API keys">
    Get a Nimble key from the [dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available), then set both keys:

    ```bash theme={"system"}
    export NIMBLE_API_KEY="your-api-key"
    export OPENAI_API_KEY="your-openai-api-key"
    ```

    You can also pass the Nimble key inline: `nimbleSearch({ apiKey: '...' })`.
  </Step>

  <Step title="Add the tool to an agent">
    ```ts theme={"system"}
    import { generateText, stepCountIs } from 'ai';
    import { openai } from '@ai-sdk/openai';
    import { nimbleSearch } from '@nimble-way/ai-sdk';

    const { text } = await generateText({
      model: openai('gpt-5'),
      prompt: 'What are the latest developments in agentic web search? Cite sources.',
      tools: {
        webSearch: nimbleSearch({ searchDepth: 'lite', maxResults: 5 }),
      },
      stopWhen: stepCountIs(3),
    });

    console.log(text);
    ```
  </Step>
</Steps>

### How it works

<Steps>
  <Step title="The model receives the tool">
    `nimbleSearch()` registers a `webSearch` tool the model can call when it needs current information.
  </Step>

  <Step title="The model decides to search">
    When the prompt needs live data, the model emits a tool call with a `query` (and optional `maxResults`).
  </Step>

  <Step title="Nimble runs the search">
    The query goes to Nimble's Web Search API, which returns clean, structured results.
  </Step>

  <Step title="The model answers">
    Results are fed back to the model, which uses them to write a grounded, citable answer. `stopWhen: stepCountIs(n)` caps how many search rounds a single turn can take.
  </Step>
</Steps>

<Warning>
  Use `stepCountIs` — not `isStepCount`. The latter does not exist in `ai` v6. Set it on every agent to prevent runaway loops and unbounded cost: `3`–`5` for chat, higher for autonomous agents.
</Warning>

### Next.js route handler

For a streaming chat app, swap `generateText` for `streamText` inside a route handler and return `toUIMessageStreamResponse()`. The client connects with the AI SDK [`useChat`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat) hook — no extra wiring needed.

```ts theme={"system"}
// app/api/chat/route.ts
import {
  convertToModelMessages,
  streamText,
  stepCountIs,
  type UIMessage,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { nimbleSearch } from '@nimble-way/ai-sdk';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-5'),
    messages: await convertToModelMessages(messages),
    tools: {
      webSearch: nimbleSearch({ searchDepth: 'lite', maxResults: 5 }),
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
```

### Configuration options

Configure `nimbleSearch()` once; the model only ever supplies `{ query, maxResults? }`.

<AccordionGroup>
  <Accordion title="apiKey">
    Nimble API credentials. Defaults to `process.env.NIMBLE_API_KEY`.
  </Accordion>

  <Accordion title="searchDepth">
    `'lite'` returns metadata only (fast); `'deep'` returns full page content. Default `'lite'`.
  </Accordion>

  <Accordion title="maxResults">
    Default number of results per search. Type `number`, default `5`.
  </Accordion>

  <Accordion title="maxResultsCap">
    Hard upper limit on results the model can request. Type `number`, default `10`.
  </Accordion>

  <Accordion title="maxContentLength">
    Per-result content truncation, in characters. Type `number`, default `10_000`.
  </Accordion>

  <Accordion title="country">
    Two-letter country code for localization. Type `string`, default `'US'`.
  </Accordion>

  <Accordion title="locale">
    Language preference. Type `string`, default `'en'`.
  </Accordion>

  <Accordion title="client">
    Injectable `NimbleSearchClient` for testing. Optional.
  </Accordion>
</AccordionGroup>

### Response shape

Each tool call returns a structured result the model can reason over:

```ts theme={"system"}
{
  query: string;
  requestId?: string;
  totalResults?: number;
  results: Array<{
    title: string;
    url: string;
    description?: string;
    content?: string;     // deep searches only
    position?: number;
    entityType?: string;
  }>;
}
```

### Limitations

* **Web Search only** in v1 — Extract, Map, Crawl, and Agents are planned follow-ups.
* **No built-in answer generation** — the tool returns results; the model writes the answer.
* **Node.js runtime** (≥18) is the supported target; edge/serverless compatibility is unverified.

### Resources

<CardGroup cols={2}>
  <Card title="npm Package" icon="npm" href="https://www.npmjs.com/package/@nimble-way/ai-sdk">
    `@nimble-way/ai-sdk` on npm.
  </Card>

  <Card title="GitHub Repository" icon="github" href="https://github.com/Nimbleway/ai-sdk">
    Source, README, and issues.
  </Card>

  <Card title="Web Search API" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Nimble's underlying search capability.
  </Card>

  <Card title="Example Cookbook" icon="book" href="https://github.com/Nimbleway/cookbook">
    Runnable integration examples.
  </Card>
</CardGroup>
