---
title: Unified Billing
description: Use the Cloudflare billing to pay for and authenticate your inference requests.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Unified Billing

Unified Billing allows users to connect to various AI providers (such as OpenAI, Anthropic, and Google AI Studio) and receive a single Cloudflare bill. To use Unified Billing, you must purchase and load credits into your Cloudflare account in the Cloudflare dashboard, which you can then spend with AI Gateway.

A 5% fee is applied to all credits purchased through Unified Billing. For example, a $100 credit purchase will result in a $105 charge. Inference pricing from providers is passed through with no markup — you pay the same per-token rates as you would directly with the provider.

## Pre-requisites

* Ensure your Cloudflare account has [sufficient credits loaded](#load-credits).
* Ensure you have [authenticated](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) your AI Gateway.

## Load credits

To load credits for AI Gateway:

1. In the Cloudflare dashboard, go to the **AI Gateway** page.  
[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)  
The **Credits Available** card on the top right shows how many AI gateway credits you have on your account currently.
2. In **Credits Available**, select **Manage**.
3. If your account does not have an available payment method, AI Gateway will prompt you to add a payment method to purchase credits. Add a payment method.
4. Select **Top-up credits**.
5. Add the amount of credits you want to purchase, then select **Confirm and pay**.

### Auto-top up

You can configure AI Gateway to automatically replenish your credits when they fall below a certain threshold. To configure auto top-up:

1. In the Cloudflare dashboard, go to the **AI Gateway** page.  
[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
2. In **Credits Available**, select **Manage**.
3. Select **Setup auto top-up credits**.
4. Choose a threshold and a recharge amount for auto top-up.

When your balance falls below the set threshold, AI Gateway will automatically apply the auto top-up amount to your account.

## Use Unified Billing

Unified Billing works in two ways: through the AI binding or through the HTTP API. Both deduct credits from your account automatically without requiring provider API keys.

Note

Workers AI models (models prefixed with `@cf/`) routed through AI Gateway are not charged via Unified Billing. These models are billed through [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) instead. Unified Billing only applies to third-party provider models (such as OpenAI, Anthropic, and Google AI Studio).

### AI binding

Call any model listed in the [model catalog](https://developers.cloudflare.com/ai/models/) using `env.AI.run()`. This includes both Workers AI models and third-party models from providers like OpenAI, Anthropic, and Google.

TypeScript

```

const resp = await env.AI.run(

  "openai/gpt-4.1-mini",

  {

    messages: [{ role: "user", content: "What is Cloudflare?" }],

  },

  {

    gateway: { id: "my-gateway" },

  },

);


```

Refer to the [binding reference](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/) for the full API surface.

### HTTP API

Call a supported provider through the AI Gateway REST API without passing a provider API key.

#### REST API

Use the Cloudflare API to call third-party models. Pass your Cloudflare API token in the `Authorization` header:

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

Refer to [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) for more details on all available endpoints.

#### AI Gateway provider-native endpoints

You can also call providers directly through [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) using the `cf-aig-authorization` header to authenticate:

The HTTP API supports the following providers:

* [OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/)
* [Anthropic](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/)
* [Google AI Studio](https://developers.cloudflare.com/ai-gateway/usage/providers/google-ai-studio/)
* [Google Vertex AI](https://developers.cloudflare.com/ai-gateway/usage/providers/vertex/)
* [xAI](https://developers.cloudflare.com/ai-gateway/usage/providers/grok/)
* [Groq](https://developers.cloudflare.com/ai-gateway/usage/providers/groq/)

### Spend limits

You can set spend limits at two levels:

* **Account-level** — Set a spend limit on your loaded credits on this page to cap total Unified Billing spend across all gateways.
* **Per-gateway** — Set [granular spend limit rules](https://developers.cloudflare.com/ai-gateway/features/spend-limits/) on individual gateways, scoped by model, provider, or custom metadata dimensions like user or team.

Both limits are enforced independently. Whichever one is reached first will block requests.

### Zero Data Retention (ZDR)

Zero Data Retention (ZDR) routes Unified Billing traffic through provider endpoints that do not retain prompts or responses. Enable it with the gateway-level `zdr` setting, which maps to ZDR-capable upstream provider configurations. This setting only applies to Unified Billing requests that use Cloudflare-managed credentials. It does not apply to BYOK or other AI Gateway requests.

ZDR does not control AI Gateway logging. To disable request/response logging in AI Gateway, update the logging settings separately in [Logging](https://developers.cloudflare.com/ai-gateway/observability/logging/).

ZDR is currently supported for:

* [OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/)
* [Anthropic](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/)

If ZDR is enabled for a provider that does not support it, AI Gateway falls back to the standard (non-ZDR) Unified Billing configuration.

#### Default configuration

* [ Dashboard ](#tab-panel-6546)
* [ API ](#tab-panel-6547)

To set ZDR as the default for Unified Billing in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select your gateway.
4. Go to **Settings** and toggle **Zero Data Retention (ZDR)**.

To set ZDR as the default for Unified Billing using the API:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
   * `AI Gateway - Read`  
   * `AI Gateway - Edit`
2. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Send a [PUT request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/update/) to update the gateway and include `zdr: true` or `zdr: false` in the request body.

#### Per-request override (`cf-aig-zdr`)

Use the `cf-aig-zdr` header to override the gateway default for a single Unified Billing request. Set it to `true` to force ZDR, or `false` to disable ZDR for the request.

Unified Billing request with ZDR

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --header "cf-aig-zdr: true" \

  --data '{

    "model": "openai/gpt-4.1-mini",

    "messages": [

      {

        "role": "user",

        "content": "Explain Zero Data Retention."

      }

    ]

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/unified-billing/#page","headline":"Unified Billing · Cloudflare AI Gateway docs","description":"Use the Cloudflare billing to pay for and authenticate your inference requests.","url":"https://developers.cloudflare.com/ai-gateway/features/unified-billing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/unified-billing/","name":"Unified Billing"}}]}
```
