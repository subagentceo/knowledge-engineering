---
title: Public LoRA adapters
description: Cloudflare offers a few public LoRA adapters that are immediately ready for use.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Public LoRA adapters

Cloudflare offers a few public LoRA adapters that can immediately be used for fine-tuned inference. You can try them out immediately via our [playground ↗](https://playground.ai.cloudflare.com).

Public LoRAs will have the name `cf-public-x`, and the prefix will be reserved for Cloudflare.

Note

Have more LoRAs you would like to see? Let us know on [Discord ↗](https://discord.cloudflare.com).

| Name                                                                         | Description                        | Compatible with                                                           |
| ---------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| [cf-public-magicoder ↗](https://huggingface.co/predibase/magicoder)          | Coding tasks in multiple languages | @cf/mistral/mistral-7b-instruct-v0.1 @hf/mistral/mistral-7b-instruct-v0.2 |
| [cf-public-jigsaw-classification ↗](https://huggingface.co/predibase/jigsaw) | Toxic comment classification       | @cf/mistral/mistral-7b-instruct-v0.1 @hf/mistral/mistral-7b-instruct-v0.2 |
| [cf-public-cnn-summarization ↗](https://huggingface.co/predibase/cnn)        | Article summarization              | @cf/mistral/mistral-7b-instruct-v0.1 @hf/mistral/mistral-7b-instruct-v0.2 |

You can also list these public LoRAs with an API call:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers AI Write`
* `Workers AI Read`

List Public Finetunes

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes/public" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Running inference with public LoRAs

To run inference with public LoRAs, you just need to define the LoRA name in the request.

We recommend that you use the prompt template that the LoRA was trained on. You can find this in the HuggingFace repos linked above for each adapter.

### cURL

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/mistral/mistral-7b-instruct-v0.1 \

  --header 'Authorization: Bearer {cf_token}' \

  --data '{

    "messages": [

      {

        "role": "user",

        "content": "Write a python program to check if a number is even or odd."

      }

    ],

    "lora": "cf-public-magicoder"

  }'


```

### JavaScript

JavaScript

```

const answer = await env.AI.run("@cf/mistral/mistral-7b-instruct-v0.1", {

  stream: true,

  raw: true,

  messages: [

    {

      role: "user",

      content:

        "Summarize the following: Some newspapers, TV channels and well-known companies publish false news stories to fool people on 1 April. One of the earliest examples of this was in 1957 when a programme on the BBC, the UKs national TV channel, broadcast a report on how spaghetti grew on trees. The film showed a family in Switzerland collecting spaghetti from trees and many people were fooled into believing it, as in the 1950s British people didn't eat much pasta and many didn't know how it was made! Most British people wouldnt fall for the spaghetti trick today, but in 2008 the BBC managed to fool their audience again with their Miracles of Evolution trailer, which appeared to show some special penguins that had regained the ability to fly. Two major UK newspapers, The Daily Telegraph and the Daily Mirror, published the important story on their front pages.",

    },

  ],

  lora: "cf-public-cnn-summarization",

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/fine-tunes/public-loras/#page","headline":"Public LoRA adapters · Cloudflare Workers AI docs","description":"Cloudflare offers a few public LoRA adapters that are immediately ready for use.","url":"https://developers.cloudflare.com/workers-ai/features/fine-tunes/public-loras/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/fine-tunes/","name":"Fine-tunes"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/fine-tunes/public-loras/","name":"Public LoRA adapters"}}]}
```
