---
title: Request handling
description: Configure AI Gateway request timeouts and retries for reliable AI provider interactions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Request handling

Note

[Dynamic Routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) also offers timeouts and retries per model, along with conditional routing, rate limiting, and budget limiting through a visual interface. This page documents request-handling configuration available through per-request `cf-aig-*` headers that work with any provider endpoint. You can also configure retries at the [gateway level](https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/#retry-requests).

Your AI gateway supports different strategies for handling requests to providers, which allows you to manage AI interactions effectively and ensure your applications remain responsive and reliable.

## Request timeouts

A request timeout allows you to return an error or trigger a retry if a provider takes too long to respond.

These timeouts help:

* Improve user experience, by preventing users from waiting too long for a response
* Proactively handle errors, by detecting unresponsive providers

A timeout is set in milliseconds. The timeout is based on when the first part of the response comes back. As long as the first part of the response returns within the specified timeframe — such as when streaming a response — your gateway will wait for the response.

### Configuration

For a provider-specific endpoint, configure the timeout value by adding a `cf-aig-request-timeout` header.

Request with timeout

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --header "cf-aig-request-timeout: 5000" \

  --data '{

    "model": "openai/gpt-4.1-mini",

    "messages": [{"role": "user", "content": "What is Cloudflare?"}]

  }'


```

---

## Request retries

AI Gateway supports automatic retries for failed requests, with a maximum of five retry attempts.

This feature improves your application's resiliency, ensuring you can recover from temporary issues without manual intervention.

With request retries, you can adjust a combination of three properties:

* Number of attempts (maximum of 5 tries)
* How long before retrying (in milliseconds, maximum of 5 seconds)
* Backoff method (constant, linear, or exponential)

On the final retry attempt, your gateway will wait until the request completes, regardless of how long it takes.

### Configuration

For a provider-specific endpoint, configure the retry settings by adding different header values:

* `cf-aig-max-attempts` (number)
* `cf-aig-retry-delay` (number)
* `cf-aig-backoff` ("constant" | "linear" | "exponential)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#page","headline":"Request handling · Cloudflare AI Gateway docs","description":"Configure AI Gateway request timeouts and retries for reliable AI provider interactions.","url":"https://developers.cloudflare.com/ai-gateway/configuration/request-handling/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/configuration/request-handling/","name":"Request handling"}}]}
```
