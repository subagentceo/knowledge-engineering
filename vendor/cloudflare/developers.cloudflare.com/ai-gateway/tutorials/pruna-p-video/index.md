---
title: Use Pruna P-video through AI Gateway
description: Learn how to call prunaai/p-video on Replicate through AI Gateway
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Pruna P-video through AI Gateway

This tutorial shows how to call the [Pruna's P-video ↗](https://replicate.com/prunaai/p-video) model on [Replicate](https://developers.cloudflare.com/ai-gateway/usage/providers/replicate/) through AI Gateway.

## Prerequisites

* A [Cloudflare account ↗](https://cloudflare.com/sign-up)
* A [Replicate account ↗](https://replicate.com/) with an API token

## 1\. Get a Replicate API token

1. Go to [replicate.com ↗](https://replicate.com/) and sign up for an account.
2. Once logged in, go to [replicate.com/settings/api-tokens ↗](https://replicate.com/account/api-tokens).
3. Select **Create token** and give it a name.
4. Copy the token and store it somewhere safe.

## 2\. Create an AI Gateway

* [ Dashboard ](#tab-panel-6570)
* [ API ](#tab-panel-6571)

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

Note your **Account ID** and **Gateway name** for use in later steps.

To add authentication to your gateway, refer to [Authenticated Gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/).

## 3\. Construct the gateway URL

Replace the standard Replicate API base URL with the AI Gateway URL:

```

# Instead of:

https://api.replicate.com/v1


# Use:

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate


```

For example, if your account ID is `abc123` and your gateway is `my-gateway`:

```

https://gateway.ai.cloudflare.com/v1/abc123/my-gateway/replicate


```

## 4\. Generate a video

P-video predictions generally complete within 30 seconds. Because this is under Replicate's 60-second synchronous limit, you can use the `Prefer: wait` header to send a request and get the result in a single call:

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \

  --header "Authorization: Bearer {replicate_api_token}" \

  --header "cf-aig-authorization: Bearer {cloudflare_api_token}" \

  --header "Content-Type: application/json" \

  --header "Prefer: wait" \

  --data '{

    "version": "prunaai/p-video",

    "input": {

      "prompt": "A cat walking through a field of flowers in slow motion",

      "duration": 5,

      "aspect_ratio": "16:9",

      "resolution": "720p",

      "fps": 24

    }

  }'


```

* `Authorization` — your Replicate API token (authenticates with Replicate).
* `cf-aig-authorization` — your Cloudflare API token (for authenticated gateways).
* `Prefer: wait` — blocks until the prediction completes instead of returning immediately.

For a full list of available input parameters, check out the [prunaai/p-video model page ↗](https://replicate.com/prunaai/p-video) on Replicate.

When the prediction completes, the response includes the `output` field with a URL to the generated video file.

## 5\. (Optional) Use async polling for longer requests

If your request may exceed 60 seconds (for example, with longer durations or higher resolutions), use async mode instead. Send the request without the `Prefer: wait` header:

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \

  --header "Authorization: Bearer {replicate_api_token}" \

  --header "cf-aig-authorization: Bearer {cloudflare_api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "version": "prunaai/p-video",

    "input": {

      "prompt": "A cat walking through a field of flowers in slow motion",

      "duration": 5,

      "aspect_ratio": "16:9",

      "resolution": "720p",

      "fps": 24

    }

  }'


```

The response includes a prediction `id`:

```

{

  "id": "xyz789...",

  "status": "starting",

  "urls": {

    "get": "https://api.replicate.com/v1/predictions/xyz789...",

    "cancel": "https://api.replicate.com/v1/predictions/xyz789.../cancel"

  }

}


```

Poll the prediction status until it completes:

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions/{prediction_id} \

  --header "Authorization: Bearer {replicate_api_token}" \

  --header "cf-aig-authorization: Bearer {cloudflare_api_token}"


```

Keep polling until `status` is `succeeded` (or `failed`). When complete, the `output` field contains a URL to the generated video file.

## Next steps

From here you can:

* Use [logging](https://developers.cloudflare.com/ai-gateway/observability/logging/) to monitor requests and debug issues.
* Set up [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) to control usage.
* Use other models on Replicate or our other [supported providers](https://developers.cloudflare.com/ai-gateway/usage/providers/) through AI Gateway.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/tutorials/pruna-p-video/#page","headline":"Use Pruna P-video through AI Gateway · Cloudflare AI Gateway docs","description":"Learn how to call prunaai/p-video on Replicate through AI Gateway","url":"https://developers.cloudflare.com/ai-gateway/tutorials/pruna-p-video/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/tutorials/pruna-p-video/","name":"Use Pruna P-video through AI Gateway"}}]}
```
