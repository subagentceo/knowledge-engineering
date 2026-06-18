---
title: Unified API (OpenAI compat)
description: Send requests to multiple AI providers through a single OpenAI-compatible endpoint on AI Gateway.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Unified API (OpenAI compat)

Deprecated

This endpoint is deprecated. Use the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) instead, which provides OpenAI-compatible endpoints at `api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1/chat/completions`. The `/compat/chat/completions` endpoint will continue to work for existing integrations.

Cloudflare's AI Gateway offers an OpenAI-compatible `/chat/completions` endpoint, enabling integration with multiple AI providers using a single URL. This feature simplifies the integration process, allowing for seamless switching between different models without significant code modifications.

## Endpoint URL

```

https://gateway.ai.cloudflare.com/v1/{account_id}/default/compat/chat/completions


```

Replace `{account_id}` with your Cloudflare account ID. The `default` gateway is created automatically on your first request — no setup needed. You can also replace `default` with a specific gateway ID if you have already created one.

## Parameters

Switch providers by changing the `model` and `apiKey` parameters.

Specify the model using `{provider}/{model}` format. For example:

* `openai/gpt-5-mini`
* `google-ai-studio/gemini-2.5-flash`
* `anthropic/claude-sonnet-4-5`

## Examples

Make a request to 

![]() OpenAI

using 

OpenAI JS SDK

with 

Stored Key (BYOK)

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "openai/gpt-5.2",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "anthropic/claude-4-5-sonnet",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "google/gemini-2.5-pro",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "grok/grok-4",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "dynamic/customer-support",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{openai_api_token}",

  defaultHeaders: {

      // if gateway is authenticated

      "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "openai/gpt-5.2",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{anthropic_api_token}",

  defaultHeaders: {

      // if gateway is authenticated

      "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "anthropic/claude-4-5-sonnet",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{google_api_token}",

  defaultHeaders: {

      // if gateway is authenticated

      "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "google/gemini-2.5-pro",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{grok_api_token}",

  defaultHeaders: {

      // if gateway is authenticated

      "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "grok/grok-4",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{dynamic_api_token}",

  defaultHeaders: {

      // if gateway is authenticated

      "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "dynamic/customer-support",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{workers-ai_api_token}",

  defaultHeaders: {

      // if gateway is authenticated

      "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",

});


const response = await client.chat.completions.create({

  model: "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('openai/gpt-5.2')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('anthropic/claude-4-5-sonnet')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('google/gemini-2.5-pro')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('grok/grok-4')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('dynamic/customer-support')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('openai/gpt-5.2')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('anthropic/claude-4-5-sonnet')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('google/gemini-2.5-pro')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('grok/grok-4')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('dynamic/customer-support')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createOpenAI } from 'ai-gateway-provider/providers/openai';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const openai = createOpenAI();


const { text } = await generateText({

  model: aigateway(openai.chat('gpt-5.2')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createAnthropic } from 'ai-gateway-provider/providers/anthropic';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const anthropic = createAnthropic();


const { text } = await generateText({

  model: aigateway(anthropic('claude-4-5-sonnet')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createGoogle } from 'ai-gateway-provider/providers/google';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const google = createGoogle();


const { text } = await generateText({

  model: aigateway(google('gemini-2.5-pro')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createXai } from 'ai-gateway-provider/providers/xai';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const xai = createXai();


const { text } = await generateText({

  model: aigateway(xai('grok-4')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('customer-support')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified();


const { text } = await generateText({

  model: aigateway(unified('@cf/meta/llama-3.3-70b-instruct-fp8-fast')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createOpenAI } from 'ai-gateway-provider/providers/openai';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const openai = createOpenAI({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(openai.chat('gpt-5.2')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createAnthropic } from 'ai-gateway-provider/providers/anthropic';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const anthropic = createAnthropic({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(anthropic('claude-4-5-sonnet')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createGoogle } from 'ai-gateway-provider/providers/google';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const google = createGoogle({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(google('gemini-2.5-pro')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createXai } from 'ai-gateway-provider/providers/xai';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const xai = createXai({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(xai('grok-4')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('customer-support')),

  prompt: 'What is Cloudflare?',

});


```

```

import { createAiGateway } from 'ai-gateway-provider';

import { createUnified } from 'ai-gateway-provider/providers/unified';

import { generateText } from "ai";


const aigateway = createAiGateway({

  accountId: "{CLOUDFLARE_ACCOUNT_ID}",

  gateway: '{GATEWAY_NAME}',

  apiKey: '{CF_AIG_TOKEN}',

});


const unified = createUnified({ apiKey: '{API_KEY}' });


const { text } = await generateText({

  model: aigateway(unified('@cf/meta/llama-3.3-70b-instruct-fp8-fast')),

  prompt: 'What is Cloudflare?',

});


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "openai/gpt-5.2",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "anthropic/claude-4-5-sonnet",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "google/gemini-2.5-pro",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "grok/grok-4",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "dynamic/customer-support",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Authorization: Bearer {openai_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "openai/gpt-5.2",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Authorization: Bearer {anthropic_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "anthropic/claude-4-5-sonnet",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Authorization: Bearer {google_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "google/gemini-2.5-pro",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Authorization: Bearer {grok_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "grok/grok-4",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Authorization: Bearer {dynamic_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "dynamic/customer-support",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Authorization: Bearer {workers-ai_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

## Supported Providers

The OpenAI-compatible endpoint supports models from the following providers:

* [Anthropic](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/)
* [OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/)
* [Groq](https://developers.cloudflare.com/ai-gateway/usage/providers/groq/)
* [Mistral](https://developers.cloudflare.com/ai-gateway/usage/providers/mistral/)
* [Cohere](https://developers.cloudflare.com/ai-gateway/usage/providers/cohere/)
* [Perplexity](https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/)
* [Workers AI](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/)
* [Google-AI-Studio](https://developers.cloudflare.com/ai-gateway/usage/providers/google-ai-studio/)
* [Google Vertex AI](https://developers.cloudflare.com/ai-gateway/usage/providers/vertex/)
* [xAI](https://developers.cloudflare.com/ai-gateway/usage/providers/grok/)
* [DeepSeek](https://developers.cloudflare.com/ai-gateway/usage/providers/deepseek/)
* [Cerebras](https://developers.cloudflare.com/ai-gateway/usage/providers/cerebras/)
* [Baseten](https://developers.cloudflare.com/ai-gateway/usage/providers/baseten/)
* [Parallel](https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/chat-completion/#page","headline":"Unified API (OpenAI compat) · Cloudflare AI Gateway docs","description":"Send requests to multiple AI providers through a single OpenAI-compatible endpoint on AI Gateway.","url":"https://developers.cloudflare.com/ai-gateway/usage/chat-completion/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/chat-completion/","name":"Unified API (OpenAI compat)"}}]}
```
