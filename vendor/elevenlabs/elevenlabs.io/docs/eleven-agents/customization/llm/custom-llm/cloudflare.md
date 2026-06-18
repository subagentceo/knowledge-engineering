> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Cloudflare Workers AI

## Overview

[Cloudflare's Workers AI platform](https://developers.cloudflare.com/workers-ai/) lets you run machine learning models, powered by serverless GPUs, on Cloudflare's global network, even on the free plan!

Workers AI comes with a curated set of [popular open-source models](https://developers.cloudflare.com/workers-ai/models/) that enable you to do tasks such as image classification, text generation, object detection and more.

## Choosing a model

To make use of the full power of ElevenLabs Agents you need to use a model that supports [function calling](https://developers.cloudflare.com/workers-ai/function-calling/#what-models-support-function-calling).

When browsing the [model catalog](https://developers.cloudflare.com/workers-ai/models/), look for models with the function calling property beside it.

Cloudflare Workers AI provides access to
[DeepSeek-R1-Distill-Qwen-32B](https://developers.cloudflare.com/workers-ai/models/deepseek-r1-distill-qwen-32b/),
a model distilled from DeepSeek-R1 based on Qwen2.5. It outperforms OpenAI-o1-mini across various
benchmarks, achieving new state-of-the-art results for dense models.

## Set up DeepSeek R1 on Cloudflare Workers AI

Navigate to [dash.cloudflare.com](https://dash.cloudflare.com) and create or sign in to your account. In the navigation, select AI > Workers AI, and then click on the "Use REST API" widget.

![Add Secret](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/ba8414d3dc5f806d004f8b4ac0c7dc0d77a0b292a9dbd86dfb8b2d6736a40118/assets/images/conversational-ai/cloudflare-workers-ai/cloudflare-workers-ai-api-key.png)

Once you have your API key, you can try it out immediately with a curl request. Cloudflare provides an OpenAI-compatible API endpoint making this very convenient. At this point make a note of the model and the full endpoint — including the account ID. For example: `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}c/ai/v1/`.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1/chat/completions \
-X POST \
-H "Authorization: Bearer {API_TOKEN}" \
-d '{
    "model": "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "How many Rs in the word Strawberry?"}
    ],
    "stream": false
  }'
```

Navigate to your [AI Agent](https://elevenlabs.io/app/agents), scroll down to the "Secrets" section and select "Add Secret". After adding the secret, make sure to hit "Save" to make the secret available to your agent.

![Add Secret](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/59dbfcd46a69b9f28e58e68de7b3dd678ee9f6bfd499fd23699017e92b11931f/assets/images/conversational-ai/cloudflare-workers-ai/cloudflare-workers-ai-secret.png)

Choose "Custom LLM" from the dropdown menu.

![Choose custom llm](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/45ec75f558a5c8e5070bd3170d96cbc54ef63e15d9f04ac472a45854a22a17ac/assets/images/conversational-ai/byollm-2.png)

For the Server URL, specify Cloudflare's OpenAI-compatible API endpoint: `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1/`. For the Model ID, specify `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` as discussed above, and select your API key from the dropdown menu.

![Enter url](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/da17a1626b64d7b3eadb23ee17eb0e7bd3bb5156f8edf2357816820169d74d94/assets/images/conversational-ai/cloudflare-workers-ai/cloudflare-workers-ai-llm.png)

Now you can go ahead and click "Test AI Agent" to chat with your custom DeepSeek R1 model.