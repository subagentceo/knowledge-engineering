> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Quickstart

In this guide, you'll learn how to create your first conversational agent. This will serve as a foundation for building conversational workflows tailored to your business use cases.

Use the [ElevenLabs agents skill](https://github.com/elevenlabs/skills/tree/main/agents) to build and manage voice agents from your AI coding assistant:

```bash
npx skills add elevenlabs/skills --skill agents
```

## Getting started

ElevenLabs Agents are managed either through the [ElevenAgents dashboard](https://elevenlabs.io/app/agents), the [ElevenLabs API](/docs/api-reference/introduction) or the [Agents CLI](/docs/eleven-agents/operate/cli).

![ElevenLabs Agents](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/62ad20de44cee44a439b138d56764c801c4eb939cf3b0f167f594d5c6a6895fb/assets/images/conversational-ai/widget.png)

## Creating your first agent

In this quickstart guide we'll start by creating an agent via the API or the web dashboard. Next we'll test the agent, either by embedding it in your website or via the ElevenLabs dashboard.

In this guide, we'll create a conversational support assistant capable of answering questions about your product, documentation, or service. This assistant can be embedded into your website or app to provide real-time support to your customers.

![ElevenLabs Agents](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/62ad20de44cee44a439b138d56764c801c4eb939cf3b0f167f594d5c6a6895fb/assets/images/conversational-ai/widget.png)

Go to [elevenlabs.io](https://elevenlabs.io/app/sign-up) and sign in to or create your account.

In the **ElevenLabs Dashboard**, create a new assistant by entering a name and selecting the `Blank template` option.

![Dashboard](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/61b0e1df291ea587a8ff3e116579a47f66d48c74b24f44cfcd4804a568eb0a9d/assets/images/conversational-ai/assistant-create-flow.gif)

Go to the **Agent** tab to configure the assistant's behavior. Set the following:

This is the first message the assistant will speak out loud when a user starts a conversation.

```plaintext First message
Hi, this is Alexis from <company name> support. How can I help you today?
```

This prompt guides the assistant's behavior, tasks, and personality.

Customize the following example with your company details:

```plaintext System prompt
You are a friendly and efficient virtual assistant for [Your Company Name]. Your role is to assist customers by answering questions about the company's products, services, and documentation. You should use the provided knowledge base to offer accurate and helpful responses.

Tasks:
- Answer Questions: Provide clear and concise answers based on the available information.
- Clarify Unclear Requests: Politely ask for more details if the customer's question is not clear.

Guidelines:
- Maintain a friendly and professional tone throughout the conversation.
- Be patient and attentive to the customer's needs.
- If unsure about any information, politely ask the customer to repeat or clarify.
- Avoid discussing topics unrelated to the company's products or services.
- Aim to provide concise answers. Limit responses to a couple of sentences and let the user guide you on where to provide more detail.
```

Go to the **Knowledge Base** section to provide your assistant with context about your business.

This is where you can upload relevant documents & links to external resources:

* Include documentation, FAQs, and other resources to help the assistant respond to customer inquiries.
* Keep the knowledge base up-to-date to ensure the assistant provides accurate and current information.

Next we'll configure the voice for your assistant.

In the **Voice** tab, choose a voice that best matches your assistant from the [voice library](https://elevenlabs.io/voice-library):

![Voice settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/14aad328f468daafa9ec95d3b7a55489a8cb1a34869368020e05b207c9b0360a/assets/images/conversational-ai/voice-settings.jpg)

&#x20;Using higher quality voices, models, and LLMs may increase response time. For an optimal customer experience, balance quality and latency based on your assistant's expected use case.

Press the **Test AI agent** button and try conversing with your assistant.

Configure evaluation criteria and data collection to analyze conversations and improve your assistant's performance.

Navigate to the **Analysis** tab in your assistant's settings to define custom criteria for evaluating conversations.

![Analysis settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/fee8bc444d5436c71eae3829b9ec8d5cdb6a57c4d4efe6483d7bfed2b066e438/assets/images/conversational-ai/analysis-settings.png)

Every conversation transcript is passed to the LLM to verify if specific goals were met. Results will either be `success`, `failure`, or `unknown`, along with a rationale explaining the chosen result.

Let's add an evaluation criteria with the name `solved_user_inquiry`:

```plaintext Prompt
The assistant was able to answer all of the queries or redirect them to a relevant support channel.

Success Criteria:
- All user queries were answered satisfactorily.
- The user was redirected to a relevant support channel if needed.
```

In the **Data Collection** section, configure details to be extracted from each conversation.

Click **Add item** and configure the following:

1. **Data type:** Select "string"
2. **Identifier:** Enter a unique identifier for this data point: `user_question`
3. **Description:** Provide detailed instructions for the LLM about how to extract the specific data from the transcript:

```plaintext Prompt
Extract the user's questions & inquiries from the conversation.
```

Test your assistant by posing as a customer. Ask questions, evaluate its responses, and tweak the prompts until you're happy with how it performs.

View evaluation results and collected data for each conversation in the **Call history** tab.

![Conversation history](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/fd517a080ba2c0d678c1ce34ea79afbd0dad764a19da43ca045a1c29b693ee48/assets/images/conversational-ai/transcript.jpg)

Regularly review conversation history to identify common issues and patterns.

The newly created agent can be tested in a variety of ways, but the quickest way is to use the [ElevenLabs dashboard](https://elevenlabs.io/app/agents).

The web dashboard uses our [React SDK](/docs/eleven-agents/libraries/react) under the hood to handle real-time conversations.

If instead you want to quickly test the agent in your own website, you can use the Agent widget. Simply paste the following HTML snippet into your website, taking care to replace `agent-id` with the ID of your agent.

```html
<elevenlabs-convai agent-id="agent-id"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
```

```bash
npm install -g @elevenlabs/cli
```

```bash
elevenlabs agents init
```

This creates the project structure with configuration directories and registry files.

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you'll use to securely [use the CLI](/docs/api-reference/authentication).

Then run the following command to authenticate with ElevenLabs:

```bash
elevenlabs auth login
```

Enter your ElevenLabs API key when prompted. The CLI will verify the key and store it securely.

Create your first agent using the assistant template:

```bash
elevenlabs agents add "My Assistant" --template assistant
```

```bash
elevenlabs agents push --agent "My Assistant"
```

This uploads your local agent configuration to the ElevenLabs platform.

The newly created agent can be tested in a variety of ways, but the quickest way is to use the [ElevenLabs dashboard](https://elevenlabs.io/app/agents). From the dashboard, select your agent and click the **Test AI agent** button.

The web dashboard uses our [React SDK](/docs/eleven-agents/libraries/react) under the hood to handle real-time conversations.

If instead you want to quickly test the agent in your own website, you can use the Agent widget. Use the CLI to generate the HTML snippet:

```bash
elevenlabs agents widget "My Assistant"
```

This will output the HTML snippet you can then paste directly into your website.

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you’ll use to securely [access the API](/docs/api-reference/authentication).

Store the key as a managed secret and pass it to the SDKs either as a environment variable via an `.env` file, or directly in your app’s configuration depending on your preference.

```js title=".env"
ELEVENLABS_API_KEY=<your_api_key_here>
```

We'll also use the `dotenv` library to load our API key from an environment variable.

```python
pip install elevenlabs
pip install python-dotenv
```

```typescript
npm install @elevenlabs/elevenlabs-js
npm install dotenv
```

Create a new file named `create_agent.py` or `createAgent.mts`, depending on your language of choice and add the following code:

```python maxLines=0
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
import os
load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

prompt = """
You are a friendly and efficient virtual assistant for [Your Company Name].
Your role is to assist customers by answering questions about the company's products, services,
and documentation. You should use the provided knowledge base to offer accurate and helpful responses.

Tasks:
- Answer Questions: Provide clear and concise answers based on the available information.
- Clarify Unclear Requests: Politely ask for more details if the customer's question is not clear.

Guidelines:
- Maintain a friendly and professional tone throughout the conversation.
- Be patient and attentive to the customer's needs.
- If unsure about any information, politely ask the customer to repeat or clarify.
- Avoid discussing topics unrelated to the company's products or services.
- Aim to provide concise answers. Limit responses to a couple of sentences and let the user guide you on where to provide more detail.
"""

response = elevenlabs.conversational_ai.agents.create(
    name="My voice agent",
    tags=["test"], # List of tags to help classify and filter the agent
    conversation_config={
        "tts": {
            "voice_id": "aMSt68OGf4xUZAnLpTU8",
            "model_id": "eleven_flash_v2"
        },
        "agent": {
            "first_message": "Hi, this is Rachel from [Your Company Name] support. How can I help you today?",
            "prompt": {
                "prompt": prompt,
            }
        }
    }
)

print("Agent created with ID:", response.agent_id)
```

```typescript maxLines=0
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const prompt = `
    You are a friendly and efficient virtual assistant for [Your Company Name].
    Your role is to assist customers by answering questions about the company's products, services,
    and documentation. You should use the provided knowledge base to offer accurate and helpful responses.

    Tasks:
    - Answer Questions: Provide clear and concise answers based on the available information.
    - Clarify Unclear Requests: Politely ask for more details if the customer's question is not clear.

    Guidelines:
    - Maintain a friendly and professional tone throughout the conversation.
    - Be patient and attentive to the customer's needs.
    - If unsure about any information, politely ask the customer to repeat or clarify.
    - Avoid discussing topics unrelated to the company's products or services.
    - Aim to provide concise answers. Limit responses to a couple of sentences and let the user guide you on where to provide more detail.
`;

const agent = await elevenlabs.conversationalAi.agents.create({
    name: "My voice agent",
    tags: ["test"], // List of tags to help classify and filter the agent
    conversationConfig: {
        tts: {
            voiceId: "aMSt68OGf4xUZAnLpTU8",
            modelId: "eleven_flash_v2",
        },
        agent: {
            firstMessage: "Hi, this is Rachel from [Your Company Name] support. How can I help you today?",
            prompt: {
                prompt,
            }
        },
    },
});

console.log(`Agent created with ID: ${agent.agentId}`);
```

The agent created above will have a `"test"` tag, this is useful to help classify and filter the agent. For example distinguishing between test agents and production agents.

```python
python create_agent.py
```

```typescript
npx tsx createAgent.mts
```

The above will generate an agent with some baseline settings and print the ID of the agent to the console. We'll customize the agent in a subsequent step.

The newly created agent can be tested in a variety of ways, but the quickest way is to use the [ElevenLabs dashboard](https://elevenlabs.io/app/agents). From the dashboard, select your agent and click the **Test AI agent** button.

The web dashboard uses our [React SDK](/docs/eleven-agents/libraries/react) under the hood to handle real-time conversations.

If instead you want to quickly test the agent in your own website, you can use the Agent widget. Simply paste the following HTML snippet into your website, taking care to replace `agent-id` with the ID of your agent.

```html
<elevenlabs-convai agent-id="agent-id"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
```

View the SDKs tab to learn how to embed the agent in your website or app using the provided SDKs.

## Next steps

As a follow up to this quickstart guide, you can make your agent more effective by integrating:

* [Knowledge bases](/docs/eleven-agents/customization/knowledge-base) to equip it with domain-specific information.
* [Tools](/docs/eleven-agents/customization/tools) to allow it to perform tasks on your behalf.
* [Authentication](/docs/eleven-agents/customization/authentication) to restrict access to certain conversations.
* [Success evaluation](/docs/eleven-agents/customization/agent-analysis/success-evaluation) to analyze conversations and improve its performance.
* [Data collection](/docs/eleven-agents/customization/agent-analysis/data-collection) to collect data about conversations and improve its performance.
* [Conversation retention](/docs/eleven-agents/customization/privacy/retention) to view conversation history and improve its performance.