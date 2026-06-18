---
title: Using LoRA adapters
description: Upload and use LoRA adapters to get fine-tuned inference on Workers AI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using LoRA adapters

Workers AI supports fine-tuned inference with adapters trained with [Low-Rank Adaptation ↗](https://blog.cloudflare.com/fine-tuned-inference-with-loras). This feature is in open beta and free during this period.

## Limitations

* We only support LoRAs for a [variety of models](https://developers.cloudflare.com/workers-ai/models/?capabilities=LoRA) (must not be quantized)
* Adapter must be trained with rank `r <=8` as well as larger ranks if up to 32\. You can check the rank of a pre-trained LoRA adapter through the adapter's `config.json` file
* LoRA adapter file must be < 300MB
* LoRA adapter files must be named `adapter_config.json` and `adapter_model.safetensors` exactly
* You can test up to 100 LoRA adapters per account

---

## Choosing compatible LoRA adapters

### Finding open-source LoRA adapters

We have started a [Hugging Face Collection ↗](https://huggingface.co/collections/Cloudflare/workers-ai-compatible-loras-6608dd9f8d305a46e355746e) that lists a few LoRA adapters that are compatible with Workers AI. Generally, any LoRA adapter that fits our limitations above should work.

### Training your own LoRA adapters

To train your own LoRA adapter, follow the [tutorial](https://developers.cloudflare.com/workers-ai/guides/tutorials/fine-tune-models-with-autotrain/).

---

## Uploading LoRA adapters

In order to run inference with LoRAs on Workers AI, you'll need to create a new fine tune on your account and upload your adapter files. You should have a `adapter_model.safetensors` file with model weights and `adapter_config.json` with your config information. _Note that we only accept adapter files in these types._

Right now, you can't edit a fine tune's asset files after you upload it. We will support this soon, but for now you will need to create a new fine tune and upload files again if you would like to use a new LoRA.

Before you upload your LoRA adapter, you'll need to edit your `adapter_config.json` file to include `model_type` as one of `mistral`, `gemma` or `llama` like below.

```

{

  "alpha_pattern": {},

  "auto_mapping": null,

  ...

  "target_modules": [

    "q_proj",

    "v_proj"

  ],

  "task_type": "CAUSAL_LM",

  "model_type": "mistral",

}


```

### Wrangler

You can create a finetune and upload your LoRA adapter via wrangler with the following commands:

wrangler CLI

```

npx wrangler ai finetune create <model_name> <finetune_name> <folder_path>

#🌀 Creating new finetune "test-lora" for model "@cf/mistral/mistral-7b-instruct-v0.2-lora"...

#🌀 Uploading file "/Users/abcd/Downloads/adapter_config.json" to "test-lora"...

#🌀 Uploading file "/Users/abcd/Downloads/adapter_model.safetensors" to "test-lora"...

#✅ Assets uploaded, finetune "test-lora" is ready to use.


npx wrangler ai finetune list

┌──────────────────────────────────────┬─────────────────┬─────────────┐

│ finetune_id                          │ name            │ description │

├──────────────────────────────────────┼─────────────────┼─────────────┤

│ 00000000-0000-0000-0000-000000000000 │ test-lora       │             │

└──────────────────────────────────────┴─────────────────┴─────────────┘


```

### REST API

Alternatively, you can use our REST API to create a finetune and upload your adapter files. You will need a Cloudflare API Token with `Workers AI: Edit` permissions to make calls to our REST API, which you can generate via the Cloudflare Dashboard.

#### Creating a fine-tune on your account

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers AI Write`

Create a new Finetune

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "model": "SUPPORTED_MODEL_NAME",

    "name": "FINETUNE_NAME",

    "description": "OPTIONAL_DESCRIPTION"

  }'


```

#### Uploading your adapter weights and config

You have to call the upload endpoint each time you want to upload a new file, so you usually run this once for `adapter_model.safetensors` and once for `adapter_config.json`. Make sure you include the `@` before your path to files.

You can either use the finetune `name` or `id` that you used when you created the fine tune.

cURL

```

## Input: finetune_id, adapter_model.safetensors, then adapter_config.json

## Output: success true/false


curl -X POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/{FINETUNE_ID}/finetune-assets/ \

    -H 'Authorization: Bearer {API_TOKEN}' \

    -H 'Content-Type: multipart/form-data' \

    -F 'file_name=adapter_model.safetensors' \

    -F 'file=@{PATH/TO/adapter_model.safetensors}'


```

#### List fine-tunes in your account

You can call this method to confirm what fine-tunes you have created in your account

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers AI Write`
* `Workers AI Read`

List Finetunes

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "success": true,

  "result": [

    [

      {

        "id": "00000000-0000-0000-0000-000000000",

        "model": "@cf/meta-llama/llama-2-7b-chat-hf-lora",

        "name": "llama2-finetune",

        "description": "test"

      },

      {

        "id": "00000000-0000-0000-0000-000000000",

        "model": "@cf/mistralai/mistral-7b-instruct-v0.2-lora",

        "name": "mistral-finetune",

        "description": "test"

      }

    ]

  ]

}


```

---

## Running inference with LoRAs

To make inference requests and apply the LoRA adapter, you will need your model and finetune `name` or `id`. You should use the chat template that your LoRA was trained on, but you can try running it with `raw: true` and the messages template like below.

* [ workers ai sdk ](#tab-panel-11295)
* [ rest api ](#tab-panel-11296)

JavaScript

```

const response = await env.AI.run(

  "@cf/mistralai/mistral-7b-instruct-v0.2-lora", //the model supporting LoRAs

  {

    messages: [{ role: "user", content: "Hello world" }],

    raw: true, //skip applying the default chat template

    lora: "00000000-0000-0000-0000-000000000", //the finetune id OR name

  },

);


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora \

  -H 'Authorization: Bearer {API_TOKEN}' \

  -d '{

    "messages": [{"role": "user", "content": "Hello world"}],

    "raw": "true",

    "lora": "00000000-0000-0000-0000-000000000"

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/fine-tunes/loras/#page","headline":"Fine-tuned inference with LoRA adapters · Cloudflare Workers AI docs","description":"Upload and use LoRA adapters to get fine-tuned inference on Workers AI.","url":"https://developers.cloudflare.com/workers-ai/features/fine-tunes/loras/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/fine-tunes/","name":"Fine-tunes"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/fine-tunes/loras/","name":"Using LoRA adapters"}}]}
```
