---
title: Build an AI code executor
description: Use Claude to generate Python code from natural language and execute it securely in sandboxes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build an AI code executor

**Last reviewed:**  8 months ago 

Build an AI-powered code execution system using Sandbox SDK and Claude. Turn natural language questions into Python code, execute it securely, and return results.

**Time to complete:** 20 minutes

## What you'll build

An API that accepts questions like "What's the 100th Fibonacci number?", uses Claude to generate Python code, executes it in an isolated sandbox, and returns the results.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You'll also need:

* An [Anthropic API key ↗](https://console.anthropic.com/) for Claude
* [Docker ↗](https://www.docker.com/) running locally

## 1\. Create your project

Create a new Sandbox SDK project:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- ai-code-executor --template=cloudflare/sandbox-sdk/examples/minimal
```

```
yarn create cloudflare ai-code-executor --template=cloudflare/sandbox-sdk/examples/minimal
```

```
pnpm create cloudflare@latest ai-code-executor --template=cloudflare/sandbox-sdk/examples/minimal
```

Terminal window

```

cd ai-code-executor


```

## 2\. Install dependencies

Install the Anthropic SDK:

 npm  yarn  pnpm  bun 

```
npm i @anthropic-ai/sdk
```

```
yarn add @anthropic-ai/sdk
```

```
pnpm add @anthropic-ai/sdk
```

```
bun add @anthropic-ai/sdk
```

## 3\. Build your code executor

Replace the contents of `src/index.ts`:

TypeScript

```

import { getSandbox, type Sandbox } from '@cloudflare/sandbox';

import Anthropic from '@anthropic-ai/sdk';


export { Sandbox } from '@cloudflare/sandbox';


interface Env {

  Sandbox: DurableObjectNamespace<Sandbox>;

  ANTHROPIC_API_KEY: string;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    if (request.method !== 'POST' || new URL(request.url).pathname !== '/execute') {

      return new Response('POST /execute with { "question": "your question" }');

    }


    try {

      const { question } = await request.json();


      if (!question) {

        return Response.json({ error: 'Question is required' }, { status: 400 });

      }


      // Use Claude to generate Python code

      const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

      const codeGeneration = await anthropic.messages.create({

        model: 'claude-sonnet-4-5',

        max_tokens: 1024,

        messages: [{

          role: 'user',

          content: `Generate Python code to answer: "${question}"


Requirements:

- Use only Python standard library

- Print the result using print()

- Keep code simple and safe


Return ONLY the code, no explanations.`

        }],

      });


      const generatedCode = codeGeneration.content[0]?.type === 'text'

        ? codeGeneration.content[0].text

        : '';


      if (!generatedCode) {

        return Response.json({ error: 'Failed to generate code' }, { status: 500 });

      }


      // Strip markdown code fences if present

      const cleanCode = generatedCode

        .replace(/^```python?\n?/, '')

        .replace(/\n?```\s*$/, '')

        .trim();


      // Execute the code in a sandbox

      const sandbox = getSandbox(env.Sandbox, 'demo-user');

      await sandbox.writeFile('/tmp/code.py', cleanCode);

      const result = await sandbox.exec('python /tmp/code.py');


      return Response.json({

        success: result.success,

        question,

        code: generatedCode,

        output: result.stdout,

        error: result.stderr

      });


    } catch (error: any) {

      return Response.json(

        { error: 'Internal server error', message: error.message },

        { status: 500 }

      );

    }

  },

};


```

**How it works:**

1. Receives a question via POST to `/execute`
2. Uses Claude to generate Python code
3. Writes code to `/tmp/code.py` in the sandbox
4. Executes with `sandbox.exec('python /tmp/code.py')`
5. Returns both the code and execution results

## 4\. Set up local environment variables

Create a `.dev.vars` file in your project root for local development:

Terminal window

```

echo "ANTHROPIC_API_KEY=your_api_key_here" > .dev.vars


```

Replace `your_api_key_here` with your actual API key from the [Anthropic Console ↗](https://console.anthropic.com/).

Note

The `.dev.vars` file is automatically gitignored and only used during local development with `npm run dev`.

## 5\. Test locally

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

curl -X POST http://localhost:8787/execute \

  -H "Content-Type: application/json" \

  -d '{"question": "What is the 10th Fibonacci number?"}'


```

Response:

```

{

  "success": true,

  "question": "What is the 10th Fibonacci number?",

  "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))",

  "output": "55\n",

  "error": ""

}


```

## 6\. Deploy

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Then set your Anthropic API key as a production secret:

Terminal window

```

npx wrangler secret put ANTHROPIC_API_KEY


```

Paste your API key from the [Anthropic Console ↗](https://console.anthropic.com/) when prompted.

Warning

After first deployment, wait 2-3 minutes for container provisioning. Check status with `npx wrangler containers list`.

## 7\. Test your deployment

Try different questions:

Terminal window

```

# Factorial

curl -X POST https://ai-code-executor.YOUR_SUBDOMAIN.workers.dev/execute \

  -H "Content-Type: application/json" \

  -d '{"question": "Calculate the factorial of 5"}'


# Statistics

curl -X POST https://ai-code-executor.YOUR_SUBDOMAIN.workers.dev/execute \

  -H "Content-Type: application/json" \

  -d '{"question": "What is the mean of [10, 20, 30, 40, 50]?"}'


# String manipulation

curl -X POST https://ai-code-executor.YOUR_SUBDOMAIN.workers.dev/execute \

  -H "Content-Type: application/json" \

  -d '{"question": "Reverse the string \"Hello World\""}'


```

## What you built

You created an AI code execution system that:

* Accepts natural language questions
* Generates Python code with Claude
* Executes code securely in isolated sandboxes
* Returns results with error handling

## Next steps

* [Code interpreter with Workers AI](https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/) \- Use Cloudflare's native AI models with official packages
* [Analyze data with AI](https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/) \- Add pandas and matplotlib for data analysis
* [Code Interpreter API](https://developers.cloudflare.com/sandbox/api/interpreter/) \- Use the built-in code interpreter instead of exec
* [Streaming output](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Show real-time execution progress
* [API reference](https://developers.cloudflare.com/sandbox/api/) \- Explore all available methods

## Related resources

* [Anthropic Claude documentation ↗](https://docs.anthropic.com/)
* [Workers AI](https://developers.cloudflare.com/workers-ai/) \- Use Cloudflare's built-in models
* [workers-ai-provider package ↗](https://github.com/cloudflare/ai/tree/main/packages/workers-ai-provider) \- Official Workers AI integration

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/ai-code-executor/#page","headline":"Build an AI code executor · Cloudflare Sandbox SDK docs","description":"Use Claude to generate Python code from natural language and execute it securely in sandboxes.","url":"https://developers.cloudflare.com/sandbox/tutorials/ai-code-executor/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/tutorials/ai-code-executor/","name":"Build an AI code executor"}}]}
```
