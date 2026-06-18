---
title: Add Human Feedback using API
description: Submit human feedback on AI Gateway request logs using the Cloudflare API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add Human Feedback using API

This guide will walk you through the steps of adding human feedback to an AI Gateway request using the Cloudflare API. You will learn how to retrieve the relevant request logs, and submit feedback using the API.

If you prefer to add human feedback via the dashboard, refer to [Add Human Feedback](https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback/).

## 1\. Create an API Token

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:
* `AI Gateway - Read`
* `AI Gateway - Edit`
1. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
2. Using that API token and Account ID, send a [POST request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) to the Cloudflare API.

## 2\. Retrieve the `cf-aig-log-id`

The `cf-aig-log-id` is a unique identifier for the specific log entry to which you want to add feedback. Below are two methods to obtain this identifier.

### Method 1: Locate the `cf-aig-log-id` in the request response

This method allows you to directly find the `cf-aig-log-id` within the header of the response returned by the AI Gateway. This is the most straightforward approach if you have access to the original API response.

The steps below outline how to do this.

1. **Make a Request to the AI Gateway**: This could be a request your application sends to the AI Gateway. Once the request is made, the response will contain various pieces of metadata.
2. **Check the Response Headers**: The response will include a header named `cf-aig-log-id`. This is the identifier you will need to submit feedback.

In the example below, the `cf-aig-log-id` is `01JADMCQQQBWH3NXZ5GCRN98DP`.

```

{

  "status": "success",

  "headers": {

    "cf-aig-log-id": "01JADMCQQQBWH3NXZ5GCRN98DP"

  },

  "data": {

    "response": "Sample response data"

  }

}


```

### Method 2: Retrieve the `cf-aig-log-id` via API (GET request)

If you do not have the `cf-aig-log-id` in the response body or you need to access it after the fact, you are able to retrieve it by querying the logs using the [Cloudflare API](https://developers.cloudflare.com/api/resources/ai%5Fgateway/subresources/logs/methods/list/).

Send a `GET` request to get a list of logs and then find a specific ID

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `AI Gateway Write`
* `AI Gateway Read`

List Gateway Logs

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "01JADMCQQQBWH3NXZ5GCRN98DP",

      "cached": true,

      "created_at": "2019-08-24T14:15:22Z",

      "custom_cost": true,

      "duration": 0,

      "id": "string",

      "metadata": "string",

      "model": "string",

      "model_type": "string",

      "path": "string",

      "provider": "string",

      "request_content_type": "string",

      "request_type": "string",

      "response_content_type": "string",

      "status_code": 0,

      "step": 0,

      "success": true,

      "tokens_in": 0,

      "tokens_out": 0

    }

  ]

}


```

### Method 3: Retrieve the `cf-aig-log-id` via a binding

You can also retrieve the `cf-aig-log-id` using a binding, which streamlines the process. Here's how to retrieve the log ID directly:

JavaScript

```

const resp = await env.AI.run(

  "@cf/meta/llama-3-8b-instruct",

  {

    prompt: "tell me a joke",

  },

  {

    gateway: {

      id: "my_gateway_id",

    },

  },

);


const myLogId = env.AI.aiGatewayLogId;


```

Note:

The `aiGatewayLogId` property, will only hold the last inference call log id.

## 3\. Submit feedback via PATCH request

Once you have both the API token and the `cf-aig-log-id`, you can send a PATCH request to submit feedback.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `AI Gateway Write`

Patch Gateway Log

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "feedback": 1

  }'


```

If you had negative feedback, adjust the body of the request to be `-1`.

```

{

  "feedback": -1

}


```

## 4\. Verify the feedback submission

You can verify the feedback submission in two ways:

* **Through the [Cloudflare dashboard  ↗](https://dash.cloudflare.com)**: check the updated feedback on the AI Gateway interface.
* **Through the API**: Send another GET request to retrieve the updated log entry and confirm the feedback has been recorded.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/#page","headline":"Add Human Feedback using API · Cloudflare AI Gateway docs","description":"Submit human feedback on AI Gateway request logs using the Cloudflare API.","url":"https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/evaluations/","name":"Evaluations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/evaluations/add-human-feedback-api/","name":"Add Human Feedback using API"}}]}
```
