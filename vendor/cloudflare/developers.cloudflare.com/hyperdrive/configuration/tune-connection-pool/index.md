---
title: Tune connection pooling
description: Configure the maximum number of database connections in your Hyperdrive connection pool.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tune connection pooling

Hyperdrive maintains a pool of connections to your database that are shared across Worker invocations. You can configure the maximum number of these connections based on your database capacity and application requirements.

Note

Hyperdrive does not have a limit on the number of concurrent _client_ connections made from your Workers to Hyperdrive.

Hyperdrive does have a limit of _origin_ connections that can be made from Hyperdrive to your database. These are shared across Workers, with each Worker using one of these connections over the course of a database transaction. Refer to [transaction pooling mode](https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/#pooling-mode) for more information.

## Configure connection pool size

You can configure the connection pool size using the Cloudflare dashboard, the Wrangler CLI, or the Cloudflare API.

* [ Dashboard ](#tab-panel-8670)
* [ Wrangler ](#tab-panel-8671)
* [ API ](#tab-panel-8672)

To configure connection pool size via the dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Storage & databases** \> **Hyperdrive**.  
[ Go to **Hyperdrive** ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
3. Select your Hyperdrive configuration.
4. Select **Settings**.
5. In the **Origin connection limit** section, adjust the **Maximum connections** value.
6. Select **Save**.

Use the [wrangler hyperdrive update](https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/#hyperdrive-update) command with the `--origin-connection-limit` flag:

Terminal window

```

npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=<MAX_CONNECTIONS>


```

Use the [Hyperdrive REST API](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs/methods/update/) to update your configuration:

Terminal window

```

curl --request PATCH \

  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/hyperdrive/configs/<HYPERDRIVE_ID> \

  --header 'Content-Type: application/json' \

  --header 'Authorization: Bearer <API_TOKEN>' \

  --data '{

    "origin_connection_limit": <MAX_CONNECTIONS>

  }'


```

All Hyperdrive configurations have a minimum of 5 connections. The maximum connection count depends on your [Workers plan](https://developers.cloudflare.com/hyperdrive/platform/limits/).

Note

The Hyperdrive connection pool limit is a "soft limit". This means that it is possible for Hyperdrive to make more connections to your database than this limit in the event of network failure to ensure high availability. We recommend that you set the Hyperdrive connection limit to be lower than the limit of your origin database to account for occasions where Hyperdrive needs to create more connections for resiliency.

Note

You can request adjustments to Hyperdrive's origin connection limits. To request an increase, submit a [Limit Increase Request ↗](https://forms.gle/eX6pXvit1wBv77Yw5) and Cloudflare will contact you with next steps. Cloudflare also regularly monitors the Hyperdrive channel in [Cloudflare's Discord community ↗](https://discord.cloudflare.com/) and can answer questions regarding limits and requests.

## Best practices

* **Start conservatively**: Begin with a lower connection count and gradually increase it based on your application's performance.
* **Monitor database metrics**: Watch your database's connection usage and performance metrics to optimize the connection count.
* **Consider database limits**: Ensure your configured connection count does not exceed your database's maximum connection limit.
* **Account for multiple configurations**: If you have multiple Hyperdrive configurations connecting to the same database, consider the total connection count across all configurations.

## Related resources

* [Connection pooling concepts](https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/)
* [Connection lifecycle](https://developers.cloudflare.com/hyperdrive/concepts/connection-lifecycle/)
* [Metrics and analytics](https://developers.cloudflare.com/hyperdrive/observability/metrics/)
* [Hyperdrive limits](https://developers.cloudflare.com/hyperdrive/platform/limits/)
* [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/tune-connection-pool/#page","headline":"Tune connection pooling · Cloudflare Hyperdrive docs","description":"Configure the maximum number of database connections in your Hyperdrive connection pool.","url":"https://developers.cloudflare.com/hyperdrive/configuration/tune-connection-pool/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/configuration/tune-connection-pool/","name":"Tune connection pooling"}}]}
```
