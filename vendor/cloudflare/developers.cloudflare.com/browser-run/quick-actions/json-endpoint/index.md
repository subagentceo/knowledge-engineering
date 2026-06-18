---
title: /json - Capture structured data using AI
description: Extract structured JSON data from webpages using AI with the Browser Run /json endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /json - Capture structured data using AI

The `/json` endpoint extracts structured data from a webpage. You can specify the expected output using either a `prompt` or a `response_format` parameter which accepts a JSON schema. The endpoint returns the extracted data in JSON format.

Note

By default, the `/json` endpoint leverages [Workers AI](https://developers.cloudflare.com/workers-ai/) for data extraction using [@cf/meta/llama-3.3-70b-instruct-fp8-fast](https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/). Using this endpoint incurs usage on Workers AI, which you can monitor in the [Workers AI Dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/workers-ai). To use a different model, refer to [Using a custom model (BYO API Key)](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/#using-a-custom-model-byo-api-key).

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/json


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

And at least one of:

* `prompt` (string), or
* `response_format` (object with a JSON Schema)

## Common use cases

* Extract product info (title, price, availability) or listings (jobs, rentals)
* Normalize article metadata (title, author, publish date, canonical URL)
* Convert unstructured pages into typed JSON for downstream pipelines

## Basic usage

### With a Prompt and JSON schema

* [ curl ](#tab-panel-6903)
* [ TypeScript SDK ](#tab-panel-6904)
* [ Workers binding ](#tab-panel-6905)

This example captures webpage data by providing both a prompt and a JSON schema. The prompt guides the extraction process, while the JSON schema defines the expected structure of the output.

Terminal window

```

curl --request POST 'https://api.cloudflare.com/client/v4/accounts/CF_ACCOUNT_ID/browser-rendering/json' \

  --header 'authorization: Bearer CF_API_TOKEN' \

  --header 'content-type: application/json' \

  --data '{

  "url": "https://developers.cloudflare.com/",

  "prompt": "Get me the list of AI products",

  "response_format": {

    "type": "json_schema",

    "schema": {

        "type": "object",

        "properties": {

          "products": {

            "type": "array",

            "items": {

              "type": "object",

              "properties": {

                "name": {

                  "type": "string"

                },

                "link": {

                  "type": "string"

                }

              },

              "required": [

                "name"

              ]

            }

          }

        }

      }

  }

}'


```

```

{

  "success": true,

  "result": {

    "products": [

      {

        "name": "Build a RAG app",

        "link": "https://developers.cloudflare.com/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/"

      },

      {

        "name": "Workers AI",

        "link": "https://developers.cloudflare.com/workers-ai/"

      },

      {

        "name": "Vectorize",

13 collapsed lines

        "link": "https://developers.cloudflare.com/vectorize/"

      },

      {

        "name": "AI Gateway",

        "link": "https://developers.cloudflare.com/ai-gateway/"

      },

      {

        "name": "AI Playground",

        "link": "https://playground.ai.cloudflare.com/"

      }

    ]

  }

}


```

Below is an example using the TypeScript SDK:

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"], // This is the default and can be omitted

});


const json = await client.browserRendering.json.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://developers.cloudflare.com/",

  prompt: "Get me the list of AI products",

  response_format: {

    type: "json_schema",

    schema: {

      type: "object",

      properties: {

        products: {

          type: "array",

          items: {

            type: "object",

            properties: {

              name: {

                type: "string",

              },

              link: {

                type: "string",

              },

            },

            required: ["name"],

          },

        },

      },

    },

  },

});

