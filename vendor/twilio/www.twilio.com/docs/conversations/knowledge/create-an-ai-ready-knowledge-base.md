# Create an AI-ready knowledge base

This guide helps you transform raw data into an AI-ready knowledge base.

## Overview

Enterprise Knowledge uses a simple hierarchy: sources live inside knowledge bases. After you create a knowledge base, you provide its unique ID to your AI tool, which gives the AI the context it needs to stay on-brand and accurate.

Follow these steps to learn how to structure your data and connect your knowledge to AI tools like [Conversation Intelligence](/docs/conversations/intelligence).

## Step 1: Create your knowledge base

Think of a knowledge base as your library. It's the container that your AI tools search through.

To create a knowledge base, make a `POST` request to the knowledge bases endpoint:

```bash title="Create a knowledge base"
curl -X POST "https://knowledge.twilio.com/v2/ControlPlane/KnowledgeBases" \
  -u $TWILIO_API_KEY:$TWILIO_API_SECRET \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "my-knowledge-base"
  }'
```

Save the knowledge base ID that you'll receive (for example, `KBxxxxxxxxxx`). You need this ID to link your knowledge to CINTEL or TAC in [Step 3](#step-3-connect-your-knowledge-base-to-ai-tools).

For more details, see the [knowledge bases API reference](/docs/api/knowledge/v2/knowledge-bases).

## Step 2: Add a source to your knowledge base

Add the actual source information to your knowledge base. You can use a website URL, raw text, or upload a file.

### Example: Add a website source

To add a website source, make a `POST` request to the knowledge sources endpoint with your `kbId`:

```bash title="Add a website source"
curl -X POST "https://knowledge.twilio.com/v2/KnowledgeBases/KBxxxxxxxxxx/Knowledge" \
  -u $TWILIO_API_KEY:$TWILIO_API_SECRET \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Documentation",
    "description": "Official product guides and API documentation",
    "source": {
      "type": "web",
      "url": {
        "web": "https://example.com/docs",
        "crawlDepth": 3,
        "crawlPeriod": "WEEKLY"
      }
    }
  }'
```

## Step 3: Connect your knowledge base to AI tools

Use your knowledge base with Twilio Agent Connect (TAC) or [Conversation Intelligence](/docs/conversations/intelligence) (CINTEL) to provide AI context.

Most Twilio AI features require you to pass the `kbId` in the tool's configuration or with the Assistant API.

### Integrating with Twilio Agent Connect (TAC)

To give your agents real-time suggestions based on your knowledge:

1. In the Twilio Console, navigate to your Assistant configuration.
2. Paste your `kbId` into the **Knowledge Management** section.
3. When an agent is queried, TAC semantically searches this specific `kbId` to suggest a response.

### Integrating with Conversation Intelligence (CINTEL)

To use knowledge for automated analysis, attach your knowledge base to an intelligence configuration. Make a `PUT` request to the Intelligence Configuration resource with your knowledge base ID in the `context.knowledge.bases` array:

```bash
curl -X PUT "https://intelligence.twilio.com/v3/ControlPlane/Configurations/<INTELLIGENCE_CONFIGURATION_ID>" \
  -u $TWILIO_API_KEY:$TWILIO_API_SECRET \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "real-time-intelligence-config",
    "description": "Intelligence configuration with knowledge context",
    "rules": [
      {
        "operators": [
          {
            "id": "<OPERATOR_ID>"
          }
        ],
        "triggers": [
          {
            "on": "COMMUNICATION",
            "parameters": {
              "count": 2
            }
          }
        ],
        "actions": [
          {
            "type": "WEBHOOK",
            "method": "POST",
            "url": "https://your-webhook-endpoint.com/rule-action"
          }
        ],
        "context": {
          "memory": {
            "enabled": true
          },
          "knowledge": {
            "bases": [
              "KBxxxxxxxxxx"
            ]
          }
        }
      }
    ]
  }'
```

For step-by-step instructions, see [Create an intelligence configuration](/docs/conversations/intelligence/create-intelligence-configuration).

### Using Knowledge in a language operator

After linking your knowledge base, you can use **Custom Language Operators** to access this data as **Context**. In your Operator definition, enable `knowledge_retrieval`. The AI then:

1. Listens to the live conversation.
2. Searches your knowledge base for relevant facts. For example, "What is our 30-day refund policy?"
3. Determines if the agent is providing information that matches your documentation.

For more information, see [Language Operators](/docs/conversations/intelligence/language-operators).

## Best practices for AI-friendly knowledge sources

To ensure your AI tools provide accurate answers and avoid hallucinations:

* **Remove contradictory content**: Sources with conflicting information confuse semantic search and increase hallucination risk. Review and reconcile any duplicate or conflicting information before adding to your knowledge base.
* **Use consistent terminology**: Define key terms once and use them consistently throughout your sources. For example, use "refund policy" or "return policy" consistently, not both interchangeably.
* **Avoid speculative content**: Stick to facts and documented information. Avoid marketing language, opinions, or phrases like "likely," "probably," or "expected to" that the AI might treat as definitive facts.
* **Chunk content**: When using text sources, keep snippets focused and organized. Break large documents into logical sections by topic instead of pasting entire manuals into one field.
* **Use clear formatting**: Use Markdown-style headers in raw text. This helps the semantic indexer understand your content hierarchy.
* **Set recrawl frequency**: If your website changes frequently, set `crawlPeriod` to `WEEKLY` to keep the AI up to date with your latest information.
* **Write descriptive source names**: Give each knowledge source a clear description. CINTEL uses these descriptions to determine which source is most relevant to specific conversation topics.
* **Configure permissions**: Ensure your API key has the appropriate `ControlPlane` permissions to read and write to knowledge resources.
