---
title: REST API
description: Use the Cloudflare Workers AI REST API to deploy a large language model (LLM).
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# REST API

This guide will instruct you through setting up and deploying your first Workers AI project. You will use the Workers AI REST API to experiment with a large language model (LLM).

## Prerequisites

Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.

## 1\. Get API token and Account ID

You need your API token and Account ID to use the REST API.

To get these values:

1. In the Cloudflare dashboard, go to the **Workers AI** page.  
[ Go to **Workers AI** ](https://dash.cloudflare.com/?to=/:account/ai/workers-ai)
2. Select **Use REST API**.
3. Get your API token:  
   1. Select **Create a Workers AI API Token**.  
   2. Review the prefilled information.  
   3. Select **Create API Token**.  
   4. Select **Copy API Token**.  
   5. Save that value for future use. This token will be visible [on your profile](https://developers.cloudflare.com/api/get-started/create-token/).
4. For **Get Account ID**, copy the value for **Account ID**. Save that value for future use.

Note

If you choose to [create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) instead of using the template, that token will need permissions for both `Workers AI - Read` and `Workers AI - Edit`.

## 2\. Run a model via API

After creating your API token, authenticate and make requests to the API using your API token in the request.

You will use the [Execute AI model](https://developers.cloudflare.com/api/resources/ai/methods/run/) endpoint to run the [@cf/meta/llama-3.1-8b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct/) model:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct \

  -H 'Authorization: Bearer {API_TOKEN}' \

  -d '{ "prompt": "Where did the phrase Hello World come from" }'


```

Replace the values for `{ACCOUNT_ID}` and `{API_TOKEN}`.

The API response will look like the following:

```

{

  "result": {

    "response": "Hello, World first appeared in 1974 at Bell Labs when Brian Kernighan included it in the C programming language example. It became widely used as a basic test program due to simplicity and clarity. It represents an inviting greeting from a program to the world."

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

This example execution uses the `@cf/meta/llama-3.1-8b-instruct` model, but you can use any of the models in the [Workers AI models catalog](https://developers.cloudflare.com/workers-ai/models/). If using another model, you will need to replace `{model}` with your desired model name.

By completing this guide, you have created a Cloudflare account (if you did not have one already) and an API token that grants Workers AI read permissions to your account. You executed the [@cf/meta/llama-3.1-8b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct/) model using a cURL command from the terminal and received an answer to your prompt in a JSON response.

## Related resources

* [Models](https://developers.cloudflare.com/workers-ai/models/) \- Browse the Workers AI models catalog.
* [AI SDK](https://developers.cloudflare.com/workers-ai/configuration/ai-sdk) \- Learn how to integrate with an AI model.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/get-started/rest-api/#page","headline":"Get started - REST API · Cloudflare Workers AI docs","description":"Use the Cloudflare Workers AI REST API to deploy a large language model (LLM).","url":"https://developers.cloudflare.com/workers-ai/get-started/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/get-started/rest-api/","name":"REST API"}}]}
```
