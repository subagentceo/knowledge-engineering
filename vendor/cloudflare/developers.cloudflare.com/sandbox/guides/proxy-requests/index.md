---
title: Proxy requests to external APIs
description: Keep credentials secure by routing sandbox requests through a Worker proxy that injects authentication at request time.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Proxy requests to external APIs

When a sandbox needs to call an external API, you might pass credentials directly into the sandbox process. That approach works, but it means the sandbox holds a live credential that any code running inside it can read, copy, or misuse.

The proxy pattern removes that risk. Your Worker issues a short-lived JWT token to the sandbox. The sandbox uses that token for all API requests, which go to your Worker first. The Worker validates the JWT and injects the real credential before forwarding the request. Real credentials never enter the sandbox.

For a complete multi-service implementation covering GitHub, Anthropic, and R2, refer to the [authentication example ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/authentication).

## How it works

```

Sandbox (short-lived JWT) → Worker proxy (validates JWT, injects real credential) → External API


```

The proxy framework routes requests to named services. Each service is a `ServiceConfig` object with three fields:

* **`target`** — Base URL of the external API to proxy to
* **`validate`** — Extracts the JWT from the incoming request (returns `null` to reject)
* **`transform`** — Injects the real credential into the forwarded request (or returns a `Response` to short-circuit)

You define only the service-specific logic. The framework handles JWT verification, routing, and error responses.

## When to use this pattern

Use the proxy pattern when you need to:

* Call external APIs from sandboxes without exposing credentials
* Rotate credentials without reconfiguring sandboxes
* Restrict what a sandbox can do (for example, limit to specific paths or methods)
* Share one credential across many sandboxes without each holding a copy

For short-lived or low-risk credentials, [environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) may be simpler.

## Prerequisites

