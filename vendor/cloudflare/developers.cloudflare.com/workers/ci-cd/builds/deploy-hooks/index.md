---
title: Deploy Hooks
description: Generate unique URLs that trigger new builds when they receive an HTTP POST request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy Hooks

By default, Workers Builds triggers a build when you push a commit to your [connected Git repository](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/). Deploy Hooks provide another way to trigger a build. Each hook is a unique URL that triggers a manual build for one branch when it receives an HTTP POST request. Use Deploy Hooks to connect Workers Builds with workflows such as:

* Rebuild automatically when content changes in a headless CMS
* Build on a schedule using an external cron service
* Trigger deployments from custom CI/CD pipelines based on specific conditions

## Create a Deploy Hook

Before creating a Deploy Hook, ensure your Worker is [connected to a Git repository](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/).

1. Go to **Workers & Pages** and select your Worker.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Go to **Settings** \> **Builds** \> **Deploy Hooks**.
3. Enter a **name** and select the **branch** to build.
4. Select **Create** and copy the generated URL.

Note

Give each Deploy Hook a descriptive name so you can tell them apart. If you have multiple content sources that each need to trigger builds independently, create a separate hook for each one.

## Trigger a Deploy Hook

Send an HTTP POST request to your Deploy Hook URL to start a build:

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/<DEPLOY_HOOK_ID>"


```

No `Authorization` header is needed. The unique identifier embedded in the URL acts as the authentication credential.

Example response:

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "build_uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

    "branch": "main",

    "worker": "my-worker"

  }

}


```

The `build_uuid` in the response can be used to [monitor build status and retrieve logs](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/#get-build-logs).

### Verify the build

After you trigger a Deploy Hook, you can verify it from the dashboard:

* In the **Deploy Hooks** list, the hook shows when it was last triggered.
* In your Worker's build history, the **Triggered by** column identifies builds started by a Deploy Hook using the hook name and a `deploy hook` label.

If you need to inspect these builds programmatically, use [List builds for a Worker](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/#list-builds-for-a-worker) in the Builds API reference. Hook-triggered builds are recorded with `build_trigger_source: "deploy_hook"`.

## CMS integration

Most headless CMS platforms support webhooks that call your Deploy Hook URL when content changes. The general setup is the same across platforms:

1. Find the webhooks or integrations settings in your CMS.
2. Create a new webhook and paste your Deploy Hook URL as the target URL.
3. Select which events should trigger the webhook (for example, publish, unpublish, or update).

Refer to your CMS documentation for platform-specific instructions. Popular platforms with webhook support include Contentful, Sanity, Strapi, Storyblok, DatoCMS, and Prismic.

## Idempotency

If the same Deploy Hook is triggered again before the previous build has fully started, Workers Builds does not create a duplicate build. Instead, it returns the build that is already in progress.

If an external system sends the same Deploy Hook twice in quick succession:

1. The first request creates a build.
2. If a second request arrives while that build is still `queued` or `initializing`, no second build is created.
3. Instead, the response returns the existing `build_uuid` and sets `already_exists` to `true`.

Example response when an existing pending build is returned:

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "build_uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

    "status": "queued",

    "created_on": "2026-01-21T18:50:00Z",

    "already_exists": true

  }

}


```

Once the earlier build moves past `initializing`, a later POST creates a new build as normal. This makes Deploy Hooks safe to use with systems that retry webhooks or emit bursts of content-update events.

## Examples

### Deploy from a Slack slash command

A Worker that receives a `/deploy` command from Slack and triggers a build:

* [  JavaScript ](#tab-panel-11430)
* [  TypeScript ](#tab-panel-11431)

JavaScript

```

export default {

  async fetch(request, env) {

    const body = await request.formData();

    const command = body.get("command");

    const token = body.get("token");


    if (token !== env.SLACK_VERIFICATION_TOKEN) {

      return new Response("Unauthorized", { status: 401 });

    }


    if (command === "/deploy") {

      const res = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });

      const { result } = await res.json();

      return new Response(`Build started: ${result.build_uuid}`);

    }


    return new Response("Unknown command", { status: 400 });

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const body = await request.formData();

    const command = body.get("command");

    const token = body.get("token");


    if (token !== env.SLACK_VERIFICATION_TOKEN) {

      return new Response("Unauthorized", { status: 401 });

    }


    if (command === "/deploy") {

      const res = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });

      const { result } = await res.json<{ result: { build_uuid: string } }>();

      return new Response(`Build started: ${result.build_uuid}`);

    }


    return new Response("Unknown command", { status: 400 });

  },

};


```

### Rebuild on a schedule

A Worker with a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) that rebuilds every hour:

* [  JavaScript ](#tab-panel-11428)
* [  TypeScript ](#tab-panel-11429)

JavaScript

```

export default {

  async scheduled(event, env) {

    await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });

  },

};


```

TypeScript

```

export default {

  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {

    await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });

  },

};


```

## Security considerations

Warning 

Deploy Hook URLs do not require a separate authorization header. Anyone with access to the URL can trigger builds for your Worker, so store them like other sensitive credentials.

* Store Deploy Hook URLs in environment variables or a secrets manager, never in source code or public configuration files.
* Restrict access to the URL to only the systems that need it.
* If a URL is compromised or you suspect unauthorized use, delete the Deploy Hook immediately and create a new one. The old URL stops working as soon as it is deleted.

### Using the Builds API for authenticated triggers

If your external system supports custom headers, you can call the [manual build endpoint](https://developers.cloudflare.com/api/resources/workers%5Fbuilds/subresources/triggers/methods/create%5Fbuild) with an API token in the `Authorization` header instead. This gives you token-based authentication and the ability to choose the branch per request. For a step-by-step walkthrough, see [Trigger a manual build](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/#trigger-a-manual-build).

## Limits

Deploy Hooks are rate limited to 10 builds per minute per Worker and 100 builds per minute per account. For all Workers Builds limits, see [Limits & pricing](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/#page","headline":"Deploy Hooks · Cloudflare Workers docs","description":"Generate unique URLs that trigger new builds when they receive an HTTP POST request.","url":"https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/deploy-hooks/","name":"Deploy Hooks"}}]}
```
