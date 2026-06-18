---
title: Build a code review bot
description: Clone repositories, analyze code with Claude, and post review comments to GitHub PRs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a code review bot

**Last reviewed:**  8 months ago 

Build a GitHub bot that responds to pull requests, clones the repository in a sandbox, uses Claude to analyze code changes, and posts review comments.

**Time to complete**: 30 minutes

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You'll also need:

* A [GitHub account ↗](https://github.com/) and [fine-grained personal access token ↗](https://github.com/settings/personal-access-tokens/new) with the following permissions:  
   * **Repository access**: Select the specific repository you want to test with  
   * **Permissions** \> **Repository permissions**:  
         * **Metadata**: Read-only (required)  
         * **Contents**: Read-only (required to clone the repository)  
         * **Pull requests**: Read and write (required to post review comments)
* An [Anthropic API key ↗](https://console.anthropic.com/) for Claude
* A GitHub repository for testing

## 1\. Create your project

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- code-review-bot --template=cloudflare/sandbox-sdk/examples/minimal
```

```
yarn create cloudflare code-review-bot --template=cloudflare/sandbox-sdk/examples/minimal
```

```
pnpm create cloudflare@latest code-review-bot --template=cloudflare/sandbox-sdk/examples/minimal
```

Terminal window

```

cd code-review-bot


```

## 2\. Install dependencies

 npm  yarn  pnpm  bun 

```
npm i @anthropic-ai/sdk @octokit/rest
```

```
yarn add @anthropic-ai/sdk @octokit/rest
```

```
pnpm add @anthropic-ai/sdk @octokit/rest
```

```
bun add @anthropic-ai/sdk @octokit/rest
```

## 3\. Build the webhook handler

Replace `src/index.ts`:

TypeScript

```

import { getSandbox, proxyToSandbox, type Sandbox } from "@cloudflare/sandbox";

import { Octokit } from "@octokit/rest";

import Anthropic from "@anthropic-ai/sdk";


export { Sandbox } from "@cloudflare/sandbox";


interface Env {

  Sandbox: DurableObjectNamespace<Sandbox>;

  GITHUB_TOKEN: string;

  ANTHROPIC_API_KEY: string;

  WEBHOOK_SECRET: string;

}


export default {

  async fetch(

    request: Request,

    env: Env,

    ctx: ExecutionContext,

  ): Promise<Response> {

    const proxyResponse = await proxyToSandbox(request, env);

    if (proxyResponse) return proxyResponse;


    const url = new URL(request.url);


    if (url.pathname === "/webhook" && request.method === "POST") {

      const signature = request.headers.get("x-hub-signature-256");

      const contentType = request.headers.get("content-type") || "";

      const body = await request.text();


      // Verify webhook signature

      if (

        !signature ||

        !(await verifySignature(body, signature, env.WEBHOOK_SECRET))

      ) {

        return Response.json({ error: "Invalid signature" }, { status: 401 });

      }


      const event = request.headers.get("x-github-event");


      // Parse payload (GitHub can send as JSON or form-encoded)

      let payload;

      if (contentType.includes("application/json")) {

        payload = JSON.parse(body);

      } else {

        // Handle form-encoded payload

        const params = new URLSearchParams(body);

        payload = JSON.parse(params.get("payload") || "{}");

      }


      // Handle opened and reopened PRs

      if (

        event === "pull_request" &&

        (payload.action === "opened" || payload.action === "reopened")

      ) {

        console.log(`Starting review for PR #${payload.pull_request.number}`);

        // Use waitUntil to ensure the review completes even after response is sent

        ctx.waitUntil(

          reviewPullRequest(payload, env).catch(console.error),

        );

        return Response.json({ message: "Review started" });

      }


      return Response.json({ message: "Event ignored" });

    }


    return new Response(

      "Code Review Bot\n\nConfigure GitHub webhook to POST /webhook",

    );

  },

};


async function verifySignature(

  payload: string,

  signature: string,

  secret: string,

): Promise<boolean> {

  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(

    "raw",

    encoder.encode(secret),

    { name: "HMAC", hash: "SHA-256" },

    false,

    ["sign"],

  );


  const signatureBytes = await crypto.subtle.sign(

    "HMAC",

    key,

    encoder.encode(payload),

  );

  const expected =

    "sha256=" +

    Array.from(new Uint8Array(signatureBytes))

      .map((b) => b.toString(16).padStart(2, "0"))

      .join("");


  return signature === expected;

}


async function reviewPullRequest(payload: any, env: Env): Promise<void> {

  const pr = payload.pull_request;

  const repo = payload.repository;

  const octokit = new Octokit({ auth: env.GITHUB_TOKEN });

  const sandbox = getSandbox(env.Sandbox, `review-${pr.number}`);


  try {

    // Post initial comment

    console.log("Posting initial comment...");

    await octokit.issues.createComment({

      owner: repo.owner.login,

      repo: repo.name,

      issue_number: pr.number,

      body: "Code review in progress...",

    });

    // Clone repository

    console.log("Cloning repository...");

    const cloneUrl = `https://${env.GITHUB_TOKEN}@github.com/${repo.owner.login}/${repo.name}.git`;

    await sandbox.exec(

      `git clone --depth=1 --branch=${pr.head.ref} ${cloneUrl} /workspace/repo`,

    );


    // Get changed files

    console.log("Fetching changed files...");

    const comparison = await octokit.repos.compareCommits({

      owner: repo.owner.login,

      repo: repo.name,

      base: pr.base.sha,

      head: pr.head.sha,

    });


    const files = [];

    for (const file of (comparison.data.files || []).slice(0, 5)) {

      if (file.status !== "removed") {

        const content = await sandbox.readFile(

          `/workspace/repo/${file.filename}`,

        );

        files.push({

          path: file.filename,

          patch: file.patch || "",

          content: content.content,

        });

      }

    }


    // Generate review with Claude

    console.log(`Analyzing ${files.length} files with Claude...`);

    const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({

      model: "claude-sonnet-4-5",

      max_tokens: 2048,

      messages: [

        {

          role: "user",

          content: `Review this PR:


Title: ${pr.title}


Changed files:

${files.map((f) => `File: ${f.path}\nDiff:\n${f.patch}\n\nContent:\n${f.content.substring(0, 1000)}`).join("\n\n")}


Provide a brief code review focusing on bugs, security, and best practices.`,

        },

      ],

    });


    const review =

      response.content[0]?.type === "text"

        ? response.content[0].text

        : "No review generated";


    // Post review comment

    console.log("Posting review...");

    await octokit.issues.createComment({

      owner: repo.owner.login,

      repo: repo.name,

      issue_number: pr.number,

      body: `## Code Review\n\n${review}\n\n---\n*Generated by Claude*`,

    });

    console.log("Review complete!");

  } catch (error: any) {

    console.error("Review failed:", error);

    await octokit.issues.createComment({

      owner: repo.owner.login,

      repo: repo.name,

      issue_number: pr.number,

      body: `Review failed: ${error.message}`,

    });

  } finally {

    await sandbox.destroy();

  }

}


```

## 4\. Set up local environment variables

Create a `.dev.vars` file in your project root for local development:

Terminal window

```

cat > .dev.vars << EOF

GITHUB_TOKEN=your_github_token_here

ANTHROPIC_API_KEY=your_anthropic_key_here

WEBHOOK_SECRET=your_webhook_secret_here

EOF


```

Replace the placeholder values with:

* `GITHUB_TOKEN`: Your GitHub personal access token with repo permissions
* `ANTHROPIC_API_KEY`: Your API key from the [Anthropic Console ↗](https://console.anthropic.com/)
* `WEBHOOK_SECRET`: A random string (for example: `openssl rand -hex 32`)

Note

The `.dev.vars` file is automatically gitignored and only used during local development with `npm run dev`.

## 5\. Expose local server with Cloudflare Tunnel

To test with real GitHub webhooks locally, use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to expose your local development server.

Start the development server:

Terminal window

```

npm run dev


```

In a separate terminal, create a tunnel to your local server:

Terminal window

```

cloudflared tunnel --url http://localhost:8787


```

This will output a public URL (for example, `https://example.trycloudflare.com`). Copy this URL for the next step.

Note

If you do not have `cloudflared` installed, refer to [Downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).

## 6\. Configure GitHub webhook for local testing

Important

Configure this webhook on a **specific GitHub repository** where you will create test pull requests. The bot will only review PRs in repositories where the webhook is configured.

1. Navigate to your test repository on GitHub
2. Go to **Settings** \> **Webhooks** \> **Add webhook**
3. Set **Payload URL**: Your Cloudflare Tunnel URL from Step 5 with `/webhook` appended (for example, `https://example.trycloudflare.com/webhook`)
4. Set **Content type**: `application/json`
5. Set **Secret**: Same value you used for `WEBHOOK_SECRET` in your `.dev.vars` file
6. Select **Let me select individual events** → Check **Pull requests**
7. Click **Add webhook**

## 7\. Test locally with a pull request

Create a test PR:

Terminal window

```

git checkout -b test-review

echo "console.log('test');" > test.js

git add test.js

git commit -m "Add test file"

git push origin test-review


```

Open the PR on GitHub. The bot should post a review comment within a few seconds.

## 8\. Deploy to production

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Then set your production secrets:

Terminal window

```

# GitHub token (needs repo permissions)

npx wrangler secret put GITHUB_TOKEN


# Anthropic API key

npx wrangler secret put ANTHROPIC_API_KEY


# Webhook secret (use the same value from .dev.vars)

npx wrangler secret put WEBHOOK_SECRET


```

## 9\. Update webhook for production

1. Go to your repository **Settings** \> **Webhooks**
2. Click on your existing webhook
3. Update **Payload URL** to your deployed Worker URL: `https://code-review-bot.YOUR_SUBDOMAIN.workers.dev/webhook`
4. Click **Update webhook**

Your bot is now running in production and will review all new pull requests automatically.

## What you built

A GitHub code review bot that:

* Receives webhook events from GitHub
* Clones repositories in isolated sandboxes
* Uses Claude to analyze code changes
* Posts review comments automatically

## Next steps

* [Git operations](https://developers.cloudflare.com/sandbox/api/files/#gitcheckout) \- Advanced repository handling
* [Sessions API](https://developers.cloudflare.com/sandbox/api/sessions/) \- Manage long-running sandbox operations
* [GitHub Apps ↗](https://docs.github.com/en/apps) \- Build a proper GitHub App

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/code-review-bot/#page","headline":"Build a code review bot · Cloudflare Sandbox SDK docs","description":"Clone repositories, analyze code with Claude, and post review comments to GitHub PRs.","url":"https://developers.cloudflare.com/sandbox/tutorials/code-review-bot/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/tutorials/code-review-bot/","name":"Build a code review bot"}}]}
```
