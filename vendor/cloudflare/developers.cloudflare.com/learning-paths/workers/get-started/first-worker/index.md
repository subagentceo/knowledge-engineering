---
title: First Worker
description: Build and deploy your first Worker.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# First Worker

## Build and deploy your first Worker

You can deploy your first Worker via the Cloudflare dashboard or programmatically using your terminal.

You must have a Cloudflare account to create a Worker. To get started with Cloudflare, refer to [Create account](https://developers.cloudflare.com/fundamentals/account/create-account/).

### Via the Cloudflare dashboard

To create your first Worker using the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select **Create Worker** \> **Deploy**.

### Via C3 and Wrangler

#### Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

#### Create and deploy your first Worker

[C3 (create-cloudflare-cli) ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare. In addition to speed, it leverages officially developed templates for Workers and framework-specific setup guides to ensure each new application that you set up follows Cloudflare and any third-party best practices for deployment on the Cloudflare network.

To create your Worker project, run:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- first-worker
```

```
yarn create cloudflare first-worker
```

```
pnpm create cloudflare@latest first-worker
```

This will prompt you to install the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) package, and lead you through setup.

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

You will be asked if you would like to deploy the project to Cloudflare.

* If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed to the Cloudflare global network and available on your custom [workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/).
* If you choose not to deploy, go to the newly created project directory to begin writing code. Deploy your project by running the [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) command.

Refer to [How to run Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/#how-to-run-wrangler-commands) to learn how to run Wrangler commands according to your package manager.

In your Worker project directory, C3 has generated the following:

1. `wrangler.jsonc`: Your [Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/#sample-wrangler-configuration) configuration file.
2. `index.js` (in `/src`): A minimal `'Hello World!'` Worker written in [ES module](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [npm documentation on package-lock.json ↗](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [npm documentation node\_modules ↗](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).

To continue building your Worker, open the `index.js` file to write your code. Refer to [Examples](https://developers.cloudflare.com/workers/examples/) to use ready-made code you can experiment with.

## Summary

You have learned how to:

* Create and deploy a Worker project using the Cloudflare dashboard and programmatically, using your terminal.

In the next section, you can follow a video tutorial to create your first Cloudflare Workers application.

### Related resources

* [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/) \- Create a new Worker with Cloudflare Workers' Get started guide.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/workers/get-started/first-worker/#page","headline":"First Worker · Cloudflare Learning Paths","description":"Build and deploy your first Worker.","url":"https://developers.cloudflare.com/learning-paths/workers/get-started/first-worker/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/workers/get-started/","name":"Deploy your first Worker"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/workers/get-started/first-worker/","name":"First Worker"}}]}
```
