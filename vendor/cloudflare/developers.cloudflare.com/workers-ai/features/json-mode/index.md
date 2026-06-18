---
title: JSON Mode
description: Force Workers AI text generation models to return valid JSON output using response_format or JSON schemas.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JSON Mode

When we want text-generation AI models to interact with databases, services, and external systems programmatically, typically when using tool calling or building AI agents, we must have structured response formats rather than natural language.

Workers AI supports JSON Mode, enabling applications to request a structured output response when interacting with AI models.

## Schema

JSON Mode is compatible with OpenAI’s implementation; to enable add the `response_format` property to the request object using the following convention:

```

{

  response_format: {

    title: "JSON Mode",

    type: "object",

    properties: {

      type: {

        type: "string",

        enum: ["json_object", "json_schema"],

      },

      json_schema: {},

    }

  }

}


```

Where `json_schema` must be a valid [JSON Schema ↗](https://json-schema.org/) declaration.

## JSON Mode example

When using JSON Format, pass the schema as in the example below as part of the request you send to the LLM.

```

{

  "messages": [

    {

      "role": "system",

      "content": "Extract data about a country."

    },

    {

      "role": "user",

      "content": "Tell me about India."

    }

  ],

  "response_format": {

    "type": "json_schema",

    "json_schema": {

      "type": "object",

      "properties": {

        "name": {

          "type": "string"

        },

        "capital": {

          "type": "string"

        },

        "languages": {

          "type": "array",

          "items": {

            "type": "string"

          }

        }

      },

      "required": [

        "name",

        "capital",

        "languages"

      ]

    }

  }

}


```

The LLM will follow the schema, and return a response such as below:

```

{

  "response": {

    "name": "India",

    "capital": "New Delhi",

    "languages": [

      "Hindi",

      "English",

      "Bengali",

      "Telugu",

      "Marathi",

      "Tamil",

      "Gujarati",

      "Urdu",

      "Kannada",

      "Odia",

      "Malayalam",

      "Punjabi",

      "Sanskrit"

    ]

  }

}


```

As you can see, the model is complying with the JSON schema definition in the request and responding with a validated JSON object.

## Supported Models

This is the list of models that now support JSON Mode:

* [@cf/meta/llama-3.1-8b-instruct-fast](https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct-fast/)
* [@cf/meta/llama-3.1-70b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.1-70b-instruct/)
* [@cf/meta/llama-3.3-70b-instruct-fp8-fast](https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/)
* [@cf/meta/llama-3-8b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3-8b-instruct/)
* [@cf/meta/llama-3.1-8b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct/)
* [@cf/meta/llama-3.2-11b-vision-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.2-11b-vision-instruct/)
* [@hf/nousresearch/hermes-2-pro-mistral-7b](https://developers.cloudflare.com/workers-ai/models/hermes-2-pro-mistral-7b/)
* [@hf/thebloke/deepseek-coder-6.7b-instruct-awq](https://developers.cloudflare.com/workers-ai/models/deepseek-coder-6.7b-instruct-awq/)
* [@cf/deepseek-ai/deepseek-r1-distill-qwen-32b](https://developers.cloudflare.com/workers-ai/models/deepseek-r1-distill-qwen-32b/)

We will continue extending this list to keep up with new, and requested models.

Note that Workers AI can't guarantee that the model responds according to the requested JSON Schema. Depending on the complexity of the task and adequacy of the JSON Schema, the model may not be able to satisfy the request in extreme situations. If that's the case, then an error `JSON Mode couldn't be met` is returned and must be handled.

JSON Mode currently doesn't support streaming.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers-ai/features/json-mode/#page","headline":"JSON Mode · Cloudflare Workers AI docs","description":"Force Workers AI text generation models to return valid JSON output using response\\_format or JSON schemas.","url":"https://developers.cloudflare.com/workers-ai/features/json-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/json-mode/","name":"JSON Mode"}}]}
```
