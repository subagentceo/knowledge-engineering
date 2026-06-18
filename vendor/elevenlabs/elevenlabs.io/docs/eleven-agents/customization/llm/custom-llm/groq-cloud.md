> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Groq Cloud

## Overview

[Groq Cloud](https://console.groq.com/) provides easy access to fast AI inference, giving you OpenAI-compatible API endpoints in a matter of clicks.

Use leading [Openly-available Models](https://console.groq.com/docs/overview/models) like Llama, Mixtral, and Gemma as the brain for your ElevenLabs agents in a few easy steps.

## Choosing a model

To make use of the full power of ElevenLabs agents you need to use a model that supports tool use and structured outputs. Groq recommends the following Llama-3.3 models their versatility and performance:

* meta-llama/llama-4-scout-17b-16e-instruct (10M token context window) and support for 12 languages (Arabic, English, French, German, Hindi, Indonesian, Italian, Portuguese, Spanish, Tagalog, Thai, and Vietnamese)
* llama-3.3-70b-versatile (128k context window | 32,768 max output tokens)
* llama-3.1-8b-instant (128k context window | 8,192 max output tokens)

With this in mind, it's recommended to use `meta-llama/llama-4-scout-17b-16e-instruct` for your ElevenLabs Agents agent.

## Set up Llama 3.3 on Groq Cloud

Navigate to [console.groq.com/keys](https://console.groq.com/keys) and create a new API key.

![Add Secret](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/2dc1bdac30871fb4059a394b8edfedd4cf953f8e1f787ca8b807a9f195e7fdf3/assets/images/conversational-ai/groq-cloud/groq-api-key.png)

Once you have your API key, you can test it by running the following curl command:

```bash
curl https://api.groq.com/openai/v1/chat/completions -s \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $GROQ_API_KEY" \
-d '{
"model": "llama-3.3-70b-versatile",
"messages": [{
    "role": "user",
    "content": "Hello, how are you?"
}]
}'
```

Navigate to your [AI Agent](https://elevenlabs.io/app/agents), scroll down to the "Secrets" section and select "Add Secret". After adding the secret, make sure to hit "Save" to make the secret available to your agent.

![Add Secret](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/464e123d926fbd9e6986a382af8da55d9f3861d1e593bb1f4b41ba33bed67ae1/assets/images/conversational-ai/groq-cloud/groq-secret.png)

Choose "Custom LLM" from the dropdown menu.

![Choose custom llm](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/45ec75f558a5c8e5070bd3170d96cbc54ef63e15d9f04ac472a45854a22a17ac/assets/images/conversational-ai/byollm-2.png)

For the Server URL, specify Groq's OpenAI-compatible API endpoint: `https://api.groq.com/openai/v1`. For the Model ID, specify `meta-llama/llama-4-scout-17b-16e-instruct` as discussed above, and select your API key from the dropdown menu.

![Enter url](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/70555982e71101023f8e988102ab505c964fd6796a190a9bce74f3c0ed1b56be/assets/images/conversational-ai/groq-cloud/groq-llm.png)

Now you can go ahead and click "Test AI Agent" to chat with your custom Llama 3.3 model.