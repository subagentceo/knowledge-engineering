> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Language detection

## Overview

The `language detection` system tool allows your ElevenLabs agent to switch its output language to any the agent supports.
This system tool is not enabled automatically. Its description can be customized to accommodate your specific use case.

Where possible, we recommend enabling all languages for an agent and enabling the language
detection system tool.

Our language detection tool triggers language switching in two cases, both based on the received audio's detected language and content:

* `detection` if a user speaks a different language than the current output language, a switch will be triggered
* `content` if the user asks in the current language to change to a new language, a switch will be triggered

**Purpose**: Automatically switch to the user's detected language during conversations.

**Trigger conditions**: The LLM should call this tool when:

* User speaks in a different language than the current conversation language
* User explicitly requests to switch languages
* Multi-language support is needed for the conversation

**Parameters**:

* `reason` (string, required): The reason for the language switch
* `language` (string, required): The language code to switch to (must be in supported languages list)

**Function call format**:

```json
{
  "type": "function",
  "function": {
    "name": "language_detection",
    "arguments": "{\"reason\": \"User requested Spanish\", \"language\": \"es\"}"
  }
}
```

**Implementation**: Configure supported languages in agent settings and add the language detection system tool. The agent will automatically switch voice and responses to match detected languages.

## Enabling language detection

The languages that the agent can switch to must be defined in the `Agent` settings tab.

![Agent languages](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/633707d54276febd3baa054c4f41b186225b74f606307a46e8262607befc8381/assets/images/conversational-ai/agent-languages.png)

Enable language detection by selecting the pre-configured system tool to your agent's tools in the `Agent` tab.
This is automatically available as an option when selecting `add tool`.

![System tool](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/3d17048ab2bc1a0547c49056abb98f624caf866927ff1714af27f898b06ab18f/assets/images/conversational-ai/language-detection-preconfig.png)

Add a description that specifies when to call the tool

![Description](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/3bebc9fe07dba7121bce7793f3793858c710fc8ea1c221347604eb05929271df/assets/images/conversational-ai/language_detection.png)

### API Implementation

When creating an agent via API, you can add the `language detection` tool to your agent configuration. It should be defined as a system tool:

```python
from elevenlabs import (
    ConversationalConfig,
    ElevenLabs,
    AgentConfig,
    PromptAgent,
    PromptAgentInputToolsItem_System,
    LanguagePresetInput,
    ConversationConfigClientOverrideInput,
    AgentConfigOverride,
)

# Initialize the client
elevenlabs = ElevenLabs(api_key="YOUR_API_KEY")

# Create the language detection tool
language_detection_tool = PromptAgentInputToolsItem_System(
    name="language_detection",
    description=""  # Optional: Customize when the tool should be triggered
)

# Create language presets
language_presets = {
    "nl": LanguagePresetInput(
        overrides=ConversationConfigClientOverrideInput(
            agent=AgentConfigOverride(
                prompt=None,
                first_message="Hoi, hoe gaat het met je?",
                language=None
            ),
            tts=None
        ),
        first_message_translation=None
    ),
    "fi": LanguagePresetInput(
        overrides=ConversationConfigClientOverrideInput(
            agent=AgentConfigOverride(
                first_message="Hei, kuinka voit?",
            ),
            tts=None
        ),
    ),
    "tr": LanguagePresetInput(
        overrides=ConversationConfigClientOverrideInput(
            agent=AgentConfigOverride(
                prompt=None,
                first_message="Merhaba, nasılsın?",
                language=None
            ),
            tts=None
        ),
    ),
    "ru": LanguagePresetInput(
        overrides=ConversationConfigClientOverrideInput(
            agent=AgentConfigOverride(
                prompt=None,
                first_message="Привет, как ты?",
                language=None
            ),
            tts=None
        ),
    ),
    "pt": LanguagePresetInput(
        overrides=ConversationConfigClientOverrideInput(
            agent=AgentConfigOverride(
                prompt=None,
                first_message="Oi, como você está?",
                language=None
            ),
            tts=None
        ),
    )
}

# Create the agent configuration
conversation_config = ConversationalConfig(
    agent=AgentConfig(
        prompt=PromptAgent(
            tools=[language_detection_tool],
            first_message="Hi how are you?"
        )
    ),
    language_presets=language_presets
)

# Create the agent
response = elevenlabs.conversational_ai.agents.create(
    conversation_config=conversation_config
)
```

