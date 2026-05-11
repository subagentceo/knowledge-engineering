---
title: OpenFeature SDK
description: Use the @cloudflare/flagship OpenFeature SDK to evaluate Flagship feature flags from Workers, Node.js, or the browser.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OpenFeature SDK

Evaluate Flagship feature flags from any JavaScript runtime using OpenFeature.

[OpenFeature ↗](https://openfeature.dev/) is the CNCF standard for feature flag interfaces. It provides a vendor-neutral API so you can switch between flag providers without changing evaluation code.

The [@cloudflare/flagship ↗](https://www.npmjs.com/package/@cloudflare/flagship) package is an OpenFeature-compatible SDK for evaluating Flagship feature flags. The source code is available on [GitHub ↗](https://github.com/cloudflare/flagship).

The SDK includes two providers:

* **FlagshipServerProvider** — For server-side runtimes such as [Cloudflare Workers](https://developers.cloudflare.com/workers/), Node.js, and other server-side JavaScript environments. Each evaluation call makes an asynchronous request to the Flagship evaluation endpoint.
* **FlagshipClientProvider** — For browser applications. Pre-fetches all flag values on initialization and evaluates synchronously from an in-memory cache.

Note

If you are running inside a Cloudflare Worker, the [binding](https://developers.cloudflare.com/flagship/binding/) is the recommended approach because it avoids HTTP overhead. You can also [pass the binding to the OpenFeature SDK](https://developers.cloudflare.com/flagship/sdk/server-provider/) to get the best of both. Use the SDK without a binding when running in non-Worker runtimes like Node.js or the browser.

## Installation

For server-side usage:

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/flagship @openfeature/server-sdk
```

```
yarn add @cloudflare/flagship @openfeature/server-sdk
```

```
pnpm add @cloudflare/flagship @openfeature/server-sdk
```

```
bun add @cloudflare/flagship @openfeature/server-sdk
```

For browser usage:

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/flagship @openfeature/web-sdk
```

```
yarn add @cloudflare/flagship @openfeature/web-sdk
```

```
pnpm add @cloudflare/flagship @openfeature/web-sdk
```

```
bun add @cloudflare/flagship @openfeature/web-sdk
```

## Next steps

* Set up the [server provider](https://developers.cloudflare.com/flagship/sdk/server-provider/) for Workers, Node.js, or other server-side runtimes.
* Set up the [client provider](https://developers.cloudflare.com/flagship/sdk/client-provider/) for browser applications.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/sdk/","name":"OpenFeature SDK"}}]}
```