* A Worker with a Sandbox binding (refer to [Get started](https://developers.cloudflare.com/sandbox/get-started/))
* The [jose ↗](https://github.com/panva/jose) package installed in your Worker project for JWT signing

## 1\. Set up secrets

Store the API credential and a secret for signing JWT tokens in your Worker:

Terminal window

```

wrangler secret put MY_API_KEY

wrangler secret put PROXY_JWT_SECRET


```

Generate a strong random value for `PROXY_JWT_SECRET`:

Terminal window

```

openssl rand -hex 32


```

## 2\. Install dependencies

 npm  yarn  pnpm  bun 

```
npm i jose
```

```
yarn add jose
```

```
pnpm add jose
```

```
bun add jose
```

## 3\. Copy the proxy framework

The proxy framework is a self-contained module you copy into your project. Download the [src/proxy/ ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/authentication/src/proxy) directory from the authentication example and place it at `src/proxy/` in your Worker project.

The framework exports:

* **`createProxyHandler`** — Creates the Worker request handler that routes and validates proxy requests
* **`createProxyToken`** — Issues a signed JWT for a sandbox
* **`ServiceConfig`** — The interface your service definitions implement

## 4\. Define a service

Create a `ServiceConfig` for each external API you want to proxy. This example proxies a generic HTTP API that expects a Bearer token:

* [  JavaScript ](#tab-panel-10493)
* [  TypeScript ](#tab-panel-10494)

JavaScript

```

export const myApi = {

  // All requests to /proxy/myapi/* are forwarded to this base URL

  target: "https://api.example.com",


  // Extract the JWT from the Authorization header

  validate: (req) =>

    req.headers.get("Authorization")?.replace("Bearer ", "") ?? null,


  // Replace the JWT with the real API key before forwarding

  transform: async (req, ctx) => {

    req.headers.set("Authorization", `Bearer ${ctx.env.MY_API_KEY}`);

    return req;

  },

};


```

TypeScript

```

import type { ServiceConfig } from '../proxy';


interface Env {

  MY_API_KEY: string;

  PROXY_JWT_SECRET: string;

}


export const myApi: ServiceConfig<Env> = {

  // All requests to /proxy/myapi/* are forwarded to this base URL

  target: 'https://api.example.com',


  // Extract the JWT from the Authorization header

  validate: (req) =>

    req.headers.get('Authorization')?.replace('Bearer ', '') ?? null,


  // Replace the JWT with the real API key before forwarding

  transform: async (req, ctx) => {

    req.headers.set('Authorization', `Bearer ${ctx.env.MY_API_KEY}`);

    return req;

  }

};


```

The `transform` function receives the outgoing request and a context object containing `ctx.env` (your Worker environment) and `ctx.jwt` (the verified token payload, including `sandboxId`). Return the modified request to forward it, or return a `Response` to short-circuit with an error.

## 5\. Wire up the Worker

Register your services with `createProxyHandler` and issue tokens to sandboxes using `createProxyToken`:

* [  JavaScript ](#tab-panel-10495)
* [  TypeScript ](#tab-panel-10496)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";

import { createProxyHandler, createProxyToken } from "./proxy";

import { myApi } from "./services/myapi";


export { Sandbox } from "@cloudflare/sandbox";


const proxyHandler = createProxyHandler({

  mountPath: "/proxy",

  jwtSecret: (env) => env.PROXY_JWT_SECRET,

  services: { myapi: myApi },

});


export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Route all /proxy/* requests through the proxy handler

    if (url.pathname.startsWith("/proxy/")) {

      return proxyHandler(request, env);

    }


    // Create a sandbox and issue it a short-lived token

    const sandboxId = "my-sandbox";

    const sandbox = getSandbox(env.Sandbox, sandboxId);

    const token = await createProxyToken({

      secret: env.PROXY_JWT_SECRET,

      sandboxId,

      expiresIn: "15m",

    });


    const proxyBase = `https://${url.hostname}`;


    // Pass the token and proxy base URL to the sandbox

    await sandbox.setEnvVars({

      PROXY_TOKEN: token,

      PROXY_BASE: proxyBase,

    });


    return Response.json({ message: "Sandbox ready" });

  },

};


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';

import { createProxyHandler, createProxyToken } from './proxy';

import { myApi } from './services/myapi';


export { Sandbox } from '@cloudflare/sandbox';


interface Env {

  Sandbox: DurableObjectNamespace;

  MY_API_KEY: string;

  PROXY_JWT_SECRET: string;

}


const proxyHandler = createProxyHandler<Env>({

  mountPath: '/proxy',

  jwtSecret: (env) => env.PROXY_JWT_SECRET,

  services: { myapi: myApi }

});


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    // Route all /proxy/* requests through the proxy handler

    if (url.pathname.startsWith('/proxy/')) {

      return proxyHandler(request, env);

    }


    // Create a sandbox and issue it a short-lived token

    const sandboxId = 'my-sandbox';

    const sandbox = getSandbox(env.Sandbox, sandboxId);

    const token = await createProxyToken({

      secret: env.PROXY_JWT_SECRET,

      sandboxId,

      expiresIn: '15m'

    });


    const proxyBase = `https://${url.hostname}`;


    // Pass the token and proxy base URL to the sandbox

    await sandbox.setEnvVars({

      PROXY_TOKEN: token,

      PROXY_BASE: proxyBase

    });


    return Response.json({ message: 'Sandbox ready' });

  }

};


```

The `mountPath` (`/proxy`) and service name (`myapi`) together form the proxy route. A request to `/proxy/myapi/some/path` is validated and forwarded to `https://api.example.com/some/path`.

## 6\. Call the proxy from the sandbox

Inside the sandbox, use the `PROXY_TOKEN` and `PROXY_BASE` environment variables to call the proxy. The JWT takes the place of the real credential:

Terminal window

```

curl "$PROXY_BASE/proxy/myapi/v1/endpoint" \

  -H "Authorization: Bearer $PROXY_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{"input": "hello"}'


```

Or from Python running inside the sandbox:

Python

```

import os

import requests


response = requests.post(

    f"{os.environ['PROXY_BASE']}/proxy/myapi/v1/endpoint",

    headers={"Authorization": f"Bearer {os.environ['PROXY_TOKEN']}"},

    json={"input": "hello"}

)


```

The real `MY_API_KEY` is never present in the sandbox. The Worker substitutes it transparently.

Pointing SDKs at the proxy URL

Many API clients and SDKs default to the official API base URL. After setting up the proxy, you need to tell the library to send requests to your Worker instead. Most SDKs support an environment variable or constructor option to override the base URL.

For example, the Anthropic SDK reads `ANTHROPIC_BASE_URL`. Pass your proxy URL as that value and the JWT token as the API key:

Terminal window

```

export ANTHROPIC_BASE_URL="$PROXY_BASE/proxy/anthropic"

export ANTHROPIC_API_KEY="$PROXY_TOKEN"


```

The SDK then sends all requests to your Worker proxy, which validates the token and forwards them to `api.anthropic.com` with the real key injected. Check the documentation for your API client to find the equivalent base URL setting.

## Adding more services

To proxy additional APIs, define another `ServiceConfig` and add it to `createProxyHandler`:

* [  JavaScript ](#tab-panel-10491)
* [  TypeScript ](#tab-panel-10492)

JavaScript

```

export const anotherApi = {

  target: "https://api.another-service.com",

  validate: (req) =>

    req.headers.get("Authorization")?.replace("Bearer ", "") ?? null,

  transform: async (req, ctx) => {

    req.headers.set("Authorization", `Bearer ${ctx.env.ANOTHER_API_KEY}`);

    return req;

  },

};


// In your Worker:

const proxyHandler = createProxyHandler({

  mountPath: "/proxy",

  jwtSecret: (env) => env.PROXY_JWT_SECRET,

  services: { myapi: myApi, another: anotherApi },

});


```

TypeScript

```

export const anotherApi: ServiceConfig<Env> = {

  target: 'https://api.another-service.com',

  validate: (req) => req.headers.get('Authorization')?.replace('Bearer ', '') ?? null,

  transform: async (req, ctx) => {

    req.headers.set('Authorization', `Bearer ${ctx.env.ANOTHER_API_KEY}`);

    return req;

  }

};


// In your Worker:

const proxyHandler = createProxyHandler<Env>({

  mountPath: '/proxy',

  jwtSecret: (env) => env.PROXY_JWT_SECRET,

  services: { myapi: myApi, another: anotherApi }

});


```

Each service is reachable at `/proxy/<service-name>/*`. The sandbox uses the same JWT token for all of them.

## Troubleshooting

### Proxy returns 401

The JWT is missing, expired, or signed with the wrong secret. Verify that:

* The sandbox is using the token returned by `createProxyToken`, not a hardcoded value
* The same `PROXY_JWT_SECRET` value is used to create and verify tokens
* The token has not expired — the default is 15 minutes

To issue a fresh token and pass it to the sandbox:

* [  JavaScript ](#tab-panel-10487)
* [  TypeScript ](#tab-panel-10488)

JavaScript

```

const freshToken = await createProxyToken({

  secret: env.PROXY_JWT_SECRET,

  sandboxId,

  expiresIn: "15m",

});

await sandbox.setEnvVars({ PROXY_TOKEN: freshToken });


```

TypeScript

```

const freshToken = await createProxyToken({

  secret: env.PROXY_JWT_SECRET,

  sandboxId,

  expiresIn: '15m'

});

await sandbox.setEnvVars({ PROXY_TOKEN: freshToken });


```

### Proxy returns 404 for the service

The service name in the URL must match the key in the `services` object. A request to `/proxy/myapi/...` requires `services: { myapi: ... }`.

### transform returns unexpected results

Log the request URL in `transform` to confirm the path is being rewritten correctly:

* [  JavaScript ](#tab-panel-10489)
* [  TypeScript ](#tab-panel-10490)

JavaScript

```

transform: async (req, ctx) => {

  console.log("Proxying to:", req.url);

  req.headers.set("Authorization", `Bearer ${ctx.env.MY_API_KEY}`);

  return req;

};


```

TypeScript

```

transform: async (req, ctx) => {

  console.log('Proxying to:', req.url);

  req.headers.set('Authorization', `Bearer ${ctx.env.MY_API_KEY}`);

  return req;

}


```

## Related resources

* [Authentication example ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/authentication) — complete multi-service implementation with GitHub, Anthropic, and R2
* [Security model](https://developers.cloudflare.com/sandbox/concepts/security/) — how the Sandbox SDK approaches security
* [Work with Git](https://developers.cloudflare.com/sandbox/guides/git-workflows/) — Git operations in sandboxes
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) — simpler alternative for lower-risk credentials

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/proxy-requests/#page","headline":"Proxy requests to external APIs · Cloudflare Sandbox SDK docs","description":"Keep credentials secure by routing sandbox requests through a Worker proxy that injects authentication at request time.","url":"https://developers.cloudflare.com/sandbox/guides/proxy-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/proxy-requests/","name":"Proxy requests to external APIs"}}]}
```
