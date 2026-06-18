---
title: 3rd Party Integrations
description: Connect to third-party databases such as Supabase, Turso and PlanetScale)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 3rd Party Integrations

## Background

Connect to databases by configuring connection strings and credentials as [secrets](https://developers.cloudflare.com/workers/configuration/secrets/) in your Worker.

Connecting to a regional database from a Worker?

If your Worker is connecting to a regional database, you can reduce your query latency by using [Hyperdrive](https://developers.cloudflare.com/hyperdrive) and [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) which are both included in any Workers plan. Hyperdrive will pool your databases connections globally across Cloudflare's network. Smart Placement will monitor your application to run your Workers closest to your backend infrastructure when this reduces the latency of your Worker invocations. Learn more about [how Smart Placement works](https://developers.cloudflare.com/workers/configuration/placement/).

## Database credentials

When you rotate or update database credentials, you must update the corresponding [secrets](https://developers.cloudflare.com/workers/configuration/secrets/) in your Worker. Use the [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) command to update secrets securely or update the secret directly in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/services/view/:worker/production/settings).

## Database limits

You can connect to multiple databases by configuring separate sets of secrets for each database connection. Use descriptive secret names to distinguish between different database connections (for example, `DATABASE_URL_PROD` and `DATABASE_URL_STAGING`).

## Popular providers

* [ Neon ](https://developers.cloudflare.com/workers/databases/third-party-integrations/neon/)
* [ PlanetScale ](https://developers.cloudflare.com/workers/databases/third-party-integrations/planetscale/)
* [ Supabase ](https://developers.cloudflare.com/workers/databases/third-party-integrations/supabase/)
* [ Turso ](https://developers.cloudflare.com/workers/databases/third-party-integrations/turso/)
* [ Upstash ](https://developers.cloudflare.com/workers/databases/third-party-integrations/upstash/)
* [ Xata ](https://developers.cloudflare.com/workers/databases/third-party-integrations/xata/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/databases/third-party-integrations/#page","headline":"3rd Party Integrations · Cloudflare Workers docs","description":"Connect to third-party databases such as Supabase, Turso and PlanetScale)","url":"https://developers.cloudflare.com/workers/databases/third-party-integrations/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/databases/","name":"Databases"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/databases/third-party-integrations/","name":"3rd Party Integrations"}}]}
```
