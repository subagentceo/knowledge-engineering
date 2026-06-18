---
title: Vike
description: Create a Vike application and deploy it to Cloudflare Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vike

You can deploy your [Vike ↗](https://vike.dev) app to Cloudflare using the Vike extension [vike-photon ↗](https://vike.dev/vike-photon).

All app types (SSR/SPA/SSG) are supported.

Already have a Vike project?

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect Vike, generate the necessary configuration, and deploy your project.

 npm  yarn  pnpm 

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

Learn more about [automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/).

Vike Detected 

Generated configuration 

wrangler.jsonc

main: dist/server/index.js 

wrangler.jsonc

assets: directory: dist/client 

wrangler.jsonc

compatibility\_flags: nodejs\_compat 

wrangler.jsonc

observability: enabled: true 

Workers Deployed 

Wrangler handles configuration automatically 

## What is Vike?

[Vike ↗](https://vike.dev) is a Next.js/Nuxt alternative for advanced applications, powered by a modular architecture for unprecedented flexibility and stability.

## New app

Use [vike.dev/new ↗](https://vike.dev/new) to scaffold a new Vike app that uses `vike-photon` with `@photonjs/cloudflare`.

## Add to existing app

1. npm  yarn  pnpm  bun  
```  
npm i wrangler vike-photon @photonjs/cloudflare  
```  
```  
yarn add wrangler vike-photon @photonjs/cloudflare  
```  
```  
pnpm add wrangler vike-photon @photonjs/cloudflare  
```  
```  
bun add wrangler vike-photon @photonjs/cloudflare  
```
2. pages/+config.ts  
```  
import type { Config } from 'vike/types'  
import vikePhoton from 'vike-photon/config'  
export default {  
  extends: [vikePhoton]  
} satisfies Config  
```
3. package.json  
```  
{  
  "scripts": {  
    "dev": "vike dev",  
    "preview": "vike build && vike preview",  
    "deploy": "vike build && wrangler deploy"  
  }  
}  
```  
wrangler.jsonc  
```  
{  
  "$schema": "node_modules/wrangler/config-schema.json",  
  "compatibility_date": "2025-08-06",  
  "name": "my-vike-cloudflare-app",  
  "main": "virtual:photon:cloudflare:server-entry",  
  // Only required if your app depends a Node.js API  
  "compatibility_flags": ["nodejs_compat"]  
}  
```
4. .gitignore  
```  
.wrangler/  
```
5. **(Optional)** By default, Photon uses a built-in server that supports basic features like SSR. If you need additional server functionalities (e.g. [file uploads ↗](https://hono.dev/examples/file-upload) or [API routes ↗](https://vike.dev/api-routes)), then [create your own server ↗](https://vike.dev/vike-photon#server).

## Cloudflare APIs (bindings)

To access Cloudflare APIs (such as [D1](https://developers.cloudflare.com/d1/) and [KV](https://developers.cloudflare.com/kv/)), use [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) which are available via the `env` object [imported from cloudflare:workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global).

TypeScript

```

import { env } from 'cloudflare:workers'

// Key-value store

env.KV.get('my-key')

// Environment variable

env.LOG_LEVEL

// ...


```

> Example of using Cloudflare D1:
> 
> npm  yarn  pnpm 
> 
> ```
> npm create vike@latest -- --react --hono --drizzle --cloudflare
> ```
> 
> ```
> yarn create vike --react --hono --drizzle --cloudflare
> ```
> 
> ```
> pnpm create vike@latest --react --hono --drizzle --cloudflare
> ```
> 
> Or go to [vike.dev/new ↗](https://vike.dev/new) and select `Cloudflare` with an ORM.

## TypeScript

If you use TypeScript, run [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) whenever you change your Cloudflare configuration to update the `worker-configuration.d.ts` file.

 npm  yarn  pnpm 

```
npx wrangler types
```

```
yarn wrangler types
```

```
pnpm wrangler types
```

Then commit:

Terminal window

```

git commit -am "update cloudflare types"


```

Make sure TypeScript loads it:

tsconfig.json

```

{

  "compilerOptions": {

    "types": ["./worker-configuration.d.ts"]

 }

}


```

See also: [Cloudflare Workers > TypeScript](https://developers.cloudflare.com/workers/languages/typescript/).

## See also

* [Vike Docs > Cloudflare ↗](https://vike.dev/cloudflare)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/vike/#page","headline":"Vike · Cloudflare Workers docs","description":"Create a Vike application and deploy it to Cloudflare Workers","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/vike/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/vike/","name":"Vike"}}]}
```
