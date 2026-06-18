---
title: Workers Sites
description: Use [Workers Static Assets](/workers/static-assets/) to host full-stack applications instead of Workers Sites. Do not use Workers Sites for new projects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Sites

Use Workers Static Assets Instead

You should use [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) to host full-stack applications instead of Workers Sites. It has been deprecated in Wrangler v4, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) does not support Workers Sites. Do not use Workers Sites for new projects.

Workers Sites enables developers to deploy static applications directly to Workers. It can be used for deploying applications built with static site generators like [Hugo ↗](https://gohugo.io) and [Gatsby ↗](https://www.gatsbyjs.org), or front-end frameworks like [Vue ↗](https://vuejs.org) and [React ↗](https://reactjs.org).

To deploy with Workers Sites, select from one of these three approaches depending on the state of your target project:

---

## 1\. Start from scratch

If you are ready to start a brand new project, this quick start guide will help you set up the infrastructure to deploy a HTML website to Workers.

[ Start from scratch ](https://developers.cloudflare.com/workers/configuration/sites/start-from-scratch/) 

---

## 2\. Deploy an existing static site

If you have an existing project or static assets that you want to deploy with Workers, this quick start guide will help you install Wrangler and configure Workers Sites for your project.

[ Start from an existing static site ](https://developers.cloudflare.com/workers/configuration/sites/start-from-existing/) 

---

## 3\. Add static assets to an existing Workers project

If you already have a Worker deployed to Cloudflare, this quick start guide will show you how to configure the existing codebase to use Workers Sites.

[ Start from an existing Worker ](https://developers.cloudflare.com/workers/configuration/sites/start-from-worker/) 

Note

Workers Sites is built on Workers KV, and usage rates may apply. Refer to [Pricing](https://developers.cloudflare.com/workers/platform/pricing/) to learn more.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/static-assets/#page","headline":"Workers Sites · Cloudflare Workers docs","description":"Use Workers Static Assets to host full-stack applications instead of Workers Sites. Do not use Workers Sites for new projects.","url":"https://developers.cloudflare.com/workers/static-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/sites/","name":"Workers Sites"}}]}
```
