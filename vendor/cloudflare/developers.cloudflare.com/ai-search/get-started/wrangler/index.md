---
title: Wrangler commands
description: Create and manage AI Search instances from the command line.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

This guide walks you through creating an AI Search instance using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/).

## 1\. Install Wrangler

Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the command-line tool for Cloudflare Workers and developer platform products.

 npm  yarn  pnpm  bun 

```
npm install wrangler
```

```
yarn install wrangler
```

```
pnpm install wrangler
```

```
bun install wrangler
```

## 2\. Create an AI Search instance

Create a new instance.

Terminal window

```

wrangler ai-search create my-instance


```

You can upload files to the instance using the [dashboard](https://developers.cloudflare.com/ai-search/get-started/dashboard/#upload-content) or the [REST API](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/upload/).

### Connect a data source (optional)

You can optionally connect a website or R2 bucket when creating the instance.

**Website:**

Automatically crawl and index a [website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) that you own.

Terminal window

```

wrangler ai-search create my-instance --type web-crawler --source developers.cloudflare.com


```

**R2 bucket:**

Index documents stored in an [R2 bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/).

Terminal window

```

wrangler ai-search create my-instance --type r2 --source my-bucket


```

## 3\. Check indexing status

Check if your content has finished indexing by running the `stats` command.

Terminal window

```

wrangler ai-search stats my-instance


```

## 4\. Test your instance

Once indexing is complete, run a search query against your instance.

Terminal window

```

wrangler ai-search search my-instance --query "What is Cloudflare?"


```

For the full list of available commands, refer to [Wrangler commands](https://developers.cloudflare.com/ai-search/wrangler-commands/).

## Add to your application

[ Workers binding ](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) Query AI Search directly from your Workers code. 

[ REST API ](https://developers.cloudflare.com/ai-search/api/search/rest-api/) Query AI Search using HTTP requests. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/get-started/wrangler/#page","headline":"Wrangler commands · Cloudflare AI Search docs","description":"Create and manage AI Search instances from the command line.","url":"https://developers.cloudflare.com/ai-search/get-started/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/get-started/wrangler/","name":"Wrangler commands"}}]}
```
