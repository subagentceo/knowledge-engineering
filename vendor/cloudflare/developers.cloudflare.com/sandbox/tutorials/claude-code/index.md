---
title: Run Claude Code on a Sandbox
description: Use Claude Code to implement a task in your GitHub repository.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Run Claude Code on a Sandbox

**Last reviewed:**  8 months ago 

Build a Worker that takes a repository URL and a task description and uses Sandbox SDK to run Claude Code to implement your task.

**Time to complete:** 5 minutes

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You'll also need:

* An [Anthropic API key ↗](https://console.anthropic.com/) for Claude Code
* [Docker ↗](https://www.docker.com/) running locally

## 1\. Create your project

Create a new Sandbox SDK project:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- claude-code-sandbox --template=cloudflare/sandbox-sdk/examples/claude-code
```

```
yarn create cloudflare claude-code-sandbox --template=cloudflare/sandbox-sdk/examples/claude-code
```

```
pnpm create cloudflare@latest claude-code-sandbox --template=cloudflare/sandbox-sdk/examples/claude-code
```

Terminal window

```

cd claude-code-sandbox


```

## 2\. Set up local environment variables

Create a `.dev.vars` file in your project root for local development:

Terminal window

```

echo "ANTHROPIC_API_KEY=your_api_key_here" > .dev.vars


```

Replace `your_api_key_here` with your actual API key from the [Anthropic Console ↗](https://console.anthropic.com/).

Note

The `.dev.vars` file is automatically gitignored and only used during local development with `npm run dev`.

## 3\. Test locally

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

curl -X POST http://localhost:8787/ \

  -d '{

    "repo": "https://github.com/cloudflare/agents",

    "task": "remove the emojis from the readme"

  }'


```

Response:

```

{

  "logs": "Done! I've removed the brain emoji from the README title. The heading now reads \"# Cloudflare Agents\" instead of \"# 🧠 Cloudflare Agents\".",

  "diff": "diff --git a/README.md b/README.md\nindex 9296ac9..027c218 100644\n--- a/README.md\n+++ b/README.md\n@@ -1,4 +1,4 @@\n-# 🧠 Cloudflare Agents\n+# Cloudflare Agents\n \n ![npm install agents](assets/npm-install-agents.svg)\n "

}


```

## 4\. Deploy

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

## What you built

You created an API that:

* Accepts a repository URL and natural language task descriptions
* Creates a Sandbox and clones the repository into it
* Kicks off Claude Code to implement the given task
* Returns Claude's output and changes

## Next steps

* [Analyze data with AI](https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/) \- Add pandas and matplotlib for data analysis
* [Code Interpreter API](https://developers.cloudflare.com/sandbox/api/interpreter/) \- Use the built-in code interpreter instead of exec
* [Streaming output](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Show real-time execution progress
* [API reference](https://developers.cloudflare.com/sandbox/api/) \- Explore all available methods

## Related resources

* [Anthropic Claude documentation ↗](https://docs.anthropic.com/)
* [Workers AI](https://developers.cloudflare.com/workers-ai/) \- Use Cloudflare's built-in models

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/claude-code/#page","headline":"Run Claude Code on a Sandbox · Cloudflare Sandbox SDK docs","description":"Use Claude Code to implement a task in your GitHub repository.","url":"https://developers.cloudflare.com/sandbox/tutorials/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/tutorials/claude-code/","name":"Run Claude Code on a Sandbox"}}]}
```
