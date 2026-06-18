> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Knowledge base

**Knowledge bases** allow you to equip your agent with relevant, domain-specific information.

## Overview

A well-curated knowledge base helps your agent go beyond its pre-trained data and deliver context-aware answers.

Here are a few examples where knowledge bases can be useful:

* **Product catalogs**: Store product specifications, pricing, and other essential details.
* **HR or corporate policies**: Provide quick answers about vacation policies, employee benefits, or onboarding procedures.
* **Technical documentation**: Equip your agent with in-depth guides or API references to assist developers.
* **Customer FAQs**: Answer common inquiries consistently.

The agent on this page is configured with full knowledge of ElevenLabs' documentation and sitemap. Go ahead and ask it about anything about ElevenLabs.

## Usage

Files, URLs, and text can be added to the knowledge base in the dashboard.

Upload files in formats like PDF, TXT, DOCX, HTML, and EPUB.

![File upload interface showing supported formats (PDF, TXT, DOCX, HTML, EPUB) with a 21MB
size limit](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/03218c6faaf2a65e8f93c6b0d0528db3b600944840b43c05d5518ed2db6a2630/assets/images/conversational-ai/knowledge-file.jpg)

Import URLs from sources like documentation and product pages.

![URL import interface where users can paste documentation
links](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/d100cbb5c15768d5f5f1880f07be9b59e04dcc68eaaa81bae3c58ca6d651f098/assets/images/conversational-ai/knowledge-url.jpg)

When creating a knowledge base item from a URL, we do not currently support scraping all pages
linked to from the initial URL, or continuously updating the knowledge base over time.
However, these features are coming soon.

Ensure you have permission to use the content from the URLs you provide

Manually add text to the knowledge base.

![Text input interface where users can name and add custom
content](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/3db67ebc9c6fa40f1ad0ec9b60fc48abe08196cadb52aaf3d56dacc476034e75/assets/images/conversational-ai/knowledge-text.jpg)

The CLI does not upload knowledge base documents directly. Create them via the API or dashboard, then attach the resulting document IDs to your agent configuration.

```bash
elevenlabs agents pull --agent "<agent-name>"
```

Set `conversation_config.agent.prompt.knowledge_base`:

```json
{
  "conversation_config": {
    "agent": {
      "prompt": {
        "knowledge_base": [
          {
            "type": "file",
            "name": "Unladen Swallow Facts",
            "id": "<document-id>",
            "usage_mode": "auto"
          }
        ]
      }
    }
  }
}
```

```bash
elevenlabs agents push --agent "<agent-name>"
```

```python
# First create the document from text
knowledge_base_document_text = elevenlabs.conversational_ai.knowledge_base.documents.create_from_text(
    text="The airspeed velocity of an unladen swallow (European) is 24 miles per hour or roughly 11 meters per second.",
    name="Unladen Swallow facts",
)

# Alternatively, you can create a document from a URL
knowledge_base_document_url = elevenlabs.conversational_ai.knowledge_base.documents.create_from_url(
    url="https://en.wikipedia.org/wiki/Unladen_swallow",
    name="Unladen Swallow Wikipedia page",
)

# Or create a document from a file
knowledge_base_document_file = elevenlabs.conversational_ai.knowledge_base.documents.create_from_file(
    file=open("/path/to/unladen-swallow-facts.txt", "rb"),
    name="Unladen Swallow Facts",
)

# Then add the document to the agent
agent = elevenlabs.conversational_ai.agents.update(
    agent_id="agent-id",
    conversation_config={
        "agent": {
            "prompt": {
                "knowledge_base": [
                    {
                        "type": "text",
                        "name": knowledge_base_document_text.name,
                        "id": knowledge_base_document_text.id,
                    },
                    {
                        "type": "url",
                        "name": knowledge_base_document_url.name,
                        "id": knowledge_base_document_url.id,
                    },
                    {
                        "type": "file",
                        "name": knowledge_base_document_file.name,
                        "id": knowledge_base_document_file.id,
                    }
                ]
            }
        }
    },
)

print("Agent updated:", agent)
```

```typescript
import fs from "node:fs";

// First create the document from text
const knowledgeBaseDocumentText = await elevenlabs.conversationalAi.knowledgeBase.documents.createFromText({
  name: "Unladen Swallow Facts",
  text: "The airspeed velocity of an unladen swallow (European) is 24 miles per hour or roughly 11 meters per second.",
});

// Alternatively, you can create a document from a URL
const knowledgeBaseDocumentUrl = await elevenlabs.conversationalAi.knowledgeBase.documents.createFromUrl({
  name: "Unladen Swallow Facts",
  url: "https://en.wikipedia.org/wiki/Unladen_swallow",
});

// Or create a document from a file
const fileBuffer = fs.readFileSync("/path/to/unladen-swallow-facts.txt");
const file = new File([fileBuffer], "unladen-swallow-facts.txt", { type: "text/plain" });

const knowledgeBaseDocumentFile = await elevenlabs.conversationalAi.knowledgeBase.documents.createFromFile({
  name: "Unladen Swallow Facts",
  file: file,
});

// Then add the document to the agent
const agent = await elevenlabs.conversationalAi.agents.update("agent-id", {
    conversationConfig: {
        agent: {
            prompt: {
                knowledgeBase: [
                    {
                        type: "text",
                        name: knowledgeBaseDocumentText.name,
                        id: knowledgeBaseDocumentText.id,
                    },
                    {
                        type: "url",
                        name: knowledgeBaseDocumentUrl.name,
                        id: knowledgeBaseDocumentUrl.id,
                    },
                    {
                        type: "file",
                        name: knowledgeBaseDocumentFile.name,
                        id: knowledgeBaseDocumentFile.id,
                    }
                ]
            }
        }
    }
});

console.log("Agent updated:", agent);
```

## Best practices

<h4>
  Content quality
</h4>

Provide clear, well-structured information that's relevant to your agent's purpose.

<h4>
  Size management
</h4>

Break large documents into smaller, focused pieces for better processing.

<h4>
  Regular updates
</h4>

Regularly review and update the agent's knowledge base to ensure the information remains current and accurate.

<h4>
  Identify knowledge gaps
</h4>

Review conversation transcripts to identify popular topics, queries and areas where users struggle to find information. Note any knowledge gaps and add the missing context to the knowledge base.

## Enterprise features

Non-enterprise accounts have a maximum of 20MB or 300k characters.

Need higher limits? [Contact our sales team](https://elevenlabs.io/contact-sales) to discuss
enterprise plans with expanded knowledge base capabilities.