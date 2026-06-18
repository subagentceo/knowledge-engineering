---
title: Install/Update Wrangler
description: Get started by installing Wrangler, and update to newer versions by following this guide.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Install/Update Wrangler

Wrangler is a command-line tool for building with Cloudflare developer products.

## Install Wrangler

To install [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler), ensure you have [Node.js ↗](https://nodejs.org/en/) and [npm ↗](https://docs.npmjs.com/getting-started) installed, preferably using a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to change Node.js versions.

Wrangler System Requirements

We support running the Wrangler CLI with the [Current, Active, and Maintenance ↗](https://nodejs.org/en/about/previous-releases) versions of Node.js. Your Worker will always be executed in `workerd`, the open source Cloudflare Workers runtime.

Wrangler is only supported on macOS 13.5+, Windows 11, and Linux distros that support glib 2.35\. This follows [workerd's OS support policy ↗](https://github.com/cloudflare/workerd?tab=readme-ov-file#running-workerd).

Wrangler is installed locally into each of your projects. This allows you and your team to use the same Wrangler version, control Wrangler versions for each project, and roll back to an earlier version of Wrangler, if needed.

To install Wrangler within your Worker project, run:

 npm  yarn  pnpm  bun 

```
npm i -D wrangler@latest
```

```
yarn add -D wrangler@latest
```

```
pnpm add -D wrangler@latest
```

```
bun add -d wrangler@latest
```

Since Cloudflare recommends installing Wrangler locally in your project (rather than globally), the way to run Wrangler will depend on your specific setup and package manager. Refer to [How to run Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/#how-to-run-wrangler-commands) for more information.

Warning

If Wrangler is not installed, running `npx wrangler` will use the latest version of Wrangler.

## Check your Wrangler version

To check your Wrangler version, run:

Terminal window

```

npx wrangler --version

// or

npx wrangler -v


```

## Update Wrangler

To update the version of Wrangler used in your project, run:

 npm  yarn  pnpm  bun 

```
npm i -D wrangler@latest
```

```
yarn add -D wrangler@latest
```

```
pnpm add -D wrangler@latest
```

```
bun add -d wrangler@latest
```

## Related resources

* [Commands](https://developers.cloudflare.com/workers/wrangler/commands/) \- A detailed list of the commands that Wrangler supports.
* [Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) \- Learn more about Wrangler's configuration file.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/install-and-update/#page","headline":"Install/Update Wrangler · Cloudflare Workers docs","description":"Get started by installing Wrangler, and update to newer versions by following this guide.","url":"https://developers.cloudflare.com/workers/wrangler/install-and-update/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/install-and-update/","name":"Install/Update Wrangler"}}]}
```
