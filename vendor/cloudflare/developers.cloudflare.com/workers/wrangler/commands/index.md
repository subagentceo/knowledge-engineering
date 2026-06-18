---
title: Commands
description: Create, develop, and deploy your Cloudflare Workers with Wrangler commands.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Commands

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) offers a number of commands to manage your Cloudflare Workers.

## Workers commands

The core Wrangler commands for creating, developing, and deploying Workers are on the [Workers commands page](https://developers.cloudflare.com/workers/wrangler/commands/workers/). This includes `wrangler dev`, `wrangler deploy`, `wrangler versions`, and more.

## All commands

* [ Artifacts ](https://developers.cloudflare.com/workers/wrangler/commands/artifacts/)
* [ Browser ](https://developers.cloudflare.com/workers/wrangler/commands/browser/)
* [ Certificates ](https://developers.cloudflare.com/workers/wrangler/commands/certificates/)
* [ Containers ](https://developers.cloudflare.com/workers/wrangler/commands/containers/)
* [ D1 ](https://developers.cloudflare.com/workers/wrangler/commands/d1/)
* [ General commands ](https://developers.cloudflare.com/workers/wrangler/commands/general/)
* [ Hyperdrive ](https://developers.cloudflare.com/workers/wrangler/commands/hyperdrive/)
* [ KV ](https://developers.cloudflare.com/workers/wrangler/commands/kv/)
* [ Pages ](https://developers.cloudflare.com/workers/wrangler/commands/pages/)
* [ Pipelines ](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/)
* [ Queues ](https://developers.cloudflare.com/workers/wrangler/commands/queues/)
* [ R2 ](https://developers.cloudflare.com/workers/wrangler/commands/r2/)
* [ Secrets Store ](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/)
* [ Tunnel ](https://developers.cloudflare.com/workers/wrangler/commands/tunnel/)
* [ Vectorize ](https://developers.cloudflare.com/workers/wrangler/commands/vectorize/)
* [ VPC ](https://developers.cloudflare.com/workers/wrangler/commands/vpc/)
* [ Workers ](https://developers.cloudflare.com/workers/wrangler/commands/workers/)
* [ Workers for Platforms ](https://developers.cloudflare.com/workers/wrangler/commands/workers-for-platforms/)
* [ Workflows ](https://developers.cloudflare.com/workers/wrangler/commands/workflows/)

## How to run Wrangler commands

```

wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]


```

Since Cloudflare recommends [installing Wrangler locally](https://developers.cloudflare.com/workers/wrangler/install-and-update/) in your project (rather than globally), the way to run Wrangler will depend on your specific setup and package manager.

 npm  yarn  pnpm 

```
npx wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

```
yarn wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

```
pnpm wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

You can add Wrangler commands that you use often as scripts in your project's `package.json` file:

```

{

  ...

  "scripts": {

    "deploy": "wrangler deploy",

    "dev": "wrangler dev"

  }

  ...

}


```

You can then run them using your package manager of choice:

 npm  yarn  pnpm 

```
npm run deploy
```

```
yarn run deploy
```

```
pnpm run deploy
```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/wrangler/commands/#page","headline":"Commands - Wrangler · Cloudflare Workers docs","description":"Create, develop, and deploy your Cloudflare Workers with Wrangler commands.","url":"https://developers.cloudflare.com/workers/wrangler/commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}}]}
```
