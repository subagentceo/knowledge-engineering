---
title: Rate limiting
description: Control traffic to your AI Gateway with fixed or sliding rate limits to prevent excessive costs and suspicious activity.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rate limiting

Rate limiting controls the traffic that reaches your application, which prevents expensive bills and suspicious activity.

## Parameters

You can define rate limits as the number of requests that get sent in a specific time frame. For example, you can limit your application to 100 requests per 60 seconds.

You can also select if you would like a **fixed** or **sliding** rate limiting technique. With rate limiting, we allow a certain number of requests within a window of time. For example, if it is a fixed rate, the window is based on time, so there would be no more than `x` requests in a ten minute window. If it is a sliding rate, there would be no more than `x` requests in the last ten minutes.

To illustrate this, let us say you had a limit of ten requests per ten minutes, starting at 12:00\. So the fixed window is 12:00-12:10, 12:10-12:20, and so on. If you sent ten requests at 12:09 and ten requests at 12:11, all 20 requests would be successful in a fixed window strategy. However, they would fail in a sliding window strategy since there were more than ten requests in the last ten minutes.

## Handling rate limits

When your requests exceed the allowed rate, you will encounter rate limiting. This means the server will respond with a `429 Too Many Requests` status code and your request will not be processed.

## Default configuration

* [ Dashboard ](#tab-panel-6544)
* [ API ](#tab-panel-6545)

To set the default rate limiting configuration in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Go to **Settings**.
4. Enable **Rate-limiting**.
5. Adjust the rate, time period, and rate limiting method as desired.

To set the default rate limiting configuration using the API:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:
* `AI Gateway - Read`
* `AI Gateway - Edit`
1. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
2. Using that API token and Account ID, send a [POST request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) to create a new Gateway and include a value for the `rate_limiting_interval`, `rate_limiting_limit`, and `rate_limiting_technique`.

This rate limiting behavior will be uniformly applied to all requests for that gateway.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/rate-limiting/#page","headline":"Rate limiting · Cloudflare AI Gateway docs","description":"Control traffic to your AI Gateway with fixed or sliding rate limits to prevent excessive costs and suspicious activity.","url":"https://developers.cloudflare.com/ai-gateway/features/rate-limiting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/rate-limiting/","name":"Rate limiting"}}]}
```