```javascript
import { ElevenLabs } from "@elevenlabs/elevenlabs-js";

// Initialize the client
const elevenlabs = new ElevenLabs({
  apiKey: "YOUR_API_KEY",
});

// Create the agent with language detection tool
await elevenlabs.conversationalAi.agents.create({
  conversationConfig: {
    agent: {
      prompt: {
        tools: [
          {
            type: "system",
            name: "language_detection",
            description: "", // Optional: Customize when the tool should be triggered
          },
        ],
        firstMessage: "Hi, how are you?",
      },
    },
    languagePresets: {
      nl: {
        overrides: {
          agent: {
            prompt: null,
            firstMessage: "Hoi, hoe gaat het met je?",
            language: null,
          },
          tts: null,
        },
      },
      fi: {
        overrides: {
          agent: {
            prompt: null,
            firstMessage: "Hei, kuinka voit?",
            language: null,
          },
          tts: null,
        },
        firstMessageTranslation: {
          sourceHash: '{"firstMessage":"Hi how are you?","language":"en"}',
          text: "Hei, kuinka voit?",
        },
      },
      tr: {
        overrides: {
          agent: {
            prompt: null,
            firstMessage: "Merhaba, nasılsın?",
            language: null,
          },
          tts: null,
        },
      },
      ru: {
        overrides: {
          agent: {
            prompt: null,
            firstMessage: "Привет, как ты?",
            language: null,
          },
          tts: null,
        },
      },
      pt: {
        overrides: {
          agent: {
            prompt: null,
            firstMessage: "Oi, como você está?",
            language: null,
          },
          tts: null,
        },
      },
      ar: {
        overrides: {
          agent: {
            prompt: null,
            firstMessage: "مرحبًا كيف حالك؟",
            language: null,
          },
          tts: null,
        },
      },
    },
  },
});
```

```bash
curl -X POST https://api.elevenlabs.io/v1/convai/agents/create \
     -H "xi-api-key: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
  "conversation_config": {
    "agent": {
      "prompt": {
        "first_message": "Hi how are you?",
        "tools": [
          {
            "type": "system",
            "name": "language_detection",
            "description": ""
          }
        ]
      }
    },
    "language_presets": {
      "nl": {
        "overrides": {
          "agent": {
            "prompt": null,
            "first_message": "Hoi, hoe gaat het met je?",
            "language": null
          },
          "tts": null
        }
      },
      "fi": {
        "overrides": {
          "agent": {
            "prompt": null,
            "first_message": "Hei, kuinka voit?",
            "language": null
          },
          "tts": null
        }
      },
      "tr": {
        "overrides": {
          "agent": {
            "prompt": null,
            "first_message": "Merhaba, nasılsın?",
            "language": null
          },
          "tts": null
        }
      },
      "ru": {
        "overrides": {
          "agent": {
            "prompt": null,
            "first_message": "Привет, как ты?",
            "language": null
          },
          "tts": null
        }
      },
      "pt": {
        "overrides": {
          "agent": {
            "prompt": null,
            "first_message": "Oi, como você está?",
            "language": null
          },
          "tts": null
        }
      },
      "ar": {
        "overrides": {
          "agent": {
            "prompt": null,
            "first_message": "مرحبًا كيف حالك؟",
            "language": null
          },
          "tts": null
        }
      }
    }
  }
}'
```

Leave the description blank to use the default language detection prompt.