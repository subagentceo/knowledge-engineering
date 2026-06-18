---
title: Getting started
description: Set up AI Gateway and send your first request to observe and control AI API traffic.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

**Last reviewed:**  almost 2 years ago 

In this guide, you will learn how to set up and use your first AI Gateway.

## Get your account ID and authentication token

Before making requests, you need two things:

1. Your **Account ID** — find it in the [Cloudflare dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
2. A **Cloudflare API token** — [create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `AI Gateway - Read`, `AI Gateway - Edit`, and `Workers AI - Read` permissions.

## Send your first request

Run the following command to make your first request through AI Gateway. This example calls a Workers AI model, which requires the `@cf/` model prefix and the `cf-aig-gateway-id` header.

Terminal window

```

# Run `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN,

# and `wrangler whoami` to replace $CLOUDFLARE_ACCOUNT_ID.

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "cf-aig-gateway-id: default" \

  --header "Content-Type: application/json" \

  --data '{

    "model": "@cf/moonshotai/kimi-k2.6",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

Note

For third-party models, you do not need to specify a gateway — AI Gateway uses `default` as the gateway ID and automatically creates it on the first authenticated request. Workers AI requests always require the `cf-aig-gateway-id` header. For more details, refer to [Default gateway](https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/#default-gateway).

Create a gateway manually

You can also create gateways manually with a custom name and configuration through the dashboard or API.

* [ Dashboard ](#tab-panel-6548)
* [ API ](#tab-panel-6549)

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

## Provider authentication

Authenticate with your upstream AI provider using one of the following options:

* **Unified Billing:** Use the AI Gateway billing to pay for and authenticate your inference requests. Refer to [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/).
* **BYOK (Store Keys):** Store your own provider API Keys with Cloudflare, and AI Gateway will include them at runtime. Refer to [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
* **Request headers:** Include your provider API Key in the request headers as you normally would (for example, `Authorization: Bearer <OPENAI_API_KEY>`).

## Integration options

### REST API

Call any model — whether hosted on Cloudflare or by a third-party provider — through the same Cloudflare API. No provider SDKs or API keys needed — authentication and billing are handled through your Cloudflare account. Three endpoints are available: `/ai/run` for all modalities, `/ai/v1/chat/completions` for OpenAI SDK compatibility, and `/ai/v1/responses` for agentic workflows.

Terminal window

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

    "model": "openai/gpt-4.1-mini",

    "messages": [{"role": "user", "content": "What is Cloudflare?"}]

  }'


```

Refer to [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) for details and examples.

### Provider-specific endpoints

For direct integration with specific AI providers, use dedicated endpoints that maintain the original provider's API schema while adding AI Gateway features.

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}


```

**Available providers:**

* [OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/) \- GPT models and embeddings
* [Anthropic](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/) \- Claude models
* [Google AI Studio](https://developers.cloudflare.com/ai-gateway/usage/providers/google-ai-studio/) \- Gemini models
* [Workers AI](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/) \- Cloudflare's inference platform
* [AWS Bedrock](https://developers.cloudflare.com/ai-gateway/usage/providers/bedrock/) \- Amazon's managed AI service
* [Azure OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/azureopenai/) \- Microsoft's OpenAI service
* [and more...](https://developers.cloudflare.com/ai-gateway/usage/providers/)

## Next steps

* Learn more about [caching](https://developers.cloudflare.com/ai-gateway/features/caching/) for faster requests and cost savings and [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) to control how your application scales.
* Explore how to specify model or provider [fallbacks, ratelimits, A/B tests](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) for resiliency.
* Learn how to use low-cost, open source models on [Workers AI](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/) \- our AI inference service.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/get-started/#page","headline":"Getting started · Cloudflare AI Gateway docs","description":"Set up AI Gateway and send your first request to observe and control AI API traffic.","url":"https://developers.cloudflare.com/ai-gateway/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/get-started/","name":"Getting started"}}]}
```
