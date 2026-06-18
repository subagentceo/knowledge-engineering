---
title: Replicate
description: Route Replicate API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Replicate

[Replicate ↗](https://replicate.com/) runs and fine tunes open-source models.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate


```

## URL structure

When making requests to Replicate, replace `https://api.replicate.com/v1` in the URL you're currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate`.

## Prerequisites

When making requests to Replicate, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Replicate API token. You can create one at [replicate.com/account/api-tokens ↗](https://replicate.com/account/api-tokens)
* The name of the Replicate model you want to use, like `anthropic/claude-4.5-haiku` or `google/nano-banana`.

## Example

### cURL

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \

  --header 'Authorization: Bearer {replicate_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "version": "anthropic/claude-4.5-haiku",

    "input":

      {

        "prompt": "Write a haiku about Cloudflare"

      }

    }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/replicate/#page","headline":"Replicate · Cloudflare AI Gateway docs","description":"Route Replicate API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/replicate/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/replicate/","name":"Replicate"}}]}
```
