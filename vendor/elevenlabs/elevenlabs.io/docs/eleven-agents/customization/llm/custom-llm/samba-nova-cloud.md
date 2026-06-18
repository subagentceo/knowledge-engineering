> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# SambaNova Cloud

## Overview

[SambaNova Cloud](http://cloud.sambanova.ai?utm_source=elevenlabs\&utm_medium=external\&utm_campaign=cloud_signup) is the fastest provider of the best [open source models](https://docs.sambanova.ai/cloud/docs/get-started/supported-models), including DeepSeek R1, DeepSeek V3, Llama 4 Maverick and others. Through an
OpenAI-compatible API endpoint, you can set up your ElevenLabs agent on ElevenLabs in a just few minutes.

Watch this [video](https://www.youtube.com/watch?v=46W96JcE_p8) for a walkthrough and demo of how you can configure your ElevenLabs Agents agent to leverage SambaNova's blazing-fast LLMs!

## Choosing a model

To make use of the full power of ElevenLabs Agents you need to use a model that supports tool use and structured outputs. SambaNova recommends the following models for their accuracy and performance:

* `DeepSeek-V3-0324` (671B model)
* `Meta-Llama-3.3-70B-Instruct`
* `Llama-4-Maverick-17B-128E-Instruct`
* `Qwen3-32B`

For up-to-date information on model-specific context windows, please refer to [this](https://docs.sambanova.ai/cloud/docs/get-started/supported-models) page.

Note that `Meta-Llama-3.3-70B-Instruct` is SambaNova's most battle-tested model. If any model is causing issues, you may report it on SambaNova's [Community page](https://community.sambanova.ai).

## Configuring your ElevenLabs agent with a SambaNova LLM

Navigate to [cloud.sambanova.ai/apis](https://cloud.sambanova.ai/apis?utm_source=elevenlabs\&utm_medium=external\&utm_campaign=cloud_signup) and create a new API key.

![Add Secret](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9f15e96bc7394d1be5936a155aeaf3c450c48b1164623c0ca3a05f723aec81cd/assets/images/conversational-ai/sambanova-cloud/sn-api-key.png)

Once you have your API key, you can test it by running the following curl command:

```bash
curl -H "Authorization: Bearer <your-api-key>" \
 -H "Content-Type: application/json" \
 -d '{
"stream": true,
"model": "DeepSeek-V3-0324",
"messages": [
	{
		"role": "system",
		"content": "You are a helpful assistant"
	},
	{
		"role": "user",
		"content": "Hello"
	}
]
}' \
 -X POST https://api.sambanova.ai/v1/chat/completions
```

Create a new [AI Agent](https://elevenlabs.io/app/agents/agents) or edit an existing one.

Scroll down to the "Workspace Secrets" section and select "Add Secret". Name the key `SAMBANOVA_API_KEY` and copy the value from the SambaNova Cloud dashboard. Be sure to hit "Save" to make the secret available to your agent.

![Add Secret](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/8505deccfb198fbf8d33e3b936f65bf85caf59811bffbb708a5d526faa3329bc/assets/images/conversational-ai/sambanova-cloud/workspace-secret.png)

Choose "Custom LLM" from the dropdown menu.

![Choose custom llm](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/45ec75f558a5c8e5070bd3170d96cbc54ef63e15d9f04ac472a45854a22a17ac/assets/images/conversational-ai/byollm-2.png)

For the Server URL, specify SambaNova's OpenAI-compatible API endpoint: `https://api.sambanova.ai/v1`. For the Model ID, specify one the model names indicated above (e.g., `Meta-Llama-3.3-70B-Instruct`) and select the `SAMBANOVA_API_KEY` API key from the dropdown menu.

![Enter url](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/d1e6fec480a23a0c3b11ca3b675dfddeaffe59f7a24becfaf1986675b109b99b/assets/images/conversational-ai/sambanova-cloud/sn-llm.png)

Set the max tokens to 1024 to restrict the agent's output for brevity. Also be sure to include an instruction in the System Prompt for the model to respond in 500 words or less.

![Enter url](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/2be33272ea2e7aaf6166d482a41bdf492f3a75f1e43e2e8cb9cf363fb3b6188f/assets/images/conversational-ai/sambanova-cloud/sn-maxtokens.png)

Save your changes and click on "Test AI Agent" to chat with your SambaNova-powered agent!