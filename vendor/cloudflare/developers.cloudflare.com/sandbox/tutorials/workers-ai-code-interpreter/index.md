---
title: Code interpreter with Workers AI
description: Build a code interpreter using Workers AI GPT-OSS model with the official workers-ai-provider package.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Code interpreter with Workers AI

**Last reviewed:**  5 months ago 

Build a powerful code interpreter that gives the [gpt-oss model](https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/) on Workers AI the ability to execute Python code using the Cloudflare Sandbox SDK.

**Time to complete:** 15 minutes

## What you'll build

A Cloudflare Worker that accepts natural language prompts, uses GPT-OSS to decide when Python code execution is needed, runs the code in isolated sandboxes, and returns results with AI-powered explanations.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You'll also need:

* [Docker ↗](https://www.docker.com/) running locally

## 1\. Create your project

Create a new Sandbox SDK project:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- workers-ai-interpreter --template=cloudflare/sandbox-sdk/examples/code-interpreter
```

```
yarn create cloudflare workers-ai-interpreter --template=cloudflare/sandbox-sdk/examples/code-interpreter
```

```
pnpm create cloudflare@latest workers-ai-interpreter --template=cloudflare/sandbox-sdk/examples/code-interpreter
```

Terminal window

```

cd workers-ai-interpreter


```

## 2\. Review the implementation

The template includes a complete implementation using the latest best practices. Let's examine the key components:

TypeScript

```

// src/index.ts

import { getSandbox } from "@cloudflare/sandbox";

import { generateText, stepCountIs, tool } from "ai";

import { createWorkersAI } from "workers-ai-provider";

import { z } from "zod";


const MODEL = "@cf/openai/gpt-oss-120b" as const;


async function handleAIRequest(input: string, env: Env): Promise<string> {

  const workersai = createWorkersAI({ binding: env.AI });


  const result = await generateText({

    model: workersai(MODEL),

    messages: [{ role: "user", content: input }],

    tools: {

      execute_python: tool({

        description: "Execute Python code and return the output",

        inputSchema: z.object({

          code: z.string().describe("The Python code to execute"),

        }),

        execute: async ({ code }) => {

          return executePythonCode(env, code);

        },

      }),

    },

    stopWhen: stepCountIs(5),

  });


  return result.text || "No response generated";

}


```

**Key improvements over direct REST API calls:**

* **Official packages**: Uses `workers-ai-provider` instead of manual API calls
* **Vercel AI SDK**: Leverages `generateText()` and `tool()` for clean function calling
* **No API keys**: Uses native AI binding instead of environment variables
* **Type safety**: Full TypeScript support with proper typing

## 3\. Check your configuration

The template includes the proper Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-10523)
* [  wrangler.toml ](#tab-panel-10524)

JSONC

```

{

  "name": "sandbox-code-interpreter-example",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "ai": {

    "binding": "AI"

  },

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile",

      "name": "sandbox",

      "max_instances": 1,

      "instance_type": "basic"

    }

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "Sandbox",

        "name": "Sandbox"

      }

    ]

  }

}


```

TOML

```

name = "sandbox-code-interpreter-example"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"


[ai]

binding = "AI"


[[containers]]

class_name = "Sandbox"

image = "./Dockerfile"

name = "sandbox"

max_instances = 1

instance_type = "basic"


[[durable_objects.bindings]]

class_name = "Sandbox"

name = "Sandbox"


```

**Configuration highlights:**

* **AI binding**: Enables direct access to Workers AI models
* **Container setup**: Configures sandbox container with Dockerfile
* **Durable Objects**: Provides persistent sandboxes with state management

## 4\. Test locally

Start the development server:

Terminal window

```

npm run dev


```

Note

First run builds the Docker container (2-3 minutes). Subsequent runs are much faster.

Test with curl:

Terminal window

```

# Simple calculation

curl -X POST http://localhost:8787/run \

  -H "Content-Type: application/json" \

  -d '{"input": "Calculate 5 factorial using Python"}'


# Complex operations

curl -X POST http://localhost:8787/run \

  -H "Content-Type: application/json" \

  -d '{"input": "Use Python to find all prime numbers under 20"}'


# Data analysis

curl -X POST http://localhost:8787/run \

  -H "Content-Type: application/json" \

  -d '{"input": "Create a list of the first 10 squares and calculate their sum"}'


```

## 5\. Deploy

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Warning

After first deployment, wait 2-3 minutes for container provisioning before making requests.

## 6\. Test your deployment

Try more complex queries:

Terminal window

```

# Data visualization preparation

curl -X POST https://workers-ai-interpreter.YOUR_SUBDOMAIN.workers.dev/run \

  -H "Content-Type: application/json" \

  -d '{"input": "Generate sample sales data for 12 months and calculate quarterly totals"}'


# Algorithm implementation

curl -X POST https://workers-ai-interpreter.YOUR_SUBDOMAIN.workers.dev/run \

  -H "Content-Type: application/json" \

  -d '{"input": "Implement a binary search function and test it with a sorted array"}'


# Mathematical computation

curl -X POST https://workers-ai-interpreter.YOUR_SUBDOMAIN.workers.dev/run \

  -H "Content-Type: application/json" \

  -d '{"input": "Calculate the standard deviation of [2, 4, 4, 4, 5, 5, 7, 9]"}'


```

## How it works

1. **User input**: Send natural language prompts to the `/run` endpoint
2. **AI decision**: GPT-OSS receives the prompt with an `execute_python` tool available
3. **Smart execution**: Model decides whether Python code execution is needed
4. **Sandbox isolation**: Code runs in isolated Cloudflare Sandbox containers
5. **AI explanation**: Results are integrated back into the AI's response for final output

## What you built

You deployed a sophisticated code interpreter that:

* **Native Workers AI integration**: Uses the official `workers-ai-provider` package for seamless integration
* **Function calling**: Leverages Vercel AI SDK for clean tool definitions and execution
* **Secure execution**: Runs Python code in isolated sandbox containers
* **Intelligent responses**: Combines AI reasoning with code execution results

## Next steps

* [Analyze data with AI](https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/) \- Add pandas and matplotlib for advanced data analysis
* [Code Interpreter API](https://developers.cloudflare.com/sandbox/api/interpreter/) \- Use the built-in code interpreter with structured outputs
* [Streaming output](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Show real-time execution progress
* [API reference](https://developers.cloudflare.com/sandbox/api/) \- Explore all available sandbox methods

## Related resources

* [Workers AI](https://developers.cloudflare.com/workers-ai/) \- Learn about Cloudflare's AI platform
* [workers-ai-provider package ↗](https://github.com/cloudflare/ai/tree/main/packages/workers-ai-provider) \- Official Workers AI integration
* [Vercel AI SDK ↗](https://sdk.vercel.ai/) \- Universal toolkit for AI applications
* [GPT-OSS model documentation](https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/) \- Model details and capabilities

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/#page","headline":"Code interpreter with Workers AI · Cloudflare Sandbox SDK docs","description":"Build a code interpreter using Workers AI GPT-OSS model with the official workers-ai-provider package.","url":"https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/tutorials/workers-ai-code-interpreter/","name":"Code interpreter with Workers AI"}}]}
```
