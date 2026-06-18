---
title: Manage gateways
description: Create, edit, and delete AI Gateway instances using the dashboard or API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage gateways

You have several different options for managing an AI Gateway.

## Create gateway

### Default gateway

AI Gateway can automatically create a gateway for you. If you omit the gateway ID from your request entirely, AI Gateway defaults to using `default` as the gateway ID. When no gateway named `default` exists in your account, AI Gateway creates it on the first authenticated request.

This means you can start sending requests without creating a gateway first — AI Gateway handles gateway creation for you.

The request that triggers auto-creation must be authenticated. When using the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), the standard `Authorization` header is sufficient. When using [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) at `gateway.ai.cloudflare.com`, include a valid `cf-aig-authorization` header. For Workers AI bindings, the account identity from the binding is used instead of a header.

The auto-created default gateway uses the following settings:

| Setting        | Default value  |
| -------------- | -------------- |
| Authentication | On             |
| Log collection | On             |
| Caching        | Off (TTL of 0) |
| Rate limiting  | Off            |

After creation, you can edit the default gateway settings like any other gateway. If you delete the default gateway, sending a new authenticated request to the `default` gateway ID auto-creates it again.

Note

Auto-creation only applies to the gateway ID `default`. Using any other gateway ID requires creating the gateway first.

### Create a gateway manually

* [ Dashboard ](#tab-panel-6540)
* [ API ](#tab-panel-6541)

[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select **Create Gateway**.
4. Enter your **Gateway name**. Note: Gateway name has a 64 character limit.
5. Select **Create**.

To set up an AI Gateway using the API:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
   * `AI Gateway - Read`  
   * `AI Gateway - Edit`
2. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [POST request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) to the Cloudflare API.

## Edit gateway

* [ Dashboard ](#tab-panel-6536)
* [ API ](#tab-panel-6537)

To edit an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select your gateway.
4. Go to **Settings** and update as needed.

To edit an AI Gateway, send a [PUT request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/update/) to the Cloudflare API.

Note

For more details about what settings are available for editing, refer to [Configuration](https://developers.cloudflare.com/ai-gateway/configuration/).

## Retry requests

You can configure your gateway to automatically retry failed requests to upstream providers. This is useful when you do not control the client and cannot implement client-side retries or backoff logic.

To configure retry settings:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway** and select your gateway.
3. Go to **Settings** and find the **Retry Requests** section.
4. Turn on the toggle to turn on automatic retries.
5. Configure the following settings:  
   * **Retry count** — the maximum number of retry attempts (up to 5).  
   * **Delay** — the base delay between retries. Available values: 100ms, 500ms, 1 second, 2 seconds, 3 seconds, or 5 seconds.  
   * **Backoff** — the backoff strategy for subsequent retries: Constant, Linear, or Exponential.
6. Select **Save**.
![Retry Requests settings in the AI Gateway dashboard](https://developers.cloudflare.com/_astro/auto-retry-settings.UcvmkohL_Z2r7tSz.webp) 

These gateway-level defaults apply to all requests routed through the gateway. Per-request headers can override these defaults — refer to [Request handling](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#request-retries) for details.

For more complex failover scenarios where you need to fail across different providers, refer to [Dynamic Routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/).

## Delete gateway

Deleting your gateway is permanent and can not be undone.

* [ Dashboard ](#tab-panel-6538)
* [ API ](#tab-panel-6539)

To delete an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select your gateway from the list of available options.
4. Go to **Settings**.
5. For **Delete Gateway**, select **Delete** (and confirm your deletion).

To delete an AI Gateway, send a [DELETE request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/delete/) to the Cloudflare API.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/#page","headline":"Manage gateways · Cloudflare AI Gateway docs","description":"Create, edit, and delete AI Gateway instances using the dashboard or API.","url":"https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/configuration/manage-gateway/","name":"Manage gateways"}}]}
```