console.log(json);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("json", {

      url: "https://developers.cloudflare.com/",

      prompt: "Get me the list of AI products",

      response_format: {

        type: "json_schema",

        schema: {

          type: "object",

          properties: {

            products: {

              type: "array",

              items: {

                type: "object",

                properties: {

                  name: { type: "string" },

                  link: { type: "string" },

                },

                required: ["name"],

              },

            },

          },

        },

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

### With only a prompt

In this example, only a prompt is provided. The endpoint will use the prompt to extract the data, but the response will not be structured according to a JSON schema. This is useful for simple extractions where you do not need a specific format.

Terminal window

```

curl --request POST 'https://api.cloudflare.com/client/v4/accounts/CF_ACCOUNT_ID/browser-rendering/json' \

  --header 'authorization: Bearer CF_API_TOKEN' \

  --header 'content-type: application/json' \

  --data '{

    "url": "https://developers.cloudflare.com/",

    "prompt": "get me the list of AI products"

  }'


```

```

  "success": true,

  "result": {

    "AI Products": [

      "Build a RAG app",

      "Workers AI",

      "Vectorize",

      "AI Gateway",

      "AI Playground"

    ]

  }

}


```

### With only a JSON schema (no prompt)

In this case, you supply a JSON schema via the `response_format` parameter. The schema defines the structure of the extracted data.

Terminal window

```

curl --request POST 'https://api.cloudflare.com/client/v4/accounts/CF_ACCOUNT_ID/browser-rendering/json' \

  --header 'authorization: Bearer CF_API_TOKEN' \

  --header 'content-type: application/json' \

  --data '"response_format": {

    "type": "json_schema",

    "schema": {

        "type": "object",

        "properties": {

          "products": {

            "type": "array",

            "items": {

              "type": "object",

              "properties": {

                "name": {

                  "type": "string"

                },

                "link": {

                  "type": "string"

                }

              },

              "required": [

                "name"

              ]

            }

          }

        }

      }

  }'


```

```

{

  "success": true,

  "result": {

    "products": [

      {

        "name": "Workers",

        "link": "https://developers.cloudflare.com/workers/"

      },

      {

        "name": "Pages",

        "link": "https://developers.cloudflare.com/pages/"

      },

55 collapsed lines

      {

        "name": "R2",

        "link": "https://developers.cloudflare.com/r2/"

      },

      {

        "name": "Images",

        "link": "https://developers.cloudflare.com/images/"

      },

      {

        "name": "Stream",

        "link": "https://developers.cloudflare.com/stream/"

      },

      {

        "name": "Build a RAG app",

        "link": "https://developers.cloudflare.com/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/"

      },

      {

        "name": "Workers AI",

        "link": "https://developers.cloudflare.com/workers-ai/"

      },

      {

        "name": "Vectorize",

        "link": "https://developers.cloudflare.com/vectorize/"

      },

      {

        "name": "AI Gateway",

        "link": "https://developers.cloudflare.com/ai-gateway/"

      },

      {

        "name": "AI Playground",

        "link": "https://playground.ai.cloudflare.com/"

      },

      {

        "name": "Access",

        "link": "https://developers.cloudflare.com/cloudflare-one/access-controls/policies/"

      },

      {

        "name": "Tunnel",

        "link": "https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/"

      },

      {

        "name": "Gateway",

        "link": "https://developers.cloudflare.com/cloudflare-one/traffic-policies/"

      },

      {

        "name": "Browser Isolation",

        "link": "https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/"

      },

      {

        "name": "Replace your VPN",

        "link": "https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/"

      }

    ]

  }

}


```

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/json/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Using a custom model (BYO API Key)

Browser Run can use a custom model for which you supply credentials. List the model(s) in the `custom_ai` array:

* `model` should be formed as `<provider>/<model_name>` and the provider must be one of these [supported providers](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/#supported-providers).
* `authorization` is the bearer token or API key that allows Browser Run to call the provider on your behalf.

This example uses the `custom_ai` parameter to instruct Browser Run to use a Anthropic's Claude Sonnet 4 model. The prompt asks the model to extract the main `<h1>` and `<h2>` headings from the target URL and return them in a structured JSON object.

Terminal window

```

curl --request POST \

  --url https://api.cloudflare.com/client/v4/accounts/CF_ACCOUNT_ID/browser-rendering/json \

  --header 'authorization: Bearer CF_API_TOKEN' \

  --header 'content-type: application/json' \

  --data '{

  "url": "http://demoto.xyz/headings",

  "prompt": "Get the heading from the page in the form of an object like h1, h2. If there are many headings of the same kind then grab the first one.",

  "response_format": {

    "type": "json_schema",

    "schema": {

      "type": "object",

      "properties": {

        "h1": {

          "type": "string"

        },

        "h2": {

          "type": "string"

        }

      },

      "required": [

        "h1"

      ]

    }

  },

  "custom_ai": [

    {

      "model": "anthropic/claude-sonnet-4-20250514",

      "authorization": "Bearer <ANTHROPIC_API_KEY>"

    }

  ]

}


```

```

{

  "success": true,

  "result": {

    "h1": "Heading 1",

    "h2": "Heading 2"

  }

}


```

### Using a custom model with fallbacks

You may specify multiple models to provide automatic failover. Browser Run will attempt the models in order until one succeeds. To add failover, list additional models in the `custom_ai` array.

In this example, Browser Run first calls Anthropic's Claude Sonnet 4 model. If that request returns an error, it automatically retries with Meta Llama 3.3 70B from [Workers AI](https://developers.cloudflare.com/workers-ai/), then OpenAI's GPT-4o.

```

"custom_ai": [

  {

    "model": "anthropic/claude-sonnet-4-20250514",

    "authorization": "Bearer <ANTHROPIC_API_KEY>"

  },

  {

    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",

    "authorization": "Bearer <CLOUDFLARE_AUTH_TOKEN>"

  },

{

    "model": "openai/gpt-4o",

    "authorization": "Bearer <OPENAI_API_KEY>"

  }

]


```

## Troubleshooting

### JSON extraction returns null or empty results

If the `/json` endpoint returns null or empty results:

* **Provide a clear prompt** — Be specific about what data to extract and where it appears on the page (for example, "Extract the product name, price, and description from the main product section").
* **Define a response schema** — Use `response_format` with a JSON schema to enforce the expected output structure.
* **Use a custom model** — If the default [Workers AI](https://developers.cloudflare.com/workers-ai/) model does not produce the desired results, use the `custom_ai` parameter to specify a different model. Refer to [Using a custom model (BYO API Key)](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/#using-a-custom-model-byo-api-key) for details.

### Handling JavaScript-heavy pages

For JavaScript-heavy pages or Single Page Applications (SPAs), the default page load behavior may return empty or incomplete results. This happens because the browser considers the page loaded before JavaScript has finished rendering the content.

The simplest solution is to use the `gotoOptions.waitUntil` parameter set to `networkidle0` or `networkidle2`:

```

{

  "url": "https://example.com",

  "gotoOptions": {

    "waitUntil": "networkidle0"

  }

}


```

For faster responses, advanced users can use `waitForSelector` to wait for a specific element instead of waiting for all network activity to stop. This requires knowing which CSS selector indicates the content you need has loaded. For more details, refer to [Quick Actions timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/).

### Set a custom user agent

You can change the user agent at the page level by passing `userAgent` as a top-level parameter in the JSON body. This is useful if the target website serves different content based on the user agent.

Note

The `userAgent` parameter does not bypass bot protection. Requests from Browser Run will always be identified as a bot. Because the User-Agent is configurable, destination servers looking to identify or block Browser Run requests should use the [non-configurable headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#non-configurable-headers) rather than relying on the User-Agent string.

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/#page","headline":"/json - Capture structured data using AI · Cloudflare Browser Run docs","description":"Extract structured JSON data from webpages using AI with the Browser Run /json endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/json-endpoint/","name":"/json - Capture structured data using AI"}}]}
```
